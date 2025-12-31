module.exports = {
  command: ["autoadmin"],
  description: "El creador se hace admin automáticamente",
  category: "owner",
  isGroup: true,
  botAdmin: true,
  isOwner: true, // Esto hace que el main valide usando global.isOwner

  run: async (client, m) => {
    // Usa global.isOwner para que funcione con todos los owners
    if (!global.isOwner(m.sender)) {
      return m.reply("❌ Este comando solo puede usarlo mi creadora Mía 😼");
    }

    try {
      // Promueve al sender (dueño que ejecuta el comando)
      await client.groupParticipantsUpdate(m.chat, [m.sender], "promote");
      m.reply("👑 Ahora la creadora tiene poderes de *admin*.");
    } catch (e) {
      console.error(e);
      m.reply("❌ No se pudo dar admin automáticamente.");
    }
  }
};
