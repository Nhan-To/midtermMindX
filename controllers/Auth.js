import { UserAuth} from "../models/UserAuth.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils.js";

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserAuth.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const token = generateToken(user._id);

        return res.status(200).json({ message: 'Login successful.', token });
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const register = async(req, res) => {
    try {
        const user = await UserAuth.findOne({
            username: req.body.username,
        });
        if (user) throw { status: 400, message: "User already exists" };

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);


        const newUser = new UserAuth({
            username: req.body.username,
            password: hashedPassword,
            role: req.body.role
        });

        await newUser.save();

        const token = generateToken(newUser._id);

        return res.status(200).send({
            message: "Registration successful",
            success: true,
            data: { user: newUser, token },
        });
    } catch (err) {
        return res.status(500).send({
            message: err,
            success: false,
        });
    }
}

export {register, login};