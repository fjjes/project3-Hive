import { useState } from "react";
//import AuthenticationContext from "../../../auth/AuthenticationContext"

const LoginForm = ({Login, error})=>{
    //const authContext = useContext(AuthenticationContext)
    const [loginDetails, setLoginDetails] = useState({username:"", password:""})
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        Login(loginDetails)
    }
    
    return(
       <form onSubmit={handleSubmit}>
           <div className="form-inner">
               <h2>Login</h2>
               <div className="form-group">
                   <label htmlFor="username">Username:</label>
                   <input 
                    type="text" 
                    name="username" 
                    id="username" 
                    value={loginDetails.username}
                    onChange={(e)=>setLoginDetails({...loginDetails, username:e.target.value})}
                    />
               </div>
               <div className="form-group">
                   <label htmlFor="password">Password:</label>
                   <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={loginDetails.password}
                    onChange={(e)=>setLoginDetails({...loginDetails, password:e.target.value})}
                    />
               </div>
               {error && <p>{error}</p>}
               <input type="submit" value="LOGIN"/>
           </div>
       </form>
    )
}

export default LoginForm;