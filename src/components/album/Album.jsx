import {useState, useEffect} from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaX } from "react-icons/fa6";
//const BASE_URL = "https://mimlyricstest-api.onrender.com";
import queryString from "query-string";
import TimeAgo from "timeago-react";
const ROOM_URL = "/api/v1/room";
const ALBUM_URL = "/api/v1/album";
const GET_ALBUM_URL = "/api/v1/album/get";
const APP_DATA_URL = "/api/v1/appData";

const Album = () => {
    const [albums, setAlbums] = useState(null);
    const [category, setCategory] = useState("");
    const [genres, setGenres] = useState([]); 
    const [errMsg, setErrMsg] = useState("");
    const [isChosen, setIsChosen] = useState(false);
    const [searchId, setSearchId] = useState("");
    const [searchAlbums, setSearchAlbums] = useState([]);
    const [searchFocus, setSearchFocus] = useState(false);
    const [genre, setGenre] = useState("");
    useEffect(() => {
        const getGenres = async () => {
        const res = await axios.get(APP_DATA_URL, {headers: {withCredentials: true}});
        setGenres(res.data.appData[0].genres);
        setGenre(res.data.appData[0].genres[0]);
        setIsChosen(true);
        }
        getGenres();
    }, []);

    useEffect(() => {
      const getAlbums = async () => {
        try {
          const res = await axios.get(`${ALBUM_URL}/${genre}/genre`, {headers: {withCredentials: true}});
          setAlbums(res.data.albums);
          console.log(res.data);
        }catch(err) {
          setErrMsg(err?.data?.message);
          console.log(err?.data);
        }
      }
      getAlbums();
    }, [genre])

    const getAlbumByCountry = async () => {
      try {
        const res = await axios.get(ALBUM_URL, {headers: {withCredentials: true}});
      }catch(err) {
        setErrMsg(err?.data?.message);        
      }
    }

    const getAlbumByStyle = async () => {
      try {
        const res = await axios.get(`${GET_ALBUM_URL}/${category}`, {headers: {withCredentials: true}});
        setAlbums(res.data.albums);
        console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }

    const searchAlbumF = async ( ) => {

    }

  return (
    <section className=" md:absolute md:top-16 md:w-[50%] md:ml-[21%] my-1 py-1">
      <div className={isChosen ? "" : ""}>
        {/** Get videos to post */}
            <div className=" text-center flex flex-col ">
            <label className="text-lg font-bold text-gray-500" htmlFor='category'>Genre</label>
            <select className=" mb-2 mx-1 h-12 text-lg " value={genre} onChange={e=>setGenre(e.target.value)}
            >
                {genres ? genres.map((genre,i) => {
                return (<option className=" italic text-center rounded-full shadow bg-zinc-300 h-20 "
                      key={i} value={genre}>{genre}</option>)
                }) : null}
            </select>
            </div>
        </div>

        <div className=' -z-50 text-lg md:text-xl flex my-1 space-x-0 '>
          <input 
           type='text'
           value={searchId}
           onChange={e=>setSearchId(e.target.value)}
           onKeyDown={e=> e.key === 'Enter' ? searchAlbumF(e) : null}
           placeholder="search..."
           className=' bg-slate-50 mx-2 pl-8 py-3 border-4 
            shadow rounded-md  w-[90vw] md:w-[48vw] focus:outline-none focus:ring-2 focus:ring-gray-300 '
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            />
            {searchFocus || searchId ? 
            <div onClick={() => setSearchId("")} className=" cursor-pointer w-6 h-6 text-center rounded-full absolute left-3 top-4 bg-cyan-600">
                <FaX className=" ml-1 mt-1 w-4 h-4 "/> 
            </div> 
            : null
            }
          </div>

        <div className=" grid grid-cols-2 md:grid-cols-3">
        {albums ? 
          albums.map(al => {
            return (
              <Link 
                  to={`/album/list?albumIdx=${al._id}`}
                  className=" hover:bg-slate-200 mx-1 " 
                  key={al._id}>
                  <div className=" hover:cursor-pointer ">
                    <img className="  p-1 rounded-md w-[100%] h-[40vh]" src={al.photo}/>
                  </div>
                  <div className=" mx-7 -mt-24 text-xl text-white font-serif ">
                    <h1 className="ml-3">{al.title.toLowerCase()}</h1>   
                  </div>
                  <div className="text-white">
                    <h1 className=" mt-3 mx-2">{al.lyric.length}</h1>
                  </div>
              </Link>)
          }) : null}
        </div>
        <div className=" my-11 bg-slate-200 text-center py-1">
          <h1 className="">END</h1>
        </div>
    </section>
  )
}
export default Album;