import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const SEARCH_USER_URL = "/api/v1/room/search"
const AdminRoom = () => {
  const [logo, setLogo] = useState("");
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [searchRooms, setSearchRooms] = useState(null);
  useEffect(() => {
    const getRoomData = async () => {
        try {
            const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
            console.log(res.data.rooms);
            setRooms(res.data.rooms);
        }catch(err) {
            console.log(err);
        }
    }
    getRoomData();
  }, [])

  const searchRoom = async (e, searchId) => {
    e.preventDefault();
    try {
        const searchroom = await axios.get(`${SEARCH_USER_URL}${searchId}`, {headers: {withCredentials: true, "Content-Type": "application/json"}});
        console.log(searchroom.data);
        setSearchRooms(searchroom.data.roomx);
    }catch(err) {
        console.log(err?.data?.message);
        setErrMsg(err?.data?.message);
    }
  }


  const deleteRoom = async (name) => {    
    try {
        await axios.delete(`${ROOM_URL}/${name}`, {headers: {withCredentials: true}});
        setRooms(rooms.filter(room => room.name !== name));
    }catch(err) {
        console.log(err);
    }
  }

  return (
    <>
    { searchRooms ?

    <section>
        <h1 className="text-center font-bold py-3 text-blue-600 bg-indigo-200">Room found</h1>
        <button className=" m-1 p-3 bg-indigo-300 rounded-md" onClick={()=>setSearchRooms(null)}>All Rooms</button>
        <div className="mx-1">
            <input onKeyDown={(e)=>(e.key === "Enter" ? searchRoom(e,searchId) : null)} placeholder="name/logo" className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button  onClick={(e) => searchRoom(e, searchId)} className="h-11 w-20 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
        </div>

        <div className="my-3">
            <Link  to= "/admin/room/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-500" >Add a Room</Link>
        </div>
        <ul className="md:hidden">
            {searchRooms.map(room => {
                return (
                    <div key={room._id} className="border-b-2 text-[17px] font-medium py-3">
                        <p className="flex text-gray-800">Name: <p className="ml-2 text-blue-900">{room.name}</p></p>
                    {room.logo ? <img src={room.logo} className=" mx-3 w-14 h-14 rounded-full" alt="X"/> : <p>X</p>}
                        <div className="mt-3">
                            <button ><Link  to= {`/admin/room/edit?roomName=${room.name}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                            <button onClick={()=>deleteRoom(room.name)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                        </div>                        
                    </div>
                )
            })}          
        </ul>
        <table className=" mx-1 overflow-hidden  invisible md:visible  bg-zinc-100 my-3">
            <thead className=" flex border-b-2 border-blue-200">
                <tr className=" mx-1 flex space-x-40">
                    <th>Name</th>
                    <th>Logo</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="">
             {searchRooms.map(room=> {
                return (
               
                <tr key={room._id} className=" mx-1 flex space-x-28 my-2 mb-6 border-b-2 ">
                    <td>{room.name}</td>
                    {room.logo ? <img src={room.logo} className="w-14 h-14 rounded-full" alt="X"/> : <p>X</p>}
                    <td><Link  to= {`/admin/room/edit?roomName=${room.name}`}  className=" w-6 h-2 p-2 border shadow rounded-lg bg-green-300" >Edit</Link> </td>
                    <button onClick={()=>deleteRoom(room.name)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>              
                </tr>
                )
             })}
            </tbody>
        </table>    
    </section>
    :
    <section className="mx-1 md:ml-52 lg:ml-64">
        <div className="my-1 md:w-[50%]">
            <h1 className=" text-lg md:text-xl text-center bg-blue-200 font-semibold">Admin Rooms Management*</h1>
        </div>

        <div>
            <input onKeyDown={(e)=>(e.key === "Enter" ? searchRoom(e,searchId) : null)} placeholder="name/logo" className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button  onClick={(e) => searchRoom(e, searchId)} className="h-11 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
        </div>

        <div className="my-3">
            <Link  to= "/admin/room/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-500" >Add a Room</Link>
        </div>

        <div className="font-bold text-lg ">
            <h1>Room Info</h1>
        </div>

        <ul className="md:hidden">
            {rooms.map(room => {
                return (
                    <div key={room._id} className="border-b-2 text-[17px] font-medium py-2">
                        <p className="flex text-gray-800">Name: <p className="ml-2 text-blue-900">{room.name}</p></p>
                        {room.logo ? <img src={room.logo} className=" mx-3 w-14 h-14 rounded-full" alt="X"/> : <p>X</p>}
                        <div className="mt-3">
                            <button className="  w-20 p-2 border shadow rounded-lg bg-green-200 hover:bg-green-400 hover:-translate-y-[2px] focus:ring-2 focus:ring-green-400"><Link  to= {`/admin/room/edit?roomName=${room.name}`}  >Edit</Link> </button>
                            <button className="  w-20 ml-4 p-2 border shadow rounded-lg bg-red-300 hover:bg-red-500 hover:-translate-y-[2px] focus:ring-2 focus:ring-red-400" onClick={()=>deleteRoom(room.name)}  >Delete</button>
                        </div>                        
                    </div>
                )
            })}          
        </ul>
        <table className="overflow-hidden  invisible md:visible  bg-zinc-100 my-3">
            <thead className=" flex border-b-2 border-blue-200">
                <tr className=" mx-3 flex space-x-40">
                    <th>Name</th>
                    <th>Logo</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="">
             {rooms.map(room=> {
                return (
    
                <tr key={room._id} className=" w-screen mx-3 flex my-2 mb-6 border-b-2 ">
                    <td className="">{room.name}</td>
                    {room.logo ? <img src={room.logo} className=" mx-3 w-14 h-14 rounded-full" alt="X"/> : <p>X</p>}          
                    <td><Link  to= {`/admin/room/edit?roomName=${room.name}`}  className=" w-6 h-2 p-2 border shadow rounded-lg bg-green-300" >Edit</Link> </td>
                    <button onClick={()=>deleteRoom(room.name)} className=" ml-2 p-2 border shadow rounded-lg bg-red-400" >Delete</button>              
                </tr>
                )
             })}
            </tbody>
        </table>

    </section> }
    </>
  )
}

export default AdminRoom
