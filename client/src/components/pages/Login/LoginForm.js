import { useState } from "react";
import './Login.css'
//import AuthenticationContext from "../../../auth/AuthenticationContext"

const LoginForm = ({Login, error})=>{
    //const authContext = useContext(AuthenticationContext)
    const [loginDetails, setLoginDetails] = useState({username:"", password:""})
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        Login(loginDetails)
    }
    
    return(
        <div className="form-content-right">
            <form className="form" onSubmit={handleSubmit}>
                    <h1>Login to Hive Survey Admin Portal</h1>
                    <div className="form-group">
                        <label className="form-label" htmlFor="username">Username:</label>
                        <input 
                            className="form-input"
                            type="text" 
                            name="username" 
                            id="username" 
                            placeholder="Enter your username"
                            value={loginDetails.username}
                            onChange={(e)=>setLoginDetails({...loginDetails, username:e.target.value})}
                            />
                    </div>
                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password:</label>
                        <input 
                            className="form-input"
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Enter your password"
                            value={loginDetails.password}
                            onChange={(e)=>setLoginDetails({...loginDetails, password:e.target.value})}
                            />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button className='form-input-btn' type="submit">Login</button>

            </form>
        </div>
    )
}

export default LoginForm;