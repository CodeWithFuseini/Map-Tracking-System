import React, { useEffect, useRef, useState } from "react";
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

import { useRegisterMutation } from "../api/userEnpoints";
import { useNavigate, useLocation } from "react-router-dom";

const Register = () => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  
  const navigate = useNavigate();
  const location = useLocation();

  const [register] = useRegisterMutation()

 window.addEventListener("load", function(){
    usernameRef.current?.focus()
 });

 async function submitHandler(e){
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value
    const password = passwordRef.current?.value;
 
    const save = username && email && password;

    if(save){
       const res = await register({username, email, password});
       navigate("/login", {state: {from: location}, replace: true})
    }

 }

  return (
    <div className="form-container">
      <Card style={{width:"400px", border:"none"}}>
        
          <CardHeader style={{backgroundColor:"white", border:"none"}}>
            <h3 style={{fontWeight: "bold"}}>Register</h3>
          </CardHeader>
          <CardBody>
          <Form onSubmit={submitHandler}>
            <FormGroup>
              <Label for="username" hidden>
                Username
              </Label>
              <input
                className="form-control"
                ref={usernameRef}
                id="username"
                name="username"
                placeholder="Username"
                type="text"
                
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label for="email" hidden>
                Email
              </Label>
              <input
                className="form-control"
                ref={emailRef}
                id="email"
                name="email"
                placeholder="email"
                type="email"
               
              />
            </FormGroup>{" "}
            <FormGroup>
              <Label for="examplePassword" hidden>
                Password
              </Label>
              <input
                className="form-control"
                ref={passwordRef}
                id="examplePassword"
                name="password"
                placeholder="Password"
                type="password"
                
              />
            </FormGroup>{" "}
            <Button style={{backgroundColor:"#5d5d8b"}}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
