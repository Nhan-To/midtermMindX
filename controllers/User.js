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
            message: 'UserProfile created successfully',
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

export {createUser};