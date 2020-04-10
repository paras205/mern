import jwt from 'jsonwebtoken';
import User from '../models/userModel';

export default (req, res, next) => {
	const authorizationHeader = req.headers['authorization'];
	let token;
	if (authorization) {
		token = authorizationHeader.split(' ')[1];
	}
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				res.status(401).json({
					error: 'Failed to authenicate'
				});
			} else {
				new User({ id: decoded.id }).fetch().then((user) => {
					if (!user) {
						res.status(404).json({
							error: 'User not found'
						});
					}
					req.currentUser = user;
					next();
				});
			}
		});
	} else {
		res.status(403).json({
			error: 'No toke provided'
		});
	}
};
