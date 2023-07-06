const express = require('express');
const mongoose = require('mongoose');
const todoRouter = require('./routes/todo');

const connectDB = async () => {
	try {
		await mongoose.connect(`mongodb+srv://nova:1234@cluster0.vyovyvf.mongodb.net/?retryWrites=true&w=majority`);
		console.log('Connected DB');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};
connectDB();

const app = express();
app.use('/api/todo', todoRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`Running at ${PORT}`));
