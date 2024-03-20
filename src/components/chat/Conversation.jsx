import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room"
const Conversation = ({conversation, phone, i}) => {
  var [logo, setLogo] = useState("");
  useEffect(() => {
    const getRoomLogo = async () => {
      const res = await axios.get(`${ROOM_URL}/${conversation.room}`, {headers: {"Content-Type": "application/json"}});
      let {logo} = res.data.roomx;
      setLogo(logo);
    }
    getRoomLogo();
  }, [])

  return (  
    <div className=" mb-1 shadow rounded-md p-3 cursor-pointer text-lg md:text-xl
       bg-slate-50 hover:bg-slate-200">
      <Link  onClick={e=>(!conversation.room || !phone) ? e.preventDefault() : null} 
        to={`/chat?phone=${phone}&room=${conversation.room}`} >
         <div className="flex space-x-7">
          {logo ? <img src={logo} alt="x" className="rounded-full w-11 h-11"/> : <p></p>}
          <p>{conversation.room}</p>
         </div>
      </Link> 
    </div>
  )
}

export default Conversation
