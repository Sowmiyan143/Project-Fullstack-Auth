import axios from "axios";
import { useState, useEffect } from "react";


function Users () {
    const [data, setdata] = useState([]);
    const [auth, setAuth] = useState(true);

    useEffect(()=>{
        const fetchUsers = async() => {
            try{
                const accessToken = localStorage.getItem("access");
                if (!accessToken){
                    setAuth(false);
                    return;
                }
                const res = await axios.get("http://localhost:8000/api/users/", {
                    headers:{
                        Authorization:`Bearer ${accessToken}`
                    }
                });
                setdata(res.data);
            } catch (err){
                console.log("Failed to get data", err);

                if (err.response && err.response.status === 401) {
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    setAuth(false);
                    window.location.reload();
                } else {
                    setAuth(false);
                }

                setAuth(false);
            }
        }
        fetchUsers();
    }, []);

    if (!auth) {
        return (
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>You are not authenticated</h2>
            </div>
        );
    }


    return(
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
                {data.length ===0 ? (
                    <tr>
                        <td colSpan="2">No Users Registered</td>
                    </tr>
                ) : ( data.map((user,index) => (
                    <tr key={index}>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
    );
}
export default Users;