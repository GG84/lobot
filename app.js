const discord    = require("discord.js");
const json       = require("jsonfile");
const soundboard = require("./modules/soundboard.js");
const internal   = require("./modules/internal.js");
const misc       = require("./modules/misc.js");
const configFile = "config/config.json";
const token      = json.readFileSync(configFile).token;

var client = new discord.Client();

function main(error, token) {
    if (error)
        console.log(`There was an error logging in: ${error}`);
    else
        console.log(`Logged in successfully with token ${token}`);

    client.on("ready", function() {
        client.setPlayingGame("Type &help for help.");
    });

    client.on("message", function(message) {
        if (message.content.charAt(0) === "&")
            processCommand(message);
        else if (message.content.search(/rémy|remy/ig) > -1)
            misc.remi(client, message);
    });
}

function processCommand(message) {
    let fullCommand = message.content.split(" ");
    var command     = fullCommand.shift().substr(1);
    var args        = fullCommand;

    internal.log(message, command, args);

    switch(command) {
        case "help":
            misc.help(client, message);
            break;

        case "sdc":
            soundboard.play("sardoche", args, client, message);
            break;

        case "restart":
            misc.restart(configFile, client, message);
            break;

        default:
            let help = `Unrecognized command. Type &help for help.`;
            client.sendMessage(message.channel, help);
    }

    
}

client.loginWithToken(token, main);