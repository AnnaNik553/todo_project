import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({todo, projects, users, deleteToDo}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>
            {projects.find(project => project.id === todo.project) ? projects.find(project => project.id === todo.project).name : 'unknown project'}
            </td>
            <td>{todo.text}</td>
            <td>{todo.createdAt}</td>
            <td>{todo.updatedAt}</td>
            <td>
            {users.find(user => user.id === todo.author) ? users.find(user => user.id === todo.author).lastName : 'unknown author'}
            </td>
            <td>{todo.isActive.toString()}</td>
            <td><button className="delete" onClick={() => deleteToDo(todo.id)} type='button' >Delete</button></td>
        </tr>
    )
}

const TodoList = ({todo_list, projects, users, deleteToDo}) => {
    return (
        <div className="height_div">
        <table className="container table">
            <th>ID</th>
            <th>Project</th>
            <th>Text</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Author</th> 
            <th>IsActive</th>
            <th></th>
            {todo_list.map((todo) => <TodoItem todo={todo} projects={projects} users={users} deleteToDo={deleteToDo} />)}
        </table>
        <div className="box"><Link className="create" to='/todo/create'>Create</Link></div>
        </div>
    )
}

export default TodoList; 