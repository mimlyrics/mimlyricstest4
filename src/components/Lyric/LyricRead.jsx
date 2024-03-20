import queryString from 'query-string';
import { useEffect, useState } from 'react';
import { BsEye, BsViewStacked } from 'react-icons/bs';
import { FaUnderline } from 'react-icons/fa6';
import { FaItalic } from 'react-icons/fa6';
import { FaBold } from 'react-icons/fa6';
import { FaSearchengin } from 'react-icons/fa6';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa6';
import { IoMdSearch } from 'react-icons/io';
import { useMimlyrics } from '../context/AppProvider';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import Lyric from './Lyric';
const ROOM_URL = "/api/v1/room";
const LYRIC_URL = "/api/v1/lyric";
const GET_LYRIC_URL = "/api/v1/lyric/get";
const EDIT_LYRIC_URL = "/api/v1/lyric/edit";
const DELETE_LYRIC_URL = "/api/v1/lyric";
const VIEWS_LYRIC_URL = "/api/v1/lyric/views";
const LIKES_LYRIC_URL = "/api/v1/lyric/likes";
const RECOMMENDED_LYRIC_URL = "/api/v1/lyric/recommendation";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";
const ARTIST_URL= "/api/v1/artist/name";
import { useSelector } from 'react-redux';
const LyricRead = () => {
  const [searchLyrics, setSearchLyrics] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [errMsg, setErrMsg] = useState("");   
  const [sLyrics, setSLyrics] = useState([]);
  const [lyric, setLyric] = useState({});
  const [id, setId] = useState("");
  const [text, setText] = useState([]);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [likes, setLikes] = useState("");
  const [isLoggedin, setIsLoggedin] = useState(null);
  const navigate = useNavigate();

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

  const [hasLiked, setHasLiked] = useState(false);
  const [views, setViews] = useState(0);
  const {isActiveModalNavbar} = useMimlyrics();
  const [rLyrics, setRLyrics] = useState(null);
  const [category, setCategory] = useState("");
  const [artistName, setArtistName] = useState([]);
  const [showDescription, setShowDescription] = useState(false);
  const [artists, setArtists] = useState(null);
  console.log(location.search);

  useEffect(() => {
    const {lyricId} = queryString.parse(location.search);
    setId(lyricId);
  }, [id])

  useEffect(() => {
    const getLyric = async () => {
      try {
        const res = await axios.get(`${GET_LYRIC_URL}/${id}`, {headers: {withCredentials: true}})
        //console.log(res.data.lyric);
       setLikes(res.data.lyric.likes.length);
       setViews(res.data.lyric.views);
       setArtists(res.data.lyric.artists);
       console.log("--------(((")
       setCategory(res.data.lyric.category);
       setText(res.data.lyric.lyric.split("\r\n"));   
        setLyric((prevState) => {
          return {prevState, ...res.data.lyric}
        });
      console.log(lyric);
      if(_id) {
        const foundLikes = res.data.lyric.likes.find(like => like == _id);
        if(foundLikes) {
          setHasLiked(true);
        } else {
          setHasLiked(false);
        } 
      } 
       
       console.log("XXXXXXx");   
      }catch(err) {
        console.log(err?.data?.message);
        setErrMsg(err?.data?.message);
      }
    }
    getLyric();
  }, [id, hasLiked, category,likes])

  console.log(lyric);
  const searchLyricsF = async () => {
    try {
        const res = await axios.get(`${SEARCH_LYRIC_URL}/${searchId}`, 
          {headers: {withCredentials: true}});
        setSearchLyrics(res.data.searchlyrics);
    }catch(err) {
        setErrMsg(err?.data?.message);
    }
   }

   useEffect(() => {
    const similarLyrics = async () => {
        try {
            const res = await axios.put(`${LYRIC_URL}/${category}/recommendation`, {artists},
             {headers: {withCredentials: true}});
            setSLyrics(res.data.lyricx);
            setRLyrics(res.data.lyrics);        
            console.log(res.data);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    similarLyrics();
    }, [id, artists])

    useEffect(() => {
      setTimeout(() => {
      const lyricViews = async () => {
        try {
          const res = await axios.put(`${VIEWS_LYRIC_URL}/${id}`, 
            { headers: {"Content-Type": "application/json"}});
          console.log(res.data);
          setViews(res.data.lyric.views);   
        }catch(err) {
          setErrMsg(err?.data?.message);      
        }
      }
      lyricViews();
      }, [10000])
    }, [id])

  const likeLyricFunc = async (e) => {
    if(isLoggedin) {
      e.preventDefault();
      try {
        const res = await axios.put(`${LIKES_LYRIC_URL}/${id}`, {userId: _id}, 
          { headers: {"Content-Type": "application/json"}});
        console.log(res.data);
        setLikes(res.data.lyric.likes.length);   
        if(_id) {
          const foundLike = res.data.lyric.likes.find(like => like == _id);
          if(foundLike) {
            setHasLiked(true);
          }else {
            setHasLiked(false);
          }
        }
      }catch(err) {
        setErrMsg(err?.data?.message);      
      }
    }else {
      navigate('/login');      
    }
  }

  return (
    <section className={ isActiveModalNavbar ? "relative -z-50 opacity-60" : "md:absolute md:top-16 md:ml-[20%] mx-1 md:mx-3"}>
      <div className=' my-2  '>
        <div className=' mx-3 flex space-x-8 items-center'>
          {lyric.photo ? <img className=' w-[35vw] md:w-[15vw] md:h-[30vh] 
            ring-2 ring-sky-600' src={lyric.photo} alt='x'/>: null}
          <div className='flex flex-col space-y-3 md:space-y-2 '>
            <div className=' text-center ring-2  ring-sky-600'>
            {lyric.title?  <p className=' p-1 md:p-2 '>{lyric.title}</p>: null}
            </div>
            <div className=' md:py-2 flex space-x-6 '>
              <FaUnderline onClick={() => setIsUnderlined(!isUnderlined)} className = { isUnderlined ? `text-blue-700 font-bold text-lg` :`text-blue-300 text-lg` }/>
              <FaItalic onClick={() => setIsItalic(!isItalic)} className = { isItalic ? `text-blue-700 font-bold text-lg` :`text-blue-300 text-lg`}/>
              <FaBold onClick={() => setIsBold(!isBold)} className = { isBold ? `text-blue-700 font-bold text-lg` :`text-blue-300 text-lg`}/>
            </div>
            <div className=' flex space-x-6'>
              <div className=''>
                <FaThumbsUp onClick={(e) => likeLyricFunc(e)} 
                  className={ hasLiked ? ' cursor-pointer text-gray-900 w-6 h-6 md:w-7 md:h-7' :
                 'cursor-pointer text-gray-200 w-6 h-6 md:w-7 md:h-7'}
                />
                { lyric.likes ? <h1>{likes}</h1> : <h1>0</h1> }
              </div>
              <div className='py-1'>
                <BsEye className='text-gray-700 w-6 h-6 md:w-7 md:h-7'/>
                { lyric.views ? <h1>{lyric.views} </h1> : <h1>0</h1>}
              </div>
            </div>
          </div>
        </div>
        <div>
          <audio src={lyric.path} controls className=' w-[70%] my-3' /> 
        </div>
        <div className=' md:w-[50vw] text-sky-950  '>
          {text.map(t=> {
            return <div 
                className={ isUnderlined && isItalic && isBold ? ' mx-3 underline italic font-semibold': null ||
                isUnderlined && isItalic ? ' mx-3 underline italic': null  ||
                isUnderlined && isBold ? ' mx-3 underline font-semibold': null || 
                isItalic && isBold ? ' mx-3 italic font-semibold ': null ||
                isUnderlined ? ' mx-3 underline' : null || 
                isBold ? ' mx-3 font-semibold' : null ||
                isItalic ? ' mx-3 italic' : null || ' mx-3'}  key={t.i} 
                >
                <p className='py-2 mx-11 -my-2 md:w-[40vw]'>{t}</p>       
            </div>
          })}
          
        </div>
        <div className='  py-1 text-gray-900 '>
          <p className=' mb-1 font-semibold text-lg text-gray-700 '>Description:</p>
          <p className=' mx-8 md:w-[40vw]'>{lyric.description}</p>       
        </div>
      </div>

      <div className='flex space-x-2  '>
          <h1 className='text-gray-700 font-semibold '>OTHERS - </h1>
          { artistName ?  artistName.map((a,i) => {
            return( <div className='' key={i}>
               {artistName.length <= i+1  ? <h1 >{a} </h1> : <h1>{a} & </h1>} 
            </div>)
          }) : null}
      </div>

      <div className='mx-2 rounded-md '>
          { rLyrics ? rLyrics.map((lyric,i) => {
            return (<div className=' ' key={lyric._id}>
              <Link to={`/lyric/read?lyricId=${lyric._id}`} 
               className=' '>
               <div className=' mx-8 px-2 bg-blue-50 hover:bg-blue-200 py-2 flex space-x-3 space-y-0'>
                <p className='text-gray-900 font-bold'>{i+1}.</p>
                <p>{lyric.title}</p>
               </div>
              </Link>
            </div>)
          }) : null}
      </div>
          
      <h1 className='text-gray-700 font-semibold text-lg'>Recommendation:</h1>
      <div className='my-2 md:mt-1 grid max-w-[700px] grid-cols-2 px-5 lg:grid-cols-3 gap-2 lg:gap-5'>          
        { sLyrics ? sLyrics.map(lyricy => {
          return  <Lyric key={lyricy._id} lyricy={lyricy} />
            
            {/*<Link key={lyricy._id} to={`/lyric/read?lyricId=${lyricy._id}`} 
                className=' ' > 
                  <div
                    onMouseEnter={()=>setShowDescription(true)}  
                    onMouseLeave={()=>setShowDescription(false)}
                    className=' hover:bg-blue-100 w-[95%] md:w-[95%] bg-blue-50 border rounded-md flex flex-col ring-blue-200 ring-2 '>
                    {lyricy.photo ? <img className=' m-[3%] w-[25vw] h-[20vh] md:w-[13vw] my-2 ' src={lyricy.photo} alt='x'/>
                      : null
                    }
                    <p className=' text-[15px] mx-[5%] font-bold '>{lyricy.title}</p>  
                    {showDescription && lyricy.description ? <p className=' text-[12px] mx-[5%]'>{lyricy.lyric.substring(0,40)}...</p>  : null}
                    </div>
                  </Link> */}
          
        })
      : null}
      </div>
    </section>
  )
}

export default LyricRead
