const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const htmlToText = require("nodemailer-html-to-text").htmlToText;
const { email, password } = require("./config");

const mailTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});
const APP_NAME = "Pizzeria-V";

mailTransport.use("compile", htmlToText());

exports.sendUserEmail = functions.database
  .ref("/orders/{pushId}")
  .onCreate((order) => {
    sendOrderEmail(order.val());
  });

function sendOrderEmail(order) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@pizzeria-v.com`,
    to: order.email,
    subject: `your order from ${APP_NAME}`,
    html: `
    <table style="border: 1px solid #FFFFFF;width: 500px;text-align: center;border-collapse: collapse;> 
    <tr>
        <th>${order.displayName}</th>
        <th>You ordered some food, here's confirmation of that order. </th>
    </tr>
    ${order.order
      .map(
        ({ name, quantity, price }) => `
      <tr>
        <td>
          ${quantity}
        </td>            
        <td>
          ${name}
        </td>  
        <td>
          ${price}
        </td>
      </tr>
    `
      )
      .join("")}
  </table>
`,
  };

  mailTransport.sendMail(mailOptions);
}
