import React, { useState } from 'react'
import authService from '../services/auth.service'

export const Registration = (props) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("msaurabh@gm.cm")
    const [userType, setUserType] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setcPassword] = useState("")

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);
    const [matchPassword, setMatchPassword] = useState(false);
    const [message, setMessage] = useState("")

    const handelFirstName = (e) => {
        setFirstName(e.target.value)
        setSubmitted(false);
    }

    const handelLastname = (e) => {
        setLastName(e.target.value)
        setSubmitted(false);
    }

    const handelEmail = (e) => {
        setEmail(e.target.value)
        setSubmitted(false);
    }

    const handelPassword = (e) => {
        setPassword(e.target.value)
        setSubmitted(false);
    }

    const handelUsertype = (e) => {
        setUserType(e.target.value)
        setSubmitted(false);

    }

    const handelcPassword = (e) => {
        setcPassword(e.target.value)
        setSubmitted(false);
        if (password === e.target.value)
            setMatchPassword(true)
        else {
            setMatchPassword(false)
        }
    }

    const handelSubmit = (e) => {
        e.preventDefault();
        if (firstName === "" || lastName === "" || password === "" || cpassword === "" || userType === "" || email === "") {
            setMessage("All Fields are Mandatory")
            setError(true);
        } else {
            setError(false);
            console.log(firstName + " " + lastName + " " + password + " " + cpassword + " " + userType + " " + email)
            authService.register(firstName, lastName, email, password, userType).then(
                (res) => {
                    console.log(res.status === 200)
                    // window.location.reload();
                    if (res.status === 200)
                        setMessage("User Registered")
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setMessage(resMessage);
                }
            )
        }
    }




    return (
        <div className='row justify-content-md-center'>
            <div className="card col-md-6 border border-3 rounded-3 border-warning shadow" style={{ marginTop: "50px", backgroundColor: "rgba(255,255,255,0.8)" }}>
                <div className="card-header">
                    Registration Form
                </div>
                <div className="card-body">
                    {message && (
                        <div className="alert alert-sm alert-danger alert-dismissible fade show" role="alert">
                            {message}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    )}
                    <div className='row'>
                        <div className='col'>
                            <img src="img/reg.png" class="img-fluid" alt="..." />
                        </div>
                        <div className='col'>
                            <form onSubmit={handelSubmit} style={{ marginTop: "50px" }}>
                                <div className="row mb-3">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="First name" onChange={handelFirstName} value={firstName} />
                                    </div>
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Last name" onChange={handelLastname} value={lastName} />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col col-md-8">
                                        <input type="email" className="form-control" placeholder="Email ID" onChange={handelEmail} value={email} />
                                    </div>
                                    <div className="col col-md-4">
                                        <select className="form-select" id="inlineFormSelectPref" onChange={handelUsertype} value={userType}>
                                            <option selected>user type</option>
                                            <option value="owner">Owner</option>
                                            <option value="manager">Manager</option>
                                            <option value="receptionist">Receptionist</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <input type="password" className="form-control" placeholder="Password" onChange={handelPassword} value={password} />
                                    </div>
                                    <div className="col">
                                        <input type="password" className="form-control" placeholder="Confirm Password" onChange={handelcPassword} value={cpassword} />
                                        {
                                            (matchPassword == false) &&
                                            <div className='text-mutedv text-danger'>
                                                incorrect password
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className='row mb-7'>
                                    <button className="btn btn-primary form-control" style={{ width: "80%", marginLeft: "10%" }} type="submit" value="Register" disabled={!matchPassword}>Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br />
                    <p className='text-center text-muted'>Already have Account <a href='login'>Login</a></p>
                </div>
            </div>
        </div>
    )
}
