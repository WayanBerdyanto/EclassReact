import axios from "axios";
import React, { useState, useEffect } from "react";
import { Table, Button, Form, Modal, Card } from 'react-bootstrap';
import Swal from "sweetalert2";
import { useLoading } from "../Components/LoadingContext";
function Lecturers() {
    const [data, setData] = useState([]);
    const { loading, setLoading } = useLoading();
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = "Lecturer List";
    }, []);

    // Show the list Lecturers
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5157/api/lecturer');
                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            }
        };
        fetchData();
    }, [setLoading]);

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
                            <Button className="px-3" variant="primary">
                                <i className="bi bi-person-plus text-light"></i>
                            </Button>{' '}
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover className="mt-2">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIP</th>
                                    <th>NAME</th>
                                    <th>Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item.nip}</td>
                                        <td>{item.name}</td>
                                        <td>{item.address}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Lecturers;