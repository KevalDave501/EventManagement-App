const {createAdminSchema, loginAdminSchema } = require('../middleware/adminMiddleware');
const { createAdminServices, loginAdminServices, getAllUserServices } = require('../services/adminServices');

const createAdmin = async (req, res) => {
    try {
        const { error } = createAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { u_name, u_email, u_password } = req.body;
        const event = await createAdminServices(u_name, u_email, u_password);
        res.status(201).json(event);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { error } = loginAdminSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const { u_email, u_password } = req.body;
        const log_in = await loginAdminServices(u_email, u_password);
        res.status(200).json(log_in);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllUser = async (req, res) => {
    try {
        const getUser = await getAllUserServices();
        res.status(200).json(getUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    createAdmin,
    loginAdmin,
    getAllUser
};