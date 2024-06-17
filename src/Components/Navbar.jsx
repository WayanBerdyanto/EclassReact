import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useAuth } from '../Components/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function NavbarComponent() {

    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const swalLogout = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure Logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Logout!",
                    text: "Logout successfully",
                    icon: "success"
                });
                handleLogout();
            }
        });
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary py-3">
            <Container fluid>
                <Navbar.Brand href="/dashboard">E-Class</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <NavDropdown data-bs-theme="dark" title="Data" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="/students">Students</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">
                                Lecturers
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#action2">Settings</Nav.Link>
                    </Nav>
                    <Form className="d-flex me-4">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    <Dropdown className='my-2 my-lg-0'>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <i className="bi bi-person-fill"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown-menu-lg-end'>
                            <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={swalLogout}>Logout</Dropdown.Item>

                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;