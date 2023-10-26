import React, { useState } from "react";
import axios from "axios";

const Login = ({setToken}) => {
    const [user, setUser] = useState({
        email: "", password: ""
    })

    const { email, password } = user;


    function handleSubmit(e) {
        e.preventDefault();
        // console.log(e.target[0].value);
        if (!email || !password) {
            alert("All fields are mandetory")
        }
        else {
            axios.post("https://instagram-express-app.vercel.app/api/auth/login/", { email, password })
                .then(response => {
                    console.log(response.data);
                    setToken(response.data.data.token)
                    localStorage.setItem("token", response.data.data.token);
                })

                .catch( error => console.log(error.response.data.message))
        }
    }

    function handleInput(e) {
        // console.log(e);
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter your Email" onChange={handleInput} value={user.email} name="email" />
                <input type="password" placeholder="Enter your password" onChange={handleInput} name="password" />
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login