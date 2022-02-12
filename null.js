const Discord = require('discord.js');
const nullbase = require("./ayarlar.json");

const selamlı = [];
for (let index = 0; index < nullbase.botTOKEN.length; index++) {
    const token = nullbase.botTOKEN[index];
    const client = new Discord.Client();
    client.login(token);
    let memiş;
    client.on('ready', async () => {
        setInterval(() => {
        const oyun = Math.floor(Math.random() * (nullbase.oynuyor.length));
        client.user.setActivity(`${nullbase.oynuyor[oyun]}`, {type: "LISTENING"});
    }, 10000);
        client.user.setStatus("idle");
        console.log(`${client.user.tag} olarak giriş yapıldı.`);
        memiş = await client.channels.cache.get(nullbase.seskanalları[index]).join().catch(err => console.error("Sorun Oluştu."));
    });
    let ses;
    client.on('voiceStateUpdate', async (prev, cur) => {
        let embed = new Discord.MessageEmbed().setColor("f5da07").setFooter("null 💛").setTimestamp();
        let sesLOG = client.channels.cache.get(nullbase.voiceLOG);
        if (cur.member.user.bot) return;
        if (cur.channel && (cur.channel.id === nullbase.seskanalları[index])) {
            if (cur.channelID === prev.channelID) return;
            if (selamlı.includes(cur.member.id) && (cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(nullbase.RegroleID).rawPosition)) {
                ses = await memiş.play('./ses/hg.mp3');
                sesLOG.send(embed.setDescription(`<@${cur.member.id}> adlı kişi <#${nullbase.seskanalları[index]}> isimli ses kanalına giriş yaptı.`))
                return;
            }
            if ((cur.member.roles.highest.rawPosition < cur.guild.roles.cache.get(nullbase.RegroleID).rawPosition)) {
                ses = await memiş.play('./ses/hg.mp3');
                selamlı.push(cur.member.user.id);
                sesLOG.send(embed.setDescription(`<@${cur.member.id}> adlı kişi <#${nullbase.seskanalları[index]}> isimli ses kanalına giriş yaptı.`))
            } else if (cur.member.roles.highest.rawPosition > cur.guild.roles.cache.get(nullbase.RegroleID).rawPosition) {
                ses = await memiş.play('./ses/yt.mp3');
                selamlı.push(cur.member.user.id);
                sesLOG.send(embed.setDescription(`<@${cur.member.id}> adlı kişi <#${nullbase.seskanalları[index]}> isimli ses kanalına giriş yaptı.`))
            }
        }
        if (prev.channel && (prev.channel.id === nullbase.seskanalları[index]) && (prev.channel.members.size === 1) && ses) ses.end();
    });
    client.on('voiceStateUpdate', async (prev, cur) => {
        if (cur.member.id === client.user.id) memiş = await client.channels.cache.get(nullbase.seskanalları[index]).join();
    })

    client.on('voiceStateUpdate', async (___, newState) => {
        if (
        newState.member.user.bot &&
        newState.channelID &&
        newState.member.user.id == client.user.id &&
        !newState.selfDeaf
        ) {
        newState.setSelfDeaf(true); // Kulaklık
        }
        });

}
