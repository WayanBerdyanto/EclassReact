import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';

function NavbarComponent() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary py-3">
            <Container fluid>
                <Navbar.Brand href="/">E-Class</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/">Dashboard</Nav.Link>
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
                            <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;