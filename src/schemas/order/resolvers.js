const {
    OrderModel,
    OfferModel,
    CarModel,
    AddressModel,
} = require("../../models/index");
const logger = require("../../utils/logger");
const {onError} = require("../../utils/utils");
const {createIntervention} = require("../../utils/akti");
const {AKTI_TIME_FRAME} = require("../../utils/constances");
const moment = require("moment");

let default_address;

const fetchAnAddress = function(_id) {
    return AddressModel.findOne({_id}).exec();
};

const fetchDefaultAddress = function(_id) {
    default_address = AddressModel.findOne({_id}).exec();
};

const Order = {
    car({car}) {
        return CarModel.findOne({_id: car}).exec();
    },
    address({address}) {
        fetchDefaultAddress(address);
        return default_address;
    },
    billing_address({address, billing_address}) {
        if (billing_address) {
            return fetchAnAddress(billing_address);
        }
        if (!default_address) {
            fetchDefaultAddress(address);
            return default_address;
        }

        return default_address;
    },
    billing_address_id({address, billing_address}) {
        if (billing_address) {
            return billing_address;
        }

        return address;
    },
    intervention_id({akti_intervention_id}) {
        return akti_intervention_id;
    },
};

const OrdersQr = {
    Orders(parent, {page}) {
        return OrderModel.find()
            .limit(15)
            .skip(15 * (page || 1))
            .exec();
    },
};

const UserOrdersQr = {
    UserOrders(parent, args, {req}) {
        const {user, page} = args;
        const filter = {};

        if (req.user && req.user.user_id) {
            filter.user = req.user.user_id;
        }

        if (!filter.user && user) {
            filter.user = user;
        }

        return OrderModel.find({user})
            .limit(15)
            .skip(15 * (page || 1))
            .exec();
    },
};

const UserOrderQr = {
    UserOrder(parent, {id}, {req}) {
        return OrderModel.findOne({
            user: req.user.user_id,
            _id: id,
        })
            .populate("offer")
            .exec();
    },
};

const CheckoutOrderMttn = {
    CheckoutOrder: async function(parent, {order}, {req}) {
        try {
            const {user_id: user, account_id, contact_id} = req.user;
            const address = await AddressModel.findOne({_id: order.address});
            const service = await OfferModel.findOne({_id: order.offer});

            let accountId = order.account_id || account_id;

            const intervention_draft = {
                akti_address_id: address.akti_address_id,
                plannedDateTimestamp: Math.round(
                    moment(order.intervention_date, "YYYY-MM-DD").format("X"),
                ),
                startTime: AKTI_TIME_FRAME[order.intervention_timeframe],
                akti_service_id: service.akti_service_id,
            };

            const akti_intervention = await createIntervention(
                accountId,
                contact_id,
                intervention_draft,
            );

            const akti_intervention_id =
                akti_intervention.data.data.interventionId;

            const new_order = new OrderModel({
                ...order,
                user,
                akti_intervention_id,
            });

            return new_order.save().then(resp => {
                logger.info(`new Order id: ${resp.id} Registered successfully`);
                return resp;
            });
        } catch (err) {
            onError(err);
        }
    },
};

const UpdateOrderBillingMttn = {
    UpdateOrderBilling: function(parent, {id, address_id}, {req}) {
        const filter = {
            _id: id,
            user: req.user.user_id,
        };

        return OrderModel.findOneAndUpdate(
            filter,
            {billing_address: address_id},
            {new: true},
        )
            .then(order => {
                logger.info(
                    `Billing address of Order id: ${id} Updated successfully`,
                );
                return order;
            })
            .catch(err => {
                onError(err);
            });
    },
};

module.exports = {
    Order,
    OrdersQr,
    UserOrderQr,
    UserOrdersQr,
    CheckoutOrderMttn,
    UpdateOrderBillingMttn,
};
