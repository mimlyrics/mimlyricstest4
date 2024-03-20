import { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';

const Lyric = ({lyricy}) => {
  const [searchLyrics, setSearchLyrics] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [errMsg, setErrMsg] = useState("");   
  const [sLyrics, setSLyrics] = useState([]);
  const [showDescription, setShowDescription] = useState(false);

   /*useEffect(() => {
    const similarLyrics = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/lyric/get/${lyricy._id}`, {headers: {withCredentials: true}});
            setSLyrics(res.data.searchlyrics);        
            console.log(res.data);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    similarLyrics();
    }, [lyricy._id])*/

  return (
    <section className='  my-1 '>
        <Link to={`/lyric/read?lyricId=${lyricy._id}`} 
          className=' ' > 
          <div
            onMouseEnter={()=>setShowDescription(true)}  
            onMouseLeave={()=>setShowDescription(false)}
            className=' hover:bg-blue-100 w-[95%] md:w-[95%] bg-blue-50 border rounded-lg flex flex-col ring-blue-200 ring-2 '>
            {lyricy.photo ? <img className=' rounded-lg m-[3%] w-[38vw] h-[30vh] md:w-[13vw] my-2' src={lyricy.photo} alt='x'/>
            : null
            }
            <p className=' mx-[5%] font-bold '>{lyricy.title}</p>  
            {showDescription && lyricy.description ? <p className=' mx-[5%]'>{lyricy.lyric.substring(0,40)}...</p>  : null}
          </div>
        </Link>     
    </section>
  )
}

export default Lyric
