import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { Navigate, Redirect, useSearchParams } from 'react-router-dom';

import authHeader from "../../services/auth-header";
const config = require("../../common/config.json")

export const ReservationTable = () => {
  
    const url = config.RoomUrl
    const billingUrl = config.BillingUrl

    const [searchParams, setSearchParams] = useSearchParams();

    // Hook To get Emp Data From API
    const [roomData, setRoomData] = useState([])
    const [booking, setBooking] = useState([])
    const [currentRoom, setCurrentRoom] = useState([])
    const [msg,setMsg] = useState("");

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

    return (
        <>
            <div className="row" style={{ marginTop: "10px" }}>
                <div className="col">
                    <div className="card shadow" style={{ width: "93%", margin: "2%" }}>
                        { msg && <div class="alert alert-success alert-dismissible" role="alert">{msg}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>}
                        <div className="card-header text-center">
                            <div className='row'>
                                <div className='col'> Room Reservation Details </div>
                                <div className='col'> <button className='btnm btn-sm btn-primary' style={{marginLeft:"20%", width:"60%"}} onClick={ () => window.print()}> Print </button> </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <blockquote className="blockquote mb-0">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col col-md-1">Room Number</th>
                                            <th> Reservation Details </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {      
                                            roomData.map(room => {
                                                let resv1 =  room.reservation.map(resv => {
                                                    return (
                                                        <>
                                                            <tr className='row'>
                                                                <td className='col'>{resv.checkIn.split("T")[0]}</td>
                                                                <td className='col'>{resv.checkOut.split("T")[0]}</td>
                                                                <td className='col'>{resv.totalGuest}</td>
                                                                <td className='col'> { getNoDays(resv.checkIn,resv.checkOut) } </td>
                                                                <td className='col'> {room.roomRates} </td>
                                                                <td className='col'>{getNoDays(resv.checkIn,resv.checkOut) * Number(room.roomRates) * Number(resv.totalGuest)}</td>
                                                            </tr>
                                                        </>
                                                    )
                                                })
                                                return (
                                                    <>
                                                        <tr>
                                                            <td className="col">{room.roomNumber}</td>
                                                            <td>
                                                                <table className='table table-striped table-hover'>
                                                                    <tr className='row'>
                                                                        <th className="col">checkIn</th>
                                                                        <th className="col">checkOut</th>
                                                                        <th className="col">Number of Guest</th>
                                                                        <th className="col"> Stay in Days </th>
                                                                        <th className='col'> Rate per Bed </th>
                                                                        <th className="col"> Amount </th>
                                                                    </tr>
                                                                    {resv1}
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
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
