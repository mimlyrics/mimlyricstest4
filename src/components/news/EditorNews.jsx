import {useState, useEffect} from "react";
import axios from "../api/axios";
const NEWS_URL = "/api/v1/news";
import TimeAgo from "timeago-react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
const APP_DATA_URL = "/api/v1/appData";
const EditorNews = () => {
  const [news, setNews] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [aboutArr, setAboutArr] = useState("");
  const [about, setAbout] = useState("");
  const [searchByAbout, setSearchByAbout] = useState(null);
  const [activeChoice, setActiveChoice] = useState("all");

  useEffect(() => {
    const getAbout = async () => {
        try {
            const res = await axios.get(APP_DATA_URL, {withCredentials: true});
            setAboutArr(res?.data.appData[0].about);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getAbout();
  }, [])

  const onClickAbout = async (about) => {
    console.log(about);
    setActiveChoice(about);
    try {
        const res = await axios.get(`${NEWS_URL}/${about}/about`, {withCredentials: true});
        setSearchByAbout(res.data.news);
        console.log(res.data);
    }catch(err) { 
        console.log(err.data);
        setErrMsg(err?.data?.message);
    }
  }
 
  useEffect(() => {
    const getNews = async () => {
        try {
            const res = await axios.get(NEWS_URL, {withCredentials: true});
            setNews(res.data.news);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getNews();
  }, [])

    const onClickAllAbout = async () => {
        setActiveChoice('all');
        try {
            const res = await axios.get(NEWS_URL, {withCredentials: true});
            setSearchByAbout(null);
            setNews(res.data.news);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
  
  return (
    <section className=" md:ml-[20%] my-1 mx-1 ">
        <div className=" border rounded-md shadow shadow-blue-200 py-3 text-center text-purple-800 text-lg bg-purple-50 ">
            <h1>Editor News</h1>
        </div>
        <div className=" mt-4 ">
            <Link className="  border p-3 rounded-e-lg bg-blue-50 hover:bg-blue-300 " to="/post/news">Add News</Link>
        </div>

        <div className="my-2">
            <div className="text-center text-lg text-gray-700 border shadow-purple-300 bg-zinc-50 p-2 my-1 ">
                <h1>Recent News</h1>
            </div>
            <div className=" flex space-x-2 md:space-x-7 my-2 ">
                <div 
                    onClick={() => onClickAllAbout()} 
                    className={activeChoice === 'all' ? "cursor-pointer bg-zinc-900 text-[rgb(255,250,250)] p-1 rounded-md"
                     : "cursor-pointer bg-zinc-500 text-[rgb(255,250,250)] p-1 rounded-md"}>
                    <h1 >All</h1>
                </div>
                {aboutArr ? aboutArr.map((about,i) => {
                    return (
                        <div onClick={() => onClickAbout(about)} className={ about === activeChoice ? "md:px-5 hover:bg-zinc-900 cursor-pointer bg-zinc-900 text-[rgb(255,250,250)] p-1 rounded-md " : "md:px-5 hover:bg-zinc-900 cursor-pointer bg-zinc-500 text-[rgb(255,250,250)] p-1 rounded-md "} key={i}>
                            <h1>{about}</h1>
                        </div>
                    )
                }) : null}
                <FaArrowRight className="w-7 h-7 cursor-pointer hover:text-[rgb(0,240,240)] rounded-md hover:bg-[rgb(0,200,200)] text-[rgb(0,200,200)] "/>
            </div>
            </div>
            <div className="  ">
            {searchByAbout ? 
                <div className=" grid md:grid-cols-2 md:space-x-3 ">                            
                 {searchByAbout.map((n,i) => {
                        return( 
                            <div className="bg-[rgba(0,150,150,.1)] mb-5" key={n._id}>
                                <div className=" flex justify-between">
                                    <TimeAgo className=" text-purple-900 font-serif text-lg " datetime={n.createdAt}/>
                                    <button className=" border rounded-e-md px-2 bg-green-200 hover:bg-green-400 ">Edit</button>
                                </div>
                                {n.photos ? 
                                    <div className="grid grid-cols-2 ">
                                    {n.photos.map((photo,pIndex) => {
                                    return(
                                        <div key={pIndex} className="  "> 
                                            <img className="rounded-md w-[47vw] h-[25vh] my-1" src={photo}/>
                                        </div>
                                    )
                                }) }</div>: null } 
                                <div className="">
                                    <h1>{n.description}</h1>
                                </div>
                            </div>   
                        )
                    })}
                    </div>
                    : 
                    <div className=" grid md:grid-cols-2 md:space-x-3 ">
                     { news ?
                         news.map((n,i) => {
                        return( 
                            <div className="bg-[rgba(0,150,150,.1)] mb-5" key={n._id}>
                                <div className=" flex justify-between">
                                    <TimeAgo className=" text-purple-900 font-serif text-lg " datetime={n.createdAt}/>
                                    <button className=" border rounded-e-md px-2 bg-green-200 hover:bg-green-400 ">Edit</button>
                                </div>
                                {n.photos ? 
                                    <div className="grid grid-cols-2 ">
                                    {n.photos.map((photo,pIndex) => {
                                    return(
                                        <div key={pIndex} className="  "> 
                                            <img className=" rounded-md w-[47vw] h-[25vh] my-1 " src={photo}/>
                                        </div>
                                    )
                                }) }</div>: null } 
                                <div className="">
                                    <h1>{n.description}</h1>
                                </div>
                            </div>                            
                        )
                    })
                : null}
                </div>
                }
            
            </div>       
    </section>
  )
}

export default EditorNews
