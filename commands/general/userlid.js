module.exports = {
  command: ["lid", "mylid"],
  description: "Obtén tu LID o el de otra persona",
  category: "general",
  use: "(ejemplo: #lid o #lid 5490000000)",
  run: async (client, m, args) => {
    try {
      let jid
      if (args[0]) {
        // Si ponen un número, se lo formatea como JID de WhatsApp
        let number = args[0].replace(/[^0-9]/g, "")
        jid = number + "@s.whatsapp.net"
      } else {
        // Si no ponen nada, se toma al remitente
        jid = m.sender
      }

      let user = await client.onWhatsApp(jid)
      let lid = user?.[0]?.lid || "No encontrado"

      let info = `
 \`🌷 Información de WhatsApp 🌷\`
- JID: ${jid}
- LID: ${lid}
      `.trim()

      m.reply(info)
    } catch (e) {
      console.error(e)
      m.reply("❌ Ocurrió un error al obtener el LID-JID.")
    }
  },
}
