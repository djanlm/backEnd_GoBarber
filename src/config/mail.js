export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

/* export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '09d647f82ae67e',
    pass: 'f46c1ce78a0bc1',
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
}; */

/**
 * Exemplos de serviços de e-mail:
 * Amazon SES; Mailgun; Sparkpost; Mandril (Mailchimp)
 */
