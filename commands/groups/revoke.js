// código creado por China
// github: github.com/ittschinitaaa

module.exports = {
  command: ['revoke', 'restablecer'],
  description: 'Restablece el enlace de invitación del grupo',
  category: 'groups',
  isGroup: true,
  isAdmin: true,
  botAdmin: true,
  use: '',
  run: async (client, m) => {
    try {
      const chatId = m.chat;

      await client.groupRevokeInvite(chatId);

      const inviteCode = await client.groupInviteCode(chatId);
      const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;

      await client.sendMessage(m.sender, { text: `> ✰ Enlace restablecido:\n${inviteLink}` }, { quoted: m });
    } catch (err) {
      console.error(err);
      await client.sendMessage(m.chat, { text: '> ✰ No se pudo restablecer el enlace. Asegúrate de que soy admin.' }, { quoted: m });
    }
  }
};
