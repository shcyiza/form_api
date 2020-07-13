const logger = {
    success({transaction, send_to, env, provider}){
        console.log(
            '\x1b[32m%s\x1b[0m',
            `\n${new Date()} Wapi-Mail success:`, 
            `Enqueued ${transaction} to ${send_to} in ${env === "PRODUCTION" ? env+" via "+provider : env} successfully!\n`
        )
    },
    error({error_at, error_cat, message, stack}, status = ""){
        console.log(
            '\x1b[31m%s\x1b[0m',
            `\n${new Date()} Wapi-Mail ${error_cat || "SDK"} error ${status}:`,
            !!error_at ? `${message}\nat ${error_at}\n` : stack + "\n"
        )
    }
}

module.exports = logger