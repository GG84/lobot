const json         = require("jsonfile");
const messagesFile = "config/messages.json";
const messages     = json.readFileSync(messagesFile);


/**
 * Play a sound to the specified channel
 *
 * @param {voiceChannel} channel 
 * @param {string}       file
 * @param                client   
*/
function playSound(channel, file, client) {
    client.joinVoiceChannel(channel).then(connection => {
        connection.playFile(file)
            .then(intent => {
                intent.on("end", () => {
                    console.log(`  Played ${file}`);
                    client.leaveVoiceChannel(channel);
                })
                intent.on("error", (err) => {
                    console.warn(`Error: ${error}`);
                    client.leaveVoiceChannel(channel);
                });
            })
    })
    .catch(err => {
        console.log(`Error joining voice channel: ${err}`);
    });
}


/**
 * Logs a message to the console when a command is fired
 * Logs author's name, id, server's name, id, channel's name, id
 *
 * @param          message
 * @param {string} command
 * @param {array}  args
*/
function log(message, command, args) {
    let authorName   = message.author.name;
    let authorID     = message.author.id;
    let serverName   = message.server.name;
    let serverID     = message.server.id;
    let channelName  = message.channel.name;
    let channelID    = message.channel.id;

    let commandInfos = `Fired ${command} with ${args} by`;
    let authorInfos  = `${authorName} (${authorID}) on`;
    let serverInfos  = `${serverName}#${channelName}(${serverID}#${channelID})`;
    let log = `${commandInfos} ${authorInfos} ${serverInfos}`;
               
    console.log(log);
}


/**
 * Send a message to a user using the reply feature, meaning the message will
 * be formatted as "@User, message".
 * The message is taken from a config/messages.json file, and it simulates a
 * template literal feature, meaning you can insert one variable in the message.
 *
 * @param {string|null} variable
 * @param {string}      type       (errors|info|success)
 * @param {string}      name
 * @param               client
 * @param               message
 *
*/
function sendMessageToUser(variable, type, name, client, message) {
    let stringToLiteral = messages[type][name];
    let regex = /\$\{(.*?)\}/ig;
    let parsedMessage;

    if (variable !== null)
        parsedMessage = stringToLiteral.replace(regex, variable);
    else
        parsedMessage = stringToLiteral;

    client.reply(message, parsedMessage);
}

module.exports = {
    playSound: playSound,
    log: log,
    sendMessageToUser: sendMessageToUser
}