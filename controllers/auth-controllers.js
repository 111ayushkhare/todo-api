// Importing npm packages
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');

// Importing modals
const User = require('../models/user-model');

// Importing configuration files
const accessConfig = require('../config/access-config.json');

const signup = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });

        if (!user) {
            let passwd = await bcryptjs.hash(req.body.password, 10);

            user = new User({
                username: req.body.username,
                phone: req.body.phone,
                email: req.body.email,
                password: passwd.toString()
            });
            await user.save();

            res.status(201).send({
                message: "Account successfully created!",
                id: user._id,
                username: user.username,
                phone: user.phone,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        } else {
            res.status(400).send({ message: "User already exists" });
        }
    } catch (error) {
        res.status(404).send({
            message: "Signup failed",
            error
        });
    }
};

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({ message: "No user found with entered email" });
        }

        const isPasswdMatch = await bcryptjs.compare(req.body.password, user.password);
        if (!isPasswdMatch) {
            return res.status(401).send({ message: "Incorrect password!" });
        }

        const token = jwt.sign(
            {
                _id: user._id.toString(),
                email: user.email
            }, 
            accessConfig.env.JWT_ACCESS, 
            {
                expiresIn: '1d'
            }
        );

        return res.status(200).send({
            message: 'Successfully authenticated',
            auth: true,
            token
        });
    } catch(error) {
        res.status(401).send({
            message: "Some error, login failed",
            error
        });
    }
};

const profile = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.id });

        if (user) {
            res.status(201).send({
                message: "User profile fetched successfully",
                id: user._id,
                username: user.username,
                phone: user.phone,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            });
        } else {
            res.status(400).send({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).send({
            message: "Failed to fetch user profile",
            error
        });
    }
};

const logout = async (req, res) => {};

const logoutAll = async (req, res) => {};

// Exporting all above tasks crud operation methods
module.exports = {
    signup,
    login,
    logout,
    logoutAll,
    profile
};