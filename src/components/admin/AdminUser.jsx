import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { selectCurrentToken } from "../../slices/auth/authSlice";
import { useSelector } from "react-redux";
import axios from "../api/axios";
const USER_PROFILE_URL = "/api/v1/jwt/profile";
const DELETE_USER_URL = "/api/v1/jwt/delete";
const AdminUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPasswrd] = useState("");
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [searchUsers, setSearchUsers] = useState(null);
  const token = useSelector(selectCurrentToken);
  useEffect(() => {
    const getUserData = async () => {
        try {
            const res = await axios.get(USER_PROFILE_URL, {headers: {withCredentials: true, 
                Authorization: `Bearer ${token}`}});
            console.log(res.data.users);
            console.log(res.data);
            setUsers(res.data.users);
        }catch(error) {
            setErrMsg(error?.response?.data?.message);
            console.log("error: ", error?.data);
        }
    }
    getUserData();
  }, [])

  const searchUser = async (e, searchId) => {
    e.preventDefault();
    try {
        const searchuser = await axios.get(`${USER_PROFILE_URL}/${searchId}`, {headers: {withCredentials: true}});
        console.log(searchuser.data);
        setSearchUsers(searchuser.data.users);
    }catch(err) {
        console.log(err?.data?.message);
        setErrMsg(err?.data?.message);
    }
  }


  const deleteUser = async (userId) => {    
    try {
        await axios.delete(`${DELETE_USER_URL}/${userId}`, {headers: {withCredentials: true}});
        setUsers(users.filter(user => user._id !== userId));
    }catch(err) {
        console.log(err);
    }
  }

  return (
    <div>
    { searchUsers ?

    <section>
        <h1 className="text-center font-bold py-3 text-blue-600 bg-indigo-200">User found</h1>
        <button className="p-3 bg-indigo-300 rounded-md" onClick={()=>setSearchUsers(null)}>All Users</button>
        <div className="mx-1">
            <input onKeyDown={(e)=>(e.key === "Enter" ? searchUser(e,searchId) : null)} placeholder="search..." className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button  onClick={(e) => searchUser(e, searchId)} className="h-11 w-20 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
        </div>

        <div className="my-3">
            <Link  to= "/admin/user/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-500" >Add a Room</Link>
        </div>
        <ul className="md:hidden">
            {searchUsers.map(user => {
                return (
                    <div key={user._id} className="border-b-2 text-[17px] font-medium py-3">
                        <p className="flex text-gray-800">First Name: <p className="ml-2 text-blue-900">{user.firstName}</p></p>
                        <p className="flex text-gray-800">Last Name: <p className="ml-2 text-blue-900">{user.lastName}</p></p>
                        <p className="flex text-gray-800">Email: <p className="ml-2 f text-blue-900">{user.email}</p></p>
                        <p className="flex text-gray-800">Phone: <p className="ml-2 text-blue-900">{user.phone}</p></p>
                        <p className="flex text-gray-800">Avatar: <p className="ml-2 text-blue-900">{user.avatar}</p></p>
                        <p className="flex text-gray-800">Admin/Editor:</p> 
                        <div className="flex space-x-2 text-gray-800">
                            <p>{user.role.isAdmin}</p>
                            <p>{user.role.isEditor}</p>
                        </div>
                        <div className="mt-3">
                            <button><Link onClick={e=>!user._id ? e.preventDefault() : null}  to= {`/admin/user/edit?userId=${user._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                            <button onClick={()=>deleteUser(user._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                        </div>                        
                    </div>
                )
            })}          
        </ul>
        <table className=" overflow-hidden  invisible md:visible  bg-zinc-100 my-3">
            <thead className=" flex border-b-2 border-blue-200">
                <tr className=" flex space-x-40">
                    <th>firstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Admin/Editor</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="">
             {searchUsers.map(user=> {
                return (
                <tr key={user._id} className=" flex space-x-28 my-2 mb-6 border-b-2 ">
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <div className="flex space-x-2">
                        <td>{user.role.isAdmin}</td>
                        <td>{user.role.isEditor}</td>
                    </div>
                    <td><Link onClick={e=> !user._id ? e.preventDefault() : null}  to= {`/admin/user/edit?userId=${user._id}`}  className=" w-6 h-2 p-2 border shadow rounded-lg bg-green-300" >Edit</Link> </td>
                    <button onClick={()=>deleteUser(user._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>              
                </tr>
                )
             })}
            </tbody>
        </table>    
    </section>
    :
    <section className={errMsg? " flex flex-col h-[100vh] items-center justify-center ": "mx-1"}>
        {errMsg ? 
            <div className="text-center border shadow rounded-md text-lg 
                md:text-2xl font-bold text-gray-800 bg-violet-100">
                <div className="relative w-[80vw] h-[80vh]">
                    <h1 className=" absolute top-[35vh] mx-4 md:mx-60">{errMsg}</h1>  
                    <h1 className=" text-red-500 top-[50vh] absolute mx-4 md:mx-96">401</h1>    
                </div>
            </div> : null
        }
        <div className={errMsg ? "hidden": ""}>        
            <div className="my-1 md:w-[50%]">
                <h1 className=" text-lg md:text-xl text-center bg-blue-200 font-semibold">Admin User's Management DashBoard</h1>
            </div>

            <div>
                <input onKeyDown={(e)=>(e.key === "Enter" ? searchUser(e,searchId) : null)} placeholder="firstName/lastName/phone/email" className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
                <button  onClick={(e) => searchUser(e, searchId)} className="h-11 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
            </div>

            <div className="my-3">
                <Link  to= "/admin/user/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-500" >Add User</Link>
            </div>

            <div className="font-bold text-lg ">
                <h1>User Info</h1>
            </div>

            <ul className="md:hidden">
                { users? users.map(user => {
                    return (
                        <div key={user._id} className="border-b-2 text-[17px] font-medium py-3">
                            <p className="flex text-gray-800">First Name: <p className="ml-2 text-blue-900">{user.firstName}</p></p>
                            <p className="flex text-gray-800">Last Name: <p className="ml-2 text-blue-900">{user.lastName}</p></p>
                            <p className="flex text-gray-800">Email: <p className="ml-2 f text-blue-900">{user.email}</p></p>
                            <p className="flex text-gray-800">Phone: <p className="ml-2 text-blue-900">{user.phone}</p></p>
                            <p className="flex text-gray-800">Avatar: <img src={user.avatar} alt="X" className=" mb-2 ml-40 w-11 rounded-full"/></p>    
                            <p className="flex text-gray-800">Admin/Editor: </p>    
                            <div className="flex text-gray-800 space-x-2">
                                <td>{user.role.isAdmin}</td>
                                <td>{user.role.isEditor}</td>
                            </div>
                            <div className="mt-3">
                                <button><Link onClick={e=> !user._id ? e.preventDefault(): null}  to= {`/admin/user/edit?userId=${user._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                                <button onClick={()=>deleteUser(user._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                            </div>                        
                        </div>
                    )
                }) : null}          
            </ul>
            <table className="invisible md:visible  bg-zinc-100 my-3">
                <thead className=" flex border-b-2 border-blue-200">
                    <tr className=" mx-3 flex space-x-40">
                        <th>firstName</th>
                        <th>LastName</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Avatar</th>
                        <th>Admin/Editor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                {users? users.map(user=> {
                    return (
                    <tr key={user._id} className=" w-screen mx-3 flex my-2 mb-6 border-b-2 ">
                        <td className="">{user.firstName}</td>
                        <td className="ml-40">{user.lastName}</td>
                        <td className="ml-40">{user.email}</td>
                        <td className="ml-40">{user.phone}</td>
                        <img src={user.avatar} alt="X" className=" mb-2 ml-40 w-11 rounded-full"/>                   
                        <div className="flex">
                            <td>{user.role.isAdmin}/</td>  
                            <td>{user.role.isEditor}</td> 
                        </div>                        
                        <td><Link onClick={e=>!user._id ? e.preventDefault() : null} to= {`/admin/user/edit?userId=${user._id}`}  className=" w-6 h-2 p-2 border shadow rounded-lg bg-green-300" >Edit</Link> </td>
                        <button onClick={()=>deleteUser(user._id)} className=" ml-2 p-2 border shadow rounded-lg bg-red-400" >Delete</button>              
                    </tr>
                    )
                }): null}
                </tbody>
            </table>
        </div>

    </section> }
    </div>
  )
}

export default AdminUser
