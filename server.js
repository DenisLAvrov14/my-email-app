const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config(); // Загружаем переменные среды из файла .env

app.post("/", (req, res) => {
  const { phone, city, name } = req.body;

  // Создаем объект transporter, используя переменные среды
  const transporter = nodemailer.createTransport({
    service: "mail.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    logger: true,
    debug: true,
    secureConection: false,
    auth: {
      user: process.env.MAILRU_USER, // Взять адрес из переменной среды
      pass: process.env.MAILRU_PASS, // Взять пароль из переменной среды
    },
    tls: {
      rejectUnAuthorized: true,
    },
  });

  const mailOptions = {
    from: "mercin.med@mail.ru",
    to: "Denislavrov14@gmail.com",
    subject: "Заявка",
    text: `Имя: ${name}\nEmail: ${phone}\nСообщение: ${city}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Произошла ошибка при отправке письма.");
    } else {
      // После успешной отправки формы, выполните редирект на домашнюю страницу
      res.redirect("localhost:3000");
    }
  });
});

app.listen(465, () => {
  console.log("Сервер запущен на порту 465.");
});
