const { assert } = require('joi');
const user = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createUserServices = async ( u_name, u_email, u_password ) => {
  try {
    return await user.create({ u_name, u_email, u_password, r_type: "user" });
  } catch (error) {
    console.log(error)
  }
};

const loginUserServices = async (u_email, u_password) => {
  try {
    const user1 = await user.findOne({ where: { u_email, u_password } });

    if (!user) {
      console.log('Authentication failed. User not found.');
    }

    const token = jwt.sign({ id: user1.u_id, email: user1.u_email }, 'okayokay123', { expiresIn: '10h' });

    return { user, token };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
    createUserServices,
    loginUserServices
}