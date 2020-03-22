import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { v4 as uuid } from "uuid";

export default function TodoApp() {
	let todos = JSON.parse(window.localStorage.getItem("todos") || "[]");

	const [allTodos, setAllTodos] = useState(todos);

	useEffect(() => {
		window.localStorage.setItem("todos", JSON.stringify(allTodos));
	}, [allTodos]);
	const addTodo = task => {
		const todo = { id: uuid(), task: task, completed: false };
		setAllTodos([...allTodos, todo]);
	};

	const removeTodo = id => {
		const newTodos = allTodos.filter(todo => todo.id !== id);
		setAllTodos(newTodos);
	};

	const toggleTodo = id => {
		const updatedTodos = allTodos.map(todo =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		);
		setAllTodos(updatedTodos);
	};

	const editTodo = (id, task) => {
		const newTodo = allTodos.map(todo => {
			if (todo.id === id) {
				return { ...todo, task };
			}
			return todo;
		});
		setAllTodos(newTodo);
	};

	return (
		<Grid container justify="center">
			<Grid item xs={11} md={8} lg={6}>
				<Paper>
					<TodoForm addTodo={addTodo} />
					<TodoList
						todos={allTodos}
						removeTodo={removeTodo}
						toggleTodo={toggleTodo}
						editTodo={editTodo}
					/>
				</Paper>
			</Grid>
		</Grid>
	);
}
