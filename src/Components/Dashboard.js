import React,{ useState } from "react";
import axios from "axios";

let newToken;
const Dashboard = ({token}) => {

    const [joke, setJoke]  = useState("")

async function getZukuJoke() {

    if(token == ""){
        newToken = localStorage.getItem("token");
    }
    else{
        newToken=token;
    }

    try {
        const response = await axios.get("https://instagram-express-app.vercel.app/api/auth/zuku", {
            headers: {
                authorization: `Bearer ${newToken}`
            }
        })
        if(response){
            console.log(response.data);
            setJoke(response.data.data.message)
        }
    }
    catch(error){
        console.log("i am catching......");
        console.log(error.response.data.message);
    }
}

function logout(){

    axios.delete("https://instagram-express-app.vercel.app/api/auth/logout", {
        headers:{
            authorization:`Bearer ${token}`
        }
    })
    .then(response => {
        console.log(response.data)
        setJoke("")
        localStorage.removeItem("token")
    })
    .catch( error => {
        console.log(error.response.data.message)
    })
    
}

return(
    <div className="dashboard">
        <h1>Dashboard</h1>
        <h2>{joke}</h2>
        <button className="submit-btn" onClick={getZukuJoke}>Get Joke</button>
        <button className="submit-btn" onClick={logout}>Logout</button>
    </div>
)
}

export default Dashboard