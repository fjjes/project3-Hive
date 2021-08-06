import { useState } from "react";

const LoginForm = ({Login, error})=>{
    const [loginDetails, setLoginDetails] = useState({email:"", password:""})
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        Login(loginDetails)
    }
    
    return(
       <form onSubmit={handleSubmit}>
           <div className="form-inner">
               <h2>Login</h2>
               <div className="form-group">
                   <label htmlFor="email">Email:</label>
                   <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={loginDetails.email}
                    onChange={(e)=>setLoginDetails({...loginDetails, email:e.target.value})}
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
               <input type="submit" value="Login"/>
           </div>
       </form>
    )
}

export default LoginForm;