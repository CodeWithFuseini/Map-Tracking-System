import React, { useRef } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CardBody,
  Card,
  CardHeader,
} from "reactstrap";

import { useLoginMutation } from "../api/userEnpoints";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser,  setIsLogin} from "../slices/user";


const Login = () => {

  const usernameRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();

  const [ login ] = useLoginMutation();

  const navigate = useNavigate();
  const location = useLocation();

 window.addEventListener("load", function(){
    usernameRef.current?.focus()
 });

 async function submitHandler(e){
    e.preventDefault();
    
       const username = usernameRef.current?.value;
       const password = passwordRef.current?.value;

       const res = await login({username, password});
 
       if(res?.error?.originalStatus === 400 || res?.error?.originalStatus === 401 ){
           alert("Invalid login")
           
           return
       }

       const id = res?.data?.user?._id;
       const user = res?.data?.user?.username;

       dispatch(setUser({id, user}));
       dispatch(setIsLogin(true));

       navigate("/")
 }

  return (
    <div className="form-container">
      <Card style={{width:"400px", border:"none"}}>
        
          <CardHeader style={{backgroundColor:"white", border:"none"}}>
            <h3 style={{fontWeight: "bold"}}>Login</h3>
          </CardHeader>
          <CardBody>
          <Form method="POST" onSubmit={submitHandler}>
            <FormGroup>
              <Label for="username" hidden>
                Username
              </Label>
              <input
                className="form-control"
                ref={usernameRef}
                id="username"
                placeholder="Username"
                type="text"
                required
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <input
                className="form-control"
                id="examplePassword"
                ref={passwordRef}
                placeholder="Password"
                type="password"
                required
              />
            </FormGroup>{" "}
            <Button style={{backgroundColor:"#5d5d8b"}}>Submit</Button>
          </Form>
          <br/>
          <Link to={`/register`}>Register</Link>
        </CardBody>
        
      </Card>
    </div>
  );
};

export default Login;
