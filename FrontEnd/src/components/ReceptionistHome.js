import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import authService from "../services/auth.service";

const ReceptionistHome = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getReceptionistHome().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

          console.log(_content)

          if(error.response.status === 401 || error.response.status === 403){
            alert("Unauthorized")
            authService.logout();
            window.location.replace("/")
          }

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container" style={{marginTop:"100px"}}>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        <div className="col">
          <a className="card h-100" href="/reservation">
            <img src="img/room1.jpg   " className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Search Room / Make Reservation</h5>
                <p className="card-text"></ p>
              </div>
          </a>
        </div>
        <div className="col">
          <a className="card h-100" href="/billing">
            <img src="img/pay.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Billing</h5>
                <p className="card-text"></p>
              </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistHome;