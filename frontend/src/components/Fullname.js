import React from "react";

const Fullusername = ({username, users}) => {
    console.log(username)
    console.log(users)

    let user = users.filter((elem) => elem['username'] === username)[0]
    console.log(user['firstName'])
    return (
        <h2>{user['firstName']} {user['lastName']}</h2>
    )
}

export default Fullusername; 