import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn } from "./components/login";
import NavBar from "./components/navbar";
import { Registration } from "./components/registration";
import { LeaveMgmt } from "./Temp/LeaveMgmt";


function App(props) {
  console.log(props)
  return (
    <div className="App">
        <NavBar/>
        {/* <LeaveMgmt/> */}
    </div>
  );
}

export default App;


