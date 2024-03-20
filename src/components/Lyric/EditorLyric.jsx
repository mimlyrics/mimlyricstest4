import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import queryString from "query-string";
import TimeAgo from "timeago-react";
import axios from "../api/axios";
const LYRIC_URL = "/api/v1/lyric";
const DELETE_LYRIC_URL = "/api/v1/lyric";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";
const APP_DATA_URL = "/api/v1/appData";
const EditorLyric = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artists, setArtists] = useState("");
  const [country, setCountry] = useState("");
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [file, setFile] = useState();
  const [showVideo, setShowVideo] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [searchId, setSearchId] = useState("");
  const [lyric, setLyric] = useState("");
  const [lyrics, setLyrics] = useState([]);
  const [searchLyrics, setSearchLyrics] = useState(null);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");

    useEffect(() => {
        var {categoryx} = queryString.parse(location.search);
        setCategory(categoryx);       
    }, [category]);

    console.log(category);

    useEffect(() => {
        const getLyrics = async () => {
            try {
                const res = await axios.get(`${LYRIC_URL}/${category}`, {headers: {withCredentials: true}});
                setLyrics(res.data.lyrics);
                console.log(res.data);
            }catch(err) {
                console.log(err?.data?.message);
            }
        }
        getLyrics();
    }, [category])

    console.log(lyrics);

  const searchLyric = async (e, searchId) => {
      e.preventDefault();
      try {
        const res = await axios.get(`${SEARCH_LYRIC_URL}/${searchId}`, {headers: {withCredentials: true}});
        console.log(res.data);
        setSearchLyrics(res.data.searchlyrics);
      }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
      }
  }

  const deleteLyric = async (lyricId) => {
    try {
      await axios.delete(`${DELETE_LYRIC_URL}/${lyricId}`, {headers: {withCredentials: true}});
      setLyrics(lyrics.filter(lyric => lyric._id !== lyricId));
    }catch(err) {
      setErrMsg(err?.data?.message);
      console.log(err?.data);
    }
  }

  console.log("YOUPI");

  return (
    <>
    { searchLyrics ?

    <section className=" mt-7 md:absolute md:top-16 md:w-[50%] mx-1 md:ml-48 lg:ml-64">
        <h1 className="text-center font-bold py-3 text-blue-600 bg-indigo-200">Lyrics found</h1>
        <button className="p-3 bg-indigo-300 rounded-md" onClick={()=>setSearchLyrics(null)}>Show All Data</button>
        <ul className="md:hidden">
            {searchLyrics.map(lyric => {
                return (
                    <div key={lyric._id} className="border-b-2 text-[17px] font-medium py-3">
                    <div>
                      {lyric.artists ? lyric.artists.map((lyric,i) => {
                        return(
                          <div key={i}>
                            <p className="flex text-gray-800">Artists: <p className="ml-2 text-blue-900">{lyric.artists}</p></p> 
                          </div> 
                        )
                      })
                        : null}
                    </div>
                        <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{lyric.title}</p></p>
                        <p className="flex text-gray-800">Created At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.createdAt}/></p>
                        <p className="flex text-gray-800">Updated At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.updatedAt}/></p>
                        <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{lyric.country}</p></p>
                        <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{lyric.famous}</p></p>
                        <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{lyric.points}</p></p>                        
                        <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                        <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{lyric.size}</p></p>
                        <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{lyric.translatedVersion}</p></p>                        
                        <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{lyric.downloads}</p></p>    
                        <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{lyric.shares}</p></p>
                        <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{lyric.comments}</p></p>    
                        <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{lyric.category}</p></p>
                        <p className="flex text-gray-800">Lyric: <p className="ml-2 f text-blue-900">{lyric.lyric.substring(0,100)}</p></p>
                        <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{lyric.description.substring(0,100)}</p></p>
                        <div className="mt-3">
                            <button><Link onClick={e=> !lyric._id ? e.preventDefault(): null}  to= {`/editor/lyric/edit?lyricId=${lyric._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                            <button onClick={()=>deleteLyric(lyric._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                        </div>                        
                    </div>
                ) 
            })}          
        </ul>

            <div className="mr-7">
             {searchLyrics.map(lyric=> {
                return (
                  <div key={lyric._id} className="border-b-2 text-[17px] font-medium py-3">
                    <div className=" py-8">
                    <div>
                      {lyric.artists ? lyric.artists.map((lyric,i) => {
                        return(
                          <div key={i}>
                            <p className="flex text-gray-800">Artists: <p className="ml-2 text-blue-900">{lyric.artists}</p></p> 
                          </div> 
                        )
                      })
                        : null}
                    </div>
                    <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{lyric.title}</p></p>
                    <p className="flex text-gray-800">Created At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.createdAt}/></p>
                    <p className="flex text-gray-800">Updated At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.updatedAt}/></p>
                    <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{lyric.country}</p></p>
                    <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{lyric.category}</p></p>
                    <p className="flex text-gray-800">Lyric: <p className="ml-2 f text-blue-900">{lyric.lyric.substring(0,100)}</p></p>
                    <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{lyric.description.substring(0,100)}</p></p>
                    <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{lyric.famous}</p></p>
                    </div>
                    <div className="">

                    <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{lyric.size}</p></p>
                    <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{lyric.points}</p></p>                        
                    <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                    <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{lyric.translatedVersion}</p></p>                        
                    <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{lyric.downloads}</p></p>    
                    <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{lyric.shares}</p></p>
                    <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{lyric.comments}</p></p>  

                    </div>
                    <div className="mt-3">
                        <button><Link onClick={e=> !lyric._id ? e.preventDefault(): null}  to= {`/editor/lyric/edit?lyricId=${lyric._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                        <button onClick={()=>deleteLyric(lyric._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                    </div>                        
                  </div>      
                )
             })}
            </div>   
    </section>
    :
    <section className=" md:absolute md:top-16 md:w-[60%] mx-1 md:ml-52 lg:ml-64">
        <div className="my-1 md:w-[50%]">
            <h1 className=" text-lg md:text-xl text-center bg-blue-200 font-semibold">Editor lyric's Management DashBoard</h1>
        </div>

        <div>
            <input onKeyDown={(e)=>(e.key === "Enter" ? searchLyric(e,searchId) : null)} placeholder="search..." className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
            <button  onClick={(e) => searchLyric(e, searchId)} className="h-11 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
        </div>

        <div className="my-3">
            <Link  to= "/editor/lyric/add"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-100 hover:bg-blue-300 hover:translate-y-1" >Add Lyrics</Link>
        </div>

        <div className="font-bold text-lg ">
            <h1>Lyric Info</h1>
        </div>

        <ul className="md:hidden">
            {lyrics ? lyrics.map(lyric => {
                return (
                    <div key={lyric._id} className="border-b-2 text-[17px] font-medium py-3">
                    <div>
                      {lyric.artists ? lyric.artists.map((lyric,i) => {
                        return(
                          <div key={i}>
                            <p className="flex text-gray-800">Artists: <p className="ml-2 text-blue-900">{lyric.artists}</p></p> 
                          </div> 
                        )
                      })
                        : null}
                    </div>
                        <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{lyric.title}</p></p>
                        <p className="flex text-gray-800">Created At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.createdAt}/></p>
                        <p className="flex text-gray-800">Updated At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.updatedAt}/></p>
                        <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{lyric.country}</p></p>
                        <p className="flex text-gray-800">Lyric: <p className="ml-2 f text-blue-900">{lyric.lyric.substring(0,100)}</p></p>
                        <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{lyric.description.substring(0,100)}</p></p>
                        <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{lyric.famous}</p></p>
                        <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{lyric.points}</p></p>                        
                        <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                        <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{lyric.size}</p></p>
                        <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{lyric.translatedVersion}</p></p>                        
                        <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{lyric.downloads}</p></p>    
                        <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{lyric.shares}</p></p>
                        <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{lyric.comments}</p></p>    
                        <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{lyric.category}</p></p>
                        <div className="mt-3">
                            <button><Link onClick={e=> !lyric._id ? e.preventDefault(): null}  to= {`/editor/lyric/edit?lyricId=${lyric._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                            <button onClick={()=>deleteLyric(lyric._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                        </div>                        
                    </div>
                )
            }) : null}          
        </ul>
        
       
          <div className=" h-1 md:visible invisible mr-7 ">
            {lyrics ? lyrics.map(lyric=> {
              return (
                  <div key={lyric._id} className="border-b-2 text-[17px] font-medium py-3">
                    <div className=" py-2">
                    <div>
                      {lyric.artists ? lyric.artists.map((lyric,i) => {
                        return(
                          <div key={i}>
                            <p className="flex text-gray-800">Artists: <p className="ml-2 text-blue-900">{lyric.artists}</p></p> 
                          </div> 
                        )
                      })
                        : null}
                    </div>
                    <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{lyric.title}</p></p>
                        <p className="flex text-gray-800">Created At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.createdAt}/></p>
                        <p className="flex text-gray-800">Updated At: <TimeAgo className="ml-2 text-blue-900" datetime={lyric.updatedAt}/></p>
                    <p className="flex text-gray-800">Lyric: <p className="ml-2 f text-blue-900">{lyric.lyric.substring(0,100)}</p></p>
                    <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{lyric.description.substring(0,100)}</p></p>
                    <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{lyric.country}</p></p>
                    <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{lyric.category}</p></p>
                    <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{lyric.famous}</p></p>
                    </div>
                    <div className="">
                    <p className="flex text-gray-800">Size: <p className="ml-2 text-blue-900">{lyric.size}</p></p>
                    <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{lyric.points}</p></p>                        
                    <p className="flex text-gray-800">Likes: <p className="ml-2 text-blue-900"></p></p>
                    <p className="flex text-gray-800">Translated version: <p className="ml-2 text-blue-900">{lyric.translatedVersion}</p></p>                        
                    <p className="flex text-gray-800">Downloads: <p className="ml-2 text-blue-900">{lyric.downloads}</p></p>    
                    <p className="flex text-gray-800">Shares: <p className="ml-2 text-blue-900">{lyric.shares}</p></p>
                    <p className="flex text-gray-800">Comments: <p className="ml-2 text-blue-900">{lyric.comments}</p></p>    
                    </div>
                    <div className="mt-3">
                        <button><Link onClick={e=> !lyric._id ? e.preventDefault(): null}  to= {`/editor/lyric/edit?lyricId=${lyric._id}`}  className=" p-3 border shadow rounded-lg bg-green-300" >Edit</Link> </button>
                        <button onClick={()=>deleteLyric(lyric._id)} className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >Delete</button>
                    </div>                        
                  </div>                  
                )
             }) : null}
          </div>
    </section> }
    </>
  )
  }
export default EditorLyric;