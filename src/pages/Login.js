import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { toast } from "react-toastify";



export const Login = ({children}, props) => {
  const [name, setName] = useState("");  
  const [password, setPassword] = useState("");
  //const [confPassword, setConfPassword] = useState("");

  // function to update state of name with
  // value enter by user in form
  const handleChange = (e) => {
    setName(e.target.value);
  }; 
 
  // function to update state of password with
  // value enter by user in form
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  // function to update state of confirm password
  // with value enter by user in form
  // // const handleConfPasswordChange = (e) => {
  // //   setConfPassword(e.target.value);
  // // };
  // below function will be called when user
  // click on submit button .

  
  let navigate = useNavigate();

 
  const handleSubmit = (e) => {
    localStorage.setItem("senha", password);
    if (name === "admin" && password === "tofalido01") {
      // if 'password' and 'confirm password'
      // does not match.
      navigate("/home");
      
    } else {
      toast.error ("Dados de acesso incorretos. Verifique novamente.")
      // display alert box with user
      // 'name' and 'email' deatils .
      // alert(
      //   'A form was submitted with Name :"' +
      //     name +
      //     '" ,Age :"' +
      //     age +
      //     '" and Email :"' +
      //     email +
      //     '"' + password + '"'
      // );
     
           
    }
    e.preventDefault();
  };

  return (
    <div className="flex justify-center mt-40">
      <h2 className="dark:text-white">
        {""}
        <h1>
          <strong>Área de Login</strong>
        </h1>

        <div className="login">
          
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {/*when user submit the form , handleSubmit() 
        function will be called .*/}
                          
              <label>Nome:</label>
              <br />
              <input
              className="text-gray-800"
                type="text"
                value={name}
                required
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <br />
              {/*when user write in name input box , handleChange()
              function will be called. */}

              <label>Senha:</label>
              <br />
              <input
              className="text-gray-800"
                type="password"
                value={password}
                required
                onChange={(e) => {
                  handlePasswordChange(e);
                }}
              />
              <br />
              {/* when user write in password input box ,
                  handlePasswordChange() function will be called.*/}
              {/* <label>Confirm Password:</label>
              <br />
              <input
              className="text-gray-800"
                type="password"
                value={confPassword}
                required
                onChange={(e) => {
                  handleConfPasswordChange(e);
                }}
              /> */}
              <br />
              {/* when user write in confirm password  input box ,
                    handleConfPasswordChange() function will be called.*/}
              
             
              <button type="submit" value="Submit"
                className="px-8 py-3 m-2 bg-green-500 rounded-md font-semibold hover:bg-green-400 hover:text-white"
                
              >
                Acessar
              </button>
            </form>
          
        </div>

        <h3>{props.title}</h3>
      </h2>
    </div>
  );
};
