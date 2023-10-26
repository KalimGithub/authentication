import React, {useState} from "react";
import axios from "axios";

const Signup = () => {

    const [user, setUser] = useState({
        name:"", email:"", password:"", cpassword:""
    })

    const {name, email, password, cpassword} = user;


    function handleSubmit(e){
        e.preventDefault();
        if (!name || !email || !password || !cpassword) {
            alert("All fields are required")
        }
        else if (password !== cpassword) {
            alert("password does not match")
        }
        else {
            axios.post("https://instagram-express-app.vercel.app/api/auth/signup", { name, email, password })
                .then(response => {
                    console.log(response.data);
                    localStorage.setItem("token", response.data.data.token)
                })
                .catch(e => {
                    console.log(e.response.data.message);
                })
        }

    }

    function handleInput(e){
        setUser({...user, [e.target.name]: e.target.value})
    }
    return(
        <div className="signup">
            <h1>Signup Form</h1>

            <form className="signup-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Your Name" name="name"
                    onChange={handleInput} value={user.name} />
                <input type="email" placeholder="Enter Your Email" name="email"
                    onChange={handleInput} value={user.email} />
                <input type="password" placeholder="Enter Your password" name="password"
                    onChange={handleInput} value={user.password} />
                <input type="password" placeholder="Enter Your confirm password" name="cpassword"
                    onChange={handleInput} value={user.cpassword} />
                <button className="submit-btn" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup