const {ApolloServer} = require("apollo-server-express");
const SessionManagementSchema = require("../schemas/SessionManagement");
const ClientFormSchema = require("../schemas/ClientForm");
const AdminPanelSchema = require("../schemas/AdminPanel");
const {adminFilter} = require("../config/securityConfig");

const ApolloResource = function(path, sever) {
    this.path = path;
    this.server = sever;
    this.applyMiddleware = function(app) {
        sever.applyMiddleware({
            app,
            path: path,
        });
    };
};

const apollo = {
    connect: function(redis) {
        const session_management_path = "/session_management_graph";
        const session_management_api = new ApolloServer({
            schema: SessionManagementSchema,
            context: ({req, res}) => ({
                req,
                res,
                redis,
            }),
        });
        const client_form_path = "/client_form_graph";
        const client_form_api = new ApolloServer({
            schema: ClientFormSchema,
            context: ({req, res}) => ({
                req,
                res,
            }),
        });
        const admin_path = "/admin_graph";
        const admin_api = new ApolloServer({
            schema: AdminPanelSchema,
            context: ({req, res}) => {
                adminFilter(req, res);
                return {req, res};
            },
        });

        return {
            session_management: new ApolloResource(
                session_management_path,
                session_management_api,
            ),
            client_form: new ApolloResource(client_form_path, client_form_api),
            admin: new ApolloResource(admin_path, admin_api),
        };
    },
};

module.exports = apollo;
