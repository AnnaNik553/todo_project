import React from "react";

const TodoItem = ({todo, projects, users}) => {
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
        </tr>
    )
}

const TodoList = ({todo_list, projects, users}) => {
    return (
        <table>
            <th>ID</th>
            <th>Project</th>
            <th>Text</th>
            <th>CreatedAt</th>
            <th>UpdatedAt</th>
            <th>Author</th> 
            <th>IsActive</th>
            {todo_list.map((todo) => <TodoItem todo={todo} projects={projects} users={users} />)}
        </table>
    )
}

export default TodoList; 