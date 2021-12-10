import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";

export default function Home() {
  const [item, setItem] = useState("");
  const { updatePassword, updating } = useContext(ItemsContext);
  const history = useNavigate();

  useEffect(() => {
    if (supabase.auth.user() === null) {
      history("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await updatePassword(item);
      setItem("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-xs-12 col-lg-8">
          <div className="card-title text-center mb-3">
            <h4>Settings</h4>
          </div>
          <div className="card">
            <div className="card-header">
              <form onSubmit={handleUpdatePassword} className="d-flex">
                <div className="col flex-auto">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="item"
                    required
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    placeholder="Enter new item"
                  />
                </div>
                <div>
                  <button disabled={updating} className="btn btn-primary btn-lg fit">
                    {updating ? "Updating.." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}