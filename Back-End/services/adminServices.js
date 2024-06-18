const { assert } = require('joi');
const admin = require('../models/adminModel');
const jwt = require('jsonwebtoken');
const user = require('../models/userModel');
const { where } = require('sequelize');
const event = require('../models/eventModel');

const createAdminServices = async (u_name, u_email, u_password) => {
  try {
    return await admin.create({ u_name, u_email, u_password, r_type: "admin" });
  } catch (error) {
    console.log(error)
  }
};

const loginAdminServices = async (u_email, u_password) => {
  try {
    const user2 = await admin.findOne({ where: { u_email, u_password, r_type: "admin" } });

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

  try {
    return await admin.findAll({ where: { r_type: "user" } });
  } catch (error) {
    console.log(error);
  }
}

const getAllEventServices = async () => {

  try {
    return await event.findAll();
  } catch (error) {
    console.log(error);
  }
}

const updateUserIsActiveServices = async (u_id, is_active) => {
  try {
      const newValue = is_active === '1' ? '1' : '0';
      return await user.update({ is_active: newValue }, { where: { u_id: u_id } });
  } catch (error) {
      console.log(error);
  }
};

const createEventServices = async (e_name, e_vanue, e_startdate, e_enddate, e_capacity) => {
  try {
      const createdEvent = await event.create({ e_name,e_vanue,e_startdate,e_enddate,e_capacity,u_id: 1,});
      return createdEvent;
  } catch (error) {
      console.error('Error in createEventServices:', error);
  }
};

const updateEventServices = async (eventId, eventDataToUpdate) => {
    try {
        const updatedEvent = await event.findByPk(eventId);

        if (!updatedEvent) {
            console.log("Event not found");
        }

        await updatedEvent.update(eventDataToUpdate);

        return updatedEvent.toJSON();
    } catch (error) {
        console.error('Error in updateEventServices:', error);
        throw error;
    }
};



module.exports = {
  createAdminServices,
  loginAdminServices,
  getAllUserServices,
  updateUserIsActiveServices,
  createEventServices,
  getAllEventServices,
  updateEventServices
}