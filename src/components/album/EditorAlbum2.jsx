import axios from "../api/axios";
import {useState, useEffect} from "react";
import { FaUpload } from "react-icons/fa6";
import queryString from "query-string";
const ALBUM_URL = "/api/v1/album";
const GET_ALBUM_URL = "/api/v1/album/get"
const POST_ALBUM_AUDIO_URL = "/api/v1/album/audios";
const EDIT_ALBUM_URL = "/api/v1/album/edit";
const EDIT_ALBUM2_URL = "/api/v1/album/edit2";
//const BASE_URL = "https://mimlyricstest-api.onrender.com";
import {MdEdit} from "react-icons/md";
const EditorAlbum2 = () => {
  const [album, setAlbum] = useState([]);
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [audios, setAudios] = useState(null);
  const [albumId, setAlbumId] = useState("");
  const [showPostAudio, setShowPostAudio] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  // State - for each audio
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [fileObj, setFileObj] = useState({});
  const [photo, setPhoto] = useState("");
  const [points, setPoints] = useState("");
  const [isGetAlbum, setIsGetAlbum] = useState(false);
  const [artistNames, setArtistNames ] = useState([]);
  const [saveMsg, setSaveMsg] = useState(false);
  const [hoverPhoto, setHoverPhoto] = useState(false);

  useEffect(() => {
    const {albumIdx} = queryString.parse(location.search);
    setAlbumId(albumIdx);
    console.log("AlbumId: ", albumId);
  }, [albumId])

  useEffect(() => {
    const getAlbum = async () => {
        try {
            if(albumId) {
                const res = await axios.get(`${GET_ALBUM_URL}/${albumId}`, {headers: {withCredentials: true}});
                console.log(res.data.album);
                setAlbum(res.data.album);
                res.data.album.map(al => {
                    setAudios(al.lyric);
                    setPhoto(al.photo);
                } )
                console.log(photo);
            }else {
                const res = await axios.get(`${ALBUM_URL}`, {headers: {withCredentials: true}});
                console.log(res.data.album);
                setAlbum(res.data.album);
                res.data.album.map(al => {
                    setAlbumId(al._id);
                    setAudios(al.lyric);
                    setPhoto(al.photo);
                } )
                console.log(photo);                
            }
            
        }catch(err) {
            setErrMsg(err?.data?.message);
            console.log(err?.data?.message);
        }
    }
    getAlbum();
  }, [albumId])

  console.log(audios);

  const postFiles = async () => {
    try {
        const formData = new FormData();
        for(let i=0; i<files.length; i++) {
            formData.append("files", files[i]);
        }
        console.log(files);
        try {
            const res = await axios.put(`${POST_ALBUM_AUDIO_URL}/${albumId}`, formData,
             {headers: {withCredentials: true, "Content-Type": "multipart/formData"}});
            console.log(res.data);
            if(res.data) {
                setShowPostAudio(true);
            }
        }catch(err) {
            setErrMsg(err?.data?.message);
            console.log(err?.data);
        }   
    }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
    }
  }

  console.log("AlbumId: ", albumId);

  const postAlbumPhoto = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file);
        const res = await axios.put(`${EDIT_ALBUM_URL}/${albumId}`, formData, 
            {headers: {withCredentials: true, "Content-Type": "multipart/form-data"}});
        console.log(res.data);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }
  
  const handleClickEdit = (e, filex) => {
    console.log("filex: ", filex);
    setShowEdit(!showEdit)
    setFileObj(filex);
  }

  const updateAlbum = async (e, id) => {
    console.log("ID: ", id);
    try {
        console.log(text, artist);
        
        console.log(artistNames);
        const res = await axios.put(`${EDIT_ALBUM2_URL}/${id}`, {text:text, title:title, artistName: artistNames, points: points}, {headers: { "Content-Type": "application/json"}, withCredentials: true})
        console.log(res.data);
        setSaveMsg("Lyric has been updated successfully");
        setTimeout(() => {
            setSaveMsg(false);
            setText("");
            setTitle("");
            setArtistNames("");
            setPoints("");
        }, [6000])
    }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data?.message);
    }
  }

  const AlbumPhotoCover = async (e) => {
    console.log("Has been clicked");
    const formData = new FormData();
    formData.append("file", file);
    try {
        const res = await axios.put(`${ALBUM_URL}/${albumId}`, formData, {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true});
        console.log(res.data);
    }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
    }
  }

  const onChangeArtist = (e) => {
    setArtist(e.target.value);
    setArtistNames(e.target.value.split("/"));
  }

  const HoverPhotoFunc = () => {
    setHoverPhoto(true);
  }
 
  return (
    <div className=" md:ml-[20%] mx-1 my-2"> 
        <div className="my-2 bg-indigo-100 py-1 rounded-md shadow text-lg text-center ">
            <h1>2.Album edit</h1>
        </div>
        <div>
            {album.map(al => {
                return (
                    <div key={al._id} className=" my-5 flex space-x-5 ">
                        {al.photo ? 
                            <div onMouseEnter={e=>HoverPhotoFunc(e)} onMouseLeave={() => setHoverPhoto(false)}  onClick={(e) => AlbumPhotoCover(e)} className=" relative w-[40%] md:w-[20%] ">
                               {hoverPhoto ? <MdEdit className=" absolute left-40 cursor-pointer hover:text-indigo-500 w-6 h-6 text-white "/> : null}
                                <img className= { hoverPhoto? " cursor-pointer  border-2 border-y-4 border-gray-700 ":  "border-2 border-y-4 border-gray-700 "} src={photo} alt="photo"/> 
                            </div> : 
                            <div className="border shadow rounded-md w-[49vw]  ">
                                <div className=" py-24 mx-3 ">
                                    <label htmlFor="post" className="cursor-pointer bg-slate-100 p-2 hover:bg-slate-300 rounded-md ">Choose Pic</label>
                                    <input id="post" accept="image/*" type="file" onChange={e=>setFile(e.target.files[0])} hidden/>
                                </div>
                            <button onClick={(e)=> AlbumPhotoCover(e) } type="submit" className=" ml-5 my-5 text-lg p-2 border shadow rounded
                            bg-slate-100 hover:bg-slate-400 hover:translate-y-[1px] ">Save</button>
                            </div>
                        }
                        <div className=" w-[49vw] space-y-2">
                            <h1>Id: <span>{al._id}</span></h1>
                            <h1>Album: <span className=" font-semibold">{al.title}</span> </h1>
                            <h1>artist: <span className=" font-semibold ">{al.artistName}</span></h1>
                            <h1>Description: <span className=" font-semibold ">{al.description}</span></h1>
                            <h1>Points: <span className=" font-semibold ">{al.points}</span></h1>
                        </div>
                    </div>
                )
            })}
        </div>   
        {showPostAudio ?
        <div className=" my-2 ">
            <label htmlFor="audiox" className=" cursor-pointer "><FaUpload className="w-7 h-7 text-blue-500"/>Upload Audios</label>
            <input id="audiox" accept="audio/*" type="file" multiple onChange={e=>setFiles(e.target.files)} hidden/>
            <button onClick={() => postFiles()} className=" block border shadow rounded p-2 bg-slate-100 hover:bg-slate-300">Save</button>
        </div> : null}
        <div className="grid grid-cols-1 border shadow rounded-md border-b-8 border-b-blue-700 md:grid-cols-2 space-x-9 md:space-x-11">
            {audios ? audios.map((filex, i) => {
                return (<div key={filex._id} className=" mx-2 my-3 ">
                    <h1 className="my-1 font-semibold text-gray-700"><span className="font-bold">{i+1}.</span> {filex.originalname.substring(0,30)}</h1>
                    <audio className=" my-1 " src={filex.audio} controls/>
                    <button onClick={(e)=>handleClickEdit(e, filex)} type="submit" className=" my-5 w-96 text-lg p-2 border shadow rounded bg-violet-100
                         hover:bg-violet-400 hover:translate-y-[1px] ">Edit
                    </button>
                </div>)
            }) : null}
            </div> 
            {
                showEdit ? 
                <div>
                    {saveMsg ? 
                        <div className=" mt-1 animate-bounce text-blue-600 text-lg font-medium font-mono  ">
                            <h1>{saveMsg}</h1>
                        </div> 
                        : 
                        null
                    }
                    <div className=" space-x-4 my-1 ">
                        <label className="font-semibold text-gray-600" htmlFor="">Title</label>
                        <input className=" w-96 border shadow rounded p-2 "
                         type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className=" space-x-4 my-1 ">
                        <label className="font-semibold text-gray-600 " htmlFor="">ArtistName</label>
                        <input className=" w-80 border shadow rounded p-2 "
                         type="text" value={artist} onChange={(e)=>onChangeArtist(e)}/>
                    </div>
                    <div className=" space-x-5 my-1 " >
                        <label className="font-semibold text-gray-600" htmlFor="">Lyric</label>
                        <textarea className=" w-96 border border-b-8 border-b-red-200 shadow rounded p-2" 
                        value= {text} onChange={(e)=>setText(e.target.value)}  />
                    </div>   
                    <div className=" space-x-4 my-1 ">
                        <label className="font-semibold text-gray-600 " htmlFor="">Points</label>
                        <input className=" w-80 border shadow rounded p-2 "
                         type="text" value={points} onChange={(e)=>setPoints(e.target.value)}/>
                    </div>
                    <p className="w-[100%] border-b-4 border-b-slate-500 "></p>                
                <div>
                    <button onClick={(e)=>updateAlbum(e,fileObj._id)} type="submit" className=" my-5 w-96 text-lg p-2 border 
                        shadow rounded bg-slate-100 hover:bg-slate-400 hover:translate-y-[1px] ">Save</button>
                </div>
                </div>
                : null
            }
        
    </div>
  )
}

export default EditorAlbum2
