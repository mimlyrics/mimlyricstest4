import { useState, useEffect } from "react"
const ARTIST_URL = "/api/v1/artist";
import axios from "../api/axios";
import { BsPlus, BsX } from "react-icons/bs";

import { Link } from "react-router-dom";
const Artist = () => {
  const [name, setName] = useState();
  const [birthdate, setBirthdate] = useState("");
  const [origin, setOrgin] = useState("");
  const [country, setCountry] = useState("");
  const [debut, setDebut] = useState("");
  const [productions, setProductions] = useState("");
  const [nicknames, setNickNames] = useState("");
  const [friends, setFriends] = useState("");
  const [photo, setPhoto] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchArtist, setSearchArtist] = useState("");
  const [searchId, setSearchId ] = useState("");
  const [artists, setArtists] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const [style, setStyle] = useState('');
  const [birthname, setBirthname] = useState('');
  
  useEffect(() => {
    const getArtists = async () => {
      try {
        const res = await axios.get(`${ARTIST_URL}`);
        setArtists(res.data.artists);
        console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getArtists();
  }, [])

  const searchArtistFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${ARTIST_URL}/${searchId}`, {withCredentials: true});
      setSearchArtist(res.data.artist);
    }catch(err) {
      setErrMsg(err?.data?.message);
    }
  }

  const clearSearchId = () => {
    setSearchId('');
    console.log(searchId);
    console.log("ok");
  }
  return (
    <section className=" mx-1 md:ml-[20%] ">
      <div className=" relative bg-slate-200 mt-1 py-1 text-center text-lg text-purple-800">
        <h1>Artist Info</h1>
      </div>
      <Link to="/editor/artist/add" className=" absolute top-16 right-11 ">
        <BsPlus className=" w-8 h-8 cursor-pointer text-purple-400 hover:text-purple-900 "/>
      </Link>
      <div className="relative ml-[10%] md:ml-[2%] mt-1 ">
        <BsX onClick={() => clearSearchId()} className=" absolute z-50 top-2 w-8 h-8 
        cursor-pointer text-teal-500 hover:text-teal-700  "/>
        <input value={searchId} onChange={e=>setSearchId(e.target.value)} onClick={(e) => e.key === 'Enter' ? searchArtistFunc(e, searchId) : null} placeholder="search artist ..."  className=" pl-9 w-[70vw] border rounded-md p-3 focus:outline " />
        <button  className=" cursor-pointer absolute top-1 right-20 md:right-24 
          border rounded-sm w-5 h-10 "></button>    
      </div>
      {/** SEARCH BUTTON */}
      <div>
        <label htmlFor=""></label>
      </div>
      {!searchArtist ? 
      <div className=" grid grid-cols-2 md:grid-cols-4 ">
          {artists ? artists.map(a => {
            return (<div className=" mx-1 my-11 " key={a._id}>
              <Link to={`/artist/read?artistIdx=${a._id}`} className=" hover:bg-slate-100 ">
                  {a.photo ? 
                    <img src={a.photo} alt="Photo"/>
                     : null
                  }
                  <p className=" ml-2 text-gray-600 font-bold">{a.name}</p>
                  {a.friends ? <div>
                      {a.friends.map((i,friend) => {
                        <div key={i}>
                          <h1>{friend}</h1>
                        </div>
                      })}
                    </div> : null}
                <button className=" hover:bg-green-500 ml-5 px-4  rounded-md bg-green-200 ">Edit</button>           
              </Link>            
            </div>)
          }) : null}
      </div> 
      
      : null
    
    }
        
      <div className="text-center bg-slate-300 mt-3">
          <h1>Road</h1>
      </div>
    </section>
  )
}

export default Artist