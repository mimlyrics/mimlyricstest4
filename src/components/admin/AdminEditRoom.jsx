
import queryString from "query-string"
import {useState, useEffect, useRef} from "react";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room"
import { FaUpload } from "react-icons/fa6";
const AdminEditRoom = () => {
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [file, setFile] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [namex, setNamex] = useState("");
  useEffect(() => {
    const {roomName} = queryString.parse(location.search);
    setNamex(roomName);
  }, [namex])

  console.log("name: ", name);

  useEffect(() => {
    const getRoom = async () => {
        try {
            const res = await axios.get(`${ROOM_URL}/${namex}`, {headers: {withCredentials: true}});
            console.log(res.data);
            setName(res.data.roomx.name);
            setLogo(res.data.roomx.logo);
        }catch(err) {
            console.log(err?.data.message);
        }
    }
    getRoom();
  }, [namex])

  console.log("logo: ", logo);

  const handleChangeFile = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setErrMsg("");
  }

  const EditRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(file) {     
      formData.append("name", name);
      formData.append("logo", file);
    }else {
      formData.append("name", name);      
    }
    try {
        const editRoom = await axios.put(`${ROOM_URL}/${namex}`,  {headers: {withCredentials: true, "Content-Type": "multipart/form-data"}}, formData);
        if(editRoom) {
            setSuccess(`${name} has been added successfully`);
            setFile();
            setErrMsg("");
            setTimeout(() => {
              setSuccess("");
            }, [3000])
        }
    }catch(err) {
        console.log(err?.data?.message);
        setErrMsg(err?.response?.data?.message);
        setSuccess("");
    }
  }

  return (
    <section className=" mx-1 py-1 md:mx-48 lg:mx-64">
        <div className="text-center bg-indigo-300 py-2 ">
            <h1>Admin Edit Room</h1>
        </div>
        <form className="py-2 mx-6" onSubmit={(e)=>EditRoom(e)}>
            {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
            {success ? <div className="font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}
            <div className=" relative flex space-x-3 py-3 text-blue-900">
                <label htmlFor="logo" className="absolute top-24 left-20 font-medium text-lg ml-7"><FaUpload className="cursor-pointer w-7 h-11"/></label>
                <input id="logo" accept="image/*" className="" type="file" onChange={e=>handleChangeFile(e)}  hidden/>
                {logo ? <img src={logo} alt="X" className="w-32 h-32 rounded-full"/> : null}
                {file ? <div className="flex-col space-y-4 text-gray-900"><p>Filename: {file.name}</p><p>Size: {file.size}</p> </div>: null}
            </div>
            <div className=" flex space-x-2 py-3">
                <label className="mt-2 text-lg" htmlFor="name">Name </label>
                <input value={name} onChange={e=>setName(e.target.value)} type="text" 
                className="border text-lg p-2 text-blue-600" />
            </div>
            <button className=" ml-6 p-4 w-40 text-lg border shadow rounded-md bg-indigo-200 hover:translate-y-1 hover:bg-indigo-400" type="submit">Confirm </button>
        </form>
    </section>
  )
}

export default AdminEditRoom
