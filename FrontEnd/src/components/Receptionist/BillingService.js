import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Navigate, Redirect, useSearchParams } from 'react-router-dom';

import authHeader from "../../services/auth-header";
const config = require("../../common/config.json")

export const BillingService = () => {

    const url = config.RoomUrl
    const billingUrl = config.BillingUrl

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm()
    const [searchParams, setSearchParams] = useSearchParams();

    // Hook To get Emp Data From API
    const [roomData, setRoomData] = useState([])
    const [booking, setBooking] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [msg,setMsg] = useState("");

    // Hook To Check in which from needs to display
    // if isEdit === True => send data to onEditFormSubmit() [ Put Method ]
    // if isEdit === False => send data to onFormSubmit() [ Post Method ]
    const [isEdit, setIsEdit] = useState([false])


    // Get Method to Fetch Data From API
    const getRooms = () => {
        searchParams.get("RESPMSG") && setMsg(searchParams.get("RESPMSG"))
        axios.get(`${url}/`, { headers: authHeader() })
            .then(response => {
                console.log("Rooms")
                console.log(response.data)
                setRoomData(response.data)
            })
    }


    const showBookings = (rno) => {
        axios.get(`${url}/${rno}`).then(data => {
            setBooking(data.data);
        }).catch(error => { console.log(error) })
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

    useEffect(() => {
        getRooms()
    }, [])

    const getNoDays = (date1,date2) => { 
        date1 = new Date(date1);
        date2 = new Date(date2);
        return (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1;
    }

    const payWithPaytm = (custID,Amt,TransID) => {
        let req = {
            CUST_ID: custID.toString(),
            TXN_AMOUNT:Amt,
            ORDER_ID:TransID
        }

        axios.get(`${config.ReservationUrl}/${TransID}`).then(data=>{
            if(!data.data.transactionStatus){
                axios.post(`${billingUrl}/pgredirect`,req).then(data =>{
                    let url = new URL("https://securegw-stage.paytm.in/order/process");
                    for(let key in data.data){
                        url.searchParams.set(key, data.data[key]);
                    }
                    window.location = url.toString()
                })
            }
            else{
                setMsg("Already Paid")
            }
            
        })
    }

    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                {/* <div className="col col-md-4">
                    <div className="card shadow bg-warning-50" style={{ width: "98%", margin: "2%" }}>
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
                </div> */}

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

                    <div className="card shadow" style={{ width: "93%", margin: "2%" }}>
                        { msg && <div class="alert alert-success alert-dismissible" role="alert">{msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>}
                        <div className="card-header text-center">
                            Bookings
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
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Bookings</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table table-striped">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Check-In</th>
                                    <th>Check-Out</th>
                                    <th>Childrens</th>
                                    <th>Adults</th>
                                    <th>Total Guest</th>
                                    <th>Rate per Bed</th>
                                    <th>Total Amount</th>
                                    <th>Action</th>
                                </tr>
                                {
                                     booking.reservation && booking.reservation.map(item =>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.checkIn.split("T")[0]}</td>
                                            <td>{item.checkOut.split("T")[0]}</td>
                                            <td>{item.totalChildren}</td>
                                            <td>{item.totalAdults}</td>
                                            <td>{item.totalGuest}</td>
                                            <td>{booking.roomRates}</td>
                                            <td>{getNoDays(item.checkIn,item.checkOut) * Number(booking.roomRates) * Number(item.totalGuest)}</td>
                                            <td>
                                                <button className='btn btn-sm btn-outline-success' onClick={()=>payWithPaytm(booking.roomNumber,getNoDays(item.checkIn,item.checkOut) * Number(booking.roomRates) * Number(item.totalGuest),item.id)}>Make Payment</button>
                                            </td>
                                        </tr>)
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
