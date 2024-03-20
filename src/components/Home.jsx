import {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import WebFont from "webfontloader"
import "./css/index.css";
import { FaExclamation, FaFacebook, FaSnapchat, FaWhatsapp } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import { useMimlyrics } from "./context/AppProvider";
const Home = () => {

useEffect(() => {
   WebFont.load({
     google: {
       families: ['Droid Sans', 'Chilanka']
     }
   });
  }, []);

  const {isActiveModalNavbar, setIsActiveModalNavbar} = useMimlyrics();

  return ( 
    <section className={ isActiveModalNavbar ? " relative opacity-60 -z-50 " :  "  -z-50 font-medium space-x-1 mx-1 mt-1 lg:mx-3 md:ml-48 lg:ml-64" }>

      <div className=' mt-2 md:mt-2 pl-2 pr-14 md:pr-20 py-1'>
        <div className=" ">
          <p className="text-gray-900 ">
            Welcome to mimlyrics ! a web app where you can watch and get lyrics video in four languages (english, french, spanish, german)
            for entertainment or post .
          </p>

        <p className=" pt-2 ">
          This web app is subdivided into categories (mimlyrics francais, mimlyrics, mimletras, mimlyrics Deutsch) etc to allow 
          User find content that suit them the most .
        </p>
      </div>
      </div>
 
      <div className=" flex flex-col md:text-lg md:py-1 ">
        <div className=" text-sky-950 font-mono w-[40%] flex flex-col mx-2 mb-1">
          <p className=''> _______</p>
          <Link to="/video/category" className="">
            Videos
          </Link>
          <Link to="/lyric/category" className="text-lg">
          Lyrics
          </Link>
          <Link to="/infochat" className=""xt-c>
            Chat
          </Link>
          <Link to="/editor/artist" className="">Artist</Link>
          <Link to="/albums" className="" >Albums</Link>
          <Link className="text-gray-700" to="/admin/dashboard" >Admin DashBoard</Link>
          <Link to="/editor/dashboard">Editor Dashboard</Link>
        </div>

        <div className=" text-gray-800 w-[100%] px-3 bg-gradient-to-r from-[rgba(30,30,30,0.1)] to-[rgba(20,50,50,0.2)] md:flex md:space-x-28">
          <div className="flex flex-col mb-3 py-1">
            <p>About Us</p>
            <Link to="/location" className="ml-3">
              Location
            </Link>
            <Link to="/why" className="ml-3">
              Why ?
            </Link>

            <div className=" my-2 ">
              <Link to="/">Contact</Link>
              <div className="flex">
                <FaWhatsapp className=" w-5 h-5 md:w-7 md:h-7 "/>+237 6245401
              </div>
              <div className="flex">
                <FaExclamation className=" w-5 h-5 md:w-7 md:h-7"/> Geographic Location
              </div>
            </div>
          </div>

          <div className="flex flex-col mx-3 mb-3">
            <p className="text-lg">Follow Us on</p>
            <div className="flex space-x-2 py-1">
              <FaYoutube className="w-6 h-6 md:w-7 md:h-7 text-red-600"/>
              <Link to="/youtube" >Youtube</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaFacebook className="w-6 h-6 md:w-7 md:h-7 text-blue-600"/>
              <Link to="/facebook">Facebook</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaInstagram className="w-6 h-6 md:w-7 md:h-7 text-purple-800"/>
              <Link to="/instagram">Instagram</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaTiktok className="w-6 h-6 md:w-7 md:h-7 text-gray-800"/>
              <Link to="/tiktok">Tiktok</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaTwitter className="w-6 h-6 md:w-7 md:h-7 text-blue-500"/>
              <Link to="/twitter">Twitter</Link>
            </div>
            <div className="flex space-x-2 py-1">
              <FaGithub className="w-6 h-6 md:w-7 md:h-7"/>
              <Link>Github</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home