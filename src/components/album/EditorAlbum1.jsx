import {useState, useEffect, useRef} from "react";
import axios from "../api/axios";
import { useSelector } from "react-redux";
//import "./css/video.css";
import { FaUpload } from "react-icons/fa6";
const BASE_URL = "http://localhost:5000/api/v1";
import DatePicker from "react-datepicker";
import "react-datepicker/dist//react-datepicker.css"
//const BASE_URL = "https://mimlyricstest-api.onrender.com";
import {countries} from "country-data-list";
import { Link, useNavigate } from "react-router-dom";
const ALBUM_URL = "api/v1/album";
const POST_ALBUM_AUDIO_URL = "/api/v1/album/audios";
const EDIT_ALBUM_URL = "/api/v1/album/edit";
const EDIT_ALBUM2_URL = "/api/v1/album/edit2";
const ROOM_URL = "/api/v1/room";
const AUDIO_LYRIC_URL = "/api/v1/lyric/audio"
const EditorAlbum1 = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [countriesx, setCountriesx] = useState([]);
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [date, setDate] = useState(new Date());
  const [isPopular, setIsPopular] = useState(false);
  const [files, setFiles] = useState(null);
  const [showAudio, setShowAudio] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [audio, setAudio] = useState();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");
  const [lyric, setLyric] = useState("");
  const [photo, setPhoto] = useState();
  const [showNext, setShowNext] = useState(true); 
  const test = countriesx.map(country => country);

  const navigate = useNavigate();
  //console.log(test);
  //const country1 = countriesx.filter(country => country.name === "France");
  useEffect(() => {
    setCountriesx(countries.all); 
    setCountry("+33");
  }, [])

  {/** REctification */}
  useEffect(() => {
    async function getLyric() {
      try {
        if(userInfo) {
          const userId = userInfo._id;
          const res = await axios.get(AUDIO_LYRIC_URL, {headers: {withCredentials: true}});
          console.log("resss ", res.data);
          setAudio(res.data.lyrics[1].path);
        }
      }
      catch(err) {
          console.log(err);
      }     
    }
    getLyric();
  }, []) 

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, [])

  const onChangeCategory = (e) => setCategory(e.target.value);

  const createAlbum = async (e) => {
    e.preventDefault();    
    try {
      console.log("heyy");
      const formData = new FormData();
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("artistName", artistName);
      formData.append("points", points);
      formData.append("country", country);
      formData.append("isPopular", isPopular);
      const postAlbum = await axios.post(ALBUM_URL, formData,
        {headers: {withCredentials: true, "Content-Type": "multipart/form-data" }});
      if(postAlbum) {
        console.log(postAlbum);
        setSuccess("Lyric audio/text has been posted successfully ");
        setErrMsg("");
        setShowNext(false);
        setTimeout(() => {
          setSuccess(false);
        }, [4000]);
        window.scrollTo(0,50);
        navigate('/editor/album2');
        /*setArtistName("");
        setDescription("");
        setTitle("");
        setFamous(false);
        setPoints("");
        setLyric("");
        setIsPopular(false);
        setTimeout(() => {
          setSuccess("");
          setHi(true);
        }, [4000])*/
      }
    }catch(err) {
      console.log(err);
      setErrMsg(err?.data?.message);
    }
  }
  console.log(files);

  const handleConfirmNext = (e) => {
    e.preventDefault();
    navigate('/editor/album2');
  }

  const handleCancelNext = (e) => {
    e.preventDefault();
    setShowNext(false);
  }

  

  return (
    <section className=" mt-2 my-3 md:mt-16 visible md:ml-[20%] w-[94vw] md:w-[40vw] bg-gradient-to-r from-indigo-100 to-indigo-300 md:bg-zinc-200 md:absolute md:top-0 md:left-1 lg:left-1 xl:left-2 mx-1 px-1">
      <div className="mb-8 mt-1 bg-gradient-to-r from-teal-100 to-teal-600 ">
        <h1 className="text-2xl text-center ">Editor DashBoard ALBUM</h1>
      </div>
      {/** Get videos to post */}
      <form className=" mx-2 ">
        {Hi ? null : null}      
        {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
        {success ? <div className="font-bold text-lg text-green-700 font-serif"><h1>{success}</h1></div> : null}
        <div className=" flex flex-col space-x-11 relative my-2">
          <p  className="ml-2 font-bold mb-2 md:text-lg text-blue-950 ">ALBUM</p>    
        </div>

        <div className="my-3 text-lg ">
          <label htmlFor='category'>Category</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block"
             value={category} onChange={e=>setCategory(e.target.value)}
          > 
            {categories ? categories.map(category => {
              return (<option className="border m-3" key={category._id} value={category.name}>{category.name}</option>)
            }) : null}
          </select>
        </div>
        <div className="my-2 md:my-3 ">
            <label htmlFor="title">Title</label>
            <input className="border rounded-md shadow-sm px-2 py-2 md:py-3  w-[80%] block" type="text" value={title} onChange={e=> setTitle(e.target.value)}  />
        </div>
        {/*<div className="text-lg">
            <label htmlFor="lyric">Lyric</label>
            <textarea id="lyric" className=" h-60 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={lyric} onChange={e=>setLyric(e.target.value)}></textarea>
        </div>*/}
        <div className="my-2 md:my-3">
            <label htmlFor="artist">Artist</label>
            <input className=" h-11 border rounded-md shadow w-[80%] block p-2 md:p-3" type="text" value={artistName} onChange={e=>setArtistName(e.target.value)}/>
        </div>
        <div className=" relative text-lg my-2 ">
          <label htmlFor="name">Date: </label>
              <DatePicker className="p-2 rounded-md bg-gray-50 focus:outline-none focus:ring-[3px] focus:ring-gray-400 focus:bg-gray-100 " selected={date} onChange={date=>setDate(date)}/>
        </div> 
        <div className="my-2 my:py-3">
            <label>Points</label>
            <input className=" h-11 border rounded-md shadow w-[80%] block p-2 md:p-3" type="text" value={points} min={1} max={100} onChange={e=>setPoints(e.target.value)}/>
        </div>
        <div className="my-2 md:my-3">
          <label>Country</label>
            <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={country} onChange={e=>setCountry(e.target.value)}> 
              {countriesx ? countriesx.map((countr,i) => {
                return (
                  <option className="border m-3" key={i} value={countr.countryCallingCodes[0]}> 
                      <p className=" mx-5">{countr.emoji}</p> <p className=" mr-6">{countr.countryCallingCodes[0]}</p>  <p className=" mr-6">{countr.name}</p>
                  </option>
                  )
                  }) : null}
            </select> 
        </div>
        <div className="my-2 md:my-3">
            <label className="text-lg">Popular</label>
            <input className=" h-6 w-6 ml-7 md:p-3" type="checkbox" value={isPopular} onChange={e=>setIsPopular(e.target.checked)} />
        </div>
        <div className="text-lg">
            <label htmlFor=" description">Description</label>
            <textarea className=" h-32 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="w-48 py-3 md:my-1">
          <button onClick={e=>createAlbum(e)} className=" w-40 p-1 text-lg animation delay-150 duration-500 border rounded-md shadow-sm 
          bg-indigo-300 hover:bg-indigo-400 hover:translate-y-1" type="submit">
            Publish
          </button>
        </div>
        {showNext ? 
          <div className=" absolute top-96 right-2  ">
            <h1 className="">Do you want to continue ? </h1>
            <div className="flex space-x-11">
              <div onClick={(e)=>handleConfirmNext(e)}>
                <button className=" border shadow rounded-md bg-indigo-100 
                  hover:translate-y-[1px] hover:bg-indigo-400 p-1 text-lg ">
                  Yes
                </button>
              </div>
              <div onClick={(e)=>handleCancelNext(e)}>
                <button className=" border shadow rounded-md bg-red-100 
                  hover:translate-y-[1px] hover:bg-red-400 p-1 text-lg ">
                  Cancel
                </button>
              </div>
            </div> 
          </div> : 
          null 
        }
      </form>
    </section>
  )
}

export default EditorAlbum1;
