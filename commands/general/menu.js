const moment = require("moment-timezone");

module.exports = {
  command: ["help", "ayuda", "menu"],
  description: "Muestra los comandos",
  category: "general",
  run: async (conn, m, args) => {
    const cmds = [...global.comandos.values()];

    const jam = moment.tz("America/Argentina/Buenos_Aires").format("HH:mm:ss");
    const ucapan =
      jam < "05:00:00"
        ? "🄱uen 🄳ía 🌞"
        : jam < "11:00:00"
        ? "🄱uen 🄳ía 🌞"
        : jam < "15:00:00"
        ? "🄱uenas 🅃ardes 🌄"
        : jam < "19:00:00"
        ? "🄱uenas 🅃ardes 🌄"
        : "🄱uenas 🄽oches 🌛";

    const userId = m.sender;

    let txt = `
۪֔⏜꯭ᩧᰰ᮫̩̥̩̥︵ּ۪۪۪֘᷼𓇺꥓᮫ּ̥̩̥̩̥̊᷼︵᮫ֵֹ۪۪۪꤮ 「꯭ּ✿⃘꯭֟፝͝ ᮫ּ」 ֵ꤮ֹ֪̊︵᮫̥̩̥̩̥֔᷼𓇹᮫ֹ۪۪𝆬𝆬᷼︵꯭ᩙᰰ᮫̩̥̩̥⏜ֵֹ۪۪۪۪
> ${ucapan}, *${m.pushName || "ᥙsᥙᥲrі᥆"} 𝖲᥆ᥡ ${namebot}*
  
˙.꒷🍒.𖦹˙ \`ℂ𝕣𝕖𝕒𝕕𝕠𝕣𝕒\` : *𝕮𝖍𝖎𝖓𝖆𝕸𝖎𝖙𝖟𝖚𝖐𝖎*
˙.꒷🍒.𖦹˙ \`𝕍𝕖𝕣𝕤𝕚𝕠𝕟\` : ${version}
˙.꒷🍒.𖦹˙ \`𝕄𝕠𝕥𝕠𝕣\`  : *𝖡ᥲіᥣᥱᥡs*

۪֔⏜꯭ᩧᰰ᮫̩̥̩̥︵ּ۪۪۪֘᷼𓇺꥓᮫ּ̥̩̥̩̥̊᷼︵᮫ֵֹ۪۪۪꤮ 「꯭ּ✿⃘꯭֟፝͝ ᮫ּ」 ֵ꤮ֹ֪̊︵᮫̥̩̥̩̥֔᷼𓇹᮫ֹ۪۪𝆬𝆬᷼︵꯭ᩙᰰ᮫̩̥̩̥⏜ֵֹ۪۪۪۪
\n`;

    const categories = {};
    cmds.forEach((cmd) => {
      if (!cmd.command) return;
      const cat = (cmd.category || "sіᥒ ᥴᥲ𝗍ᥱg᥆rі́ᥲ").toLowerCase();
      if (!categories[cat]) categories[cat] = [];
      if (!categories[cat].some((c) => c.command[0] === cmd.command[0])) {
        categories[cat].push(cmd);
      }
    });

    for (const [cat, commands] of Object.entries(categories)) {
      const catName = cat.charAt(0).toUpperCase() + cat.slice(1);
      txt += `\`.  . ︵ ${catName}.  ◌Ⳋ𝅄\`\n`;
      commands.forEach((cmd) => {
        txt += `౨ৎ • #${cmd.command[0]}\n`;
      });
      txt += `\n`;
    }

    txt += `\`⠀.  .  ͜ ⋆. ୨🌷୧˚⋆   ◌Ⳋ𝅄\``;

    await conn.sendMessage(
      m.chat,
      {
        text: txt,
        contextInfo: {
          mentionedJid: [userId],
          externalAdReply: {
            title: namebot,
            body: textbot,
            mediaType: 1,
            mediaUrl: "https://instagram.com/its.chinitaaa_",
            sourceUrl: "https://instagram.com/its.chinitaaa_",
            thumbnailUrl: banner,
            showAdAttribution: false,
            containsAutoReply: true,
            renderLargerThumbnail: false,
          },
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: my.ch,
            serverMessageId: "1",
            newsletterName: my.name1,
          },
        },
      },
      { quoted: m }
    );
  },
};
