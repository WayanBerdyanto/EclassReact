import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Card } from 'react-bootstrap';
import Swal from "sweetalert2";
import { useLoading } from "../Components/LoadingContext";

function StudentList() {
    const [data, setData] = useState([]);
    const { loading, setLoading } = useLoading();
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('Tambah Data Mahasiswa');
    const changeLabel = () => {
        setTitle('Update Data Mahasiswa');
    };
    useEffect(() => {
        document.title = "Student List";
    }, []);
    const [id, setId] = useState('');
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
        console.log('Submitting form with data:', studentData);
        try {
            if (id) {
                const response = await axios.put(`http://localhost:5157/api/StudentsContoller/${id}`, studentData);
                if (response.status === 200) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Data updated successfully"
                    });
                    setData(prevData => prevData.map(item => item.id === id ? response.data.data : item));
                    handleClose();
                }
                else {
                    console.error('Failed to submit data');
                }
            } else {
                const response = await axios.post('http://localhost:5157/api/StudentsContoller', studentData);
                if (response.status === 201) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Data inserted successfully"
                    });
                    setData(prevData => [response.data, ...prevData]);
                    handleClose();
                }
                else {
                    console.error('Failed to submit data');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const GetData = async () => {
            try {
                const result = await axios.get('http://localhost:5157/api/StudentsContoller');
                console.log(result.data);
                setData(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        }
        GetData();
    }, [setLoading]);

    const GetDataId = async (id) => {
        try {
            const result = await axios.get(`http://localhost:5157/api/StudentsContoller/${id}`);
            console.log(result.data);
            if (result.status === 200) {
                console.log('Data successfully show');
                setNim(result.data.nim);
                setName(result.data.name);
                setAddress(result.data.address);
                setEmail(result.data.email);
                setId(result.data.id)
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setNim('');
        setName('');
        setAddress('');
        setEmail('');
    };
    const handleShow = () => {
        setShow(true)
        setId('');
    };
    const handleShowUpdate = (id) => {
        setShow(true)
        changeLabel()
        GetDataId(id)
        console.log('ID:', id);
    };

    const showSwalDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const result = await axios.delete(`http://localhost:5157/api/StudentsContoller/${id}`);
                    if (result.status === 200) {
                        setData(prevData => prevData.filter(student => student.id !== id));
                        console.log('ID:', id);
                        console.log('Result', result);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your data has been deleted.",
                            icon: "success"
                        });
                    }
                } catch (error) {
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        });
    };

    if (loading) {
        return <div>{setLoading(true)}</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <>
            <div className="container-fluid">
                <Card className="mt-4">
                    <Card.Header>
                        <div className="d-flex justify-content-between mt-2">
                            <Card.Title>Data Students List</Card.Title>
                            <Button className="px-3" variant="primary" onClick={handleShow}>
                                <i className="bi bi-person-plus text-light"></i>
                            </Button>{' '}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover className="mt-2">
                            <thead>
                                <tr>
                                    <th>NO</th>
                                    <th>NIM</th>
                                    <th>NAME</th>
                                    <th>ADDRESS</th>
                                    <th>EMAIL</th>
                                    <th>ACTION</th>
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
                                            <Button variant="primary" onClick={() => {
                                                handleShowUpdate(item.id);
                                                setId(item.id)
                                            }}
                                            >
                                                <i className="bi bi-pencil-square text-light"></i>
                                            </Button>{' '}
                                            <Button variant="danger" onClick={() => {
                                                showSwalDelete(item.id);
                                                setId(item.id)
                                            }}
                                            >
                                                <i className="bi bi-trash text-light"></i>
                                            </Button>{' '}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>

            </div >
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
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