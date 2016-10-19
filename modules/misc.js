const json     = require("jsonfile");
const internal = require("./internal.js");


/**
 * Send the default help message to the user who requested it.
 *
 * @param client
 * @param message
*/
function help(botCommands, client, message) {
    var helpMessage = "";

    for (key in botCommands) {
        let command = `${helpMessage}${botCommands[key]["cmd_desc"]}: `;
        let help    = `${botCommands[key]["help"]}`;

        helpMessage = `${command} ${help}\n`;
    }

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
    internal.log(message, "remi", "");
    internal.sendMessageToUser(null, "info", "remi", client, message);
}


/**
 * Post a dank meme provided the dank name of the dank meme
 *
 * @param args
 * @param client
 * @param message
*/
function dankMeme(args, client, message) {
    let dankMemeFilePath = "config/memes.json";
    let storedMemes = json.readFileSync(dankMemeFilePath);
    
    if (args[0] == "list") {
        let memesList = "";
            for (key in storedMemes)
                memesList += `${key} - `;
        memesList = memesList.substr(0, memesList.length - 3);
        internal.sendMessageToUser(memesList, "info", "list", 
            client, message);
    }
    else if (!(args[0] in storedMemes))
        internal.sendMessageToUser(args[0], "errors", "unrecognized",
            client, message);
    else {
        let dankMemeUrl = storedMemes[args[0]];
        internal.sendMessageToUser(dankMemeUrl, "success", "meme_url", 
            client, message);
    }
}

module.exports = {
    help: help,
    restart: restart,
    remi: remi,
    dankMeme: dankMeme
}