import React from "react";


class ProjectForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        'name': '',
        'repository': '',
        'users': []}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            this.setState({'users': []})
            return;
        }
        let users = []
        for (let i = 0; i < event.target.selectedOptions.length; i++) {
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState(
            {'users': users}
        );
    }

    handleSubmit(event){
        this.props.createProject(this.state.name, this.state.repository, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <div className="height_div container project_box">
            <form className="project_form" onSubmit={ (event) => this.handleSubmit(event)}>
                <div>
                    <label for='name'>name</label>
                    <input className="project_input" type='text' name='name' placeholder='name' value={this.state.name} 
                        onChange={ (event) => this.handleChange(event)} />
                </div>
                
                <div>
                    <label for='repository'>repository</label>
                    <input className="project_input" type='text' name='repository' placeholder='repository' value={this.state.repository} 
                        onChange={ (event) => this.handleChange(event)} />
                </div>

                <div>
                    <label for='users'>users</label>
                    <select className="project_input" name='users' multiple onChange={ (event) => this.handleUsersChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.lastName}</option>)}
                    </select>
                </div>

                <input className="save" type='submit' value='Save' />
            </form>
            </div>
        )
    }
}


export default ProjectForm; 