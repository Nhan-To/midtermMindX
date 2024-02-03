import {UserProfile} from "../models/UserProfiles.js";

const createUser = async (req, res) => {
    try {
        const {
            userAuthId,
            name,
            dob,
            nationality,
            skill,
            projects,
            works,
            others
        } = req.body;
        
        const newUserProfile = new UserProfile({
            userAuthId,
            name,
            dob,
            nationality,
            skill,
            projects,
            works,
            others
        });

        const savedUserProfile = await newUserProfile.save();

        res.status(201).json({
            message: 'Successful',
            success: true,
            data: savedUserProfile
        });
    } catch (error) {
        res.status(500).json({
        message: 'Internal Server Error',
        success: false,
        error: error.message
        });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await UserProfile.find();
        res.status(200).json({
            message: 'Successful',
            success: true,
            data: allUsers
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

const getUserByName = async (req, res) => {
    try {
        const { name } = req.params;

        const user = await UserProfile.findOne({ name });

        if (!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false
            });
        }

        res.status(200).json({
            message: 'Successful',
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            success: false,
            error: error.message
        });
    }
};

const deleteUser = async(req, res) => {
    try {
        const removedUser = await UserModel.remove({ _id: req.params.userAuthId });
        console.log(removedUser);
        res.json(removedUser);
    } catch (error) {
        res.json({ message: error });
    }
}

const updateUser = async(req, res) => {
    try {
        const {
            name,
            dob,
            nationality,
            skill,
            projects,
            works,
            others
        } = req.body;
        const updatedUser = await UserProfile.updateOne({ _id: req.params.userAuthId }, { $set: {name: name, dob: dob, nationality: nationality, skill: skill, projects: projects, works: works, others: others} });
        res.status(201).json({            
            message: 'Successful',
            success: true,
            data: updatedUser
        });
    } catch (error) {
        res.json({ message: error });
    }
}


export {createUser, getAllUsers, getUserByName, updateUser, deleteUser};