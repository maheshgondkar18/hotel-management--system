import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import authHeader from "../../services/auth-header";
const config = require("../../common/config.json")

export const RoomService = () => {

    const url = config.RoomUrl

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()

    // Hook To get Emp Data From API
    const [roomData, setRoomData] = useState([])

    // Hook To Check in which from needs to display
    // if isEdit === True => send data to onEditFormSubmit() [ Put Method ]
    // if isEdit === False => send data to onFormSubmit() [ Post Method ]
    const [isEdit, setIsEdit] = useState([false])


    // Get Method to Fetch Data From API
    const getRooms = () => {
        axios.get(`${url}/`,{ headers: authHeader() })
            .then(response => {
                console.log(response.data)
                setRoomData(response.data)
            })
    }

    // Method to Upload data on server
    const onFormSubmit = (room) => {
        axios.post(`${url}/`, room, { headers: authHeader() })
            .then(response => {
                console.log(room)
                getRooms()
                reset()
            })
    }

    // Method to Edit Data On Server
    const onEditFormSubmit = (room) => {
        axios.patch(`${url}/update/${localStorage.getItem("id")}`, room)
            .then(response => {
                getRooms()
                reset()
            })

        setIsEdit(false)
    }

    // Method to set isEdit = True and fetch specific emp w.r.t id and add values fetch from api to form
    const editForm = (id) => {
        setIsEdit(true)

        localStorage.setItem("id", id)
        axios.get(`${url}/${id}`)
            .then(response => {
                console.log(response.data)
                setValue("roomNumber", response.data.roomNumber)
                setValue("roomSize", response.data.roomSize)
                setValue("roomRates", response.data.roomRates)
            })
    }

    // Method to Delete Employee on Server
    const deleteForm = (id) => {
        axios.delete(`${url}/${id}`)
            .then(response => {
                alert(`Room ${id} Successfully Deleted...`)
                getRooms()
            })
    }

    // Method to Filter By Name
    const search = (event) => {
        // Data is converted into lower case and check with given input
        console.log( event.target.value)
        setRoomData(roomData.filter(room => room.roomNumber == event.target.value))
        
        // Search query length = 0 then reset filtered data
        if (event.target.value.length === 0)
            resetFilter()
    }


    const resetFilter = () => {
        getRooms()
    }

    useEffect(() => {
        getRooms()
    }, [])


    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col col-md-4">
                    <div className="card shadow bg-warning-50" style={{ width: "98%", margin: "2%",  backgroundColor:"rgba(255,255,255,0.8)" }}>
                        <div className="card-header text-center">
                            Add Room
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <form onSubmit={handleSubmit(isEdit === true ? onEditFormSubmit : onFormSubmit)}>
                                    <div className="mb-3">
                                        <label htmlFor="roomNo" className="form-label">Room Number</label>
                                        <input {...register("roomNumber", { required: true, pattern:  /^[0-9]+$/ })} type="text" className="form-control" id="roomNo" placeholder="Room Number" />
                                        {errors.roomNumber?.type === 'required' && <span className='badge bg-danger'>Room Number is Required</span>}
                                        {errors.roomNumber?.type === 'pattern' && <span className='badge bg-danger'>Invalid Room Number</span>}
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="roomSize" className="form-label">No. of Beds in room</label>
                                                <input {...register("roomSize", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="roomSize" placeholder="Room Size" />
                                                {errors.roomSize?.type === 'required' && <span className='badge bg-danger'>Room Size is Required</span>}
                                                {errors.roomSize?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="roomRates" className="form-label">Rate per Bed</label>
                                                <input {...register("roomRates", { required: true, pattern: /^[0-9]+$/ })} type="number" className="form-control" id="roomRate" placeholder="Room Rate per Bed" />
                                                {errors.roomRates?.type === 'required' && <span className='badge bg-danger'>Employee Age is Required</span>}
                                                {errors.roomRates?.type === 'pattern' && <span className='badge bg-danger'>Only Numeric characters are allowed</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {isEdit === true ? <button type='submit' className='btn btn-info'>Edit</button> : <button type='submit' className='btn btn-success'>Submit</button>}
                                    </div>
                                </form>
                            </blockquote>
                            
                        </div>
                    </div>
                </div>

                <div className="col">

                    {/* <div className="row" style={{ margin: "2%" }}>
                        <div className="col col-md-9 g-6" >
                            <div class="form-floating">
                                <input type="email" class="form-control shadow" id="floatingInput" placeholder="Search By Room Number" onChange={search} />
                                <label for="floatingInput">Search By Room Number</label>
                            </div>
                        </div>
                        <div className="col col-md-3 p-6">
                            <button className="btn btn-danger p-3 shadow" onClick={resetFilter} style={{ width: "80%" }}>Reset Filter</button>
                        </div>
                    </div> */}

                    <div className="card shadow" style={{ width: "93%", margin: "2%",  backgroundColor:"rgba(255,255,255,0.8)" }}>
                        <div className="card-header text-center">
                            Room's
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col col-md-1">Room Number</th>
                                            <th scope="col col-md-3">Room Size</th>
                                            <th scope="col col-md-3">Room Rate</th>
                                            <th scope="col col-md-3">Number of Bookings</th>
                                            {/* <th scope="col col-md-1">Salary</th>
                                            <th scope="col col-md-1">Age</th>
                                            <th scope="col col-md-2">NIC</th>
                                            <th scope="col col-md-2">Occupation</th>
                                            <th scope="col col-md-2">Address</th> */}
                                            <th scope="col col-md-2">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            roomData.map(room => (
                                                <tr key={room.id}>
                                                    <td>{room.roomNumber}</td>
                                                    <td>{room.roomSize}</td>
                                                    <td>{room.roomRates}</td>
                                                    <td>{ room.reservation.length }</td>
                                                    {/* <td>{emp.employeeSalary}</td>
                                                    <td>{emp.employeeAge}</td>
                                                    <td>{emp.employeeNIC}</td>
                                                    <td>{emp.employeeOccupation}</td>
                                                    <td>{emp.employeeAddress}</td> */}
                                                    <td>
                                                        <button className='btn btn-sm btn-success' onClick={() => editForm(room.roomNumber)} >Edit</button>&nbsp;
                                                        <button className='btn btn-sm btn-danger' onClick={() => window.confirm("Are you Sure?") && deleteForm(room.roomNumber)}>Delete</button>
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
            </div>
        </>
    )
}
