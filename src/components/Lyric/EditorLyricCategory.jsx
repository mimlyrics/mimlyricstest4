import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const EditorLyricCategory = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, []);

  console.log("category: ", category);

  return (
    <section className=" md:absolute md:top-11  md:w-[50%] md:ml-[27%] my-2 py-3">
      <div className="text-center">
        <h1>__GET Lyrics__**</h1>
      </div>
      {/** Get videos to post */}
        <div className=" text-center flex flex-col ">
          <label htmlFor='category'>Category</label>
          <select className=" mb-9 mx-3 h-16 text-lg " value={category} onChange={e=>setCategory(e.target.value)}
          >
            {categories ? categories.map(categoryx => {
              return (<option className=" rounded-full shadow bg-zinc-300 h-20 "  key={categoryx._id} value={categoryx.name}>{categoryx.name}</option>)
            }) : null}
          </select>
        </div>
        <Link onClick={ e=>(!category) ? e.preventDefault() : null} 
          to={`/editor/lyric?categoryx=${category}`} 
          className=" w-32 h-11 p-4 ml-28 rounded:md shadow text-center bg-indigo-300 hover:bg-indigo-500 hover:translate-y-1" >Confirm</Link>
        
    </section>
  )
}
export default EditorLyricCategory