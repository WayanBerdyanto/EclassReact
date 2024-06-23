import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Components/AuthContext';
import Form from 'react-bootstrap/Form';
import { InputGroup, Button, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useLoading } from "../Components/LoadingContext";

function Register() {
    useEffect(() => {
        document.title = "Register";
    }, []);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const { loading, setLoading } = useLoading();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        const userData = { username, email, password };
        setErrorMessage('');
        try {
            event.preventDefault();
            const response = await axios.post("http://localhost:5157/api/Register", userData);
            if (response.data && response.data.success) {
                await login();
                navigate('/dashboard');
            } else {
                setValidated(true);
                setErrorMessage(response.data.message || 'Register failed');
            }
        } catch (error) {
            setValidated(true);
            setErrorMessage(error.response?.data?.message || 'Register failed');
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    if (loading) {
        return <div>{setLoading(true)}</div>;
    }

    return (
        <div className="container-fluid d-flex align-items-center vh-100">
            <div className={`w-25 m-auto border border-secondary p-4 ${validated ? 'border-danger' : ''}`}>
                <Form onSubmit={handleSubmit}>
                    <h3 className='text-center'>Register</h3>
                    {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                    <Row className="mb-3">
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label htmlFor="inputusername">Username*</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id="inputusername"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputemail">Email*</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                id="inputemail"
                                placeholder="example@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a email.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="inputPassword5">Password*</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    id="inputPassword5"
                                    placeholder='password'
                                    aria-describedby="passwordHelpBlock"
                                />
                                <Button variant="outline-secondary" id="button-addon2" onClick={togglePasswordVisibility}>
                                    <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Button type="submit">
                            Submit
                        </Button>
                    </Row>
                    <Row>
                        <Button href='/login' variant="outline-secondary">Already have account</Button>
                    </Row>
                </Form>
            </div>
        </div>
    );
}

export default Register