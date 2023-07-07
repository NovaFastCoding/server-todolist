const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

router.delete('/delete/:id', async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				success: false,
				message: ErrorMessages.todo.invalidId,
			});
		}

		const deletedTodo = await Todo.findByIdAndDelete(id);

		if (!deletedTodo) {
			return res.status(404).json({
				success: false,
				message: ErrorMessages.todo.notFound,
			});
		}

		return res.json({
			success: true,
			message: SuccessfulMessages.todo.delete,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: ErrorMessages.internalServer,
		});
	}
});

module.exports = router;
