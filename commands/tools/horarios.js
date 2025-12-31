// código creado por china
// github.com/ittschinitaaa
module.exports = {
  command: ["horario"],
  description: "Muestra la hora actual en varias zonas horarias",
  category: "tools",
  run: async (client, m, args) => {
    const moment = require('moment-timezone');

    const zones = {
      Peru: 'America/Lima',
      Mexico: 'America/Mexico_City',
      Bolivia: 'America/La_Paz',
      Chile: 'America/Santiago',
      Argentina: 'America/Argentina/Buenos_Aires',
      Colombia: 'America/Bogota',
      Ecuador: 'America/Guayaquil',
      Costa_Rica: 'America/Costa_Rica',
      Cuba: 'America/Havana',
      Guatemala: 'America/Guatemala',
      Honduras: 'America/Tegucigalpa',
      Nicaragua: 'America/Managua',
      Panama: 'America/Panama',
      Uruguay: 'America/Montevideo',
      Venezuela: 'America/Caracas',
      Paraguay: 'America/Asuncion',
      New_York: 'America/New_York',
      Asia: 'Asia/Jakarta',
      Brasil: 'America/Sao_Paulo',
      GNQ: 'Africa/Malabo'
    };

    let msg = '\`「 ZONA-HORARIA ⏰ 」\`\n\n';
    for (let [key, value] of Object.entries(zones)) {
      msg += `⏱️${key.padEnd(11)}: ${moment().tz(value).format('DD/MM HH:mm')}\n`;
    }

    const serverZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    msg += `${String.fromCharCode(8206).repeat(850)}\nZona horaria del servidor actual:\n[ ${serverZone} ] ${moment().tz(serverZone).format('DD/MM/YY HH:mm:ss')}`;

    await client.sendMessage(m.chat, { text: msg }, { quoted: m });
  }
};
