import React from "react";


class LoginForm extends React.Component {
    constructor(props) {
      super(props)
      this.state = {'login': '', 'password': ''}
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]: event.target.value}
        );
    }

    handleSubmit(event){
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    render() {
        return (
            <div className="height_div">
            <form className="login_form" onSubmit={ (event) => this.handleSubmit(event)}>
                <input className="login" type='text' name='login' placeholder='login' value={this.state.login} 
                onChange={ (event) => this.handleChange(event)} />
                <input className="login" type='password' name='password' placeholder='password' value={this.state.password} 
                onChange={ (event) => this.handleChange(event)} />
                <input className="login submit" type='submit' value='Login' />
            </form>
            </div>
        )
    }
}


export default LoginForm; 