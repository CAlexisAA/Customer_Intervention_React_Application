import axios from 'axios';
import React, { useState } from 'react';

function LoginForm( { Login, error }) {
    const [details, setDetails] = useState({name: "", email: "", password: ""});
    const submitHandler = e => {
        e.preventDefault();

        Login(details);
    const config = {
        headers : { Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjdXN0b21lcjFAYnVzaW5lc3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9qYXZhLWFwaS5jb2RlYm94eHRlc3QueHl6L2F1dGhlbnRpY2F0ZSJ9.QbJsJ-MZXWieFf_fcAkNWI3S9Skqd-yFVF3S2h-uhfo'}
        }
        axios.post('https://java-api.codeboxxtest.xyz/authenticate?email=customer1%40business.com&password=password123', config)
        .then(res => {
            console.log(res)
          }) 
          .catch(err => {
            console.log(err)
          })
    }
  return (
    <form onSubmit={submitHandler}>
        <div className="form-inner">
            <h2>Login</h2>
            {(error != "") ? ( <div className="error">{error}</div> ) : ""}
            {/* <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})}value={details.name}/>
            </div> */}
            <div className="form-group">
                <label htmlFor="email">Email*:</label>
                <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})}value={details.email} />
            </div>
            <div class="form-group">
                <label htmlFor="password">Password*:</label>
                <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})}value={details.password}/>
            </div>
            <input type="submit" value="LOGIN"/>
        </div>
    </form>
  )
}

export default LoginForm