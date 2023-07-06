const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');
const SuccessfulMessages = require('../constants/successfulMessages');
const ErrorMessages = require('../constants/errorMessages');

router.post('/create', async (req, res) => {
	try {
		const { nameTodo, deadlineTodo, isCompleted } = req.body;
		const newTodo = new Todo({ nameTodo, deadlineTodo, isCompleted });
		await newTodo.save();

		return res.json({
			success: true,
			message: SuccessfulMessages.todo.add,
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: ErrorMessages.internalServer,
		});
	}
});

router.get('/', async (req, res) => {
	try {
		const todos = await Todo.find();
		return res.json({
			success: true,
			message: SuccessfulMessages.todo.getAll,
			data: todos,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: ErrorMessages.internalServer,
		});
	}
});

module.exports = router;
