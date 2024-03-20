import {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room"
const EditorCategory = () => {
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
      <div className=" text-center ">
        <h1 className="text-purple-900 font-bold my-1">__GET Videos__</h1>
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
          to={`/editor/video?categoryx=${category}`} 
          className=" mx-32 w-80 hover:rounded-2xl p-5 md:ml-38 rounded-lg shadow text-center bg-indigo-300 hover:bg-indigo-500 hover:translate-y-1">
          Confirm
        </Link>
    </section>
  )
}
export default EditorCategory
