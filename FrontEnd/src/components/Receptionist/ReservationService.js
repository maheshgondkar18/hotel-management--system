import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'

import authHeader from "../../services/auth-header";
const config = require("../../common/config.json")


export const ReservationService = () => {
    const url = config.RoomUrl

    const { register, handleSubmit, formState: { errors }, setValue, reset, getValues } = useForm()

    // Hook To get Emp Data From API
    const [roomData, setRoomData] = useState([])
    const [booking, setBooking] = useState([])

    // Hook To Check in which from needs to display
    // if isEdit === True => send data to onEditFormSubmit() [ Put Method ]
    // if isEdit === False => send data to onFormSubmit() [ Post Method ]
    const [isEdit, setIsEdit] = useState([false])


    // Get Method to Fetch Data From API
    const getRooms = () => {
        axios.get(`${url}/`, { headers: authHeader() })
            .then(response => {
                console.log(response.data)
                setRoomData(response.data)
            })
    }

    // Method to Upload data on server
    const onFormSubmit = (room) => {
        axios.post(`${url}/search`, room, { headers: authHeader() })
            .then(response => {
                console.log(response)
                setRoomData(response.data)
                // reset()
            })
    }

    const bookRoom = (rno) => {
        axios.post(`${config.ReservationUrl}/${rno}`, getValues(), { headers: authHeader() }).then(res => {
            window.location.reload()
        }).catch(err => {
            alert(err)
        })
    }

    const showBookings = (rno) => {
        axios.get(`${url}/${rno}`).then(data => { setBooking(data.data.reservation) }).catch(error => { console.log(error) })
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
        console.log(event.target.value)
        setRoomData(roomData.filter(room => room.roomNumber == event.target.value))

        // Search query length = 0 then reset filtered data
        if (event.target.value.length === 0)
            resetFilter()
    }


    const resetFilter = () => {
        getRooms()
    }

    const setTotalGuest = () => {
        console.log(Number(document.getElementById("noa").value) + Number(document.getElementById("noc").value))
        setValue("totalGuest", Number(document.getElementById("noa").value) + Number(document.getElementById("noc").value))
    }

    useEffect(() => { }, [])


    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col col-md-4">
                    <div className="card shadow bg-warning-50" style={{ width: "98%", margin: "2%" }}>
                        <div className="card-header text-center">
                            Search Room
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <form onSubmit={handleSubmit(isEdit === true ? onEditFormSubmit : onFormSubmit)}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="checkIn" className="form-label">Check-In Date</label>
                                                <input {...register("checkIn", { required: true })} type="date" className="form-control" id="checkIn" placeholder="Check-In" />
                                                {errors.checkIn?.type === 'required' && <span className='badge bg-danger'>Date is Required</span>}
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="mb-3">
                                                <label htmlFor="checkOut" className="form-label">check-Out Date</label>
                                                <input {...register("checkOut", { required: true })} type="date" className="form-control" id="checkOut" placeholder="Check-Out" />
                                                {errors.chcekIn?.type === 'required' && <span className='badge bg-danger'>Date is Required</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="noa" className="form-label">No. of Adults</label>
                                                <input {...register("totalAdults", { required: true })} type="number" className="form-control" onChange={setTotalGuest} id="noa" placeholder="Number of Adults" />
                                                {errors.totalAdults?.type === 'required' && <span className='badge bg-danger'>Required</span>}
                                            </div>
                                        </div>
                                        <div className="col col-md-5">
                                            <div className="mb-3">
                                                <label htmlFor="noc" className="form-label">No. of Children</label>
                                                <input {...register("totalChildren", { required: true })} type="number" className="form-control" onChange={setTotalGuest} id="noc" placeholder="Number of Children" />
                                                {errors.totalChildren?.type === 'required' && <span className='badge bg-danger'>Required</span>}
                                            </div>
                                        </div>
                                        <div className="col col-md-3">
                                            <div className="mb-3">
                                                {/* <label htmlFor="noc" className="form-label">No. of Children</label> */}
                                                <input {...register("totalGuest", { required: true })} type="number" className="form-control" id="ttl" placeholder="Total" disabled={true} style={{ marginTop: "40px" }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <input {...register("transactionStatus")} type="hidden" className="form-control"/>
                                        {isEdit === true ? <button type='submit' className='btn btn-info'>Edit</button> : <button type='submit' className='btn btn-success'>Search Room's</button>}
                                    </div>
                                </form>
                            </blockquote>
                        </div>
                    </div>
                </div>

                <div className="col">

                    {/* <div className="row" style={{ margin: "2%" }}>
                        <div className="col col-md-9 g-6" >
                            <div className="form-floating">
                                <input type="email" className="form-control shadow" id="floatingInput" placeholder="Search By Room Number" onChange={search} />
                                <label for="floatingInput">Search By Room Number</label>
                            </div>
                        </div>
                        <div className="col col-md-3 p-6">
                            <button className="btn btn-danger p-3 shadow" onClick={resetFilter} style={{ width: "80%" }}>Reset Filter</button>
                        </div>
                    </div> */}

                    <div className="card shadow" style={{ width: "93%", margin: "2%" }}>
                        <div className="card-header text-center">
                            Available Room's
                        </div>
                        <div className="card-body"  style={{backgroundImage: "url('https://media.istockphoto.com/vectors/living-room-interior-furniture-design-home-interior-with-sofa-table-vector-id1132283385?k=20&m=1132283385&s=612x612&w=0&h=MecKuLwV5D2ujteZvTb7ecWQSvPT0FyEfPAK1Jg-M2Y=')", backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
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
                                                    <td>
                                                        <button type="button" className="btn btn-primary" onClick={() => showBookings(room.roomNumber)} data-bs-toggle="modal" data-bs-target="#bookingsModal">
                                                            Show Booking's <span className="badge bg-secondary">{room.reservation.length}</span>
                                                        </button>
                                                    </td>
                                                    {/* <td>{emp.employeeSalary}</td>
                                                    <td>{emp.employeeAge}</td>
                                                    <td>{emp.employeeNIC}</td>
                                                    <td>{emp.employeeOccupation}</td>
                                                    <td>{emp.employeeAddress}</td> */}
                                                    <td>
                                                        <button className='btn btn-sm btn-success' onClick={() => bookRoom(room.roomNumber)} >Book</button>&nbsp;
                                                        {/* <button className='btn btn-sm btn-danger' onClick={() => window.confirm("Are you Sure?") && deleteForm(room.roomNumber)}>Delete</button> */}
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

            {/* <!-- Modal --> */}
            <div className="modal" id="bookingsModal" tabindex="-1" aria-labelledby="Booking's" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bookings</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped">
                                <tr>
                                    <th>Check-In</th>
                                    <th>Check-Out</th>
                                    <th>Childrens</th>
                                    <th>Adults</th>
                                    <th>Total Guest</th>
                                </tr>
                                {
                                    booking.map(item => <tr> <td>{item.checkIn.split("T")[0]}</td><td>{item.checkOut.split("T")[0]}</td><td>{item.totalChildren}</td><td>{item.totalAdults}</td><td>{item.totalGuest}</td></tr>)
                                }
                            </table>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}
