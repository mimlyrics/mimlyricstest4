import {useState, useEffect, useRef} from 'react';
import queryString from "query-string";
import io from "socket.io-client";
const ENDPOINT = "ws://localhost:5000";
import { useSelector } from "react-redux";
import Infobar from "./Infobar";
import Input from './Input';
import RecentMessages from './RecentMessages';
import { useMimlyrics } from '../context/AppProvider';
import axios from '../api/axios';
const CONVERSATION_URL = "/api/v1/conversation";
const ROOM_URL = "/api/v1/room"
const MESSAGE_URL = "/api/v1/message";
const IMAGE_URL = "/api/v1/upload/avatar";
const Chat = () => {
  //const {message, messages, setMessage, sendMessage} = useMessage();
  var [phone, setPhone] = useState("");
  var [room, setRoom] = useState("");
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState("");
  const [conversations, setConversations] = useState([]);
  const [socketId, setSocketId] = useState("");
  const [files, setFiles] = useState(null);
  const socket = useRef(io(ENDPOINT));
  const [errMsg, setErrMsg] = useState("");
  var { _id, phone, firstName} = useSelector((state) => state.auth.userInfo);
  //console.log(useSelector((state) => state.auth));
  const [image, setImage] = useState("");
  const [userId, setUserId] = useState("");
  const [emoji, setEmoji] = useState("");
  const {isActiveModalNavbar} = useMimlyrics();
  useEffect(() => {
    async function getImage() {
      try {
        setUserId(_id);
        const res = await axios.get(`${IMAGE_URL}/${userId}`, {headers: {withCredentials: true}});
        //console.log("resss ", res.data.user.avatar);
        setImage(res.data.user.avatar);
      }catch(err) {
        console.log(err);
      }
    }
    getImage();
  }, [userId]) 
  //console.log("image: ", image);
  useEffect(() => {
    socket.current = io(ENDPOINT);
  }, []);

  // get phone and room
  useEffect(() => {
    const addPlus = "+";
    var { phone, room } = queryString.parse(location.search);
    if (phone) {
      if (phone.startsWith(" ")) {
        phone = addPlus.concat(phone.trim());
        console.log(phone);
      }
    }
    setRoom(room);
    setPhone(phone);
    //console.log("phone: " + phone + "room: "+ room);
    socket.current.emit("join", {phone: phone, room: room, avatar:image, username: firstName }, () => {});
    socket.current.on('getUser', ({users}) => {
      //console.log(users);
      //setSocketId(user.id);
    });
    return () => {
      socket.current.on('disconnect', () => {
        socket.current.off();
      });
    }
  }, [ENDPOINT, location.search]);

  //console.log("soketId: ", socketId);

  //Get Conversation
  useEffect(() => {
    const getConversationId = async () => {
      try {
        const res = await axios.get(`${CONVERSATION_URL}/${phone}`,  {headers: {withCredentials: true}});
        //console.log("RES: ", res.data);
        const conversationArrId = res.data.conversation.find(conv => conv.room === room);
        const conversationArr = res.data.conversation.filter(conv => conv.room === room);
        setConversations(conversationArr);
        setConversationId(conversationArrId._id);
        //console.log("CC: ", conversationId);
      }catch(err) {
        //console.log(err);
        setErrMsg(err?.data?.message);
      }
    }
    getConversationId()
  }, [messages])
  
  useEffect(() => {
    socket.current.on('message', (message) => {
      setMessages((previousMessages) => {
        return [...previousMessages, message];
      })
    })
  }, [messages])

  // function for sending Message
  async function sendMessage(e) {
    e.preventDefault();
    /*socket.current.emit("sendMessage", {
      from: phone,
      to: room,
      text: message
    })*/
 
    try {
      if (files) {
          const formData = new FormData();
          for(let i=0;i<files.length; i++) {
            formData.append("files", files[i])
          }
          console.log(files);
          formData.append("conversationId", conversationId);
          formData.append("text", message);
          formData.append("from", phone);
          formData.append("to", room);
          formData.append("avatar", image)
          formData.append("username",firstName);
          const res = await axios.post(MESSAGE_URL, formData, {headers: {withCredentials: true}} );
          //console.log(res.data);
        }
        else {
          console.log("MESSAGE: ", message);
          const savedMessage = await axios.post(MESSAGE_URL, 
              {conversationId: conversationId, from: phone, to: room, text: message, avatar: image, username: firstName}, 
              {headers: {withCredentials: true }});
          //console.log(savedMessage);
          socket.current.emit("sendMessage", 
            {from: phone, to: room, text:message, avatar: image, username: firstName}, 
              () => { setMessage(''), setEmoji('') } );
        }
      
    }catch(err) {
        //console.log("err: ",err);
        setErrMsg(err?.data?.message);
      }
  }

    const handleEmojiClick = (e) => {
      let sym = e.unified.split("-");
      let codesArray = [];
      sym.forEach((el) => codesArray.push("0x" + el));
      setEmoji(String.fromCodePoint(...codesArray));
      //console.log("Message: "+ message);
      setMessage(emoji+message);
      setMessage(message);
      //console.log("emoji: ", emoji);
      //console.log("MMM: ", message);
    }

  //console.log("messagesX: ", messages);

  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60 " :" mx-2 md:ml-[23%] lg:md:ml-[24%]" }>
     {errMsg ? <div className='text-red-500 font-medium'><h1>{errMsg}</h1></div> : null }
      <Infobar firstName={firstName}/>
      <RecentMessages files={files} conversationId={conversationId} room={room} messages={messages} setMessages={setMessages} image={image} userId={userId} message={message} phone={phone}/>
      <Input handleEmojiClick={handleEmojiClick} files={files} conversationId={conversationId} room={room} messages={messages} message={message} setMessage={setMessage} sendMessage={sendMessage} setFiles={setFiles} phone={phone}/>
    </section>
  );
}

export default Chat