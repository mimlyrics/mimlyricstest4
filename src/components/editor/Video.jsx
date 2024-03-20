import { Link } from "react-router-dom";
import {useState, useEffect} from "react";
import queryString from "query-string";
import TimeAgo from "timeago-react";
const Video = ({videoy}) => {
 
  return (
    <div className=" mx-2 my-2  ">
      <Link className="flex bg-gradient-to-r hover:from-teal-100 hover:to-violet-200 " to={`/video/stream?videoId=${videoy._id}`}>
        <div className=" font-medium ">
          <div className="">
            <video 
              className={!videoy.isShort ? 
                "w-[95vw] md:w-[100vw] hover:bg-slate-500 bg-slate-200 rounded-md " :
                "w-[95vw] md:w-[100vw] h-[50vh] hover:bg-slate-500 bg-slate-200 rounded-md "  }
              src={videoy.path} alt="X"
            />
          </div>
          <div className="">
            <div className=" text-gray-800 font-sans ">
              <h1>{videoy.title}</h1>  
            </div>
            <div className="flex space-x-3">
              <TimeAgo datetime={videoy.createdAt}/>
              <h1>{videoy.views} views</h1>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Video
