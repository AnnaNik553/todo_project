import React from 'react';
import axios from 'axios';
import './App.css';

import UserList from './components/User'
import Menu from './components/Menu'
import Footer from './components/Footer'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': [] 
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
          this.setState(
            {
              'users': response.data
            }
          )
        })
        .catch(error => console.log(error))
    // const users = [
    //   {
    //     "username": "admin_test",
    //     "first_name": "Ivan",
    //     "last_name": "Ivanov",
    //     "email": "Ivanov@ya.ru"
    //   },
    //   {
    //     "username": "user1",
    //   "first_name": "user1",
    //   "last_name": "",
    //   "email": "user1@ya.ru"
    //   },
    //   {
    //   "username": "user2",
    //   "first_name": "user2",
    //   "last_name": "",
    //   "email": "user2@ya.ru"
    //   },
    //   {
    //     "username": "user3",
    //   "first_name": "user3",
    //   "last_name": "",
    //   "email": "user3@ya.ru"
    //   }
    // ]
  }

  render() {
    return (
      <div>
        <Menu/>
        <UserList users={this.state.users}/>
        <Footer/>
      </div>

    );
  }
}

export default App;
