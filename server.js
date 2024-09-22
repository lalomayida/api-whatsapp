require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Configura tus credenciales de la API de WhatsApp

const WHATSAPP_API_URL = `https://graph.facebook.com/v20.0/${process.env.PHONE_NUMBER_ID}/messages`;
const TOKEN = process.env.ACCESS_TOKEN;

// Ruta para enviar un mensaje
app.post("/send-message", async (req, res) => {
  const { to, message } = req.body;

  try {
    const response = await axios.post(
      WHATSAPP_API_URL,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: message },
        type: "template",
        template: { name: "hello_world", language: { code: "en_US" } },
      },

      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);
    res.status(200).json({ success: true, data: response.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.response.data });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
