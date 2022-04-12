import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { ReservationTable } from "./Owner/ReservationTable";
const OwnerHome = () => {
  const [content, setContent] = useState("");
  useEffect(() => {
    UserService.getOwnerHome().then(
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
        setContent(_content);
      }
    );
  }, []);
  return (
    <ReservationTable/>
  );
};
export default OwnerHome;