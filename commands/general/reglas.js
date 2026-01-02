module.exports = {
  command: ["reglas", "rules", "normas"],
  description: "Muestra las reglas de uso del bot",
  category: "general",

  run: async (client, m) => {
    await m.react("📜");

    const text = `
📜 \`𝗥𝗘𝗚𝗟𝗔𝗦 𝗗𝗘 𝗟𝗔 𝗕𝗢𝗧\`

🤖 *${namebot}* 

✅ \`𝗣𝗘𝗥𝗠𝗜𝗧𝗜𝗗𝗢\`
• Usar comandos correctamente
• Respetar a otros usuarios
• Usar el bot con fines normales

❌ \`𝗡𝗢 𝗣𝗘𝗥𝗠𝗜𝗧𝗜𝗗𝗢\`
• Spam de comandos
• Abusar de errores del bot
• Usarlo para dañar grupos
• Insultos o mal uso

⚠️ \`𝗔𝗗𝗩𝗘𝗥𝗧𝗘𝗡𝗖𝗜𝗔\`
El mal uso puede causar:
• Bloqueo
• Ban permanente
• Restricción de comandos

> ${textbot}
`;

    await client.sendMessage(
      m.key.remoteJid,
      {
        text,
        contextInfo: {
          externalAdReply: {
            title: `𝗥𝗘𝗚𝗟𝗔𝗦 𝗗𝗘 𝗟𝗔 𝗕𝗢𝗧 🕊`,
            body: textbot,
            mediaType: 1,
            previewType: 0,
            renderLargerThumbnail: false,
            thumbnailUrl: icono, // cambiable
            sourceUrl: "https://instagram.com/its.chinitaaa_"
          }
        }
      },
      { quoted: m }
    );
  }
};
