import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
//import "./css/video.css";
import { FaUpDown, FaUpload } from "react-icons/fa6";
import {countries} from "country-data-list";
import axios from "../api/axios";
import { BsArrowDown } from "react-icons/bs";
const ROOM_URL = "/api/v1/room";
const LYRIC_URL = "/api/v1/lyric";
const GET_LYRIC_URL = "/api/v1/lyric/get";
const EDIT_LYRIC_URL = "/api/v1/lyric/edit";
const DELETE_LYRIC_URL = "/api/v1/lyric";
const VIEWS_LYRIC_URL = "/api/v1/lyric/views";
const LIKES_LYRIC_URL = "/api/v1/lyric/likes";
const RECOMMENDED_LYRIC_URL = "/api/v1/lyric/recommendation";
const SEARCH_LYRIC_URL = "/api/v1/lyric/search";
const APP_DATA_URL = "/api/v1/appData";
const EditorPostLyric = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [countriesx, setCountriesx] = useState([]);
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [files, setFiles] = useState(null);
  const [showAudio, setShowAudio] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [audio, setAudio] = useState();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");
  const [lyric, setLyric] = useState("");
  const [photo, setPhoto] = useState();
  const test = countriesx.map(country => country);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [artistField, setArtistField] = useState([{artist: "", show: true}]);
  const [artists, setArtists] = useState([]);
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const res = await axios.get(APP_DATA_URL, {withCredentials: true});
        setGenres(res.data.appData[0].genres);
        setGenre(res.data.appData[0].genres[0]);
      }catch(err) {
        setErrMsg(err?.data?.message);
      }
    }
    getGenres();
  }, [])
  useEffect(() => {
    let fileReader, isCancel = false;
    console.log("photo: ", files);
    if(files) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
            const {result} = e.target;
            if(result && !isCancel) {
                setFileDataURL(result);
            }
        }

        fileReader.readAsDataURL(files[0]);
    }
    console.log(fileDataURL);
    return () => {
      isCancel = true;
      if(fileReader && fileReader.readyState == 1) {
        fileReader.abort();
      }
    }

  }, [files])

  //console.log(test);
  //const country1 = countriesx.filter(country => country.name === "France");
  useEffect(() => {
    setCountriesx(countries.all); 
    setCountry("+33");
  }, [])

  {/** REctification */}
  useEffect(() => {
    async function getLyric() {
      try {
        if(userInfo) {
          const userId = userInfo._id;
          const res = await axios.get(`api/v1/upload/audio/lyric`, {headers: {withCredentials: true}});
          console.log("resss ", res.data);
          setAudio(res.data.lyrics[1].path);
        }
      }
      catch(err) {
          console.log(err);
      }     
    }
    getLyric();
  }, []) 

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get(ROOM_URL, {headers: {withCredentials: true}});
      setCategories(res.data.rooms);
      setCategory(res.data.rooms[0].name);
    }
    getRooms();
  }, [])

  const onChangeCategory = (e) => setCategory(e.target.value);

  const handlePostSubmit = async (e) => {
    e.preventDefault();    
    try {
      if(artistField) {
        let arr1 = [];
        for(let i=0;i<artistField.length;i++) {
          arr1.push(artistField[i].artist);
        }
        setArtists([...arr1])
      }
      console.log("heyy");
      const formData = new FormData();
      for(let i=0; i<files.length; i++) {
        formData.append("files", files[i]);
      }
      formData.append("lyric", lyric);
      formData.append("category", category);
      formData.append("title", title);
      formData.append("description", description);
      for(let i=0;i<artists.length; i++) {
        formData.append("artists", artists[i]);
      }
      formData.append("points", points);
      formData.append("country", country);
      formData.append("isPopular", isPopular);
      formData.append("genre", genre);
      if(artists) {
        const postLyric = await axios.post(LYRIC_URL, formData,{headers: {withCredentials: true, "Content-Type": "multipart/form-data" }} );
        if(postLyric) {
          window.scrollTo(0,50);
          console.log(postLyric);
          setSuccess("Lyric audio/text has been posted successfully ");
          setErrMsg("");
          setArtistField([{artist: "", show: true}]);
          setDescription("");
          setTitle("");
          setPoints("");
          setLyric("");
          setFiles("");
          setIsPopular(false);
          setTimeout(() => {
            setSuccess("");
            setHi(true);
          }, [4000])
        }
        console.log(postLyric)
      }
      
    }catch(err) {
      console.log(err);
      setErrMsg(err?.data?.message);
    }
  }
  console.log(files);

  const onChangeArtistName = (e, i) => {
    let data = [...artistField];
    console.log(data);
    console.log(e.target.name, e.target.value);
    data[i][e.target.name] = e.target.value;
    setArtistField(data);
  } 

  const AddMoreArtistField = (i) => {
    let newField = {artist: "", show: true};
    setArtistField([...artistField, newField])
    let data = [...artistField]
    for(let i=data.length-1; i>=0; i--) {
      data[i]['show'] = false;
    }
    data[i]['show'] = true;
    setArtistField(data);
  }


  

  return (
    <section className=" md:mt-16 md:w-[55vw] bg-gradient-to-r from-purple-200 to-violet-300 md:bg-zinc-200
       md:absolute md:top-0 md:left-40 lg:left-60 xl:left-64 mx-1 px-1">
      <div className=" my-2 mt-1 bg-gradient-to-l from-fuchsia-400 ">
        <h1 className="text-2xl text-center ">Editor DashBard</h1>
      </div>
      {/** Get videos to post */}
      <form className=" p-2 mx-1 my-2 bg-gradient-to-r from-[rgba(0,120,120,0.1)] to-[rgba(0,100,150,0.3)] "
            onSubmit={handlePostSubmit}>
            {Hi ? null : null}      
            {errMsg ? <div className="font-serif text-xl text-red-800 font-semibold"><h1>{errMsg}</h1></div> : null}
            {success ? <div className=" animate-bounce font-serif text-xl text-teal-800 font-semibold"><h1>{success}</h1></div> : null}
        <div className="">
          {fileDataURL ? 
            <img className=" border-2 rounded-md border-blue-200
              mt-1 w-[40vw] h-[35vh] md:w-[20vw] md:h-[40vh] " 
              src={fileDataURL} 
              alt="X"
            />
            : null
          }              
          <div className={ fileDataURL ? " absolute ml-[45vw] top-[30vh] md:ml-[25vw] " : "relative my-2 w-[25%] md:w-[22%]" }>
            <p  className=" text-xl text-teal-800 ml-2 font-semibold mb-2 md:text-lg ">{ fileDataURL ? "Change Pic " : "Select Pic"}</p>
            <div className=" py-1 rounded-lg pr-3 hover:bg-indigo-200">
              <label className=" cursor-pointer" htmlFor='files'>
                <FaUpload className=" ml-7 h-7 w-11"/>
                <p className=" font-serif font-semibold text-purple-900 text-lg mx-6 ">Upload</p>
              </label>
            </div>
            <input type='file' id="files" multiple onChange={e=>setFiles(e.target.files)} hidden/>
            {/* files ? <div>
              {files.map((file,i) => {
                <div key={i} className="">
                  <h1 className="">{file.filename}</h1>
                </div>
              })}
            </div> : null*/}
          </div> 
        </div>

        <div className="my-3 text-lg ">
          <label htmlFor='category'>Category</label>
          <select className="h-11 px-5 text-gray-700 font-semibold rounded-md shadow-sm border outline-none
            w-[80%] block" value={category} onChange={e=>setCategory(e.target.value)}
          > 
            {categories ? categories.map(category => {
              return (<option className=" rounded-lg font-sans m-3" key={category._id} value={category.name}>{category.name}</option>)
            }) : null}
          </select>
        </div>
        <div className="my-3 text-lg ">
          <label htmlFor='genre'>Genres</label>
          <select className="h-11 px-5 text-gray-700 font-semibold rounded-md shadow-sm border outline-none
            w-[80%] block" value={genre} onChange={e=>setGenre(e.target.value)}
          > 
            {genres ? genres.map((genre,i) => {
              return (<option className=" rounded-lg font-sans m-3" key={i} value={genre}>{genre}</option>)
            }) : null}
          </select>
        </div>
        <div className="my-2 md:my-3 ">
            <label htmlFor="title">Title</label>
            <input className=" rounded-md shadow-sm px-2 py-2
             md:py-3  w-[80%] block focus:outline 
             focus:outline-[0.16rem] outline-sky-300
             border-sky-300 " type="text" value={title} 
             onChange={e=> setTitle(e.target.value)}  
            />
        </div>
        <div className="text-lg">
            <label htmlFor="lyric">Lyric</label>
            <textarea id="lyric" className=" h-40 w-[80%] rounded-md py-2 md:py-3 shadow p-2
              focus:outline-[0.16rem] outline-sky-300 block " type="text" value={lyric} onChange={e=>setLyric(e.target.value)}></textarea>
        </div>
        <div>
          <label className=" font-serif text-xl text-teal-800 font-semibold " htmlFor="artist">Artist</label>  
          <div className=" grid grid-cols-2 md:grid-cols-3 ">
            {artistField.map((a,i) => {
            return (
              <div key={i} className=" flex  my-1 md:my-2">        
                  <input 
                    name="artist" 
                    autoComplete="off" 
                    placeholder="artist" 
                    className=" h-14 w-[98%] text-lg border rounded-md shadow block p-2 md:p-2 focus:outline-sky-300" type="text" 
                    value={a.artist} 
                    onChange={(e) => onChangeArtistName(e,i)}/>
                  <div onClick={ (e) => AddMoreArtistField(e,i)} className=" mt-8 hover:bg-teal-100">
                    {a.show ? <BsArrowDown className="  cursor-pointer text-blue-700
                  hover:text-teal-800 w-6 h-6 "/> : null}
                  </div>
              </div>
            )
            })}
          </div>
        </div>
        <div className="my-2 my:py-3">
            <label>Points</label>
            <input className=" h-11 border rounded-md 
            shadow w-[80%] block p-2 md:p-3 focus:outline-[0.16rem] focus:outline-sky-300 " type="text" value={points} min={1} max={100} onChange={e=>setPoints(e.target.value)}/>
        </div>
        <div className="my-2 md:my-3">
          <label>Country</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={country} onChange={e=>setCountry(e.target.value)}> 
            {countriesx ? countriesx.map((countr,i) => {
              return (
                <option className="border m-3" key={i} value={countr.countryCallingCodes[0]}> 
                    <p className=" mx-5">{countr.emoji}</p> <p className=" mr-6">{countr.countryCallingCodes[0]}</p>  <p className=" mr-6">{countr.name}</p>
                </option>
                )
              }) : null}
          </select>           
        </div>
        <div className="my-2 md:my-3">
            <label className="text-lg">Popular</label>
            <input className=" h-6 w-6 ml-7 md:p-3" type="checkbox" value={isPopular} onChange={e=>setIsPopular(e.target.checked)} />
        </div>
        <div className="text-lg">
            <label htmlFor=" description">Description</label>
            <textarea className=" h-32 border w-[80%] rounded-md py-2 
              md:py-3 shadow p-2 outline-sky-300 focus:outline-[0.16rem] block" type="text" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="w-48 my-2 md:my-1 ">
          <button className=" p-2 w-40 text-lg animation delay-150 duration-300 
            border rounded-md shadow-sm bg-indigo-300 hover:bg-indigo-400 
            hover:translate-y-[2px]" 
            type="submit">Post
          </button>
        </div>
      </form>

    </section>
  )
}

export default EditorPostLyric