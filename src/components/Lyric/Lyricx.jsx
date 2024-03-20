import {useState, useEffect} from "react";
import queryString from "query-string";
import Lyric from "./Lyric";
import { BsSearch } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { useMimlyrics } from "../context/AppProvider";
import axios from "../api/axios";
import { FaX } from "react-icons/fa6";
const LYRIC_URL = "/api/v1/lyric";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";
const ARTIST_URL = "/api/v1/artist";
const ARTISTNAME_URL = "/api/v1/artistName";
const Lyricx = () => {
    const [category, setCategory] = useState("");
    const [lyrics, setLyrics] = useState([]);
    const [errMsg, setErrMsg] = useState("");
    const [searchLyrics, setSearchLyrics] = useState(null);
    const [searchId, setSearchId] = useState("");  
    const [sLyrics, setSLyrics] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [searchFocus, setSearchFocus] = useState(false);
    const [fLyrics, setFLyrics] = useState([]);
    const [showFLyrics, setShowFLyrics] = useState(false);

    useEffect(() => {
        var {categoryx} = queryString.parse(location.search);
        setCategory(categoryx);       
    }, [category]);

    console.log("category: ", category);
    const {isActiveModalNavbar} = useMimlyrics();

    useEffect(() => {
        const getLyrics = async () => {
            try {
                const res = await axios.get(`${LYRIC_URL}/${category}`, {headers: {withCredentials: true}});
                console.log(res.data);
                setLyrics(res.data.lyrics);
            }catch(err) {
                console.log(err);
                setErrMsg(err?.data?.message);
            }
        }
        getLyrics();
    }, [category])


    const searchLyricsF = async () => {
        console.log(searchId);
        try {
            const res = await axios.get(`${SEARCH_LYRIC_URL}/${searchId}`, 
            {headers: {withCredentials: true}});
            console.log(res.data.searchlyrics);
            setSearchLyrics(res.data.searchlyrics);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }

    const searchByLetter = async (chosenLetter) => {
        console.log(chosenLetter);
        try {
            const res = await axios.get(`${ARTIST_URL}/${chosenLetter}/search`, {headers: {"Content-Type": "application/json"}, withCredentials: true});
            console.log(res.data.artists);
            setFLyrics(res.data.artists);
            if(fLyrics.length > 0) {
                setShowFLyrics(true);
            }
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }

    const searchLyricsFCallback = async (name) => {
        try {
            const res = await axios.get(`${SEARCH_LYRIC_URL}/${name}`, 
            {headers: {withCredentials: true}});
            console.log(res.data.searchlyrics);
            setSearchLyrics(res.data.searchlyrics);
            setShowFLyrics(false);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }      
    }

  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60" :  "md:absolute md:top-14 md:ml-[20%] md:w-[53%]"}>
        <div className=" relative mx-2 flex  mt-4 ">
            <div className=" px-3 grid grid-cols-12 bg-indigo-50 text-xl ">
                <input readOnly className=" mr-24 w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="A" />
                <input readOnly className=" w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value='B'/>
                <input readOnly className=" w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="C"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="D"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="E"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="F"/>
                <input readOnly className=" w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="G"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="H"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="I"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="J"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="K"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="L"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="M"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="N"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="O"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="P"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="Q"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="R"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="S"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="T"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="U"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="V"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="W"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="X"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none" onClick={(e) => searchByLetter(e.target.value)} value="Y"/>
                <input readOnly className="w-4 bg-slate-50 cursor-pointer focus:outline-none " onClick={(e) => searchByLetter(e.target.value)} value="Z"/>
            </div>
        </div>

        {fLyrics.length && showFLyrics > 0 ? 
            <div className=" relative border h-[20vh] w-full overflow-y-scroll ">
                <p className="mt-4"></p>
                {fLyrics.map(a => {
                    return ( <div  key={a._id} className=" text-lg ">
                        <h1 onClick={() => searchLyricsFCallback(a.name) } className="px-11 hover:bg-slate-200 cursor-pointer">{a.name}</h1>
                    </div>)
                } )}
                <FaX onClick={() => setShowFLyrics(false) } className=" absolute top-0 right-5 my-1 cursor-pointer h-5 w-5 text-fuchsia-800"/>
            </div>
            : null}

        <div className=' relative z-50 text-lg md:text-xl flex my-1 md:absolute md:my-3 space-x-0 '>
          <input 
           type='text'
           value={searchId}
           onChange={e=>setSearchId(e.target.value)}
           onKeyDown={e=> e.key === 'Enter' ? searchLyricsF(e) : null}
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

          <button type="submit" className=" bg-zinc-200 hover:bg-zinc-300 absolute w-12 h-[52px] 
            right-[32px] top-[4px] border rounded-lg md:right-[12px] md:top-[6%] md:w-11 md:h-[53px]">
            <IoMdSearch className=" w-11 h-11 right-[15%] top-[12%] md:right-[8%] md:top-2
             text-gray-400 md:w-11 md:h-11 "/>
          </button>
        </div>

        {!searchLyrics ? 
            <div className="my-3 md:mt-20 grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 gap-2 lg:gap-5 ">
                {lyrics.map(lyricy => {
                    return <Lyric key={lyricy._id} lyricy={lyricy} />
                })}
            </div> :
            <div className='my-3 md:mt-20 grid max-w-[1200px] grid-cols-2 px-5 lg:grid-cols-3 gap-2 lg:gap-5'>
                {searchLyrics.map(lyricy => {
                return (
                    <Link key={lyricy._id} to={`/lyric/read?lyricId=${lyricy._id}`} 
                        className=' ' > 
                        <div
                          onMouseEnter={()=>setShowDescription(true)}  
                          onMouseLeave={()=>setShowDescription(false)}
                          className=' hover:bg-blue-100 w-[95%] md:w-[95%] bg-blue-50 border rounded-md flex flex-col ring-blue-200 ring-2 '>
                          {lyricy.photo ? <img className=' m-[3%] w-[40vw] md:w-[13vw] my-2' src={lyricy.photo} alt='x'/>
                          : null
                          }
                          <p className=' mx-[5%] font-bold '>{lyricy.title}</p>  
                          {showDescription && lyricy.description ? <p className=' mx-[5%]'>{lyricy.lyric.substring(0,40)}...</p>  : null}
                        </div>
                    </Link> 
                )
                })
                }
            </div>
        }

        <div className=" bg-slate-100 ">
            <p className="text-center text-lg text-purple-700 "> END: </p>
        </div>

    </section>
  )
} 

export default Lyricx;
