import { FaX } from "react-icons/fa6";
import axios from "../api/axios";
const MESSAGE_URL = "/api/v1/message";
const Message = ({ userId, image, phone, message}) => {

  let isCurrentUser = false;
  //console.log("MESSSAGE HERE:  ", message);
  //console.log("Phone___: ", phone);

  if(message.user === phone) {
    isCurrentUser = true
  }
  //console.log(message.user, message.avatar, phone);
  //console.log(image);

  const deleteMsg = async (messageId) => {   
    
    await axios.delete(`${MESSAGE_URL}/${messageId}`, {headers: {withCredentials: true}});
   }

  return ( 
    <section className=" ">
    {
      isCurrentUser ? 
      <div className="ml-5 w-[98%] p-1 rounded-md mb-1 text-blue-950 bg-violet-200">
        <div className="font-medium rounded-full bg-slate-100">
          {message? <h1 className="ml-3">{message.username}</h1> : null}
        </div>
        <div className="flex my-1">
          {message ? <img className="w-9 h-9 md:w-11 md:h-11 md:text-lg rounded-full" src={message.avatar} alt="kal"/> : null}
          {message? <p className="ml-3">{message.text}</p> : null}
          <FaX onClick={()=>deleteMsg(message.id)} className=" cursor-pointer absolute w-4 h-4 left-80 text-red-400 hover:text-red-600 "/>
        </div>
      </div>     
      : 
      <div className=" w-[98%] p-1 rounded-md mb-1 md:text-lg text-blue-950 bg-fuchsia-200">
        <div className="font-medium rounded-full bg-slate-100">
          <h1 className="ml-3">{message.username}</h1>
        </div>
        <div className="flex my-1">
          {message.avatar ? <img className="w-9 h-9 md:w-11 md:h-11 rounded-full" src={message.avatar} alt="kal"/> : null}
          <p className="ml-3 ">{message.text}</p>    
        </div>
      </div>
    }
    </section>    
  )
}

export default Message