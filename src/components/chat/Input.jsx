import { useState } from "react";
import {IoMdSend} from "react-icons/io";
import Picker from "emoji-picker-react";
import {BsEmojiSmileFill} from "react-icons/bs";
import { FaCamera } from "react-icons/fa6";
import axios from "../api/axios";
const Input = ({handleEmojiClick, message, files, setFiles, setMessage, sendMessage, phone, room}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");
  const handleEmojiPicker =  () => {
    setShowEmojiPicker(!showEmojiPicker);
  }

  //console.log("files: ", files);
  return (
    <section className=" md:w-[60vw] relative my-3 ">
      <form className="  ">
        <div className="absolute top-2 left-0 ">
          <BsEmojiSmileFill className="w-10 h-6" onClick={handleEmojiPicker}/>
          {showEmojiPicker && <Picker className="absolute top-5 " onEmojiClick={e=>handleEmojiClick(e,message)}/>}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          placeholder="Send a message..."
          className=" pl-9 py-2 bg-slate-100 text-gray-800 w-[90%] md:w-[65%] h-11 border shadow rounded"
        />
        <label htmlFor="media" className=" md:absolute md:left-[60%] absolute right-24 top-2 cursor-pointer">
          <FaCamera className=" absolute w-6 h-6"/>
          <input id="media" type="file" multiple onChange={e=>setFiles(e.target.files)} hidden/>
        </label>
        
      <button >
        <IoMdSend className="absolute -top-1 ml-1 w-11 h-14 " onClick={e=>sendMessage(e)}/>
      </button>
      </form>
    </section>
  );
}

export default Input;