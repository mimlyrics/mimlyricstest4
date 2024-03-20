import {useState, useEffect} from "react";
import axios from "../api/axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const BASE_URL = "http://localhost:5000/api/v1";
//const BASE_URL = "https://mimlyricstest-api.onrender.com";
import queryString from "query-string";
import TimeAgo from "timeago-react";
const ROOM_URL = "/api/v1/room"
const EditorAlbum = () => {
  const [albums, setAlbums] = useState(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); 
  const [errMsg, setErrMsg] = useState("");
  const [isChosen, setIsChosen] = useState(false);
  const [searchId, setSearchId] = useState("");
  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
      setIsChosen(true);
    }
    getRooms();
  }, []);

    useEffect(() => {
        const getAlbums = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/album/${category}`, {headers: {withCredentials: true}});
                console.log(res.data);
                res.data.albums.length > 0 ? setAlbums(res.data.albums) : setAlbums(null)
            }catch(err) {
                setErrMsg(err?.data?.message);
            }
        }
        getAlbums();
    }, [category])

    const searchAlbum = async () => {

    }
  const deleteAlbum = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/albums/${id}`, {headers: {withCredentials: true}});
        
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }

  return (
    <section className=" md:absolute md:top-16 md:w-[50%] md:ml-[21%] my-1 py-1">
      <div className={isChosen ? "" : ""}>
        {/** Get videos to post */}
            <div className=" text-center flex flex-col ">
            <label className="text-lg font-bold text-gray-500" htmlFor='category'>Category</label>
            <select className=" mb-2 mx-2 h-12 text-lg " value={category} onChange={e=>setCategory(e.target.value)}
            >
                {categories ? categories.map(categoryx => {
                return (<option className=" italic text-center rounded-full shadow bg-zinc-300 h-20 "
                      key={categoryx._id} value={categoryx.name}>{categoryx.name}</option>)
                }) : null}
            </select>
            </div>
        </div>
        {isChosen ? 
         <div className="mx-1">
            <div className="my-1 md:w-[100%]">
                <h1 className=" text-lg md:text-xl text-center bg-blue-200 font-semibold">Editor album's Management DashBoard</h1>
            </div>

            <div>
                <input onKeyDown={(e)=>(e.key === "Enter" ? searchAlbum(e,searchId) : null)} placeholder="search..." className="w-96 text-lg p-2 h-11 bg-indigo-200 text-gray-700" type="text" value={searchId} onChange={e=>setSearchId(e.target.value)}/>
                <button  onClick={(e) => searchAlbum(e, searchId)} className="h-11 p-2 ml-1 text-lg bg-blue-300 rounded-md text-gray-700 hover:bg-blue-500 hover:translate-y-[1px] ">Search</button>
            </div>

            <div className="my-3">
                <Link  to= "/editor/album1"  className=" w-11 h-4 p-2 border shadow rounded-lg bg-blue-100 hover:bg-blue-300 
                    hover:translate-y-1" >Add Albums</Link>
            </div>

            <div className="font-bold text-lg ">
                <h1>Album Info</h1>
            </div>
            <ul className="  ">
                    { albums ? albums.map(album => {
                        return (
                            <div key={album._id} className="border-b-2 text-[17px] font-medium py-3">
                                <p className="flex text-gray-800">Title: <p className="ml-2 text-blue-900">{album.title}</p></p>
                                <p className="flex text-gray-800">Created At: <TimeAgo className="ml-2 text-blue-900" datetime={album.createdAt}/></p>
                                <p className="flex text-gray-800">Updated At: <TimeAgo className="ml-2 text-blue-900" datetime={album.updatedAt}/></p>
                                <p className="flex text-gray-800">Country: <p className="ml-2 text-blue-900">{album.country}</p></p>
                                <p className="flex text-gray-800">Description: <p className="ml-2 f text-blue-900">{album.description}</p></p>
                                <p className="flex text-gray-800">Famous: <p className="ml-2 text-blue-900">{album.famous}</p></p>
                                <p className="flex text-gray-800">Points: <p className="ml-2 text-blue-900">{album.points}</p></p>                        
                                <p className="flex text-gray-800">Category: <p className="ml-2 text-blue-900">{album.category}</p></p>
                                <p className="w-96 text-gray-700 border-b-8 "></p>
                                {album.lyric.map((l,i) => {
                                    return (<div key={l._id} className=" mb-2 ">
                                            {l.title ? <p className="flex text-gray-800">
                                                Title: <p className="ml-2 f text-blue-900">{i}. {l.title.substring(0,40)}...</p></p> 
                                                : null
                                            }
                                            {l.artistName.length > 0 ?   
                                                l.artistName.map((a,i) => { 
                                                    return(  
                                                        <div key={i} className=" ">
                                                         <span className="ml-2 flex text-blue-900">{a}</span>
                                                        </div>
                                                        ) 
                                                    }) : null}
                                            {l.orignalname ? <p className="flex text-gray-800">originalname: <p className="ml-2 f text-blue-900">{i}. {l.originalname.substring(0,20)}...</p></p> : null}
                                            {l.text ? <p className="flex text-gray-800">Text: <p className="ml-2 f text-blue-900">{i}. {l.text.substring(0,20)}...</p></p>: null}
                                            {l.audio ? <audio src={l.audio} alt="X"/> : null}
                                            {l.views ? <p className="flex text-gray-800">Views: <p className="ml-2 f text-blue-900">{i}. {l.views.substring(0,20)}...</p></p> : null}
                                        </div>)
                                })}
                                <div className="mt-3">
                                    <button>
                                      <Link onClick={e=> !album._id ? e.preventDefault(): null}  to= {`/editor/album2?albumIdx=${album._id}`}  
                                        className=" p-3 border shadow rounded-lg bg-green-300" >Edit
                                        </Link> 
                                    </button>
                                    <button 
                                      onClick={()=>deleteAlbum(album._id)} 
                                       className=" ml-4 p-3 border shadow rounded-lg bg-red-400" >
                                       Delete
                                    </button>
                                </div>                        
                            </div> 
                        )
                      }) 
                      :
                      <div className=" mx-1 text-purple-800 font-bold text-center text-lg my-3 border shadow h-[70vh] py-3">
                        <h1 className="  mt-[27vh] ">NO ALBUM YET</h1>
                      </div> 
                     }          
                </ul>            
         </div> : 

         null
        }
    </section>
  )
}

export default EditorAlbum
