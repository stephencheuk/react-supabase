import { useState, useEffect } from "react";
//import { ItemsContext } from "../ItemsContext";
import { supabase } from "../supabaseClient";
import VideoItem from "./VideoItem";
import UpdateVideo from "./UpdateVideo";

export default function ActiveList() {

  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  // get all active items by the user
  const getVideos = async () => {
    setLoading(true);
    try {
      // get the user currently logged in
      const user = supabase.auth.user();

      const { error, data } = await supabase
        .from("videos") //the table you want to work with
        //.from("todo") //the table you want to work with
        //.select("name, description, tags, url") //columns to select from the database
        .select("*") //columns to select from the database
        .order("id", { ascending: false }); // sort the data so the last item comes on top;

      if (error) throw error; //check if there was an error fetching the data and move the execution to the catch block

      if (data) setVideos(data);

    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const [openModal, setOpenModal] = useState(false);

  const [updateData, setUpdateData] = useState({
    item: "",
    id: null,
  });

  useEffect(() => {
    // call getVideos when the user is authoziated
    supabase.auth.user() !== null && getVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : videos.length < 1 ? (
        <p className="text-center m-5"> Nothing to display </p>
      ) : (
        videos.map((item, index) => (
          <VideoItem
            handleEdit={(prevValue) => {
              setOpenModal(true);
              setUpdateData({
                item: prevValue.item,
                id: prevValue.id,
              });
            }}
            data={item}
            key={index.toString()}
          />
        ))
      )}

      <UpdateVideo
        open={openModal}
        setOpen={setOpenModal}
        item={updateData.item}
        id={updateData.id}
      />
    </div>
  );
}