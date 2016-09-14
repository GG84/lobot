const internal = require("./internal.js");
const json     = require("jsonfile");


/**
 * Prepare a sound to be played: checks arguments and validity of each.
 *
 * @param {string} storedSoundsFileName
 * @param {array}  args
 * @param          client
 * @param          message
*/
function prepareToPlay(storedSoundsFileName, args, client, message) {
    var soundFile = `./sounds/${storedSoundsFileName}.json`;
    var userSound = args[0];
    let storedSounds = json.readFileSync(soundFile);

    if (!(userSound in storedSounds) && userSound !== "help")
        internal.sendMessageToUser(userSound, "errors", "unrecognized", client, 
            message);

    else if (args.length > 2 && args[1].charAt(0) !== "\"")
        internal.sendMessageToUser(null, "errors", "too_many_args", client, 
            message);

    else if (args.length === 1 && userSound === "help")
        internal.sendMessageToUser(generateSoundsList(storedSounds), "info", 
            "sounds_list", client, message);

    else if (args.length === 1) {
        let voiceChannel = message.author.voiceChannel;
        if (!voiceChannel)
            internal.sendMessageToUser(null, "errors", "must_in_vc", client, 
                message);
        else
            internal.playSound(voiceChannel, storedSounds[userSound], client);
    }
    else {
        let channelName = buildChannelName(args);

        let serverChannels = message.server.channels;
        let selectedChannel = getSelectedChannel(channelName, serverChannels);

        if (!selectedChannel)
            internal.sendMessageToUser(channelName, "errors", "unrecognized", 
                client, message);
        else
            internal.playSound(selectedChannel, storedSounds[userSound], client);

    } 
}


/**
 * Build the channel's name from the provided argumentsL.
 *
 * @param {array} args
 *
 * @return {string} channelName
*/
function buildChannelName(args) {
    args.shift();
    let channelName = "";

    for (let i = 0; i < args.length; i++)
        channelName += `${args[i]} `;
    channelName = channelName.replace(/"/ig, "");
    channelName = channelName.substr(0, channelName.length - 1);

    return channelName;
}


/**
 * Get the selected channel from the channel name provided by the user
 *
 * @param {string} channelName
 * @param {object} serverChannels
 *
 * @return {string} selectedChannel
*/
function getSelectedChannel(channelName, serverChannels) {
    let selectedChannel  = "";
    for (let i = 0; i < serverChannels.length; i++)
        if (serverChannels[i].name === channelName && serverChannels[i].type === 
                "voice")
            selectedChannel = serverChannels[i];

    return selectedChannel;
}


/**
 * Generate the sounds list from the sounds' object.
 *
 * @param {object} storedSounds
 * 
 * @return {string} soundsList
*/
function generateSoundsList(storedSounds) {
    let soundsList = "";
    for (key in storedSounds)
        soundsList += `${key} - `;

    soundsList = soundsList.substr(0, soundsList.length - 3);
    return soundsList;
}

module.exports = {
    prepareToPlay: prepareToPlay
}