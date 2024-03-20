import {useState, useEffect} from "react";
import { useMimlyrics } from "../context/AppProvider";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import axios from "../api/axios";
const CONVERSATION_URL = "/api/v1/conversation";
const ROOM_URL = "/api/v1/room"
import Room from "./Room";
const InfoChat = () => {
  const [conversations, setConversations] = useState([]);
  const {firstName, phone} = useSelector(state => state.auth.userInfo);
  const [showRooms, setShowRooms] = useState(false);
  const [rooms, setRooms] = useState(null);
  const [otherRooms, setOtherRooms] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSucces] = useState(""); 
  const {isActiveModalNavbar} = useMimlyrics();
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(`${CONVERSATION_URL}/${phone}`,  {withCredentials: true});
        setConversations(res.data.conversation);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getConversation()
  }, [phone])

  useEffect(() => {
    const getAllRooms = async () => {
      try {
        const res = await axios.get(ROOM_URL, {headers: {"Content-Type": "application/json"}});
        setRooms(res.data.rooms);
        console.log(rooms);
        //console.log(res.data);
        //console.log("EUill");
        let otherRoomx = [];
        let filterArray = [];
        for(let i=0; i<conversations.length; i++) {
          filterArray = rooms.find(room => room.name.toLowerCase() !== conversations[i].room.toLowerCase()); 
          otherRoomx.push(filterArray);     
        }
        //console.log(otherRoomx);
        setOtherRooms(otherRoomx)
      }catch(err) {
        setErrMsg(err?.data?.message);
        //console.log(errMsg);
      }      
    }
    getAllRooms();
  }, [phone, conversations])

  //console.log(conversations);

  const JoinClick = async (e) => {
    e.preventDefault();
    setShowRooms(!showRooms);
    console.log("has been clicked");
  }

  async function handleConversation(e, room) {
    e.preventDefault();
    try {
      if(room) {
        //console.log("ok");
        const conversation = await axios.post(CONVERSATION_URL,
          {sender: phone, room: room},
          {withCredentials: true});
        if(conversation) {
          setSucces(true);
        }
        return {conversation}
      }
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  }

  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60 ": " mx-1 md:w-[50%] md:ml-48 lg:ml-64 "}>

      {conversations ?
        <div className="">
          <div className="mb-5">
          {errMsg ? <p className="text-lg text-emerald-300">{errMsg}</p> : null}
            <h1 className=" flex justify-center text-center text-lg md:text-xl lg:text-2xl my-2">Your conversation <p className="ml-2 text-blue-800 font-extrabold md:text-xl lg:text-2xl">{firstName}</p> </h1>
            {conversations.map(conversation => {
              return <Conversation key={conversation._id} phone={phone} conversation={conversation} />
            })}
          </div>  
          <button onClick={e=>JoinClick(e)} className=" text-[18px] md:text-lg ml-20 shadow rounded-md p-3 
            bg-blue-200 hover:bg-blue-500 hover:translate-y-1" >Join other rooms
          </button>
            {showRooms ?
              <Room/> : null
            }
        </div> : 
        <div className="">
          <p>No conversation. Join a Mim Group to start chatting</p>
          <div className="mt-2">
            <button
              className="animation ease-out delay-300 translate-y-1 bg-indigo-200 text-lg shadow
               rounded-md w-64 h-11 hover:rounded-lg hover:bg-indigo-500 hover:translate-y-[2px] "
              type="submit"
            ></button>
          </div>
          <Room/>
        </div>}
    </section>
  )
}

export default InfoChat