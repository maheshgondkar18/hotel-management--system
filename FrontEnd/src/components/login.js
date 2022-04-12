import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

export const LogIn = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handelUsername = (e) => {
        setUsername(e.target.value);
    };

    const handelPassword = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        if (username !== "" && password !== "") {
            authService.login(username, password).then(
                (user) => {
                    if (user.roles.includes("ROLE_OWNER")) {
                        navigate("/owner")
                    }
                    else if (user.roles.includes("ROLE_MANAGER")) {
                        navigate("/manager")
                    }
                    else if (user.roles.includes("ROLE_RECEPTIONIST")) {
                        navigate("/receptionist")
                    }
                    window.location.reload();
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setLoading(false);
                    setMessage(resMessage);
                }
            );
        } else {
            setLoading(false);
        }
    };



    return (
        <div className='row justify-content-md-center'>
            <div className="card col-md-6 border border-3 rounded-3 border-warning shadow" style={{ marginTop: "50px", backgroundColor:"rgba(255,255,255,0.8)" }}>
                <div className="card-header">
                    Login
                </div>
                <div className="card-body">
                    {message && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong>Ooops!</strong> {message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                    <div className='row'>
                        <div className='col'>
                            <img src="img/login.png" class="img-fluid" alt="..." />
                        </div>
                        <div className='col' >
                            <form className='g-3' onSubmit={handleLogin} style={{ marginTop: "50px" }}>
                                <div className='row mb-3'>
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input className="form-control" type="text" placeholder="username" id="username" value={username} onChange={handelUsername} />
                                </div>
                                <div className='row mb-3'>
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input className="form-control" type="password" placeholder="password" id="password" value={password} onChange={handelPassword} />
                                </div>
                                <div className='row mb-7'>
                                    {/* <input className="btn btn-primary form-control"  type="submit" value="Login" /> */}
                                    <button className="btn btn-primary btn-block" style={{ width: "80%", marginLeft: "10%" }} disabled={loading}>
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />
                    <p className='text-center'>Don't have Account <a href='register'>Register</a></p>
                </div>
            </div>
        </div>
    )
}
