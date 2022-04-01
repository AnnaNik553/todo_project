import React from "react";
import { Link } from "react-router-dom";

const ProjectItem = ({project, users}) => {
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
        </tr>
    )
}

const ProjectList = ({projects, users}) => {
    return (
        <table>
            <th>Name</th>
            <th>Repository</th>
            <th>Users</th>
            {projects.map((project) => <ProjectItem project={project} users={users}/>)}
        </table>
    )
}

export default ProjectList; 