const json     = require("jsonfile");
const internal = require("./internal.js");

function help(client, message) {
    var helpMessage = "";
    var commands = json.readFileSync("config/commands.json");

    for (key in commands)
        helpMessage = `${helpMessage}${key}: ${commands[key]}\n`;

    internal.messageUser(helpMessage, "info", "root_help", client, message);
}

function restart(configFile, client, message) {
    let authorizedAuthors = json.readFileSync(configFile)["admin_ids"];
    let authorID          = message.author.id;

    if (authorizedAuthors.indexOf(authorID) > -1) {
        // Not using internal.messageUser() here only for the callback 
        // client.reply() offers
        client.reply(message, "See ya in a sec!", {}, function(err, msg) {
            process.exit();
        });
    }
    else
        internal.messageUser(authorizedAuthors[0], "errors", "not_permissions", 
            client, message);
}

function remi(client, message) {
    internal.messageUser(null, "info", "remi", client, message);
}


module.exports = {
    help: help,
    restart: restart,
    remi: remi
}