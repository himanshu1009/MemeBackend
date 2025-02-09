const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const pg = require('random-profile-generator')
const AvatarGenerator = require('random-avatar-generator')
const generator = new AvatarGenerator.AvatarGenerator();
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: pg.name()
    },
    avatar: {
        type: String,
        default: generator.generateRandomAvatar()
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);