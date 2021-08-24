import { useState } from "react";
import { useHistory } from 'react-router-dom'
import SaveSurvey from "../Admin/SaveSurvey"
import LoginForm from './LoginForm'
import logo from '../../../images/hivelogo.png'
import './Login.css'


const LoginPage = ()=>{
    let history = useHistory()
    const AdminUser = 
        { 
            username: process.env.REACT_APP_USERNAME,
            password: process.env.REACT_APP_PASSWORD
        }
    
    const [user, setUser]=useState({ username:""})
    const [error, setError]=useState("");

    const Login =(details)=>{
        console.log(details)

        if(details.username === AdminUser.username && details.password === AdminUser.password){
            console.log("logged in")
            setUser({name:details.password, username: details.username}) 
            history.push('/create-new')
        }else{
            console.log("details do not match")
            setError("Please enter a valid username and password!")
        }
    }

    return(
        <div className="Login-page">
            {(user.username !== "") ? (
                <div>
                    <SaveSurvey/>
                </div>
            ):(
                <div className='container'>
                    <div className='form-content-left'>
                        <img className='form-img' src={logo} alt='spaceship' />
                    </div>
                    <LoginForm Login={Login} error={error}/>
                </div>
            )}
        </div>
    )
}
export default LoginPage;