const json         = require("jsonfile");
const messagesFile = "config/messages.json";
const messages     = json.readFileSync(messagesFile);


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

function messageUser(variable, type, name, client, message) {
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
    messageUser: messageUser
}