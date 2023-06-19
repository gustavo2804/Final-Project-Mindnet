import { Link, useNavigate } from "react-router-dom"
import "../../global.css"
import "./LogIn.css"
import { useState } from "react"
import axios from "axios";

function LogIn() {

            
    
        
    
        const [form,setForm] = useState({
                email:"",
                password:""
            });


        const navigate = useNavigate()    
        const formChange= (event: any)=>{
            const {name, value} = event.target;
            
            setForm({
                ...form,
                [name]:value
            })

          } 
          
          const verificarUser = async ()=>{
            try {
                const url ="http://localhost:9000/api/auth/login";
                const body ={
                    email:form.email,
                    password:form.password
                }
                const response = await axios.post(url,body);
                console.log(response);
                navigate("/feed");

            } catch(error)
            {
                console.error(error);
                navigate("/login");

            }


          }
        
        const formPre = (event:any) =>{
            event.preventDefault(),
            console.log(form);
                verificarUser()
                
           
        }  
        


    return(
        <main>
        <div className="img1">
          <img src="../public/login.jpg" alt="People talking" id="signup-image"/>
        </div>
  
        <div className="container">
          <h1 id="logo">Mind<span id="logo-highlight">Net</span></h1>
              <form id="login" onSubmit={formPre}>

  
                  <div className="email-group">
                      <input
                          type="text"
                          placeholder="Correo electronico"
                          name="email"
                          value={form.email}
                          onChange={formChange}
                          required
                      />
  
                      <input
                          type="password"
                          placeholder="Contraseña"
                          name="password"
                          value={form.password}
                          onChange={formChange}
                          required
                      />
                  </div>
  
                  <div className="button-group">
                      <button type="submit" className="primary-button" >Iniciar Sesión</button>
                      <Link to={`/ForgotPassword`}><p className="secondary-link">¿Olvidaste tu contraseña?</p></Link>
                      <hr className="form-divider" />
                      

                  </div>
                  
              </form>
                <Link to={`/signup`}><button type="submit" className="secondary-button">Registrate Ahora</button></Link>
        </div>
  
        <div></div>
      </main>
    )
}

export default LogIn