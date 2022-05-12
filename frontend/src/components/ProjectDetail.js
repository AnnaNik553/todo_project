import React from "react";
import { useParams } from "react-router-dom";

const TodoItem = ({todo, users}) => {
    return (
        <tr>
            <td>{todo.id}</td>
            <td>{todo.text}</td>
            <td>
            {users.find(user => user.id === todo.author) ? users.find(user => user.id === todo.author).lastName : 'unknown author'}
            </td>
            <td>{todo.isActive.toString()}</td>
        </tr>
    )
}

const ProjectDetail = ({projects, todo_list, users}) => {

    let {id} = useParams();
    let filtered_project = projects.filter((project) => project.id === Number(id))[0]
    let filtered_todo = todo_list.filter((todo) => todo.project === Number(id))

    return (
        <div className="height_div">
        <table className="container table">
            <th>Name</th>
            <th>Repository</th>
            <th>Users</th>
            <tr>
            <td>{filtered_project.name}</td>
            <td>{filtered_project.repository}</td>
            <td>
            {filtered_project.users.map((userId) => {
                let user = users.find(user => user.id === userId);
                if (user) {
                    return user.firstName + ' ' + user.lastName + '|'
                }
            })}
            </td>
            </tr>
        </table>
        <br></br>
        <br></br>
        <h3>todo of the "{filtered_project['name']}" project</h3>
        <br></br>
        <table className="container table">
            <th>ID</th>
            <th>Text</th>
            <th>Author</th> 
            <th>IsActive</th>
            {filtered_todo.map((todo) => <TodoItem todo={todo} users={users}/>)}
        </table>
        </div>
    )
}

export default ProjectDetail; 