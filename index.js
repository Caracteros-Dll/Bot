const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const TOKEN = "NDI3OTI0MDU4NTU0NzYxMjI2.DZyBhA.0dsqDEfG_g4ijsNtrt3Nyu3yYwQ";
const errors = require("./erros.js");
const configs = require("./botconfig.json");
const msg = require("./msg.json");

const fs = require("fs");
    function genereteHex(){
    return "#" + Math.floor(Math.random() + 16777215).toString(16);
    };
    function play(connection,message) {
        var server = servers[message.guild.id];
        server.dispatcher = connection.playStream(ytdl(server.queue[0], {filter: "audioonly"} ));
        server.queue.shift();
        server.dispatcher.on("end", function(){
            if (server.queue[0]) play(connection, message);
            else connection.disconnect();
        });
    };
var fortunes = [
"Sim",
"Não",
"Estou em dúvida...",
"Foda-se"
];
var bot = new Discord.Client();
var servers = {};
bot.on("ready", async function(){
    console.log(bot.channels.members);
  await  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);   
  await    bot.user.setStatus("Do Not Disturb");
//await bot.user.setActivity(`Onine em ${bot.guilds.size} servers`);
await bot.user.setActivity('Xvideos.com');
  var channel = bot.channels.get('429486834800656404');
  console.log(`Logged in as ${bot.user.tag}!`);
  //await channel.send("Me adicionem aí caralho: Caracteros.dll#4437 \n Meu Discord Caiu \n");
   // await channel.sendMessage("Me adicionem aí caralho: Caracteros.dll#4437 \n Meu Discord Caiu");
     console.log(`(${message.server.name} / ${message.channel.name}) ${message.author.name}: ${message.content}`);
});


bot.on("guildCreate", guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    bot.user.setGame(`on ${bot.guilds.size} servers`);
  });
  
  bot.on("guildDelete", guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    bot.user.setGame(`on ${bot.guilds.size} servers`);
  });
  


bot.on("message", function(message)  {
    console.log("Mensagem: " + message.content + " De: " + message.author.tag);
    if(message.author.equals(bot.user)) return;
    if(!message.content.startsWith(configs.prefixes)) return;
    var args = message.content.substring(configs.prefixes.length).split(" ");
     function discoRole() {
    let random = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    roles.forEach((role) => {
      let theRole = message.guild.roles.find("name", role);
      theRole.edit({color: random}).catch(e => {
        return message.channel.sendMessage(":x: **Error:** The role you specified in the `config.json` is either not a role on this server, or his a role higher than the highest role that I have.");
      });
    });
  }


    switch (args[0]) {
        case "ping":
            message.channel.send(`Latência é ${ message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
            break;

        case "8ball":
            if(args[1])   message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
            else message.channel.send("Can't read that");
            break;

        case "bot?":
            message.channel.send("Estou aqui!");
            break;

        case "comandos":
           var embed = new Discord.RichEmbed()
            .setTitle("Aqui está a lista dos meus comandos:")
            .addField(configs.prefixes +"help", "Mostra todos os comandos disponivél.")
            .addField(configs.prefixes +"8ball + Alguma coisa", "Comando feito para zoar com os amigos. Ex: !8ball Este comando é bom?")
            .addField(configs.prefixes +"info", "Mostra as informações do bot.")
            .addField(configs.prefixes +"ping", "Verifica se o bot está normal.")
            .addField(configs.prefixes +"bot?", "Verifica se o bot está online.")
            .addField(configs.prefixes +"limpar + Quantidade", "Limpar o chat com um determinado número de mensages.")
            .addField(configs.prefixes +"prefix", "Mostra a lista de comando para prefixo.")
            .addField(configs.prefixes +"kick + Usúario + Motivo", "Kika um um membro do canal.")
            .setColor("#00BFFF")
            .setThumbnail(message.author.avatarURL)
             message.member.send(embed)            
             message.channel.send("`` A minha lista foi enviada no seu pv ``" + message.author.toString());

             break;
        case "remcargo":
            message.member.removeRole(member.guild.roles.find("name", "Recém Nascido"));
            message.channel.send("Cargo removido")
            break;

        case "delcargo":
           message.member.guild.roles.find("name", "Recém Nascido").delete();
           message.channel.send("Cargo deletado")
            break;

        case "play+":
                  if(!args[1]){
                 message.channel.send("Por favor, coloque um link válido!");
              return;
                }
                if(!message.member.voiceChannel) {
                    message.channel.send("Você precisa está em um canal de voz para este comando!");
                    return;
                }
                    if(!servers[message.guild.id]) servers[message.guild.id] = {
                        queue: []
                    };
                        var server = servers[message.guild.id];
                           server.queue.push(args[1]);
                            if(!message.guild.voiceChannel) message.member.voiceChannel.join().then(function(connection){
                             play(connection, message);
                                });
                      break;


                      

        case "skip":
                     var server = servers[message.guild.id];
                     if(server. dispatcher) server.dispatcher.end();
                    break;
        case "stop":
                     var server = servers[message.guild.id];
                    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                    break;


        case "limpar":   
            message.channel.bulkDelete(args[1]);
            message.channel.send("`` Chat foi limpo com sucesso. Total de mensagens excluidas: " + args[1] + "``" )
             break;

             case "kick":

             if(!message.member.roles.some(r=>["Pai", "Pai"].includes(r.name)) )
             return message.reply("Desculpe, você não tem permissão para usar isso!");
                      let member = message.mentions.members.first();
           if(!member)
             return message.reply("Por favor mencione um membro válido deste servidor");
           if(!member.kickable) 
             return message.reply("Eu não posso chutar este usuário! Ele têm um cargo mais importante? Eu tenho permissões de chute?");
           
           let reason = args.slice(2).join(' ');
           if(!reason)
             return message.reply("Por favor, indique um usúario para levar kick");
           
            member.kick(reason)
           .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
           message.channel.send( `${message.author.toString()} chutou: ${member} pelo seguinte  motivo: ${reason}`);
       
         
                                

             break;

        case "server":  
                let serverembed = new Discord.RichEmbed()
                .setDescription("Informações do Serve")
                .setColor("#A4A4A4")
                .setThumbnail(message.channel.avatarURL)
                .addField("Nome do servidor", message.guild.name)
                .addField("Criando em", message.guild.createdAt)
                .addField("Você entrou", message.member.joinedAt)
                .addField("Total de membros", message.guild.memberCount);
                message.channel.send(serverembed);
            break; 
            
            
        case "bot-info":
                    let sicon = bot.user.avatarURL;
                    let bicon = bot.user.displayAvatarURL;
                    let botembed = new Discord.RichEmbed()
                    .setDescription("Bot Informação")
                    .setColor("#15f153")
                    .setThumbnail(sicon)
                    .addField("Bot Nick", bot.user.username)
                    .addField("Criando Em", bot.user.createdAt);
                    message.channel.send(botembed);
                            break;    
        case "prefix":
               if(message.content.startsWith("")){
                        let emb = new Discord.RichEmbed()
                        .setDescription("Configurações de Prefixo")
                        .setColor("#FF9900")
                        .addField(configs.prefixes +"prefix-mudar + prefix desejado:", "Muda o prefixo de acordo com seu gosto.s")
                        .addField(configs.prefixes +"prefix-atual", "Mostra o prefixo sendo usando atualmente.");
                        message.channel.send(emb);
                    } 
          break;
        case "prefix-atual":
                let prefi1 = (configs.prefixes);
                let botembed1 = new Discord.RichEmbed()
                .setDescription("Configurações de Prefixo")
                .setColor("#0080FF")
                .addField("Prefixo usando atualmente:", prefi1)
                message.channel.send(botembed1);
                break;
        case "prefix-mudar":
                    let newPrefix = message.content.split(" ").slice(1, 2)[0];
                    configs.prefixes = newPrefix;
                    fs.writeFile("./botconfig.json", JSON.stringify(configs), (err) => console.error);
                        let sEmbed = new Discord.RichEmbed()
                        .setColor("#15f153")
                         .setDescription("Configurações de Prefixo")
                         .addField("Prefixo alterado com sucesso!")
                        .addField("Prefixo novo: " + newPrefix);
                        
                        message.channel.send(sEmbed);

            break;
      
      
        case "info-user":
        if(message.mentions.users.first()) { //Check if the message has a mention in it.
            let user = message.mentions.users.first(); //Since message.mentions.users returns a collection; we must use the first() method to get the first in the collection.
            let output = user.username + user.discriminator /*Username and Discriminator*/ +
            "\nAvatar URL: " + user.avatarURL; /*The Avatar URL*/
            message.channel.sendMessage(output); //We send the output in the current channel.
       } else {
            message.reply("Usúario inválido."); //Reply with a mention saying "Invalid user."
      }
                    break;

                          case "co":

 	 if(allowedUsers.includes(message.author.id)) {
    setInterval(() => { discoRole(); }, config.ms);
    message.channel.sendMessage("```css\nDiscoing...```");
    message.channel.sendMessage("Please make sure you read the README, you could get IP banned from discord because of ratelimits.");

      break;

      
            default:    
     message.channel.send("Comando inválido");
    }


    //-----------------------------------------------------------------//
});

bot.login(process.env.TOKEN);
