require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoRouter = require('./routes/todo');

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.vyovyvf.mongodb.net/?retryWrites=true&w=majority`,
		);
		console.log('Connected DB');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/todo', todoRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Running at ${PORT}`));
