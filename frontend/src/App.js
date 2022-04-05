import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import UserList from './components/User'
import TodoList from './components/Todo'
import ProjectList from './components/Project'
import ProjectDetail from './components/ProjectDetail'
import NotFound404 from './components/NotFound404'
import Footer from './components/Footer'
import LoginForm from './components/Auth'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'todo_list': [],
      'projects': [],
      'users': [],
      'token': ''
    }
  }

  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, () => this.load_data())
  }

  is_auth() {
    return !!this.state.token
  }

  logout() {
    this.set_token('')
  }

  get_token_from_cookies() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
      this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'));
  }

  get_headers() {
    let headers = {'Content-Type': 'application/json'}
    if (this.is_auth()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  load_data(){
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/todo/', {headers})
      .then(response => {
        this.setState(
          {
            'todo_list': response.data['results']
          }
        )
      })
      .catch(error => {
        console.log(error)
        this.setState({'todo_list': []})
      });
    
    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
      .then(response => {
        this.setState(
          {
            'projects': response.data['results']
          }
        )
      })
      .catch(error => {
        console.log(error)
        this.setState({'projects': []})
      });

    axios.get('http://127.0.0.1:8000/api/users/', {headers})
      .then(response => {
        this.setState(
          {
            'users': response.data['results']
          }
        )
      })
      .catch(error => {
        console.log(error)
        this.setState({'users': []})
      });
  }

  componentDidMount() {
    this.get_token_from_cookies()
  }

  render() {
    return (
      <div>
        <BrowserRouter>

          <nav>
            <ul>
              <li><Link to='/'>ToDo</Link></li>
              <li><Link to='/projects'>Projects</Link></li>
              <li><Link to='/users'>All Users</Link></li>
              <li> 
              {this.is_auth() ? <button onClick={() => this.logout() }>Logout</button> : 
              <Link to='/login'>Login</Link>}
              </li>
            </ul>
          </nav>
          
          <Switch>
            <Route exact path='/' component={() => <TodoList todo_list={this.state.todo_list} projects={this.state.projects} users={this.state.users}/>} />
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} users={this.state.users}/>} />
            <Route exact path='/users' component={() => <UserList users={this.state.users}/>} />
            <Route exact path='/login' component={() => <LoginForm 
            get_token={(username, password) => this.get_token(username, password) } />} />

            <Route path='/projects/:id'>
                <ProjectDetail  projects={this.state.projects} todo_list={this.state.todo_list} users={this.state.users}/>
            </Route>
            
            <Route component={NotFound404} />
          </Switch>
          
        </BrowserRouter>

        <Footer />

      </div>

    );
  }
}

export default App;
