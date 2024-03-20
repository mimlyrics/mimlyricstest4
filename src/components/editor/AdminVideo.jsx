import {useState, useEffect} from "react";

useEffect(() => {
  const getVideo() => {
    const videos = await axios.post("/upload/video/:category", {headers: {withCredentials: true}});
  }
  getVideo();
})

const AdminVideo = () => { 
  const [videos, setVideos] = useState([]);
  const [video, setVideo] = useState("");
  return (
    <section>
      <div>
        <h1>Admin DashBoard</h1>
      </div>
    </section>
  )
}

export default AdminVideo
