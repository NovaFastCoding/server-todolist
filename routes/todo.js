const express = require('express');
const router = express.Router();

const Todo = require('../models/todo');

router.post('/create', async (req, res) => {
	try {
		const { nameTodo, deadlineTodo, isCompleted } = req.body;
		const newTodo = new Todo({ nameTodo, deadlineTodo, isCompleted });
		await newTodo.save();

		return res.json({
			success: true,
			message: 'Todo was created successfully.',
		});
	} catch (error) {
		console.log(error.message);
		res.status(500).json({
			success: false,
			message: 'Internal server error.',
		});
	}
});

module.exports = router;
