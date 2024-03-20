import {useState, useEffect, useRef} from "react";
import queryString from "query-string";
import { FaComment, FaShare, FaHeart, FaDownload, FaCommentDots } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { FaX } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import {useSelector} from "react-redux";
import TimeAgo from "timeago-react";
import {IoMdSend} from "react-icons/io";
import Picker from "emoji-picker-react";
import {BsEmojiSmileFill} from "react-icons/bs";
import { FaCamera } from "react-icons/fa6";
import {BiCommentDetail} from "react-icons/bi";
const VIDEO_URL = "/api/v1/video";
const SEARCH_VIDEO_URL = "/api/v1/video/search";
const IMAGE_URL = "/api/v1/upload/avatar";
const COMMENT_VIDEO_URL = "/api/v1/video/comment";
const COMMENT_RESPONSE_VIDEO_URL = "/api/v1/video/comment/response"
const LIKE_COMMENT_RESPONSE_VIDEO_URL = "/api/v1/video/comment/response/like"
const VIEWS_VIDEO_URL = "/api/v1/video/views";
const DOWNLOAD_VIDEO_URL = "/api/v1/video/download";
import axios from "../api/axios";

const VideoStream = () => {
  const [id, setId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [videoy, setVideoy] = useState("");
  const [title, setTitle] = useState("");
  const [downloads, setDownloads] = useState("");
  const [commentv, setCommentv] = useState("");
  const [path, setPath] = useState();
  var [likes, setLikes] = useState(0);
  const [shares, setShares] = useState("");
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [commentLikes, setCommentLikes] = useState("");
  const [responseCommentLikes, setResponseCommentLikes] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [sVideo, setSVideo] = useState([]);
  const [views, setViews] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [hasLike, setHasLike] = useState(false);
  const [likesArr, setLikesArr] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchvideos, setSearchvideos] = useState(null);
  const [rec, setRec] = useState(null);
  const [runComment, setRunComment] = useState(false);
  const [showAnswerComment, setShowAnswerComment] = useState(false);
  const answerCommentRef = useRef();
  const [isShort, setIsShort] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [checkLogin, setCheckLogin] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const {videoId} = queryString.parse(location.search);
    setId(videoId);
  }, [id])
  
  const handleEmojiPicker =  () => {
    setShowEmojiPicker(!showEmojiPicker);
  }
  const handleEmojiClick = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    let txt = text;
    txt += emoji
    setText(txt);
    console.log("emoji: ", emoji);
    console.log("MMM: ", text);
  }

  

  function getUserInfo () {
    if(localStorage.getItem('userInfo')) {
      console.log('Yesss NOOO Garrr');
      let {_id, firstName} = useSelector(state => state.auth.userInfo) 
      return {_id, firstName}
    }
  }

   let {_id, firstName} = getUserInfo() || {};
  console.log("IDD:_ ", _id);
  
  useEffect(() => {
    if(_id) {
      setIsLoggedin(true);
      console.log("TRUUUE")
    }else {
      setIsLoggedin(false);
      console.log("FAAALSE");
    }
  }, [])
  
  useEffect (() => {
    const getImage = async () => {
      try {
        const res = await axios.get(`${IMAGE_URL}/${_id}`, {headers: {withCredentials: true}});
        console.log(res.data);
        setImage(res.data.user.avatar);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getImage();
  }, [isLoggedin])

  useEffect(() => {
    const getVideoById = async () => {
        try {
            const res = await axios.get(`${VIDEO_URL}/${id}/get`, {headers: {withCredentials: true}});
            setPath(res.data.video.path);
            setTitle(res.data.video.title);
            setViews(res.data.video.views);
            setCreatedAt(res.data.video.createdAt);
            res.data.video.likes ? setLikes(res.data.video.likes.length) : setLikes(0);
            setLikesArr(res.data.video.likes);
            setCommentv(res.data.video.comments);
            setShares(res.data.video.shares);
            setDownloads(res.data.video.download);
            setIsShort(res.data.video.isShort);
            //console.log(res.data.video);
            //console.log(videoy);
            const answ = res.data.video.likes.find(like => like ==_id );
            if(answ) {
              setHasLike(true);
            }else {
              setHasLike(false);
            }

        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getVideoById();
  }, [id])

  useEffect(() => {
    const videoViews = async () => {
      try{
        const res = await axios.put(`${VIEWS_VIDEO_URL}/${id}`, {headers: {"Content-Type": "application/json", withCredentials: true}});
        console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    
  }, [id])


  const downloadVideo = async (e) => {
    e.preventDefault();
    console.log("Heyy");
    try {
        const res = await axios.get(`${DOWNLOAD_VIDEO_URL}/${id}`, {headers: {withCredentials: true}});
        console.log(res.data);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
  }
  

  const commentVideo = async (e) => {
    e.preventDefault();
    if(isLoggedin) {
      try {
        const res = await axios.post(COMMENT_VIDEO_URL, 
          {mediaId: id, userId: _id, text: text, username: firstName, userprofile: image, type: 'video'}, 
          {headers: {withCredentials: true}});
        setComments(res.data.comments);
        window.scrollTo(0,1000);
        console.log(res.data);
        setRunComment(true);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }else {
      console.log('ok'); 
      navigate('/login');    
    }
  } 

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await axios.get(`${COMMENT_VIDEO_URL}/${id}/get`, {headers: {withCredentials: true}});
        setComments(res.data.comments);      
        setRunComment(false);
        setShowAnswerComment(false);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getComments();
  }, [id, runComment])

  const answerComment = async (e,commentId) => {
    e.preventDefault();
    if(isLoggedin) {
      setShowAnswerComment(true);
      console.log('ok');
      try {
        //const res = await axios.put(`${COMMENT_RESPONSE_VIDEO_URL}/${commentId}`, 
        //{ userId:_id, txt: text, username: firstName, userprofile: image}, {headers: {withCredentials: true}});
        //console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }else {
      navigate('/login')
    }
  }

  const getCommentResponse = async (e) => {
    e.preventDefault();
    setShowResponse(!showResponse);
  }


  const likeFunction = async (e) => {
    if(isLoggedin) {
      e.preventDefault();
      try {
        const res = await axios.put(`${VIDEO_URL}/${id}/likes`, {userId: _id}, { headers: {"Content-Type": "application/json"}});
        console.log(res.data);
        setLikes(res.data.video.likes.length);   
        const foundLikes = res.data.video.likes.find(like => like === _id);
        console.log('foundLikes: ', foundLikes);
        if(foundLikes) {
          setHasLike(true);
        }else {
          setHasLike(false);
        }
        console.log('haaaLike: ', hasLike);
      }catch(err) {
        setErrMsg(err?.data?.message);      
      }
    }else {
      navigate('/login');
    }
  }

  const likeCommentFunction = async (e, commentId) => {
    e.preventDefault();
    if(isLoggedin) {
      console.log("Yess");
      try {
        const res = await axios.put(`${COMMENT_VIDEO_URL}/${commentId}/${_id}/likes`, 
          {headers: {"Content-Type": "application/json"}});
        console.log(res.data.comment);
        setCommentLikes(res.data.comment.likes.length);
        setRunComment(true);
      }catch(err) {
        console.log(err);
        setErrMsg(err?.data?.message);      
      }
    }else {
      navigate('/login');
    }
  }

  const likeResponseCommentFunction = async (e, commentId) => {
    if(isLoggedin) {
      e.preventDefault();
      try {
        const res = await axios.put(`${LIKE_COMMENT_RESPONSE_VIDEO_URL}/${commentId}`, {userId: _id}, { headers: {"Content-Type": "application/json"}});
        console.log(res.data);
        setResponseCommentLikes(res.data.comment.response.length);
      }catch(err) {
        setErrMsg(err?.data?.message);      
      }
    }else {
      navigate('/login');
    }
  }
  
  const viewComment = () => {
    setShowComments(true);
    setShowAnswerComment(false);
  }


  return (
    <section className=" mt-1 md:mt-2 md:ml-[20%] md:w-[97vw]">
           
      <div className="relative md:w-[100%] ">

        {/**  ABSOLUTE LEFT FOR SINGLE VIDEO */}
        <div className="  ">
          <video className= {!isShort ? " w-[98%] mx-1 md:w-[48%] h-[50vh] md:[50vw] rounded-lg ": 
            " bg-sky-100 w-[90vw] md:w-[45%] h-[75vh] mx-2  rounded-lg "} src={path} controls />
          <h1 className=" text-lg mt-2 md:text-xl font-medium mx-2 md:ml-2 text-gray-800">{title}</h1>
          <div className=" md:text-[15px] text-[15px] mx-2 mt-0 flex space-x-3 ">
            <h1><TimeAgo datetime={createdAt}/></h1>
          <h1 className="font-medium">{views} view(s)</h1>
          </div>
      
      <div className=" mx-2 md:ml-2 flex space-x-20 md:space-x-20">
        {/*Like*/}   
          <FaHeart 
            className= { hasLike ?  "cursor-pointer w-6 h-6 md:w-7 md:h-7 text-red-500" : "cursor-pointer w-6 h-6 md:w-7 md:h-7"} 
            onClick={(e) => likeFunction(e)}/>   
          <FaComment onClick={() => viewComment()} className=" cursor-pointer w-6 h-6 md:w-7 md:h-7 text-slate-900"/>
          <FaShare className="  w-6 h-6 md:w-7 md:h-7 text-slate-900"/>
          <FaDownload onClick={(e)=>downloadVideo(e)} className="  w-6 h-6 md:w-7 md:h-7 bg-yellow-500 cursor-pointer text-slate-900"/>
      </div>
      <div className=" text-[17px] mx-2 md:ml-2 flex space-x-24 md:space-x-24">
          <p >{likes}</p>
          {comments ? <Link to={`video/comments/${id}`}>{comments.length} </Link> : null}
          {shares ? <Link to="/video/share">{shares}</Link> : <Link to="/video/share">0</Link>}
          <p>{downloads}</p>
      </div>
      
      { showComments ?
      comments ?       
        <div className="mx-1 md:w-[46vw]">
        <div className="mt-2 bg-violet-100 mb-3">
          <button className=" mx-3 text-lg font-medium text-blue-950 mb-4">Comments</button>
          <button className=" ml-80 md:ml-[70%] mt-2 "><FaX className="w-5 h-5" onClick={() => setShowComments(false)}/></button>
        </div>
        <div className=" mb-3">
          <button className="shadow p-3 bg-slate-100 mr-7 rounded-md hover:bg-slate-400">Most Popular</button>
          <button className="shadow p-3 bg-slate-300 rounded-md hover:bg-slate-500 ">Most recent</button>  
        </div>

        {/** COMMENTS__SECTion  */}
        {!showAnswerComment ?

          comments.map(comment => {
            return(
              <div className=" md:w-[50vw] mx-2 mb-6 border-b-[1px]" key={comment._id}>
                <div className=" relative flex space-x-9">
                  <img className=" absolute top-1 md:-top-2 w-6 h-6 md:w-7 md:h-7 rounded-full mr-4" src={comment.userprofile} alt="X"/>      
                </div>
                <div className="ml-11 flex space-x-28 mb-2">
                  <h1 className=" text-slate-700 font-sans ">{comment.username}</h1>       
                </div>
                <div className="flex space-x-7">
                  <h1 className="ml-11 w-[70%]">{comment.text}</h1> 
                  <div className="flex space-x-0"> 
                    <FaHeart 
                      onClick={e=>likeCommentFunction(e, comment._id)} 
                      className={ isLoggedin && comment.likes.find(like => like == _id) ? 
                        "w-5 h-5 cursor-pointer text-red-500 mr-1": 
                        "w-5 h-5 cursor-pointer text-blue-300 mr-1"}/>
                      {comment.likes.length > 0 ? <p>{comment.likes.length}</p> : <p>0</p>}
                  </div> 
                    <BiCommentDetail  onClick={e=>answerComment(e, comment._id)} className="w-5 h-5 text-blue-500 cursor-pointer"/>
                </div> 
                {comment.response.length > 0 ? 
                  <p onClick={e=>getCommentResponse(e)} className="cursor-pointer text-blue-500"> {comment.response.length} response(s)</p>
                  :null
                }

          {showResponse ? 
            comment.response.map(res => {
              return(
                <div key={res._id} className="flex flex-col py-2 relative space-x-9">
                  <img className="absolute top-5 w-5 h-5 md:w-7 md:h-7 rounded-full mr-4" src={res.userprofile}/>
                  <h1 className="font-medium">{res.username}</h1> 
                <div className="flex space-x-9">
                  <h1 className="">{res.text}</h1>   
                  <FaHeart onClick={e=>likeResponseCommentFunction(e, res._id) } className="w-5 h-5 text-blue-500 mr-2"/>
                  {res.likes > 0 ? <p>{res.likes.length}</p> : <p>0</p>}
                </div>
                </div>
              )
            }) : null
          }
            
          </div>
            ) 
          }) 
          
          :
          
          <div className=" text-lg text-center text-teal-700 font-semibold border h-32 shadow-sky-300">
            {_id? <h1 >{`We are sorry ${firstName}, it will soon be available`}</h1> : <h1>HO Login</h1> }
            <button onClick={() => setShowAnswerComment(false)} className=" mt-3 px-4 py-2 rounded-lg border bg-blue-600 text-white ">Back</button>
          </div>
        
        } 


        <div className="relative mt-5 ">
          <div className="absolute top-2 left-0 ">
            <BsEmojiSmileFill className="w-10 h-6" onClick={handleEmojiPicker}/>
            {showEmojiPicker && <Picker onClick={handleEmojiClick}/>}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? commentVideo(e) : null)}
            placeholder="add a comment..."
            className=" md:text-lg px-9 py-2 font-sans w-[90%] md:w-[97%] h-11 md:h-16 border shadow rounded"
          />
        <button >
          <IoMdSend className={text ? "text-slate-600 absolute -top-1 ml-1 w-11 h-14 ": "text-slate-200 absolute -top-1 ml-1 w-11 h-14 "} onClick={e=>commentVideo(e)}/>
        </button>
        </div> 
        </div>
      :       
      <div className="relative ml-2  ">
        <h1>Hummm</h1>
          <div className="absolute top-2 left-0 ">
            <BsEmojiSmileFill className="absolute top-6 w-10 h-6" onClick={handleEmojiPicker}/>
            {showEmojiPicker && <Picker onClick={handleEmojiClick}/>}
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? commentVideo(e) : null)}
            placeholder="add a comment..."
            className="  px-9 py-2 bg-slate-100 text-gray-900 w-[80%] md:w-[65%] h-11 border shadow rounded"
          />
        <button >
          <IoMdSend className="absolute top-4 ml-1 w-11 h-14 " onClick={e=>commentVideo(e)}/>
        </button>
        </div>
      : null
      }
      </div> 
      
      
      <h1 className="text-gray-700 font-semibold text-lg ml-3">__Recommendations__</h1>
      <div className=" grid grid-cols-2 lg:grid-cols-none md:absolute md:top-0 md:-mt-5 mt-3">      
        {sVideo ? sVideo.map(video => {
          return (
            <div className=" md:ml-[64vw] mx-2 bg-slate-100" key={video._id}>
              <Link  to={`/video/stream?videoId=${video._id}`}>
                <div>
                  <video className=" h-[19vh] md:h-[20vw] rounded-md" src={video.path} alt="X"/>
                </div>
                <div>
                  <h1>{video.title}</h1>
                </div>
                <div className="flex space-x-5 my-1">   
                  <h1>{video.views}</h1>
                  <TimeAgo datetime={video.createdAt}/>
                </div>
              </Link>
            </div>
          )
        }) : null}
        </div>
      </div>
    </section>
  )
}

export default VideoStream;