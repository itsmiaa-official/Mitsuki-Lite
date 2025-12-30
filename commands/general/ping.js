const moment = require("moment");

module.exports = {
  command: ["ping"],
  description: "Chequea la conexión y muestra info del bot",
  category: "general",
  run: async (client, m, args, { prefix }) => {
   await m.react("⏰");
    const start = Date.now();
    const tempMsg = await client.sendMessage(
      m.key.remoteJid,
      { text: "⏳ Cargando ping..." },
      { quoted: m },
    );
    const latency = Date.now() - start;

    const up = process.uptime(),
      h = Math.floor(up / 3600),
      min = Math.floor((up % 3600) / 60),
      s = Math.floor(up % 60);
    const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

    const userTag = m.pushName || "Invitado";
    const sender = m.sender.replace(/@.+/, "");

    const msg = `Hola, ${userTag}

🌟 \`Ping Status\`

🕑 \`Ping:\` ${latency} ms
⏰ \`Uptime:\` [ ${h}h ${min}m ${s}s ]
💻 \`RAM usada:\` ${ram} MB
👤 \`Usuario ID:\` @${sender}`.trim();
    
    await m.react("✅");
    await client.sendMessage(
      m.chat,
      { text: msg, mentions: [m.sender] },
      { quoted: tempMsg },
    );
  },
};
