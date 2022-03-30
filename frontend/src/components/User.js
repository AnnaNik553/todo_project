import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstName}
            </td>
            <td>
                {user.lastName}
            </td>
            <td>
                {user.email}
            </td>

        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Username
            </th>
            <th>
                First_name
            </th>
            <th>
                Last_name
            </th>
            <th>
                Email
            </th>
            {users.map((user) => <UserItem user={user} />)}
        </table>
    )
}

export default UserList;