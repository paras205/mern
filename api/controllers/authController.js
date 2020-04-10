const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES
	});
};

exports.register = async (req, res) => {
	try {
		const user = await User.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
			passwordConfirm: req.body.passwordConfirm
		});
		const token = signToken(user._id);
		res.status(200).json({
			status: 'success',
			token,
			user
		});
	} catch (err) {
		console.log(err);
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return new Error('Please enter and password');
		}
		const user = await User.findOne({ email });
		if (!user || !await user.comparePassword(password, user.password)) {
			return new Error('Incorrect email or password');
		}
		const token = signToken(user._id);
		res.status(200).json({
			status: 'success',
			token,
			user
		});
	} catch (err) {
		console.log(err);
	}
};
