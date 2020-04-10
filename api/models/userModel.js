const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		unique: true,
		trim: true
	},
	role: {
		type: String,
		enum: [ 'user', 'admin', 'superadmin' ],
		default: 'user'
	},
	password: {
		type: String
	},
	passwordConfirm: {
		type: String
	},
	active: {
		type: Boolean,
		default: true
	}
});

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async function(candidatePassword, userPassword) {
	return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
