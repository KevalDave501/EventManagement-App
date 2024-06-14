const { createUserServices, loginUserServices } = require('../services/userServices');
const { createUserSchema, loginUserSchema } = require('../middleware/usersMiddleware');
const { updateUserIsActiveServices } = require('../services/adminServices');

const createUser = async (req, res) => {
    try {
        const { error } = createUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const { u_name, u_email, u_password } = req.body;
        const event = await createUserServices(u_name, u_email, u_password);
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
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    createUser,
    login
};