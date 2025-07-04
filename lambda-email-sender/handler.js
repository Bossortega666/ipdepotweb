// handler.js

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    // Crea un transport usando un servicio SMTP (Gmail, SES, etc.)
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // o smtp.sendgrid.net, smtp.mailgun.org
      port: 465,
      secure: true,
      auth: {
        user: "jortega@ip-depot.com",
        pass: "qaecutlcjgejivrr",
      },
    });

    // Contenido del correo
    let info = await transporter.sendMail({
      from: '"Mi Sitio Web" <jortega@ip-depot.com.mx>',
      to: "tureceptor@gmail.com",
      subject: "Nuevo mensaje de contacto",
      text: `Nombre: ${body.name}\nEmail: ${body.email}\nMensaje: ${body.message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Correo enviado!", info }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al enviar correo.", error: err }),
    };
  }
};
