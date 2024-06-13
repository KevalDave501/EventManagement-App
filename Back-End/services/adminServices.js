const { assert } = require('joi');
const admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const createAdminServices = async ( u_name, u_email, u_password ) => {
  try {
    return await admin.create({ u_name, u_email, u_password, r_type: "admin" });
  } catch (error) {
    console.log(error)
  }
};

const loginAdminServices = async (u_email, u_password) => {
  try {
    const user2 = await admin.findOne({ where: { u_email, u_password , r_type: "admin"} });

    if (!user2) {
      console.log('Authentication failed. User not found.');
    }

    const token = jwt.sign({ id: user2.u_id, email: user2.u_email }, 'okayokay123', { expiresIn: '10h' });

    return { user2, token };
  } catch (error) {
    console.log(error);
  }
};


const getAllUserServices = async () => {

  try{
    return await admin.findAll({where: { r_type: "user" } });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
    createAdminServices,
    loginAdminServices,
    getAllUserServices
}