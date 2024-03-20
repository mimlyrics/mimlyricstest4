import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const CONVERSATION_URL = "/api/v1/conversation";
const Room = () => {
  var [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);  
  const {phone, firstName} = useSelector(state => state.auth.userInfo);
  const [success, setSucces] = useState(false);
  const [errMsg, setErrMsg] = useState("")
  //console.log(phone, firstName);

  useEffect(() => {
    const getRooms = async () => {
      axios.get(ROOM_URL).then((response) => {
        //console.log(response.data);
        setRooms(response.data.rooms);
        setRoom(response.data.rooms[0].name);
      }).catch(err=> setErrMsg(err?.data?.message));
      
    };
    getRooms();
  }, []);
  //console.log("room", room);
  //console.log(rooms[0]);
  
  const onChangeRoom = (e) => {
    setRoom(e.target.value);
  }

  async function handleConversation(e) {
    e.preventDefault();
    if(room) {
      //console.log("ok");
      const conversation = await axios.post(CONVERSATION_URL,
        {sender: phone, room: room},
        {headers:{withCredentials: true, /*"Access-Control-Allow-Method": "GET, PUT, PATCH, DELETE, OPTIONS",*/ "my-custom-header": "abcd1234"}}, 
        
      );
      if(conversation) {
        setSucces(true);
      }
      return {conversation}
    }
  }

  return (
    <section className=" md:w-[60%] py-5 border shadow bg-slate-50 mt-2 md:ml-[23%] lg:ml-[24%] md:mx-3">
    {success ? <div className="delay-2 text-green-700 text-6xl">{success}</div>: null}
    {errMsg ? <div className="delay-2 text-red-700 text-6xl">{errMsg}</div>: null}
      <form onClick={handleConversation} className="mx-2">
        <div className="text-center text-xl">
          <h1 className="">Join a group to chat</h1>
        </div>
        <div className=" mt-2 md:mt-4">
          <div className=" mb-3 md:mb-5 ml-24 text-xl">
            <label className="" htmlFor="">Choose Room</label>
          </div>
          <select
            className=" text-center md:text-lg lg:text-xl ml-24 w-60 border shadow h-11"
            value={room}
            onChange={onChangeRoom}
          >
            {rooms.map((room) => {
              return (
                <option key={room._id} value={room.name}>
                  {room.logo? <img src={room.logo} className="w-11 h-11 rounded-full "/> : null} {room.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className=" mb-7 ml-28 mt-3 md:mt-5">
          <button
            className=" w-52 p-4 shadow rounded animation ease-out delay-300 translate-y-1 bg-indigo-200 hover:bg-indigo-300"
            type="submit"
          ><Link onClick={ e=>(!room || !phone) ? e.preventDefault() : null} to={`/chat?phone=${phone}&room=${room}`}>JOIN</Link></button>
        </div>
      </form>
    </section>
  );
}

export default Room