const { assert } = require('joi');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createUserServices = async (u_name, u_email, u_password) => {
  try {
    return await user.create({ u_name, u_email, u_password: bcrypt.hashSync(u_password, 10), r_type: "user", is_active: "0" });
  } catch (error) {
    console.log(error)
  }
};

const loginUserServices = async (u_email, u_password) => {
  try {
    const user1 = await user.findOne({ where: { u_email, is_active: '1' } });

    if (!user1 || !bcrypt.compareSync(u_password, user1.u_password)) {
      throw new Error('Authentication failed. User not found or credentials incorrect.');
    }

    const token = jwt.sign({ id: user1.u_id, email: user1.u_email }, 'okayokay123', { expiresIn: '10h' });

    return { user: user1, token };
  } catch (error) {
    console.log(error);
    throw new Error('Authentication failed. User not found or credentials incorrect.');
  }
};

const forgotPasswordServices = async (u_email) => {
  try {
    const user1 = await user.findOne({ where: { u_email } });

    if (!user1) {
      throw new Error('User not found.');
    }

    const token = jwt.sign({ id: user1.u_id, email: user1.u_email }, 'okayokay123', { expiresIn: '1h' });

    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Error generating reset token.');
  }
};

const resetPasswordServices = async (token, newPassword) => {
  try {
    const decoded = jwt.verify(token, 'okayokay123');
    const user1 = await user.findOne({ where: { u_id: decoded.id, u_email: decoded.email } });

    if (!user1) {
      throw new Error('Invalid token.');
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await user.update({ u_password: hashedPassword }, { where: { u_id: user1.u_id } });

  } catch (error) {
    console.log(error);
    throw new Error('Error resetting password.');
  }
};

module.exports = {
  createUserServices,
  loginUserServices,
  forgotPasswordServices,
  resetPasswordServices
};
