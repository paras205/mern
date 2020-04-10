const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE;
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	})
	.then(() => {
		console.log('Database connected...');
	})
	.catch((err) => console.log(err));

const port = process.env.PORT || 8080;

app.listen(port, () => {
	console.log(`App running on port ${port}...`);
});
