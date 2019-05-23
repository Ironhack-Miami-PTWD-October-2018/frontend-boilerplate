import React, { Component } from "react";
import axios from "axios";


class Login extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          email: "",
          originalPassword: "",
          message: null,
        };
    }

    genericSync(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
    
        axios.post(
            "http://localhost:3001/api/login",
            this.state,
            { withCredentials: true }, // FORCE axios to send cookies across domains
        )
        .then(response => {
            console.log("Login Page", response.data);
            const { userDoc } = response.data;
            // send "userDoc" to the App.js function that changes "currentUser"
            this.props.onUserChange(userDoc);
            alert('Logged in successfully!');
        })
        .catch(err => {
            if (err.response && err.response.data) {
              // console.error("API response", err.response.data)
              return  this.setState({ message: err.response.data.message }) 
            }
        });
    }
    render(){
        return(
            <section className="LoginPage">
                <h2>Log In</h2>

                <form onSubmit={event => this.handleSubmit(event)}>
                    <label> Email:  </label>
                    <input 
                        value={this.state.email}
                        onChange={event => this.genericSync(event)}
                        type="email" 
                        name="email" 
                        placeholder="superstar@ironhack.com" 
                    />
         

                    <label> Password: </label>
                    <input 
                        value={this.state.originalPassword}
                        onChange={event => this.genericSync(event)}
                        type="password" 
                        name="originalPassword" 
                        placeholder="****"
                    />
                    <button>Log In</button>
                </form>
                { this.state.message && <div> { this.state.message } </div> }
            </section>
        );
    }




}

export default Login;