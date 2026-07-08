const passwordResetTemplate = (resetLink) => ({
  subject: "Reset your ElectraCore password",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Reset your password</h2>
      <p>You requested a password reset for your ElectraCore account.</p>
      <p><a href="${resetLink}" style="display: inline-block; padding: 10px 16px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Reset Password</a></p>
      <p>If you did not request this, you can ignore this email.</p>
    </div>
  `,
  text: `Reset your password: ${resetLink}`
});

const alertTemplate = (title, message) => ({
  subject: `ElectraCore Alert: ${title}`,
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${title}</h2>
      <p>${message}</p>
      <p>This is an automated alert from ElectraCore.</p>
    </div>
  `,
  text: `${title}\n\n${message}`
});

module.exports = {
  passwordResetTemplate,
  alertTemplate
};
