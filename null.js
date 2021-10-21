const Discord = require('discord.js');
const ambuam = require("./yarram.json");
const kariilesex = require("./yarram.json");
const spankersikerken = require("./yarram.json");
const oyunoynuyozamına = require("./yarram.json")


const selamlı = [];
for (let index = 0; index < kariilesex.amktokenleri.length; index++) {
    const token = kariilesex.amktokenleri[index];
    const client = new Discord.Client();
    client.login(token);
    let memiş;
    client.on('ready', async () => {
        setInterval(() => {
        const yarrak = Math.floor(Math.random() * (oyunoynuyozamına.oyundeğişoc.length));
        client.user.setActivity(`${oyunoynuyozamına.oyundeğişoc[yarrak]}`, {type: "LISTENING"});
    }, 10000);
        client.user.setStatus("idle");
        console.log(`${client.user.tag} olarak giriş yapıldı.`);
        memiş = await client.channels.cache.get(spankersikerken.amkkanalları[index]).join().catch(err => console.error("Sorun Oluştu."));
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === spankersikerken.amkkanalları[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(ambuam.çalışıyomuamk).rawPosition)) {
                ses = await memiş.play('./hg.mp3');
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(ambuam.çalışıyomuamk).rawPosition)) {
                ses = await memiş.play('./hg.mp3');
                selamlı.push(cur.member.user.id);
                console.log(selamlı);
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get(ambuam.çalışıyomuamk).rawPosition) {
                ses = await memiş.play('./yt.mp3');
                selamlı.push(cur.member.user.id);
                console.log(selamlı);
            }
        }
        if (prev.channel && (prev.channel.id === spankersikerken.amkkanalları[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) memiş = await client.channels.cache.get(spankersikerken.amkkanalları[index]).join();
    })

    client.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true);
        }
        });

}
