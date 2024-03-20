import { useState, useEffect } from "react";
import axios from "../api/axios";
import { FaUpload } from "react-icons/fa6";
const NEWS_URL = '/api/v1/news';
const ROOM_URL = '/api/v1/room';
const APP_DATA_URL = '/api/v1/appData';
const PostNews = () => {
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [files, setFiles] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [Hi, setHi] = useState("");
  const [aboutArr, setAboutArr] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
        try {
            const res = await axios.get(ROOM_URL, {withCredentials: true});
            setCategories(res?.data?.rooms);
            setCategory(res?.data?.rooms[0].name);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getRooms();
  }, [])

  useEffect(() => {
    const getAbout = async () => {
        try {
            const res = await axios.get(APP_DATA_URL, {withCredentials: true});
            setAboutArr(res?.data?.appData[0].about);
            setAbout(res?.data?.appData[0].about[0])
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getAbout();    
  }, [])

  console.log("category: ", category)
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    
    try {
        if(description && about && files && category) {
            const formData = new FormData;
            for(let i=0;i<files.length; i++) {
                formData.append('files', files[i]);
            }
            formData.append('description', description);
            formData.append('about', about);
            formData.append('category', category);
            const res = await axios.post(NEWS_URL, formData, {headers: {"Content-Type": "multipart/form-data"}, withCredentials: true});
            console.log(res.data);
        }else {
            console.log("All fields are required");
        }
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }

  return (
    <section className=" md:mt-16  visible w-[90vw] md:w-[55vw] bg-zinc-100 md:bg-zinc-200 md:absolute md:top-0 md:left-40 lg:left-60 xl:left-64 mx-2 px-1">
      <div className="mb-8 mt-1 bg-gradient-to-l from-fuchsia-400 ">
        <h1 className="text-2xl text-center ">Post News</h1>
      </div>
      {/** Get videos to post */}
      <form className=" mx-2 " onSubmit={handlePostSubmit}>
            {Hi ? null : null}      
            {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
            {successMsg ? <div className="font-bold text-lg text-green-500"><h1>{successMsg}</h1></div> : null}
        <div className=" flex space-x-11 relative my-2">
          <div className="flex-col">
          <p  className="ml-2 font-medium mb-2 md:text-lg ">Photo</p>
          <label className=" cursor-pointer" htmlFor='image'>
            <FaUpload className=" ml-8 h-7 w-11"/><p className=" text-lg ml-8">Upload</p>
            </label>
            <input type='file' id="image"  multiple onChange={e=>setFiles(e.target.files)} />
          </div>       
        </div>
        <div className="my-3 text-lg ">
          <label htmlFor='category'>Category</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" 
            value={category} onChange={e=>setCategory(e.target.value)}
          > 
            {categories ? categories.map(cat => {
              return (<option className="border m-3" key={cat._id} value={cat.name}>{cat.name}</option>)
            }) : null}
          </select>
        </div>
        <div className="text-lg">
            <label htmlFor=" description">Description</label>
            <textarea className=" h-32 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1"
             type="text" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="my-3 text-lg ">
          <label htmlFor='category'>About</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" 
            value={about} onChange={e=>setAbout(e.target.value)}
          > 
            {aboutArr ? aboutArr.map((a,i) => {
              return (<option className="border m-3" key={i} value={a}>{a}</option>)
            }) : null}
          </select>
        </div>
        <div className="w-48 mb-3 md:my-1">
          <button className=" w-40 p-1 text-lg animation delay-150 
          duration-500 border rounded-md shadow-sm bg-indigo-300 hover:bg-indigo-400 
          hover:translate-y-1" type="submit">Send</button>
        </div>
      </form>
    </section>
  )
}

export default PostNews