import {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { FaUpload } from "react-icons/fa6";
import {countries} from "country-data-list";
import queryString from "query-string";
import axios from "../api/axios";
const ROOM_URL = "/api/v1/room";
const GET_LYRIC_URL = "/api/v1/lyric/get";
const EDIT_LYRIC_URL = "/api/v1/lyric/edit";
const APP_DATA_URL = "/api/v1/appData";
import { BsArrowDown } from "react-icons/bs";
const EditorEditLyric = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory]  = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artistName, setArtistName] = useState("");
  const [country, setCountry] = useState("");
  const [countriesx, setCountriesx] = useState([]);
  const [points, setPoints] = useState("");
  const [famous, setFamous] = useState(false);
  const [file, setFile] = useState();
  const [files, setFiles] = useState(null);
  const [audio, setAudio] = useState("");
  const [showAudio, setShowAudio] = useState(false);
  const {userInfo} = useSelector(state => state.auth);
  const [lyric, setLyric] = useState("");
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [Hi, setHi] = useState("");
  var [id, setId] = useState("");

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

  useEffect(() => {
    const {lyricId} = queryString.parse(location.search);
    setId(lyricId);
  }, [id])
  
  useEffect(() => {
    const getLyricById = async () => {    
      try {
        const res = await axios.get(`${GET_LYRIC_URL}/${id}`, {headers: {withCredentials: true}});
        setArtistName(res.data.lyric.artistName);
        setTitle(res.data.lyric.title);
        setDescription(res.data.lyric.description);
        setCategory(res.data.lyric.category);
        setCountry(res.data.lyric.country);
        setLyric(res.data.lyric.lyric);
        setFamous(res.data.lyric.famous);
        setPoints(res.data.lyric.points);
        setLyric(res.data.lyric.lyric);
        //console.log(res.data);
      }catch(err) {
        setErrMsg(err?.data?.message);
        console.log(err?.data);
      }
    }
    getLyricById()
  }, [id])

  useEffect(() => {
    setCountriesx(countries.all); 
    setCountry("France");
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
      if(files) {
        const formData = new FormData();
        for(let i=0; i<files.length; i++) {
          formData.append("files", files[i]);
        }
        formData.append("category", category);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("artistName", artistName);
        formData.append("points", points);
        formData.append("country", country);
        formData.append("famous", famous);
        formData.append("lyric", lyric);
        const putLyric = await axios.put(`${EDIT_LYRIC_URL}/${id}`, formData, {  headers: {"Content-Type": "multipart/form-data"}, withCredentials: true});
        window.scrollTo(0,50);
        if(putLyric) {
          setSuccess("Video has been updated successfully ");
          setErrMsg("");
          setArtistName("");
          setFile();
          setDescription("");
          setTitle("");
          setFamous(false);
          setPoints("");
          setLyric("");
          setTimeout(() => {
            setSuccess("");
            setHi(true);
          }, [4000])
        }
        console.log(putLyric);
      }else {
         const putLyric = await axios.put(`${EDIT_LYRIC_URL}/${id}`, {category:category, title: title,
          description: description, lyric:lyric, artistName: artistName, 
          famous: famous, points: points }, {  headers: {"Content-Type": "application/json"}, withCredentials: true});
        window.scrollTo(0,50);
        if(putLyric) {
          setSuccess("Video has been updated successfully ");
          setErrMsg("");
          setArtistName("");
          setFile();
          setDescription("");
          setTitle("");
          setFamous(false);
          setPoints("");
          setLyric("");
          setTimeout(() => {
            setSuccess("");
            setHi(true);
          }, [4000])
        }
        console.log(putLyric);
      }
    }catch(err) {
      console.log(err);
      setErrMsg(err?.data?.message);
    }
  }


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
    <section className=" md:mt-16 md:w-[55vw]
     bg-indigo-200 md:bg-zinc-200 md:absolute md:top-0 md:left-40 lg:left-60 xl:left-64 my-1 mx-1 px-1">
      <div className=" my-2 mt-1 bg-red-200">
        <h1 className=" text-2xl text-center bg-gradient-to-l from-blue-100 to-purple-100">Edit Lyric</h1>
      </div>
      {/** Get videos to post */}
      <form className=" px-1 mx-1 bg-gradient-to-l from-red-100 to-violet-100" 
          onSubmit={handlePostSubmit}>
            {Hi ? null : null}      
            {errMsg ? <div className="font-bold text-lg text-red-500"><h1>{errMsg}</h1></div> : null}
            {success ? <div className="font-bold text-lg text-green-500"><h1>{success}</h1></div> : null}
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
          </div> 
        </div>
        <div className="my-3 text-lg ">
          <label htmlFor='category'>Category</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={category} onChange={e=>setCategory(e.target.value)}

          > 
            {categories ? categories.map(category => {
              return (<option className="border m-3" key={category._id} value={category.name}>{category.name}</option>)
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
            <input className="border rounded-md shadow-sm px-2 py-2 md:py-3  w-[80%] block" type="text" value={title} onChange={e=> setTitle(e.target.value)}  />
        </div>
        <div className="text-lg">
            <label htmlFor=" lyric">Lyric</label>
            <textarea id="lyric" className=" h-60 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1" type="text" value={lyric} onChange={e=>setLyric(e.target.value)}></textarea>
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
            <input className=" h-11 border rounded-md shadow w-[80%] block p-2 md:p-3" type="text" value={points} min={1} max={100} onChange={e=>setPoints(e.target.value)}/>
        </div>
        <div className="my-2 md:my-3">
          <label>Country</label>
          <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={country} onChange={e=>setCountry(e.target.value)}
          > 
            {countriesx ? countriesx.map(countr => {
               return (<option className="border m-3" key={countr.i} value={countr.name}> <p className=" mx-5">{countr.emoji}</p> <p className=" mr-6">{countr.name}</p> </option>)
            }) : null}
          </select>            
        </div>
        <div className="my-2 md:my-3">
            <label className="text-lg">Famous</label>
            <input className=" h-8 w-7 ml-9 p-2 md:p-3" 
            type="checkbox" value={famous} 
            onChange={e=>setFamous(e.target.checked)} />
        </div>
        <div className="text-lg">
            <label htmlFor="description">Description</label>
            <textarea id="description" className=" h-40 border w-full rounded-md py-2 md:py-3 shadow p-2 outline-1"
             type="text" value={description} onChange={e=>setDescription(e.target.value)}></textarea>
        </div>
        <div className="w-48 py-1 md:my-1">
          <button className=" w-40 px-3 py-2 text-lg animation delay-150 duration-500 border
           rounded-lg shadow-sm bg-indigo-300 hover:bg-indigo-500 hover:translate-y-[1px]" 
           type="submit">Edit Lyrics</button>
        </div>
      </form>
    </section>
  )
}

export default EditorEditLyric
