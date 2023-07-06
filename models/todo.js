const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	nameTodo: {
		type: String,
		require: true,
	},
	dealineTodo: {
		type: String,
		require: true,
	},
	isCompleted: {
		type: Boolean,
		require: true,
	},
});

module.exports = mongoose.model('todo', TodoSchema);
