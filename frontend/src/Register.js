import { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function Register(){
    const[formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = e =>{
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8000/api/register/', formData);
            console.log('Register', res.data);
            localStorage.setItem('access', res.data.access);
            localStorage.setItem('refresh', res.data.refresh);
            alert("Registration sucess")
            setFormData({
                username: '',
                email: '',
                password: '',
                confirm_password: ''
            })
            setErrors({}); 
            navigate('/');
            window.location.reload();
        }catch (err) {
            console.error('Registration Error', err);
            if (err.response && err.response.data) {
                setErrors(err.response.data)
            } else {
                setErrors({non_field_errors:['something went wrong']});
            }
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <h3>Reister Form</h3>
            {errors.username && <p style={{ color: 'red' }}>{errors.username}</p>}
            <label>User Name</label>
            <input name="username" placeholder="User Name" onChange={handleChange} value={formData.username} required/>
            {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
            <label>Email</label>
            <input name="email" placeholder="Email" type="email" onChange={handleChange} value={formData.email} required/>
            {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            <label>Password</label>
            <input name="password" placeholder="Password" type="password" onChange={handleChange} value={formData.password} required/>
            {errors.confirm_password && (<p style={{ color: 'red' }}>{errors.confirm_password}</p>)}
            {errors.non_field_errors && (<p style={{ color: 'red' }}>{errors.non_field_errors}</p>)}
            <label>Confirm Password</label>
            <input name="confirm_password" placeholder="Confirm Password" type="password" value={formData.confirm_password} onChange={handleChange} required/>
            <button type="submit">Register</button>
        </form>
    );
}

export default Register;