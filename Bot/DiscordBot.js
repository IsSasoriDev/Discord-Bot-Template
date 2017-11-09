
const Discord = require('discord.js');
const config = require("./config.json");

//Create an instance of Discord that we will use to control the bot
const bot = new Discord.Client();
//const dispatcher = null;

// Gets called when our bot is successfully logged in and connected

bot.on('ready', () => {
    console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
});


bot.on('message', (message) => {

    if(message.author.bot) return;

    if (message.content.indexOf(config.prefix) === 0){




    //command: its the command for the bot
    //args: Array of Parameters for the command
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();


        if (command === "ping"){
            message.reply("Pong");
        }

        if (command === "kick") {

        // limited to mods and admins, so no other without permissions can kick
            if(!message.member.roles.some(r=>config.mods[0].includes(r.name)) )
                return message.reply("Sorry, you don't have permissions to use this!");


            let member = message.mentions.members.first();

            if(!member){
                return message.reply("Please mention a valid user of this server!");
            }

            if(!member.kickable){
                return message.reply("Sorry, you dont have the permission to kick an user");
            }

            //get the mention from the user
            let reason = args.slice(1).join(' ');
            if(!reason)
                return message.reply("Please indicate a reason for the kick!");

            //kick the member
            member.kick(reason).then((member) => {
            //Successmessage
                message.reply(member.displayName() + " has been successfully kicked from the server. Reason: "+reason);
            }).catch((err) => {
            //Failmessage
                message.reply("Access denied. Error: "+err);
            });
        }

        // Ban a member from the server
        if (command === "ban") {

        // limited to mods and admins, so no other without permissions can kick
            if(!message.member.roles.some(r=>["Owner"].includes(r.name)))
                return message.reply("Sorry, you don't have permissions to use this!");


            let member = message.mentions.members.first();

            if(!member){
                return message.reply("Please mention a valid user of this server!");
            }

            if(!member.bannable){
                return message.reply("Sorry, I can't ban this user.");
            }

            //get the mention from the user
            let reason = args.slice(1).join(' ');
            if(!reason)
                return message.reply("Please indicate a reason for the ban!");

            //kick the member
            member.ban(reason)
              .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
      message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);

    }

    // Removes all messages from all users in the channel
    if (command == "purge"){

        const deleteCount = parseInt(args[0], 10);

        if(!deleteCount || deleteCount < 2 || deleteCount > 100)
            return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

        const fetched = message.channel.fetchMessages({count: deleteCount});
        message.channel.bulkDelete(fetched).catch((err) => {
            message.reply("Couldn't delete the messages. Error: "+err);
        });

        }

        if(command === "join"){

            if(!message.guild) return;

            //bot tries to join the member if he is in a VoiceChannel
            if (message.member.voiceChannel){
                message.member.voiceChannel.join()
                    .then(connection => {
                        message.reply("Connection: "+connection+ ". Joining successfull");

                    const dispatcher = connection.playFile('C:/Users/Matthias/Desktop/Music/Desiigner - Panda (Audio).mp3');
                    }).catch((err) => {
                    message.reply("Joining denied. Error: "+err);
                });
        }else{
            message.reply("You need to join a voice channel first");
        }
    }

    //let's you determine best Grill
    if(command === "bestGrill"){

        message.reply("~~Yuri~~ Felix");

    }

  }else if(message.conten === "```css >tfw no gf ```"){

      message.reply("Feel ya mate");
  }
});
/*
    if (command === "endmusic"){
      dispatcher.end();
    }

    if(command == "pausemusic"){
      dispatcher.pause();
    }

    if (command == "resumemusic"){
      dispatcher.resume();
    }



});

dispatcher.on('end', () => {

});



dispatcher.on('error', e => {
  // Catch any errors that may arise
  console.log(e);
});

*/


bot.login(config.token);
