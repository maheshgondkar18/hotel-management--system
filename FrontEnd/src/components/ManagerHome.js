import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import authService from "../services/auth.service";

const ManagerHome = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getManagerHome().then(
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
          <a className="card h-100" href="/staff">
            <img src="img/emp.jpg   " className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Manage Staff</h5>
                <p className="card-text"></ p>
              </div>
          </a>
        </div>
        <div className="col">
          <a className="card h-100" href="/room">
            <img src="img/room1.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Manage Room</h5>
                <p className="card-text"></p>
              </div>
          </a>
        </div>
        <div className="col">
          <a className="card h-100" href="/inventory">
            <img src="img/inv.png" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Manage Inventory</h5>
                <p className="card-text"></p>
              </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ManagerHome;