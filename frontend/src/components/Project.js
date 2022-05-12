import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({project, users, deleteProject}) => {
    return (
        <tr>
            <td> <Link to={`projects/${project.id}`}  >{project.name}</Link> </td>
            <td>{project.repository}</td>
            <td>
            {project.users.map((userId) => {
                let user = users.find(user => user.id === userId);
                if (user) {
                    return user.firstName + ' ' + user.lastName + '|'
                }
            })}
            </td>
            <td><button className="delete" onClick={() => deleteProject(project.id)} type='button' >Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, users, deleteProject}) => {
    return (
        <div className="height_div">
        <table className="container table">
            <th>Name</th>
            <th>Repository</th>
            <th>Users</th>
            <th></th>
            {projects.map((project) => <ProjectItem project={project} users={users} deleteProject={deleteProject} />)}
        </table>
        <div className="box"><Link className="create" to='/projects/create'>Create</Link></div>
        </div>
    )
}

export default ProjectList; 