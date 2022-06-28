import sgMail from "@sendgrid/mail";

class Mail {
  constructor(to, subject, text) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    this.message = {
      to: to,
      from: process.env.SENDGRID_FROM,
      subject: subject,
      text: text
    }
  }

  async sendMail() {
    await sgMail.send(this.message);
  }
}

export default Mail ;