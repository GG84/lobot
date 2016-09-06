const json     = require("jsonfile");
const internal = require("./internal.js");


/**
 * Send the default help message to the user who requested it.
 *
 * @param client
 * @param message
*/
function help(client, message) {
    var helpMessage = "";
    var commands = json.readFileSync("config/commands.json");

    for (key in commands)
        helpMessage = `${helpMessage}${key}: ${commands[key]}\n`;

    internal.sendMessageToUser(helpMessage, "info", "root_help", client, 
        message);
}


/**
 * Restart the bot - restricted to authorized IDs only.
 *
 * @param {string} configFilePath
 * @param          client
 * @param          message
*/
function restart(configFilePath, client, message) {
    let authorizedAuthors = json.readFileSync(configFilePath)["admin_ids"];
    let authorID          = message.author.id;

    if (authorizedAuthors.indexOf(authorID) > -1) {
        // Not using internal.sendMessageToUser() here only for the callback 
        // client.reply() offers
        client.reply(message, "See ya in a sec!", {}, function(err, msg) {
            process.exit();
        });
    }
    else
        internal.sendMessageToUser(authorizedAuthors[0], "errors", 
            "not_permissions", client, message);
}


/**
 * Correct a user when he mistakes remy|rémy for remi.
 *
 * @param client
 * @param message
*/
function remi(client, message) {
    internal.sendMessageToUser(null, "info", "remi", client, message);
}


module.exports = {
    help: help,
    restart: restart,
    remi: remi
}