import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';

function StudentList(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    return (
        <div className="container-fluid">
            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nim</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Email</th>
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
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default StudentList;