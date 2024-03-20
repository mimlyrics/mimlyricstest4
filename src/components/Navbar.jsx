import { useState, useEffect, useContext } from "react";
import {FaLanguage, FaList} from "react-icons/fa6";
import { FaAlignJustify } from "react-icons/fa6";
import {FaX} from "react-icons/fa6"
import { FaUser } from "react-icons/fa6";
import { FaMessage } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaMusic } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa6";
import { logout } from "../slices/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useLogoutMutation } from "../slices/auth/usersApiSlice";
import { IoMdLogOut, } from "react-icons/io";
import { FaRegistered } from "react-icons/fa6";
import { IoIosHelp, IoMdAlbums, IoMdHelp, IoMdLogIn, IoMdSave, IoMdSettings } from "react-icons/io";
import { Outlet } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { useMimlyrics } from "./context/AppProvider";
const IMAGE_URL = "/api/v1/upload/avatar";
import axios from "./api/axios";
import AudioLogo from "../assets/audiologo.png"
const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfile, setShowProfile] = useState(true);
  const [file, setFile] = useState();
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();  
  const {userInfo} = useSelector(state => state.auth);
  const [isRun, setIsRun] = useState(false);  
  const [logOutApiCall, {isLoading}] = useLogoutMutation();
  const [errMsg, setErrMsg] = useState("");
  const location = useLocation();
  const {pathname} = location;
  console.log(location);
  const {isActiveModalNavbar, setIsActiveModalNavbar} = useMimlyrics();

  //console.log("IS: ", isActiveModalNavbar);
  useEffect(() => {
    async function getImage() {
      if(userInfo) {
        const userId = userInfo._id;
        const res = await axios.get(`${IMAGE_URL}/${userId}`, 
          {headers: {withCredentials: true}});
        //console.log("resss ", res.data.user.avatar);
        setImage(res.data.user.avatar);
      }
    }
    getImage();
  }, [image, file, isRun]) 

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await logOutApiCall().unwrap();
      dispatch(logout());      
      navigate("/");
    }catch(err) {
      //console.log("huumm");
      console.log(err?.data?.message);
      setErrMsg(err?.data?.message);
    }
  }

  const handleProfile = async (e) => {
    try {
      e.preventDefault();  
      const userId = userInfo._id; 
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("userId", userId);
      const postPic = await axios.put(`${IMAGE_URL}/${userId}`, formData, 
        {headers: {withCredentials: true, "Content-Type": "multipart/form-data"}});
      setImage(postPic.data.user.profilePhoto);
      setIsRun(true);
      console.log(postPic);
    }catch(err) {
      console.log(err);
    }
  }

  const handleShowProfile = () => {
    setShowProfile(!showProfile);
  }

  const handleModalNavbar = async () => {
    setShowModal(!showModal); 
    setIsActiveModalNavbar(!showModal);        
  }

   return (    
      <div className=" z-50 md:w-[75%] lg:w-[65%]  ">
       <nav className=" w-[100vw] md:py-1 z-50 shadow shadow-blue-500 border bg-blue-200 h-16 relative md:flex-row md:justify-between">
        <div className=" mx-20 md:mx-32 mt-4 md:mt-3 text-[17px] flex md:text-lg">
          <img src={AudioLogo} className=" text-blue-700 w-7 h-7"/>
          <h1 className=" mt-1 text-sky-700 font-serif font-semibold shadow-sky-400 ">Mim Lyrics</h1>
        </div>
         {showModal ? (
           <div className=" absolute top-5 left-2 md:invisible">
             <button className="" onClick={() => handleModalNavbar()}>
               <FaX />
             </button>
           </div>
         ) : (
           <div className="absolute top-5 left-2 md:invisible">
             <button className="" onClick={() => handleModalNavbar()}>
               <FaAlignJustify />
             </button>
           </div>
         )}
        
            
         <div className=" invisible md:visible">
           <ul className=" mx-1 mt-1 px-3 absolute top-16 w-44 md:w-[19%] 
              lg:w-[19%] flex-col lg:text-lg bg-zinc-100 shadow-lg shadow-zinc-500">              
             <Link className="flex py-2 hover:bg-slate-200 " to="/">
               <FaHouse className=" ml-2 mr-3  "/>Home 
             </Link> <p className=""></p>
             { pathname === "/" ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null}

             <Link className="flex py-2 hover:bg-slate-200" to="/infochat">
              <FaMessage className=" ml-2 mr-3 "/>Let's Chat
           </Link><span className="border-b-2"></span>
            {pathname.includes("chat") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/lyric/category">
               <FaMusic className=" ml-2 mr-3  "/>Lyrics
             </Link><span className="border-b-2"></span>
             {pathname.includes("/lyric") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/albums">
               <IoMdAlbums className=" ml-2 mr-3  "/>Albums
             </Link><span className="border-b-2"></span>
             {pathname.includes("/album") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/video/category">
               <FaVideo className=" ml-2 mr-3 "/>Lyrics video
             </Link><span className="border-b-2"></span>
              {pathname.includes("/video") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/assistance">
               <IoMdHelp className="ml-2 mr-3"/> Assistance
             </Link><span className="border-b-2"></span>
             {pathname.startsWith("/assistance") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/settings">
                <IoMdSettings className="ml-2 mr-3"/> Settings
             </Link><span className="border-b-2"></span>
            {pathname.startsWith("/settings") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/help">
              <FaExclamation className="  "/> Help
             </Link><span className="border-b-2"></span>
             {pathname.startsWith("/help") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }

             <Link className="flex py-2 hover:bg-slate-200" to="/language">
             <FaLanguage className="w-5 h-5"/>Language</Link>
             <span className="border-b-2"></span>
             {pathname.startsWith("/language") ? <p className=" mx-2 border-b-4 border-blue-200  "></p> : null }
           </ul>          
         </div>

         {isLoading ? <h1 className="h-36 border">LOADING</h1> : null}

         {userInfo ? null : 
          <div className="text-gray-700 font-medium ">       
            <div className=" flex absolute top-5 right-44 md:right-[30%] ">
            <Link className=" flex hover:bg-slate-300 hover:border hover:rounded-full hover:text-indigo-800 w-24 hover:text-center " to="/register "> 
                <IoMdLogIn className=" mx-1 w-5 h-5 md:w-6 md:h-7"/>
                <p className=" ">Sign Up</p>
              </Link>
          </div>
          {pathname.startsWith("/register") ? <p className=" absolute right-[37%] top-12 md:right-[30%] md:top-[85%] w-20 h-1 bg-blue-400  "></p> : null }
         
            <div className=" flex absolute top-5 right-20 md:right-[20%] ">
            <Link className=" flex hover:bg-slate-300 hover:border hover:rounded-full hover:text-indigo-800 w-24 hover:text-center" to="/login "> 
                <IoMdLogIn className=" mx-1 w-5 h-5 md:w-6 md:h-7"/>
                <p className="  ">Sign In</p>
              </Link>
          </div>
           {pathname.startsWith("/login") ? <p className=" absolute right-[18%] top-12 md:right-[21%] md:top-[85%] w-20 h-1 bg-blue-400  "></p> : null }
         </div>  
         }

        {showProfile && userInfo ? 
          <div className=" absolute top-5 right-7 " onClick={handleShowProfile}>
            <FaUser className=" h-6 w-6 md:h-7 md:w-11 "/>
          </div> 
          : 
          <div className=" py-5 ">
        {userInfo ?  <div className="">
          <FaUser className=" absolute top-5 right-7  w-6 h-6 md:h-7 md:w-11 "
           onClick={handleShowProfile}/>
          
         <div  
           className=" absolute top-16 right-1 cursor-pointer bg-indigo-400 rounded-md w-[55vw] md:w-[25vw] "
          >
          <div className=" py-1 mx-2 ">
            
            {image ? 
              <div className="  font-medium my-1 text-xl">
                <img src={image} alt={userInfo.firstName.substring(0,1)}
                 className="rounded-full mt-1 mb-1 w-24 md:w-32 "/>
                <p className=" mx-3 text-gray-800  font-semibold ">{userInfo.firstName}</p>
              </div> : 
              <div className="">
                <div className="mb-2 flex flex-col">
                <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/>
                <button onClick={handleProfile} className=" mx-3 mt-1 shadow rounded w-20 h-7 p-1 bg-blue-300"><p className="text-large">
                <IoMdSave className=" w-5 h-5 md:w-7 md:h-7 "/>  
                  <p className=" absolute top-11 left-14 ">Save</p>
                </p></button>
              </div>  
            </div>}
        
            <div>
              <button className=" mx-3 shadow rounded w-24 h-7 p-1 mb-2 bg-green-300"><Link to="/profile" className="text-large text-center">
                Update Info
              </Link></button>
            </div>

            <div className=" relative" onClick={handleLogout}>
              <button className="mx-3 shadow rounded w-24 h-7 p-1 bg-red-300"><Link to="/logout" className="text-large text-center">
                <IoMdLogOut className=" w-5 h-5"/> <p className=" absolute top-1 left-9 ">Logout</p>
              </Link></button>
            </div>
          </div> 
         
         </div>
        </div> : null}
          </div>}         
       </nav>

       <section className="md:hidden ">
         {/** Hero section */}
         {showModal ? (
           <ul onClick={() => setShowModal(false)} className="absolute h-screen flex w-80 text-white font-medium text-lg flex-col shadow bg-blue-700 ">
            
            <div className=" py-3 hover:bg-blue-800">
             <Link className=" ml-20 " to="/">
               <FaHouse className="absolute left-14 "/>Home
             </Link> 
            </div>
            <p className=" w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20 " to="/infochat">
              <FaMessage className="absolute left-14  "/>Let's Chat
             </Link><span className="border-b-2"></span>
           </div>
           <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20  " to="/lyric/category">
               <FaMusic className="absolute left-14  "/>Lyrics
             </Link><span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20  " to="/albums">
               <IoMdAlbums className="absolute left-14  "/>Albums
             </Link><span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className=" ml-20 " to="/video/category">
               <FaVideo className="absolute left-14 "/>Lyrics video
             </Link><span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3  hover:bg-blue-800">
             <Link className="ml-20" to="/assistance">
               <IoMdHelp className="absolute left-14"/> Assistance
             </Link><span className="border-b-2"></span>
            </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20" to="/settings">
               <IoMdSettings className="absolute left-14"/> Settings
             </Link><span className="border-b-2"></span>
            </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link className="ml-20" to="/help">
              <FaExclamation className="absolute left-14  "/> Help
             </Link><span className="border-b-2"></span>
            </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>

            <div className=" py-3 hover:bg-blue-800">
             <Link to="/language" className=" ml-20  py-3">
             <FaLanguage className=" absolute left-14"/>Language</Link>
             <span className="border-b-2"></span>
             </div>
            <p className="w-80 h-[2px] bg-slate-100 "></p>
           </ul>
          
         ) : null}
        </section>
        <Outlet/>
      </div>    
   );
}

export default Navbar