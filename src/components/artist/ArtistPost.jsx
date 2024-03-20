import { useEffect, useState } from "react"
import axios from "../api/axios"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
const ARTIST_URL = "api/v1/artist";
const ARTISTNAME_URL = "/api/v1/artistName";
import { countries } from "country-data-list";
import { FaUpload, FaX} from "react-icons/fa6";
const styleArr = ['rap', 'urban', 'afro', 'drill', 'gospel', 'pop', 'reaggeton'];

const ArtistPost = () => {
  const [name, setName] = useState("");
  const [origin, setOrigin] = useState("+33");
  const [country, setCountry] = useState("+33");
  const [birthdate, setBirthdate] = useState(new Date());
  const [debut, setDebut] = useState(new Date());
  const [friend, setFriend] = useState("");
  const [production, setProduction] = useState("");
  const [nickname, setNickname] = useState("");
  const [relation ,setRelation] = useState([]);
  const [friends, setFriends] = useState([]);
  const [productions, setProductions] = useState([]);
  const [nicknames, setNicknames] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [relations, setRelations] = useState([]);
  const [countriesx, setCountriesx] = useState("");
  const [file, setFile] = useState();
  const [photo, setPhoto] = useState("");
  
  const [successMsg, setSuccessMsg] = useState(false);
  const [validName, setValidName] = useState(false);
  const [artists, setArtists] = useState([]);
  const [validNameMsg, setValidNameMsg] = useState("");
  const [validNameFocus, setValidNameFocus] = useState("");
  
  const [hasValid, setHasValid] = useState(false);
  const [isSure, setIsSure] = useState(false);

  const [allArtist, setAllArtist] = useState([]);
  const [relatedArtist, setRelatedArtist] = useState([]);
  const [updateArray, setUpdateArray] = useState(false);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [style, setStyle] = useState("");
  const [birthname, setBirthname] = useState("");
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    let fileReader, isCancel = false;
    if(file) {
        fileReader = new FileReader();
        fileReader.onload = (e) => {
            const {result} = e.target;
            if(result && !isCancel) {
                setFileDataURL(result);
            }
        }
        fileReader.readAsDataURL(file);
    }
    return () => {
        isCancel = true;
        if(fileReader && fileReader.readyState == 1) {
            fileReader.abort();
        }
    }
  }, [file])

  useEffect(() => {
    const getArtistName = async () => {
        try {
            const res = await axios.get(`${ARTISTNAME_URL}`, {withCredentials: true});
            console.log(res.data);
            setArtists(res.data.artists);
        }catch(err) {
            setErrMsg(err?.data?.message);
        }
    }
    getArtistName();
  }, [hasValid])


  useEffect(() => {
    const isNameAvailable = () => {
      console.log(artists);
      console.log(name);
      const result = artists.findIndex(artist => artist.name.toLowerCase() == name.toLowerCase());
      console.log(result);
      if(result != -1) {
        setValidName(false);
        setValidNameMsg("Name already used ");
      }else {
        setValidName(true);
        setValidNameMsg("Name available ");
      }
    }
    isNameAvailable();
  }, [name])

  useEffect(() => {
    setCountriesx(countries.all);
  }, [])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0,50);
    if(!name) {
        validNameMsg("Name field is Required");
    }
    
    const formData = new FormData();
    console.log(friend, relation, nickname, production);
    console.log(friends, relations, nicknames, productions);
    try {
        if(validName && name && file) {
            console.log(file);
            formData.append("name", name);
            formData.append("origin", origin);
            formData.append("photo", file);
            formData.append("country", country);
            formData.append("birthdate", birthdate);
            formData.append("debut", debut);
            formData.append("friends", JSON.stringify(friends));
            formData.append("relations", JSON.stringify(relations));
            formData.append("nicknames", JSON.stringify(nicknames)); 
            formData.append("productions", JSON.stringify(productions));
            console.log(formData);
            const res = await axios.post(ARTIST_URL, formData, { headers: {"Content-Type": "multipart/form-data"}, withCredentials: true} );
            console.log(res.data);
            if(res) {
                //window.scrollTo(0,100)
                setHasValid(false);
                setSuccessMsg("Artist has been posted successfully");
                setName('');
                setFile();
                setOrigin("+33");
                setCountry('+33');
                setDebut(new Date());
                setBirthdate(new Date());
                setFriends([]);
                setRelations([]);
                setNicknames([]);
                setProductions([]);
            }
            setTimeout(() => {
                setSuccessMsg(false);
            }, [4000])
        }else if( name && validName) {
            const res = await axios.post(ARTIST_URL, {name, origin, country, birthdate, debut, friends, productions, relations, nicknames}, {headers: {"Content-Type": "application/json"}, withCredentials: true} );
            console.log(res.data); 
            if(res) {
                //window.scrollTo(0,100);
                setHasValid(false);
                setSuccessMsg("Saved successful");
                setName('');
                setFile();
                setOrigin("+33");
                setBirthdate(new Date());
                setCountry('+33');
                setDebut(new Date());
                setFriends([]);
                setRelations([]);
                setNicknames([]);
                setProductions([]);
                setTimeout(() => {
                    setSuccessMsg(false);
                }, [4000])
            }          

        }else {
            setValidNameMsg("Name already used");
        }
    }catch(error) {
        setErrMsg(error?.data?.message)
    }
  }

  function onChangeName(e) {
    setName(e.target.value.trimStart());
  }

  function onChangeBirthname(e) {
    setBirthname(e.target.value.trimStart())
  }

  function onChangeFriend(e) {
    if(e.target.value === ',') {
        setFriend('');
    }else {
        setFriend(e.target.value.trimStart());
    }    
  }

  function onKeyFriend(e) {
    friends.push(friend);
    setFriend('');
    console.log(friends);
  }
  

  useEffect(() => {
    setFriends(friends);
    setRelations(relations);
    setProductions(productions);
    setRelations(relations);
  }, [updateArray])

  function deleteFriend(i) {
    console.log(i);
    friends.splice(i, 1);
    setFriends(friends);
    console.log(friends);
    setUpdateArray(!updateArray);
  }

  function onChangeNickname(e) {
    if(e.target.value === ',') {
        setNickname('');
    }else {
        setNickname(e.target.value.trimStart());
    }
  }
    
  function onKeyNickname(e) {
    nicknames.push(nickname);    
    setNickname('');
    console.log(nicknames);
  }

  function deleteNickname(i) {
    console.log(i);
    nicknames.splice(i,1);
    setNicknames(nicknames);
    setUpdateArray(!updateArray);
  }

  function onChangeProduction(e) {
    if(e.target.value === ',') {
        setProduction('');
    }else {
        setProduction(e.target.value.trimStart());
    }
  }

  function onKeyProduction(e) {
    productions.push(production);
    setProduction('');
    console.log(production);
  }

  function deleteProduction(i) {
    console.log(i);
    productions.splice(i,1);
    setProductions(productions);
    setUpdateArray(!updateArray);
  }

  function onChangeRelation(e) {
    setRelation(e.target.value); 
    setRelations(e.target.value.split('@'));
    setUpdateArray(!updateArray);
    console.log(relations);
    console.log(relation);
  }

  function handleConfirm(e) {
    e.preventDefault();
    window.scrollTo(0,100)
    if(!name) {
        return 
    }else {
        setHasValid(true);
    }
  }


  return (
    <section className={" bg-gradient-to-r from-indigo-100 to-indigo-300 mt-1 mx-1 md:ml-[22%] md:mt-[1%]"}>
        <form className=" text-gray-600 border p-5 " >
            <div className=" py-2 border bg-purple-100 text-gray-600 text-lg rounded-md text-center ">
                <h1 className="  ">Artist++</h1>
            </div>
            <div className=" text-lg my-2 ">
                <label htmlFor="name">Name: </label>
                <input
                    autoComplete="off"       
                    type="text"
                    placeholder=""
                    id="name"
                    className=" rounded-md focus:outline-dotted focus:ring-2 focus:ring-gray-400 p-2 "
                    value={name}
                    onChange={(e) => onChangeName(e)}
                    onFocus={() => setValidNameFocus(true)}
                    onBlur={() => setValidNameFocus(false)}
                />
            </div>
            <div className=" text-lg my-2 ">
                <label htmlFor="name">Real name: </label>
                <input
                    autoComplete="off"       
                    type="text"
                    placeholder=""
                    id="name"
                    className=" rounded-md focus:outline-dotted focus:ring-2 focus:ring-gray-400 p-2 "
                    value={birthname}
                    onChange={(e) => onChangeBirthname(e)}
                />
            </div>
            {fileDataURL ? <img className=" border-2 rounded-md border-blue-200 mt-11 w-[48vw] h-[40vh] md:w-[20vw] md:h-[30vh] " src={fileDataURL} alt="X"/> : null}

            <div className="absolute left-32 top-[25%] md:left-[32%] md:top-[29%] text-lg my-2">
                {  validName && name && validNameMsg ?
                     <h1 className="text-green-700">{validNameMsg}</h1>
                     : null
                }
            </div>
            <div className="absolute left-32 top-[25%] md:left-[32%] md:top-[29%] text-lg my-2">
                { validNameFocus && !validName && name && validNameMsg ? 
                    <h1 className="text-[rgba(247,47,220,0.9)]">{validNameMsg}</h1>
                    : null
                }
            </div>
            <div className="absolute left-32 top-[25%] md:left-[32%] md:top-[29%] text-lg my-2">
                { !validNameFocus && !validName && validNameMsg ? 
                    <h1 className="text-[rgba(247,47,220,0.9)]">{validNameMsg}</h1>
                    : null
                }
            </div>
            <div className="absolute left-32 top-[25%] md:left-[32%] md:top-[29%] text-lg my-2">
                { !name ? 
                    <h1 className="text-[rgba(247,47,220,0.9)]">Name field is Required</h1>
                    : null
                }
            </div>

            <div className="absolute left-[40%] top-[40%] text-lg md:text-xl my-2 ">
               {successMsg ? <h1 className="text-blue-500">{successMsg}</h1> : null}
               {errMsg ? <h1 className=" text-red-500 ">{errMsg}</h1> : null}
            </div>
            <div className={ hasValid? " -z-50 opacity-0" : ""}>
               <div className={ fileDataURL ? " absolute ml-[50vw] top-[40vh] md:ml-[25vw] " : "relative my-2 w-[25%] md:w-[22%]" }>
                    <p  className="ml-2 font-medium mb-2 md:text-lg ">{ fileDataURL ? "Change Pic " : "Select Pic"}</p>
                    <div className=" py-1 rounded-lg pr-3 hover:bg-indigo-200">
                        <label className=" cursor-pointer" htmlFor='photo'>
                            <FaUpload className=" ml-8 h-7 w-11"/><p className=" text-lg ml-8">Upload</p>
                        </label>
                    </div>
                    <input type='file' id="photo" accept='image/*' onChange={e=>setFile(e.target.files[0])} hidden/>
                </div> 
                
                <div className="my-2 md:my-3">
                <label>Origin</label>
                    <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={origin} onChange={e=>setOrigin(e.target.value)}
                    > 
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
                    <label>Country</label>
                    <select className="h-11 px-5 rounded-md shadow-sm border outline-none bg-gray-200 w-[80%] block" value={country} onChange={e=>setCountry(e.target.value)}
                    > 
                        {countriesx ? countriesx.map((countr,i) => {
                        return (
                            <option className="border m-3" key={i} value={countr.countryCallingCodes[0]}> 
                                <p className=" mx-5">{countr.emoji}</p> <p className=" mr-6">{countr.countryCallingCodes[0]}</p>  <p className=" mr-6">{countr.name}</p>
                            </option>
                        )
                        }) : null}
                    </select>            
                </div> 
                </div>
                <div className=" relative text-lg my-2 ">
                    <label htmlFor="name">Birth Date: </label>
                    <DatePicker className="p-2 rounded-md bg-gray-50 focus:outline-none focus:ring-[3px] focus:ring-gray-400 focus:bg-gray-100 " selected={birthdate} onChange={date=>setBirthdate(date)}/>
                </div> 
                <div className=" mx-4 relative text-lg my-2 space-x-4 ">
                    <label htmlFor="name">Debut: </label>
                    <DatePicker className="p-2 rounded-md bg-gray-50 focus:outline-none focus:ring-[3px] focus:ring-gray-400 focus:bg-gray-100 " selected={debut} onChange={date=>setDebut(date)}/>
                </div>  
           
            {hasValid ? 
                <div className=" opacity-100 absolute top-[47%]  my-2 bg-slate-50 h-20 w-[90%] md:w-[70%] text-center">
                    <div>
                        <h1> Are you Sure ? </h1>
                    </div>
                    <div onClick={(e) => handleSubmit(e)} className=" border h-8 w-11 pt-1 cursor-pointer text-green-700 ml-11 float-left hover:bg-slate-100 ">
                        <h1>Yes</h1>
                    </div>
                    <div onClick={() => setHasValid(false)} className=" border h-9 w-16 pt-1 cursor-pointer text-red-700 float-right mr-16 hover:bg-slate-100 ">
                        <h1>Cancel</h1>
                    </div>
                </div> : null
            }
           
            <div className={ "relative flex flex-col"}>
                <label className="my-1 text-lg" htmlFor="friend">Friends</label>
                <textarea
                 id="friend" 
                 placeholder="Add Tags" value={friend}
                 onKeyDown={(e) => e.key === 'Enter' || e.key === ',' ? onKeyFriend(e) : null }    
                 onChange={(e) => onChangeFriend(e)} 
                className=" px-2 rounded-md text-lg text-gray-500 py-6 focus:outline-none focus:ring-[3px]
                 focus:ring-gray-400 focus:rounded-lg "/>
            </div>
            <div className="  absolute top-[113vh] md:top-[115vh] px-2 text-[17px] flex space-x-6 ">
                {friends.map((friend,i) => {
                    return (<div key={i} className=" " >
                        <h1 className=" flex space-x-4  bg-purple-200 rounded-lg px-3 ">{friend} 
                            <FaX onClick={() => deleteFriend(i) } 
                            className=" ml-2 mt-1 cursor-pointer w-5 h-4 hover:text-indigo-800 hover:translate-y-[1px] "/> 
                        </h1>
                    </div>)
                    })
                }
            </div>
            <div className=" flex flex-col ">
                <label className="my-1 text-lg" htmlFor="relation">Related</label>
                <textarea id="relation" 
                  value={relation} 
                  onChange={(e) => onChangeRelation(e)} 
                  className=" rounded-md text-lg text-gray-500 p-2 focus:outline-none focus:ring-[3px]
                 focus:ring-gray-400 focus:rounded-lg "/>
            </div>
            <div className=" relative flex flex-col ">
                <label className="my-1 text-lg" htmlFor="nickname">Nick Names</label>
                <textarea
                  id="nickname" 
                  placeholder="Add tags"
                  value={nickname} 
                  onChange={(e) => onChangeNickname(e)} 
                  onKeyDown={(e) => e.key === 'Enter' || e.key === ',' ? onKeyNickname(e) : null }   
                  className=" px-2 rounded-md text-lg text-gray-500 p-2 focus:outline-none focus:ring-[3px]
                 focus:ring-gray-400 focus:rounded-lg "/>
            </div>
            <div className="  absolute top-[152vh] md:top-[153vh] px-2 text-[17px] flex space-x-6 ">
                {nicknames.map((nickname,i) => {
                    return (<div key={i} className=" " >
                        <h1 className=" flex space-x-4  bg-purple-200 rounded-lg px-3 ">{nickname} 
                            <FaX onClick={() => deleteNickname(i) } 
                            className=" ml-2 mt-1 cursor-pointer w-5 h-4 hover:text-indigo-800 hover:translate-y-[1px] "/> 
                        </h1>
                    </div>)
                    })
                }
            </div>
            <div className=" flex flex-col ">
                <label className="my-1 text-lg" htmlFor="production">Productions </label>
                <textarea id="production"
                 value={production}
                 placeholder="add tags"
                 onChange={(e) => onChangeProduction(e)} 
                 onKeyDown={(e) => e.key === 'Enter' || e.key === ',' ? onKeyProduction(e) : null}
                 className=" rounded-md text-lg text-gray-500 p-2 focus:outline-none focus:ring-[3px]
                 focus:ring-gray-400 focus:rounded-lg "/>
            </div>
            <div className="  absolute top-[169vh] md:top-[169vh] px-2 text-[17px] flex space-x-6 ">
                {productions.map((production,i) => {
                    return (<div key={i} className=" " >
                        <h1 className=" flex space-x-4  bg-purple-200 rounded-lg px-3 ">{production} 
                            <FaX onClick={() => deleteProduction(i) } 
                            className=" ml-2 mt-1 cursor-pointer w-5 h-4 hover:text-indigo-800 hover:translate-y-[1px] "/> 
                        </h1>
                    </div>)
                    })
                }
            </div>
            <button  onClick={(e) =>handleConfirm(e)} 
            className=" my-2 cursor-pointer bg-indigo-300 text-center w-[40%] py-3 text-lg text-gray-800
                rounded-md hover:rounded-lg hover:translate-y-[2px] hover:bg-indigo-500 ">
                Post
            </button>
        </form> 
    </section>
  )
}

export default ArtistPost
