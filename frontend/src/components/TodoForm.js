import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'project': '',
        'text': '',
        'author': '',
        'is_active': true}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event){
        this.props.createToDo(this.state.project, this.state.text, this.state.author, this.state.is_active)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={ (event) => this.handleSubmit(event)}>
                <div>
                    <label for='project'>project</label>
                    <select name='project' onChange={ (event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                
                <div>
                    <label for='text'>text</label>
                    <textarea name='text' rows='10' cols='45' placeholder='text todo' value={this.state.text} 
                        onChange={ (event) => this.handleChange(event)} />
                </div>

                <div>
                    <label for='author'>author</label>
                    <select name='author' onChange={ (event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.lastName}</option>)}
                    </select>
                </div>

                <div>
                    <label for='is_active'>active todo</label>
                    <input type='text' name='is_active' placeholder='true' value={this.state.is_active} 
                        onChange={ (event) => this.handleChange(event)} />
                </div>

                <input type='submit' value='Save' />
            </form>
        )
    }
}


export default TodoForm; 