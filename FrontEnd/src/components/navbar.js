import React, { useEffect, useState } from 'react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import { LogIn } from './login'
import { Registration } from './registration'
import OwnerHome from "./OwnerHome"
import ManagerHome from "./ManagerHome"
import ReceptionistHome from "./ReceptionistHome"
import authService from "../services/auth.service";
import StaffService from './Manager/StaffService'
import { RoomService } from './Manager/RoomService'
import { ReservationService } from './Receptionist/ReservationService'
import { BillingService } from './Receptionist/BillingService'
import GuestService from './Receptionist/GuestService'
import { Home } from './Home'


const NavBar = () => {
    const navigate = useNavigate();
    const [showManagerHome, setShowManagerHome] = useState(false);
    const [showOwnerHome, setShowOwnerHome] = useState(false);
    const [showReceptionistHome, setShowReceptionistHome] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = authService.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setShowOwnerHome(user.roles.includes("ROLE_OWNER"))
          setShowManagerHome(user.roles.includes("ROLE_MANAGER"));
          setShowReceptionistHome(user.roles.includes("ROLE_RECEPTIONIST"));
        }
    }, []);

    const logOut = () => {
        authService.logout();
        // navigate(-1)
        window.location.href="/"
      };


    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow" style={{borderBottom:"solid 1px white"}}>
            <div className="container-fluid">  
                <a className="navbar-brand" href='/'> HMS </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {
                        showManagerHome && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page"  href="/staff">Manage Staff</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/room">Manage Room</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/inventory">Manage Inventory</a>
                                </li>
                            </ul>
                        )
                    }
                    {
                        showOwnerHome && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="#">Owner</a>
                                </li>
                            </ul>
                        )
                    }
                    {
                        showReceptionistHome && (
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/reservation">Reservation</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/payment">Billing</a>
                                </li>
                            </ul>
                        )
                    }
                    {/* Logout Button */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    {
                        currentUser ? (
                            <div className="d-flex">
                                <div className="btn-group m-2">
                                    <a className="btn btn-outline-secondary">{currentUser.firstName} {currentUser.lastName}</a>
                                    <a className="btn btn-outline-secondary">{currentUser.roles}</a>
                                    <a className="btn btn-outline-danger" onClick={logOut}>Logout</a>
                                </div>
                                {/* <a className="btn btn-outline-danger  justify-content-end m-2" onClick={logOut}>Logout</a> */}
                            </div>
                        ):(
                            <div className="d-flex">
                                <Link className="btn btn-outline-primary  justify-content-end m-2" to={"/login"}>Login</Link>
                                <Link className="btn btn-outline-primary  justify-content-end m-2" to={"/register"}>Registration</Link>
                            </div> 
                        )
                    }
                </div>
            </div>
        </nav>
        <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/login" element={<LogIn/>} />
          <Route exact path="/register" element={<Registration/>} />
          {/* <Route exact path="/profile" element={<Profile/>} /> */}
          <Route path="/owner" element={<OwnerHome />} />
          <Route path="/manager" element={<ManagerHome/>} />
          <Route path="/receptionist" element={<ReceptionistHome/>} />
          <Route path="/staff" element={<StaffService/>} />
          <Route path="/room" element={<RoomService/>} />
          <Route path='/guest' element={<GuestService/>}/>
          <Route path="/reservation" element={<ReservationService/>} />
          <Route path='/billing' element={<BillingService/>}/>
        </Routes>
      </div>
      </>
    )
}

export default NavBar