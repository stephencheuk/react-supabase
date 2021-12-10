import { useState } from "react";
//import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";

export default function UpdateVideos({ item, id, open, setOpen }) {
  const [newItem, setNewItem] = useState("");
  const [loading, setLoading] = useState(false);

  const updateVideo = async ({ item, id }) => {
    setLoading(true);
    try {
      const user = supabase.auth.user();

      const { error } = await supabase
        .from("todo")
        .update({ item })
        .eq("userId", user?.id)
        .eq("id", id); //matching id of row to update
      
      if (error) throw error;

      //await getActiveItems();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateVideo({ item: newItem, id });
    } catch (error) {
    } finally {
      setLoading(false);
      setNewItem("");
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <div className="update-modal">
          <div className="col-12 col-md-6 col-xl-4">
            <div className="card">
              <div className="card-header d-flex justify-content-end">
                <button
                  onClick={() => {
                    setNewItem("");
                    setOpen(false);
                  }}
                  className="icon-btn text-danger"
                >
                  X
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleUpdate}>
                  <div className="col w-100">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      name="item"
                      required
                      value={newItem || item}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Enter new item"
                    />
                  </div>
                  <div>
                    <button
                      disabled={loading}
                      className="btn btn-primary w-100 mt-3"
                    >
                      {loading ? "Updating.." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}