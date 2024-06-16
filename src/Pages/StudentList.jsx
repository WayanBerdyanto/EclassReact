import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";

function StudentList(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [nim, setNim] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const handleNimChange = (e) => {
        const value = e.target.value;
        if (value.length <= 8) {
            setNim(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const studentData = { nim, name, address, email };
        console.log(studentData);
        console.log('Submitting form with data:', studentData); //
        try {
            const response = await axios.post('http://localhost:5157/api/StudentsContoller', studentData);
            console.log(response);
            if (response.status === 201) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Successfully submitted",
                    showConfirmButton: false,
                    timer: 1000
                });
                console.log('Data submitted successfully');
                setData(prevData => [response.data, ...prevData]);
                handleClose();
            } else {
                console.error('Failed to submit data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    useEffect(() => {
        const GetData = async () => {
            try {
                const result = await axios.get('http://localhost:5157/api/StudentsContoller');
                console.log(result.data);
                setData(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        GetData();
    }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setNim('');
        setName('');
        setAddress('');
        setEmail('');
    };
    const handleShow = () => setShow(true);
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <div className="container-fluid">
                <h2 className="text-center mt-4">Data Mahasiswa</h2>
                <div className="d-flex justify-content-end mt-2">
                    <Button className="px-3" variant="primary" onClick={handleShow}>
                        <i className="bi bi-person-plus text-light"></i>
                    </Button>{' '}
                </div>
                <Table striped bordered hover className="mt-2">
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>Nim</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{item.nim}</td>
                                <td>{item.name}</td>
                                <td>{item.address}</td>
                                <td>{item.email}</td>
                                <td>
                                    <Button href={`/editstudents/${item.id}`} variant="primary">
                                        <i className="bi bi-pencil-square text-light"></i>
                                    </Button>{' '}
                                    <Button href={`/editstudents/${item.id}`} variant="danger">
                                        <i className="bi bi-trash text-light"></i>
                                    </Button>{' '}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Data Mahasiswa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nim</Form.Label>
                            <Form.Control
                                type="number"
                                value={nim}
                                onChange={handleNimChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>

            </Modal>
        </>

    );
}

export default StudentList;