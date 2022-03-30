import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import './App.css';

import UserList from './components/User'
import TodoList from './components/Todo'
import ProjectList from './components/Project'
import ProjectDetail from './components/ProjectDetail'
import NotFound404 from './components/NotFound404'
import Footer from './components/Footer'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'todo_list': [],
      'projects': [],
      'users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/todo/')
        .then(response => {
          this.setState(
            {
              'todo_list': response.data['results']
            }
          )
        })
        .catch(error => console.log(error));
        
    axios.get('http://127.0.0.1:8000/api/projects/')
        .then(response => {
          this.setState(
            {
              'projects': response.data['results']
            }
          )
        })
        .catch(error => console.log(error));

    axios.get('http://127.0.0.1:8000/api/users/')
        .then(response => {
          this.setState(
            {
              'users': response.data['results']
            }
          )
        })
        .catch(error => console.log(error));
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
            </ul>
          </nav>

          <Switch>
            <Route exact path='/' component={() => <TodoList todo_list={this.state.todo_list} projects={this.state.projects} users={this.state.users}/>} />
            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} users={this.state.users}/>} />
            <Route exact path='/users' component={() => <UserList users={this.state.users}/>} />

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
