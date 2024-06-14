const { createAdminSchema, loginAdminSchema } = require('../middleware/adminMiddleware');
const { createAdminServices, loginAdminServices, getAllUserServices, updateUserIsActiveServices } = require('../services/adminServices');

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

const updateUserIsActive = async (req, res) => {
    try {
        const { id } = req.params;
        const { is_active } = req.body;
        const update = await updateUserIsActiveServices(id, is_active);
        if (update[0] === 1) {
            res.status(200).json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    getAllUser,
    updateUserIsActive
};