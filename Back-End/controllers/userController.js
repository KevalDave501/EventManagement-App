const { createUserServices, loginUserServices, forgotPasswordServices, resetPasswordServices } = require('../services/userServices');
const { createUserSchema, loginUserSchema, forgotPasswordSchema } = require('../middleware/usersMiddleware');
const { sendSignupMail, sendPasswordResetEmail } = require('../services/emailService');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { u_name, u_email, u_password } = req.body;
        const event = await createUserServices(u_name, u_email, u_password);

        await sendSignupMail(u_name, u_email);

        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { error } = loginUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { u_email, u_password } = req.body;
        const log_in = await loginUserServices(u_email, u_password);
        res.status(200).json(log_in);
    } catch (error) {
        console.log(error.message);
        res.status(401).json({ message: error.message });
    }
};

const forgotPassword = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { u_email } = req.body;

    // Example logic to send password reset email
    const token = await forgotPasswordServices(u_email);
    await sendPasswordResetEmail(u_email, token);

    res.status(200).json({ message: 'Password reset email sent successfully' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Failed to send password reset link. Please try again.' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify and decode the token (ensure to use the same secret as used during token generation)
    const decoded = jwt.verify(token, 'okayokay123');

    // Find the user in the database
    const user1 = await user.findOne({ where: { u_id: decoded.id, u_email: decoded.email } });

    if (!user1) {
      throw new Error('Invalid token.');
    }

    // Update the user's password
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await user.update({ u_password: hashedPassword }, { where: { u_id: user1.u_id } });

    // Respond with success message
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    createUser,
    login,
    forgotPassword,
    resetPassword
};
