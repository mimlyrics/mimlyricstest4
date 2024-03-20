import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
//import Footer from "./components/Footer";
import { Navigate } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import Chat from "./components/chat/Chat";
import Room from "./components/chat/Room";
import { useSelector } from "react-redux";
import Message from "./components/chat/Message";
import Profile from "./components/Profile";
import Test from "./components/Test";
import InfoChat from "./components/chat/InfoChat";
import EditorPost from "./components/editor/EditorPost";
import EditorDashboard from "./components/editor/EditorDashboard";
import EditorVideo from "./components/editor/EditorVideo";
import Category from "./components/editor/Category";
import LyricsVideo from "./components/editor/LyricsVideo";
import Footer from "./components/Footer";
import AdminUser from "./components/admin/AdminUser";
import AdminRoom from "./components/admin/AdminRoom";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import AdminAddUser from "./components/admin/AdminAddUser";
import AdminEditUser from "./components/admin/AdminEditUser";
import AdminAddRoom from "./components/admin/AdminAddRoom";
import AdminEditRoom from "./components/admin/AdminEditRoom";
import AdminRole from "./components/admin/AdminRole";
import EditorCategory from "./components/editor/EditorCategory";
import EditorEditVideo from "./components/editor/EditorEditVideo";
import VideoStream from "./components/editor/VideoStream";
import EditorEditLyric from "./components/Lyric/EditorEditLyric";
import EditorLyric from "./components/Lyric/EditorLyric";
import Lyric from "./components/Lyric/Lyricx";
import EditorPostLyric from "./components/Lyric/EditorPostLyric";
import EditorLyricCategory from "./components/Lyric/EditorLyricCategory";
import Lyricx from "./components/Lyric/Lyricx";
import LyricCategory from "./components/Lyric/LyricCategory";
import Language from "./components/setting/Language";
import ErrorData from "./components/error/ErrorData";
import LyricRead from "./components/Lyric/LyricRead";
import Album from "./components/album/Album";
import AlbumList from "./components/album/AlbumList";
import AlbumRead from "./components/album/AlbumRead";
import EditorAlbum from "./components/album/EditorAlbum";
import EditorAlbum2 from "./components/album/EditorAlbum2";
import EditorAlbum3 from "./components/album/EditorAlbum3";
import EditorAlbum1 from "./components/album/EditorAlbum1";
import AllAlbum from "./components/album/AllAlbum";
import RequireAuth from "./components/authMiddleware/RequireAuth";
import RequireAdmin from "./components/authMiddleware/RequireAdmin";
import RequireEditor from "./components/authMiddleware/RequireEditor";
import ErrorMiddleware from "./components/authMiddleware/ErrorMiddleware";
import ArtistPost from "./components/artist/ArtistPost";
import Theme from "./components/setting/Theme";
import Assistance from "./components/policy/Assistance";
import Mode from "./components/setting/Mode";
import About from "./components/About";
import Privacy from "./components/policy/Privacy";
import Termsofuse from "./components/policy/Termsofuse";
import Cookiepolicy from "./components/policy/Cookiepolicy";
import Help from "./components/setting/Help";
import Settings from "./components/setting/Settings";
import Location from "./components/Location";
import Artist from "./components/artist/Artist";
import ArtistEdit from "./components/artist/ArtistEdit";
import ArtistRead from "./components/artist/ArtistRead";
import PostNews from "./components/news/PostNews";
import EditNews from "./components/news/EditNews";
import News from "./components/news/News";
import AppData from "./components/static_data/AppData";
import EditAppData from "./components/static_data/EditAppData";
import PostAppData from "./components/static_data/PostAppData";
import EditorNews from "./components/news/EditorNews";
import EditorAppData from "./components/static_data/EditorAppData";
import EditorMongodb from "./components/editor/EditorMongodb";
function App() {
  const {userInfo} = useSelector(state => state.auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  //console.log(isAdmin, isEditor);
  return (
    <Router>    
        <Navbar/>
      <Routes>        
      {/**Public routes */}    
        <Route path="/" element={<Home/>} />          
        <Route path="/assistance" element={<Assistance/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/termsofuse" element={<Termsofuse/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/cookie" element={<Cookiepolicy/>}/>
        <Route path="/help" element={<Help/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/location" element={<Location/>}/>
        <Route path="/auth/error" element={<ErrorMiddleware/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/video/stream" element={<VideoStream/>}/> 
        <Route path="/video/category" element={<Category/>}/> 
        <Route path="/video" element={<LyricsVideo/>}/>
        <Route path="/category" element={<Category/>}/>     
        <Route path="/editor/video/category" element={<EditorCategory/>}/>
        <Route path="/lyric/list" element={<Lyric/>}/>
        <Route path="/lyric" element={<Lyricx/>}/>
        <Route path="/lyric/category" element={<LyricCategory/>}/>
        <Route path="/lyric/read" element={<LyricRead/>}/>
        <Route path="/editor/lyric/category" element={<EditorLyricCategory/>}/>
        <Route path="/language" element={<Language/>}/>
        <Route path="/profile" element={<Profile/>}/>
        
      </Routes>

        <Routes>
          {/** RequireAuth routes */}
          <Route element={<RequireAuth/>}>
            <Route path="/chat" element={<Chat />} />
            <Route path="infochat" element={<InfoChat/>}/>
            <Route path="/room" element={<Room />} />  
            <Route path="/message" element={<Message/>}/>
            <Route path="/test" element={<Test/>}/>
            {/** videos, lyric, chats */}
          </Route>
        </Routes>
      

        {/** Protected Admin routes */}
        <Routes>
          <Route element={<RequireAdmin/>}>
            <Route path="/admin/user" element={<AdminUser/>}/>
            <Route path="/admin/room" element={<AdminRoom/>}/>
            <Route path="/admin/dashboard" element={<AdminDashBoard/>}/>
            <Route path="/admin/user/add" element={<AdminAddUser/>}/>
            <Route path="/admin/user/edit" element={<AdminEditUser/>}/>
            <Route path="/admin/room/add" element={<AdminAddRoom/>}/>
            <Route path="/admin/room/edit" element={<AdminEditRoom/>}/>
            <Route path="/admin/role" element={<AdminRole/>}/>        
          </Route>
        </Routes>

        {/**Protected Editor routes */}
        <Routes >
          <Route element={<RequireEditor/>}>  
            <Route path="/editor/video/add" element={<EditorPost/>}/>
            <Route path="/editor/dashboard" element={<EditorDashboard/>}/>
            <Route path="/editor/video" element={<EditorVideo/>}/>
            <Route path="/editor/video/edit" element={<EditorEditVideo/>}/>
            <Route path="/editor/lyric" element={<EditorLyric/>}/>
            <Route path="/editor/lyric/add" element={<EditorPostLyric/>}/>
            <Route path="/editor/lyric/edit" element={<EditorEditLyric/>}/>              
            <Route path="/error" element={<ErrorData/>}/>
            <Route path="/editor/album" element={<EditorAlbum/>} />
            <Route path="/editor/album2" element={<EditorAlbum2/>}/>
            <Route path="/editor/album3" element={<EditorAlbum3/>}/>
            <Route path="/editor/album1" element={<EditorAlbum1/>}/>
            <Route path="/editor/album/all" element={<AllAlbum/>}/>
            <Route path="/albums" element={<Album/>}/>
            <Route path="/album/list" element={<AlbumList/>}/>
            <Route path="/album/read" element={<AlbumRead/>}/>
            <Route path="/editor/artist/add" element={<ArtistPost/>}/>
            <Route path="/editor/artist" element={<Artist/>} />
            <Route path="/editor/artist/edit" element={<ArtistEdit/>}/>
            <Route path="/artist/read" element={<ArtistRead/>}/>
            <Route path="/news" element={<News/>}/>
            <Route path="/post/news" element={<PostNews/>}/>
            <Route path="/edit/news" element={<EditNews/>}/>
            <Route path="/editor/post/appData" element={<PostAppData/>}/>
            <Route path="/editot/edit/appData" element={<EditAppData/>}/>
            <Route path="/appData" element={<AppData/>}/>
            <Route path="/editor/news" element={<EditorNews/>} />
            <Route path="/editor/appData" element={<EditorAppData/>}/>
            <Route path="/editor/database" element={<EditorMongodb/>}/>
          </Route>
        </Routes>
    </Router>
  );
}

export default App;