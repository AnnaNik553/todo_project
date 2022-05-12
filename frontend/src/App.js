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
import TodoForm from './components/TodoForm';
import ProjectForm from './components/ProjectForm';
// import Fullusername from './components/Fullname';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'todo_list': [],
      'projects': [],
      'users': [],
      'token': '',
      'username': ''
    }
  }

  deleteToDo(id){
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers}).then(response => {
        this.load_data()
      }).catch(error => console.log(error));
  }

  createToDo(project, text, author, is_active){
    const headers = this.get_headers()
    const data = {project: project, text: text, author: author, is_active: is_active}
    axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers, headers}).then(response => {
        this.load_data()
      }).catch(error => console.log(error));
  }

  deleteProject(id){
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers}).then(response => {
        this.load_data()
      }).catch(error => console.log(error));
  }

  createProject(name, repository, users){
    const headers = this.get_headers()
    const data = {name: name, repository: repository, users: users}
    axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers, headers}).then(response => {
        this.load_data()
      }).catch(error => console.log(error));
  }

  set_token(token, username) {
    const cookies = new Cookies()
    cookies.set('token', token)
    cookies.set('username', username)
    this.setState({'token': token, 'username': username}, () => this.load_data())
  }

  is_auth() {
    return !!this.state.token
  }

  logout() {
    this.set_token('', '')
  }

  get_token_from_cookies() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    const username = cookies.get('username')
    this.setState({'token': token, 'username': username}, () => this.load_data())
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
      this.set_token(response.data['token'], username)
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
      <div className="container">
        <BrowserRouter>

          <nav>
            <ul className="menu">
              <li className="menu_list"><Link className="menu_link" to='/'>ToDo</Link></li>
              <li className="menu_list"><Link className="menu_link" to='/projects'>Projects</Link></li>
              <li className="menu_list"><Link className="menu_link" to='/users'>All Users</Link></li>
              <li> 
              {this.is_auth() ? <button className="neonbutton" onClick={() => this.logout() }>Logout</button> : 
              <button className="neonbutton"><Link className="menu_link" to='/login'>Login</Link></button>}
              </li>
            </ul>
          </nav>
          <h2 className='username'>{this.state.username}</h2>
          {/* <Fullusername username={this.state.username} users={this.state.users} /> */}
          <Switch>
            <Route exact path='/todo/create' component={() => <TodoForm users={this.state.users} projects={this.state.projects} createToDo={ (project, text, author, is_active) => this.createToDo(project, text, author, is_active)} />} />
            <Route exact path='/' component={() => <TodoList todo_list={this.state.todo_list} projects={this.state.projects} users={this.state.users} deleteToDo={(id) => this.deleteToDo(id)} />} />
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} users={this.state.users} deleteProject={(id) => this.deleteProject(id)} />} />
            <Route exact path='/projects/create' component={() => <ProjectForm users={this.state.users} createProject={(name, repository, users) => this.createProject(name, repository, users)} />} />
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
