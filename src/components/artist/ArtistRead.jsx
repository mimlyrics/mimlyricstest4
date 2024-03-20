import { useState, useEffect } from 'react'
import queryString from "query-string";
import axios from '../api/axios';

const ARTIST_URL = "/api/v1/artist";
const ALBUM_URL = "/api/v1/album";
const LYRIC_URL = "/api/v1/lyric";
const VIDEO_URL = "/api/v1/video";
const ArtistRead = () => {
  const [artist, setArtist] = useState("");
  const [artists, setArtists] = useState([]);
  const [name, setName] = useState("");
  const [birthName, setBirthname] = useState("");
  const [styles, setStyles] = useState([]);
  const [friends, setFriends] = useState([]);
  const [relations, setRelations] = useState([]);
  const [productions, setProductions] = useState([]);
  const [nicknames, setNicknames] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [videos, setVideos] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [artistId, setArtistId] = useState('');
  const [photo, setPhoto] = useState("");
  const [age, setAge] = useState("");
  const [debut, setDebut] = useState("");
  const [news, setNews] = useState("");

  console.log("HELLO HERE !");

  useEffect(() => {
    const {artistIdx} = queryString.parse(location.search);
    setArtistId(artistIdx);
  }, [artistId])


  useEffect (() => {
    const getArtist = async () => {
        try {
            const res = await axios.get(`${ARTIST_URL}/${artistId}`,  {withCredentials: true});
            setArtist(res?.data);
            console.log(res.data.artist);
            setName(res.data.artist.name);
            setPhoto(res.data.artist.photo);
            setAge("20");
            setDebut(res.data.artist.debut.getUTCDate());
            
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getArtist();
    }, [artistId])

    /*useEffect(() => {
        const getAlbums = async () => {
            try {
                const res = await axios.get(`${ALBUM_URL}/${name}`, {withCredentials: true});
                setAlbums(res?.data.albums);
            }catch(err) {
                setErrMsg(err?.data?.message);
            }
        } 
        getAlbums();  
    })

    useEffect(() => {
        const getLyric = async () => {
            try {
                const res = await axios.get(`${LYRIC_URL}/${name}`, {withCredentials: true});
                setLyrics(res?.data.lyrics);
            }catch(err) {
                setErrMsg(err?.data?.message);
            }
        }
        getLyric();
    })

    useEffect(() => {
        const getVideo = async () => {
            try {
                const res = await axios.get(`${VIDEO_URL}/${name}`, {withCredentials: true});
                setVideos(res?.data.videos);
            }catch(err) {
                setErrMsg(err?.data?.message);
            }
        }
        getVideo();
    })*/

  return (
    <section className=' mx-2 mt-1 md:ml-[20%]'>
      <div className='text-center text-xl text-purple-700 font-semibold bg-purple-200'>
        <p>{name}</p>
      </div>
      <div className='mt-1 flex space-x-3'>
        {photo ? <img src={photo} alt=""/> : null}
        <div>
            <div className='flex space-x-1'>
                <p>Name: </p>
                <p className='text-gray-600 font-semibold'>{name}</p>
            </div>
            <div className='flex space-x-1'>
                <p>Age </p>
                <p className='text-gray-600 font-semibold'>{age}</p>
            </div>
            <div className='flex space-x-1'>
                <p>Debut: </p>
                <p className='text-gray-600 font-semibold'>{debut}</p>
            </div>
        </div>
      </div>

      <div className=''>
        {albums ? 
            <div className=''>
                <h1>Albums</h1>

            </div>
            : null
        }
      </div>

      <div>
        {lyrics ?
            <div>
                <h1>Lyrics</h1>
            </div>
            :
            null
        }
      </div>

      <div>
        {videos ?
            <div>
                <h1>Videos</h1>
            </div>
            :
            null
        }
      </div>

      <div>
        {news ?
            <div>
                <h1>News</h1>   
            </div>
            :
            null
        }
      </div>
      <div className='mt-4 mx-2 font-bold '>
        <h1>Still more to come...</h1>
      </div>
      
    </section>
  )
}

export default ArtistRead
