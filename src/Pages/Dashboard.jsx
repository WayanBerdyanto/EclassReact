import CardComponent from "../Components/Card";
import React, { useEffect } from "react";
import { useLoading } from "../Components/LoadingContext";

function Dashboard(){

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    const { setLoading } = useLoading();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500); 
    }, [setLoading]);
    return(
        <div className="container-fluid mt-4">
            <CardComponent/>
        </div>
    );
}

export default Dashboard;