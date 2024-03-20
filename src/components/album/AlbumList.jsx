import { useState, useEffect } from "react"
import { FaX, FaShare } from "react-icons/fa6";
import queryString from "query-string";
import axios from "../api/axios";
import { Link } from "react-router-dom";
const ALBUM_URL = "/api/v1/album";
const GET_ALBUM_URL = "/api/v1/album/get";
const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [albumId, setAlbumId] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const {albumIdx} = queryString.parse(location.search);
    console.log(location.search);
    setAlbumId(albumIdx);
  }, [albumId])

  console.log("ALbumId: ",albumId)
  useEffect(() => {
    const getAlbumById = async () => {
        console.log("HEt");
        try {
            const res = await axios.get(`${GET_ALBUM_URL}/${albumId}`, {headers: {withCredentials: true}});
            setAlbums(res.data.album);
            console.log(res.data);    
        }catch(err) {
            setErrMsg(err?.data?.message);
            console.log(err?.data);
        }
    }
    getAlbumById();
  }, [albumId]);
 
  return (
    <section className="mx-1 mt-1 md:-mt-4 md:ml-[20%]">
        <h1>ALBUMLIST</h1>
        <div className=" border shadow-2xl bg-gray-50 p-10 text-xl px-[20%] ">
        {albums ? 
          albums.map(al => {
            return (
              <div key={al._id}>
                <div className="m-1">
                  <Link to={`/album/read?albumxId=${al._id}`} className="hover:cursor-pointer ">
                    <img className="w-[30%]" src={al.photo}/>
                  </Link>
                  <div className=" flex space-x-2 text-lg text-gray font-mono ">
                    <h1 className="">{al.artistName}-</h1>  
                    <h1 className="ml-3 font-mono">{al.title.toLowerCase()}</h1>   
                  </div>
                  <div>
                    {al.lyric.map((l, i) => {
                        return (<div key={l._id}>
                            <div>
                                {l.title ? 
                                    <Link to={`/album/read?lyricIdx=${l._id}`} className=" cursor-pointer flex space-x-2 hover:bg-gray-200 ">
                                        <h1 className=" pl-3 ">{i}.</h1>    
                                        <h1> {l.title}</h1>
                                    </Link>
                                : null }
                            </div>
                        </div>)
                    })}
                  </div>
                </div> 
              </div>)
          }) : null}
        </div>

        <div className="mt-4 text-lg">
          <h1>Recent Albums</h1>
        </div>
    </section>
  )
}

export default AlbumList
