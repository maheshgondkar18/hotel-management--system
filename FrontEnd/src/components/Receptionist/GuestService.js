import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import authHeader from '../../services/auth-header';
const config = require("../../common/config.json")

export default function GuestService() {
    const baseUrl = 'https://6172515561ed900017c40752.mockapi.io/Employee'

    const url = config.GuestUrl
    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

    // Hook To get Emp Data From API
    const [GuestData, setGuestData] = useState([])

    // Hook To Check in which from needs to display
    // if isEdit === True => send data to onEditFormSubmit() [ Put Method ]
    // if isEdit === False => send data to onFormSubmit() [ Post Method ]
    const [isEdit, setIsEdit] = useState([false])


    // Get Method to Fetch Data From API
    const getGuests = () => {
        axios.get(`${url}/get`)
            .then(response => {
                console.log(response.data)
                setGuestData(response.data)
            })
    }

    // Method to Upload data on server
    const onFormSubmit = (guest) => {
        console.log(GuestData)
        axios.post("http://localhost:1118/guest/add", guest)
            .then(response => {
                console.log(guest)
                getGuests()
                reset()
            })
    }

    // Method to Edit Data On Server
    const onEditFormSubmit = (guest) => {
        axios.patch(`${url}/update/${localStorage.getItem("gid")}`, guest)
            .then(response => {
                getGuests()
                reset()
            })

        setIsEdit(false)
    }

    // Method to set isEdit = True and fetch specific emp w.r.t id and add values fetch from api to form
    const editForm = (gid) => {
        setIsEdit(true)

        localStorage.setItem("gid", gid)
        axios.get(`${url}/update/${gid}`)
            .then(response => {
                console.log(response.data)
                setValue("gid", response.data.gid)
                setValue("name", response.data.name)
                setValue("address", response.data.address)
                setValue("email", response.data.email)
                setValue("phonenumber", response.data.phonenumber)
                setValue("gender", response.data.gender)
                setValue("roomno", response.data.roomno)
               
            })
    }

    // Method to Delete Guest on Server
    const deleteForm = (gid) => {
        axios.delete(`${url}/deleteGuest/${gid}`)
            .then(response => {
                alert(`Guest ${gid} Successfully Deleted...`)
                console.log(gid)
                getGuests()
            })
    }

    // Method to Filter By Name
    const search = (event) => {
        // Data is converted into lower case and check with given input
        setGuestData(GuestData.filter(guest => guest.name.toLowerCase().search(event.target.value.toLowerCase()) > -1))
        
        // Search query length = 0 then reset filtered data
        if (event.target.value.length === 0)
            resetFilter()
    }


    const resetFilter = () => {
        getGuests()
    }

    useEffect(() => {
        getGuests()
    }, [])


    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col col-md-4">
                    <div className="card shadow bg-warning-50" style={{ width: "98%", margin: "2%" }}>
                        <div className="card-header text-center">
                            Add Guest
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <form onSubmit={handleSubmit(isEdit === true ? onEditFormSubmit : onFormSubmit)}>
                                <div className='row'>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="gid" className="form-label">Guest Id</label>
                                                <input {...register("gid", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="gid" placeholder="Guest ID" />
                                                {errors.gid?.type === 'required' && <span className='badge bg-danger'>Guest Id is Required</span>}
                                                {errors.gid?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                </div>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Guest Name</label>
                                        <input {...register("name", { required: true, pattern: /[a-zA-Z]+/ })} type="text" className="form-control" id="name" placeholder="Guest Name" />
                                        {errors.name?.type === 'required' && <span className='badge bg-danger'>Guest Name is Required</span>}
                                        {errors.name?.type === 'pattern' && <span className='badge bg-danger'>Invalid Guest Name</span>}
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="address" className="form-label">Address</label>
                                                <input {...register("address", { required: true, pattern: /[a-zA-Z]+/ })} type="text" className="form-control" id="address" placeholder="Guests Address" />
                                                {errors.address?.type === 'required' && <span className='badge bg-danger'>Guest Address is Required</span>}
                                                {errors.address?.type === 'pattern' && <span className='badge bg-danger'>Ivalid Guest Address</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input {...register("email", { required: true })} type="text" className="form-control" id="email" placeholder="Guest Email" />
                                                {errors.email?.type === 'required' && <span className='badge bg-danger'>Guest Email is Required</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="phonenumber" className="form-label">Phone Number</label>
                                                <input {...register("phonenumber", { required: true, pattern: /^[0-9]+$/ })} type="text" className="form-control" id="phonenumber" placeholder="Guest Phone Number" />
                                                {errors.phonenumber?.type === 'required' && <span className='badge bg-danger'>Guest Phonenumber is Required</span>}
                                                {errors.phonenumber?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="gender" className="form-label">Gender</label>
                                                {/* <select name="gender" id="gender">
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                </select> */}
                                                <input {...register("gender")} type="text" className="form-control" id="gender" placeholder="Guest Gender" />
                                                {errors.gender?.type === 'required' && <span className='badge bg-danger'>Guest gender is Required</span>}
                                                {errors.gender?.type === 'pattern' && <span className='badge bg-danger'>Invalid Gender</span>}
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="roomno" className="form-label">Guest Room Number</label>
                                                <input {...register("roomno", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="roomno" placeholder="roomno" />
                                                {errors.roomno?.type === 'required' && <span className='badge bg-danger'>Guests Room Number is Required</span>}
                                                {errors.roomno?.type === 'pattern' && <span className='badge bg-danger'>Invalid Room Number</span>}
                                            </div>
                                        </div>
                                    </div>
                                        <div>
                                            {isEdit === true ? <button type='submit' className='btn btn-info'>Edit</button> : <button type='submit' className='btn btn-success'>Add Guest</button>}
                                        </div>
                                </form>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="col">

                    <div className="row" style={{ margin: "2%" }}>
                        <div className="col col-md-9 g-6" >
                            <div class="form-floating">
                                <input type="name" class="form-control shadow" id="floatingInput" placeholder="Search By Guest Name" onChange={search} />
                                <label for="floatingInput">Search By Guest Name</label>
                            </div>
                        </div>
                        <div className="col col-md-3 p-6">
                            <button className="btn btn-danger p-3 shadow" onClick={resetFilter} style={{ width: "80%" }}>Reset Filter</button>
                        </div>
                    </div>

                    <div className="card shadow" style={{ margin: "2%" }}>
                        <div className="card-header text-center">
                            Guest Table
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phonenumber</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Room Number</th>
                                            <th scope="col col-md-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            GuestData.map(guest => (
                                                <tr key={guest.gid}>
                                                    <td>{guest.gid}</td>
                                                    <td>{guest.name}</td>
                                                    <td>{guest.address}</td>
                                                    <td>{guest.email}</td>
                                                    <td>{guest.phonenumber}</td>
                                                    <td>{guest.gender}</td>
                                                    <td>{guest.roomno}</td>
                                                    <td>
                                                        <button className='btn btn-sm btn-success' onClick={() => editForm(guest.gid)} >Edit</button>&nbsp;
                                                        <button className='btn btn-sm btn-danger' onClick={() => window.confirm("Are you Sure?") && deleteForm(guest.gid)}>Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </blockquote>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}