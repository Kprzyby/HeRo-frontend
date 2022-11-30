import React, { useState, useRef, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap"

import AuthService from "../services/auth.service";



const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const form = useRef()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        //userRef.current.focus()
    }, [])

    const submitHandler = (e) => {
        e.preventDefault()

        AuthService.login(email, password)
            .then(() => {
                navigate("/home")
                window.location.reload()
            },
                (error) => {
                    setLoading(false);
                })
        setLoading(false)
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className="card card-container">
                <Form className="rounded p-4 p-sm-3" onSubmit={submitHandler} ref={form}>
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </Form.Group>
                    <Button variant="primary" disabled={loading} type="submit">
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Login;