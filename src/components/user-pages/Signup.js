import React, { Component } from 'react';
import axios from "axios";


class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            // these are req.body.name of each input field in the form
            fullName: "",
            email: "",
            originalPassword:"",
            message: null,
        }
    }
// 🎯 you can reuse this for every React form
genericSync(event){
    const { name, value } = event.target;
    this.setState({ [name]:value });
}


handleSubmit(event){
    event.preventDefault();

    axios.post(
        "http://localhost:3001/api/signup", // 1st and mandatory: which route I'm hitting in the backend
        this.state, // 2nd and mandatory: what I'm sending (since it's POST route I have to send something)
        { withCredentials:true } // 3rd and optional: credentials:true in CORS
    )
    .then( responseFromServer => {
        // console.log("response is: ", responseFromServer);
        const { userDoc } = responseFromServer.data;
        this.props.onUserChange(userDoc);
    } )
    .catch(err => {
        // console.log("error while signup: ", err);
        if(err.response && err.response.data){
            return this.setState({ message:err.response.data.message });
        }
    })
}

render(){
    if(this.props.currentUser){
        return(
            <section>
                <h2> You are signed up! </h2>
                <p> Welcome, { this.props.currentUser.fullName }! 
                    Your email is: <b> { this.props.currentUser.email } 🙈 </b>
                </p>
            </section>
        )
    }

    return (
         <section>
            <h2> Sign Up </h2>
            
            <form onSubmit={ event => this.handleSubmit(event) } >
                <label> Full Name </label>
                <input
                    value = { this.state.fullName }
                    onChange={ event => this.genericSync(event) }
                    type="text"
                    name="fullName"
                    placeholder="Miller"
                />
               <label> Email </label>
                <input
                    value = { this.state.email }
                    onChange={ event => this.genericSync(event) }
                    type="email"
                    name="email"
                    placeholder="superstar@ironhack.com"
                />
               <label> Password </label>
                <input
                    value = { this.state.originalPassword }
                    onChange={ event => this.genericSync(event) }
                    type="password"
                    name="originalPassword"
                    placeholder="*******"
                />
                <button> Sign Up </button>
            </form>
            {/* if the message is not NULL then show the message */}
            { this.state.message && <div> { this.state.message } </div> }
        </section>
    )
}




}

export default Signup;