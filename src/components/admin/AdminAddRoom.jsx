import{useState, useRef, useEffect} from "react";

import { FaUpload } from "react-icons/fa6";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const AdminAddRoom = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [file, setFile] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState("");
  const [nameFocus, setNameFocus] = useState(false);
  const [fileFocus, setFileFocus] = useState(false);
  const nameRef = useRef();

  useEffect(() => {
    nameRef.current.focus();
  }, [])

  const handleChangeName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    setErrMsg("");
  }

  const handleChangeFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setErrMsg("");
  }

  const addRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("logo", file);
    try {
        const postRoom = await axios.post(ROOM_URL, formData , {headers: {withCredentials: true}});
        if(postRoom) {
            setSuccess(`${name} has been added successfully`);
            setName("");
            setFile();
            setErrMsg("");
        }
    }catch(err) {
        console.log(err?.response?.data);
        setErrMsg(err?.response?.data);
        setSuccess("");
    }
  }
  return (
    <section className=" mx-1 py-1 md:mx-48 lg:mx-64">
        <div className="text-center bg-indigo-300 py-2 ">
            <h1>Admin Add Room</h1>
        </div>
        <form className="py-2 mx-6" onSubmit={(e)=>addRoom(e)}>
            {errMsg && !nameFocus && !fileFocus? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
            {success && !nameFocus && !fileFocus? <div className="font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}
            <div className=" flex space-x-2 py-3">
                <label className="mt-2 text-lg" htmlFor="name">Name </label>
                <input ref={nameRef} value={name} onChange={e=>handleChangeName(e)} type="text" className="border text-lg p-2 text-blue-600" onFocus={()=>setNameFocus(true)} onBlur={()=>setNameFocus(false)}/>
            </div>
            <div className="flex space-x-3 py-3 text-blue-900">
                <label htmlFor="logo" className="font-medium text-lg ml-7"><FaUpload className="cursor-pointer w-7 h-11"/>Upload</label>
                <input id="logo" accept="image/*" className="" type="file" onChange={e=>handleChangeFile(e)} onFocus={()=>setFileFocus(true)} onBlur={()=>setFileFocus(false)} hidden/>
                {file ? <div className="flex-col space-y-4 text-gray-900"><p>Filename: {file.name}</p><p>Size: {file.size}</p> </div>: null}
            </div>
            <button className=" ml-6 p-4 w-40 text-lg border shadow rounded-md bg-indigo-200 hover:translate-y-1 hover:bg-indigo-400" type="submit">Confirm </button>
        </form>
    </section>
  )
}

export default AdminAddRoom
