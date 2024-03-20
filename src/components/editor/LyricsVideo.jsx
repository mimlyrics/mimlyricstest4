import {useState, useEffect} from "react";
import Video from "./Video";
import queryString from "query-string";
import axios from "../api/axios";
const VIDEO_URL = "/api/v1/video";
const SEARCH_VIDEO_URL = "/api/v1/video/search";
import { useMimlyrics } from "../context/AppProvider";
import { BsSearch, BsX } from "react-icons/bs";
import { FaSearchengin, FaArrowRight } from "react-icons/fa6";
const APP_DATA_URL = "/api/v1/appData";
const ROOM_URL = "/api/v1/room";
const LyricsVideo = () => {
    const [category, setCategory] = useState("");
    const [videos, setVideos] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [searchVideos, setSearchVideos] = useState(null);
    const [rec, setRec] = useState(null);
    const {isActiveModalNavbar} = useMimlyrics();
    const [activeChoice, setActiveChoice] = useState("");
    const [genres, setGenres] = useState(null);
    const [categories, setCategories] = useState(null);
    const [searchByGenre, setSearchByGenre] = useState([]);


    useEffect(() => {
        const getGenres = async () => {
            try {
                const res = await axios.get(APP_DATA_URL, {withCredentials: true});
                setGenres(res.data.appData[0].genres);
            }catch(err) {
                setErrMsg(err?.data?.message);
            }
        }
        getGenres();
    }, [])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await axios.get(ROOM_URL, {withCredentials: true});
                setCategories(res.data.rooms);
                setSearchVideos(res.data.videos);
            }catch(err) {
                setErrMsg(err?.data?.message);
            }
        }
    }, [])



    useEffect(() => {
        var {categoryx} = queryString.parse(location.search);
        setCategory(categoryx);       
    }, [category]);

    console.log(category);

    useEffect(() => {
        const getLyricsVideo = async () => {
            try {
                const lyrics = await axios.get(`${VIDEO_URL}/${category}/category`, {headers: {withCredentials: true}});
                console.log(lyrics);
                setVideos(lyrics.data.videos);
                console.log(videos);
            }catch(err) {
                console.log(err);
            }
        }
        getLyricsVideo();
    }, [category])

    const getAllVideos = async () => {
        try {
            const lyrics = await axios.get(`${VIDEO_URL}/${category}/category`, {headers: {withCredentials: true}});
            console.log(lyrics);
            setSearchVideos(null);
            setVideos(lyrics.data.videos);
            setActiveChoice('all');
            console.log(videos);
        }catch(err) {
            console.log(err);
        }       
    }

    console.log(category);

  const SearchVideo = async (e, searchId) => {
    console.log("olllk");
    try {
      const res = await axios.get(`${VIDEO_URL}/${searchId}/search`,  {headers: {withCredentials: true}});
      setSearchVideos(res.data.videos);
      setActiveChoice('');
      setVideos(null);
      console.log(res.data);
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  }

  const [searchIdFocus, setSearchIdFocus] = useState(false);

  const emptySearchId = () => {
    setSearchId('');
  }

  const searchByGenreFunc = async (genre) => {
    console.log('genre: ', genre);
    try {
        const res = await axios.get(`${VIDEO_URL}/${genre}/search2`, {withCredentials: true});
        setSearchVideos(res.data.videos);
        setActiveChoice(genre);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }

  return (
    <section 
        className= { isActiveModalNavbar ? " relative top-3 -z-50 md:absolute md:top-20 md:ml-[20%] md:w-[80%] " 
                    : " md:absolute md:top-20 md:ml-[20%] md:w-[80%] " }>
        <div className=" mt-2 md:mt-0 relative mx-2">
            {searchId ? <BsX onClick={() => setSearchId('')} 
             className=" absolute z-50 cursor-pointer text-teal-500 hover:text-teal-900 top-[19%] md:top-1 left-3 w-7 h-7 md:w-8 md:h-8 "/> 
             : null
            }
            <input type="text" 
                placeholder="search..."
                value={searchId} 
                onChange={e=>setSearchId(e.target.value)}
                onClick={e=>SearchVideo(e, searchId)}
                onKeyDown={e=>e.key === 'Enter' ? SearchVideo(e, searchId) : null}
                onFocus={() => setSearchIdFocus(true)}
                onBlur={() => setSearchIdFocus(false)}
                className=" relative px-11 border text-teal-900 font-serif text-[18px] border-sky-200 w-[100%] md:w-[80%] rounded-s-full  p-3 mr-2 focus:outline-sky-300 "
            />
            <div className=" shadow shadow-sky-100 absolute top-0 right-[0%] md:right-[20%] z-50">
                <button 
                    type="button" 
                    className=" mt-[2px] w-9 h-12 bg-sky-100 hover:bg-sky-300">
                    <BsSearch className=" mx-2 w-6 h-6 text-sky-500"/>
                </button>
            </div>
        </div>
            <div className=" my-3 mx-2 flex space-x-2 md:space-x-2">
                <div 
                    onClick={() => getAllVideos()} 
                    className={activeChoice === 'all' ? "cursor-pointer bg-blue-900 text-[rgb(255,250,250)] p-1 rounded-md"
                     : "cursor-pointer bg-[rgba(0,100,190)] text-[rgb(255,250,250)] p-1 rounded-md"}>
                    <h1 >All</h1>
                </div>
                {genres ? genres.map((genre,i) => {
                    return (
                        <div
                            onClick={() => searchByGenreFunc(genre)}
                            className={ genre === activeChoice ? 
                                " md:px-5 hover:bg-blue-900 cursor-pointer bg-blue-900 text-[rgb(255,250,250)] p-1 rounded-md " : 
                                " rounded-md w-full h-9 text-lg text-center p hover:bg-blue-900 cursor-pointer bg-[rgba(0,100,190)] text-[rgb(255,250,250)] "} key={i}>
                            <h1>{genre}</h1> 
                        </div>
                    )
                }) : null}
                <FaArrowRight className="w-7 h-7 cursor-pointer hover:text-[rgb(0,240,240)] rounded-md hover:bg-[rgb(0,200,200)] text-[rgb(0,200,200)] "/>
            </div>
            
        {searchVideos ? 
        <div className=" mt-[1%] md:mt-[0%] grid grid-cols-1 lg:grid-cols-3 ">
            {searchVideos.map(videoy => {
                return <Video key={videoy._id} videoy={videoy} />
            })}
        </div>
        : 
        <div className="  ">
            <div className=" mt-[1%] md:mt-[0%] grid grid-cols-1 lg:grid-cols-3">
            {videos.map(videoy => {
                return <Video key={videoy._id} videoy={videoy} />
            })}
            </div>
        </div>    
        }
    </section>

  )
} 

export default LyricsVideo;