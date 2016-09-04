const internal = require("./internal.js");
const json     = require("jsonfile");

function play(name, args, client, message) {
    var soundFile = `./sounds/${name}.json`;
    var sound = args[0];
    let sounds = json.readFileSync(soundFile);

    if (!(sound in sounds) && sound !== "help")
        internal.messageUser(sound, "errors", "unrecognized", client, message);

    else if (args.length > 2 && args[1].charAt(0) !== "\"")
        internal.messageUser(null, "errors", "too_many_args", client, message);

    else if (args.length === 1 && sound === "help")
        internal.messageUser(generateSoundsList(sounds), "info", "sounds_list", 
            client, message);

    else if (args.length === 1) {
        let voiceChannel = message.author.voiceChannel;
        if (!voiceChannel)
            internal.messageUser(null, "errors", "must_in_vc", client, message);
        else
            internal.playSound(voiceChannel, sounds[sound], client);
    }
    else {
        args.shift();
        let channelName = "";

        for (let i = 0; i < args.length; i++)
            channelName += `${args[i]} `;
        channelName = channelName.replace(/"/ig, "");
        channelName = channelName.substr(0, channelName.length - 1);

        let channels = message.server.channels;
        let channel  = "";
        for (let i = 0; i < channels.length; i++)
            if (channels[i].name === channelName && channels[i].type === "voice")
                channel = channels[i];

        if (channel === "")
            internal.messageUser(channelName, "errors", "unrecognized", 
                client, message);
        else
            internal.playSound(channel, sounds[sound], client);

    } 
}


function generateSoundsList(sounds) {
    let soundsList = "";
    for (key in sounds)
        soundsList += `${key} - `;

    soundsList = soundsList.substr(0, soundsList.length - 3);
    return soundsList;
}

module.exports = {
    play: play
}