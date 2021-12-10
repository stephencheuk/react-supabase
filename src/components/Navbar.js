import React, { useContext } from "react";
import { ItemsContext } from "../ItemsContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const location=window.location;

  const history = useNavigate();

  const { logOutAccount } = useContext(ItemsContext);

  const gotoSettings = () => { history("/settings"); };
  const gotoTodo = () => { history("/"); };
  const gotoVideos = () => { history("/video"); };

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div>
          <p className="navbar-brand">Todo App</p>
        </div>
        {
          location.pathname !== "/login" && (
            <div>
              <button onClick={gotoTodo} className=" btn btn-primary fit">Todo</button>
              <button onClick={gotoVideos} className=" btn btn-primary fit">Video</button>
            </div>
          )
        }
        {
          location.pathname !== "/login" && (
            <div>
              <button onClick={gotoSettings} className=" btn btn-primary fit">Setting</button>
              <button onClick={logOutAccount} className=" btn btn-primary fit">Logout</button>
            </div>
          )
        }
      </div>
    </nav>
  );
}