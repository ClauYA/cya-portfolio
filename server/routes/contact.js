const express     = require('express');
const router      = express.Router();
const transporter = require('../utils/mailer');

router.post('/', async (req, res) => {
  const { firstName, lastName, email, company, budget, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ success: false, error: 'Email y mensaje son requeridos' });
  }

  try {
    await transporter.sendMail({
      from:    `"CYA Portfolio" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      subject: `Nueva consulta de ${firstName} ${lastName}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#366464;">Nuevo mensaje desde tu portfolio</h2>
          <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Empresa:</strong> ${company || 'No especificado'}</p>
          <p><strong>Presupuesto:</strong> ${budget || 'No especificado'}</p>
          <div style="margin-top:20px;padding:16px;background:#f5f5f5;border-radius:8px;">
            <strong>Mensaje:</strong>
            <p>${message}</p>
          </div>
        </div>
      `,
    });

    await transporter.sendMail({
      from:    `"Claudia Bittner" <${process.env.EMAIL_USER}>`,
      to:      email,
      subject: 'Got your message — Claudia Bittner',
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#366464;">Hi ${firstName}!</h2>
          <p>Thanks for reaching out. I received your message and will get back to you within 24 hours.</p>
          <br/>
          <p style="color:#666;">— Claudia Bittner</p>
          <p style="color:#666;">UX/UI Designer & Frontend Developer</p>
          <a href="https://yaczoe.com" style="color:#366464;">yaczoe.com</a>
        </div>
      `,
    });

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Error enviando email:', error);
    res.status(500).json({ success: false, error: 'No se pudo enviar el email' });
  }
});

module.exports = router;