import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { useMimlyrics } from "../context/AppProvider";

import MimHome5 from "../../assets/mimlyricspng/MIMfrancais.png"
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const LyricCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const {isActiveModalNavbar} = useMimlyrics();
  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, []);

  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60" : "absolute top-14 w-[100vw] md:top-16 md:w-[50%] md:ml-[27%] my-2 py-3"}>
      <div className=" text-center ">
        <h1 className="text-purple-900 font-bold my-1">__GET LYRICS__</h1>
      </div>
      {/** Get videos to post */}
        <div className=" text-center flex flex-col ">
          <label className=" text-lg font-extralight mb-2 text-gray-700 " htmlFor='category'>Category</label>
          <select className=" mb-9 mx-1 h-14 text-lg " value={category} onChange={e=>setCategory(e.target.value)}
          >
            {categories ? categories.map(categoryx => {
              return (<option className=" text-center rounded-full shadow bg-zinc-300 h-16 "  key={categoryx._id} value={categoryx.name}>{categoryx.name}</option>)
            }) : null}
          </select>
        </div>
        <Link onClick={ e=>(!category) ? e.preventDefault() : null} 
          to={`/lyric?categoryx=${category}`} 
          className=" mx-32 w-80 hover:rounded-2xl p-5 md:ml-38 rounded-lg shadow text-center bg-indigo-300 hover:bg-indigo-500 hover:translate-y-1">
          Confirm
        </Link>
    </section>
  )
}
export default LyricCategory