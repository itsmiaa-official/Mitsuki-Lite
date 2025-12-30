// comando adaptado a Starlights por Chinita 💫
// GitHub: github.com/ittschinitaaa

const axios = require("axios");

module.exports = {
  command: ["tiktok", "tt", "tiktoks", "tts"],
  description: "Descarga videos o galerías de TikTok, o busca contenido.",
  category: "downloader",

  run: async (client, m, args, { prefix }) => {
    const text = args.join(" ");
    if (!text) {
      return client.sendMessage(
        m.chat,
        { text: "❀ Por favor, ingresa un término de búsqueda o el enlace de TikTok." },
        { quoted: m }
      );
    }

    const isUrl =
      /(?:https:?\/{2})?(?:www\.|vm\.|vt\.|t\.)?tiktok\.com\/([^\s&]+)/gi.test(
        text
      );

    try {
      await client.sendMessage(m.chat, {
        react: { text: "⏳", key: m.key },
      });

      if (isUrl) {
        const res = await axios.get(
          `https://www.tikwm.com/api/?url=${encodeURIComponent(text)}&hd=1`
        );

        const data = res.data?.data;
        if (!data?.play && !data?.images) {
          return client.sendMessage(
            m.chat,
            { text: "ꕥ Enlace inválido o sin contenido descargable." },
            { quoted: m }
          );
        }

        const {
          title,
          duration,
          author,
          created_at,
          type,
          images,
          music,
          play,
        } = data;

        const caption = createCaption(
          title,
          author,
          duration,
          created_at
        );

        // 📸 Galería
        if (type === "image" && Array.isArray(images)) {
          for (const url of images) {
            await client.sendMessage(
              m.chat,
              { image: { url }, caption },
              { quoted: m }
            );
          }

          if (music) {
            await client.sendMessage(
              m.chat,
              {
                audio: { url: music },
                mimetype: "audio/mp4",
                fileName: "tiktok_audio.mp4",
              },
              { quoted: m }
            );
          }
        } else {
          // 🎥 Video
          await client.sendMessage(
            m.chat,
            { video: { url: play }, caption },
            { quoted: m }
          );
        }
      } else {
        // 🔎 Búsqueda
        const res = await axios({
          method: "POST",
          url: "https://tikwm.com/api/feed/search",
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded; charset=UTF-8",
            Cookie: "current_language=en",
            "User-Agent":
              "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36 Chrome/116.0.0.0 Mobile Safari/537.36",
          },
          data: { keywords: text, count: 20, cursor: 0, HD: 1 },
        });

        const results =
          res.data?.data?.videos?.filter((v) => v.play) || [];

        if (results.length < 2) {
          return client.sendMessage(
            m.chat,
            { text: "ꕥ Se requieren al menos 2 resultados válidos." },
            { quoted: m }
          );
        }

        for (const v of results.slice(0, 10)) {
          const caption = createSearchCaption(v);
          await client.sendMessage(
            m.chat,
            { video: { url: v.play }, caption },
            { quoted: m }
          );
        }
      }

      // ✔️ Éxito
      await client.sendMessage(m.chat, {
        react: { text: "✅", key: m.key },
      });
    } catch (e) {
      // ✖️ Error
      await client.sendMessage(m.chat, {
        react: { text: "❌", key: m.key },
      });

      await client.sendMessage(
        m.chat,
        {
          text: `⚠︎ Se ha producido un problema.\n> Usa *${prefix}report* para informarlo.\n\n${e.message}`,
        },
        { quoted: m }
      );
    }
  },
};

// 📌 Funciones auxiliares (SIN await)
function createCaption(title, author, duration, created_at = "") {
  return `❀ *Título ›* \`${title || "No disponible"}\`
> ☕︎ Autor › *${author?.nickname || author?.unique_id || "No disponible"}*
> ✰ Duración › *${duration || "No disponible"}s*${
    created_at ? `\n> ☁︎ Creado » ${created_at}` : ""
  }
> 𝅘𝅥𝅮 Música » [${author?.nickname || author?.unique_id || "No disponible"}] original sound - ${
    author?.unique_id || "unknown"
  }`;
}

function createSearchCaption(data) {
  return `❀ *Título ›* ${data.title || "No disponible"}

> ☕︎ Autor › ${data.author?.nickname || "Desconocido"} ${
    data.author?.unique_id ? `@${data.author.unique_id}` : ""
  }
> ✧︎ Duración › ${data.duration || "No disponible"}
> 𝅘𝅥𝅮 Música › ${
    data.music?.title ||
    `[${data.author?.nickname || "No disponible"}] original sound - ${
      data.author?.unique_id || "unknown"
    }`
  }`;
}
