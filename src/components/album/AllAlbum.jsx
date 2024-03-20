import axios from 'axios';
import { useState, useEffect } from 'react'
const BASE_URL = "http://localhost:5000/api/v1";
//const BASE_URL = "https://mimlyricstest-api.onrender.com";
const AllAlbum = () => {
  const [albums, setAlbums] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [searchAlbums, setSearchAlbums] = useState("");

  useEffect(() => {
    const getAlbums = async () => {
        const res = await axios.get(`${BASE_URL}/albums`, {headers: {withCredentials: true}});
        setAlbums(res.data.albums);
    }
    getAlbums();
  })

  const searchAlbumFunc = async (id) => {
        const res = await axios.get(`${BASE_URL}/albums/${id}`, {headers: {withCredentials: true}});
        setSearchAlbums(res.data.albums);    
  }

  const deleteAlbum = async (id) => {
    try {
        const res = await axios.delete(`${BASE_URL}/albums/${id}`, {headers: {withCredentials: true}});
    }catch(err) {
        setErrMsg(res?.data?.message);
    }
  }

  return (
    <section>
        <div className='bg-slate-200 border p-2 '>
            <h1>Editor Album Management</h1>
        </div>  
        {searchAlbums ? 
            <div className=''>
                <div>
                
                </div>
            </div>: 
            
            <div>
                <div className=''>
                    {albums.map(album => {
                        return (<div key={album._id}>
                            <div>
                                <h1>{album.name}</h1>
                            </div>
                            <div>
                            
                            </div>
                        </div>)
                    })}
                </div>
                <div>
                
                </div>
            </div>
        
        }

    </section>
  )
}

export default AllAlbum
