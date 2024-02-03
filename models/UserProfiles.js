import mongoose  from "mongoose";

const userProfileSchema = mongoose.Schema({
    userAuthId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserAuth'},
    name: { type: String},
    dob: { type: Date},
    nationality: { type: String },
    skill: { type: String},
    projects: [
        {
            name: { type: String},
            content: { type: String},
            role: { type: String},
            timeStarted: { type: Date, default: Date.now},
            timeEnded: { type: Date, default: null},
        }
    ],
    works: [{
        companyName: { type: String},
        role: { type: String},
    }],
    others: [{
        goals: {type: String},
        hobbies: { type: String}
    }]
});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

export {UserProfile};
