import React from "react";

const MenuList = (
    <ul className="menu">
        <li>
            <a href="http://127.0.0.1:8000/api/users" target="_blank" rel="noreferrer">All Users</a>
        </li>
        <li>
            <a href="#">Projects</a>
        </li>
        <li>
            <a href="#">TODO</a>
        </li>
    </ul>
);


const Menu = () => {
    return (
        MenuList
    )
}

export default Menu;