import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'project': this.props.projects[0].id,
        'text': '',
        'author': this.props.users[0].id,
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
            <div className="height_div project_box">
            <form onSubmit={ (event) => this.handleSubmit(event)}>
                <div>
                    <label for='project'>project</label>
                    <select className="project_input" name='project' onChange={ (event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>
                </div>
                
                <div>
                    <label for='text'>text</label>
                    <textarea className="project_input" name='text' rows='10' cols='45' placeholder='text todo' value={this.state.text} 
                        onChange={ (event) => this.handleChange(event)} />
                </div>

                <div>
                    <label for='author'>author</label>
                    <select className="project_input" name='author' onChange={ (event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.lastName}</option>)}
                    </select>
                </div>

                <div>
                    <label for='is_active'>active todo</label>
                    <input className="project_input" type='text' name='is_active' placeholder='true' value={this.state.is_active} 
                        onChange={ (event) => this.handleChange(event)} />
                </div>

                <input className="save" type='submit' value='Save' />
            </form>
            </div>
        )
    }
}


export default TodoForm; 