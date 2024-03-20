import {useState} from 'react'
const CONVERT_To_HTTPS = '/api/v1/convert_https';
const CONVERT_To_HTTP = '/api/v1/convert_http';
import axios from '../api/axios';
import { FaC, FaCheck, FaX } from 'react-icons/fa6';
const EditorMongodb = () => {
  const [errMsg, setErrMsg] = useState(false);
  const [records, setRecords] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const [confirmHttp, setConfirmHttp] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false); 

  const UpdateToHttpsFiles = async () => {
    console.log('update files record');
    try {
        const res = await axios.put(CONVERT_To_HTTPS, {withCredentials: true});
        console.log(res.data);
        setSuccessMsg(res.data);
        setErrMsg(false);
        setTimeout(() => {
            setSuccessMsg(false);
        }, [3000])
    }catch(err) {
        setErrMsg(err?.data?.message);
        setSuccessMsg(false);
    }
  }

    const UpdateToHttpFiles = async () => {
    console.log('update files record');
    try {
        const res = await axios.put(CONVERT_To_HTTP, {withCredentials: true});
        console.log(res.data);
        setSuccessMsg(res.data);
        setErrMsg(false);
        setTimeout(() => {
            setSuccessMsg(false);
        }, [3000])
    }catch(err) {
        setErrMsg(err?.data?.message);
        setSuccessMsg(false);
    }
  }

  const confirmHttpFunc = () => {
    setConfirmHttp(true);
    setConfirm(false);
  }

  const confirmHttpsFunc = () => {
    setConfirm(true);
    setConfirmHttp(false);
  }

  const clearFunc =  () => {
    setConfirm(false);
    setConfirmHttp(false);
  }

  return (
    <section className='md:ml-[20%] md:mt-[0%]'>
      <div className=' h-[60vh] border sky-blue-400 shadow-lg shadow-sky-500'>

        {successMsg ? <div className=' mt-2 flex space-x-2'>
            <FaCheck className='w-6 h-6 text-green-600'/>
            <h1 className=' animate-bounce text-lg font-mono'>{successMsg}</h1> 
        </div> : null}
        {errMsg? <div className=' mt-2 flex space-x-2'>
            <FaX className='w-6 h-6 text-red-600'/>
            <h1 className=' animate-bounce text-lg font-mono'>{errMsg}</h1>
        </div> : null}
        {confirm ? 
            <div className=' m-10 w-[20vw] border shadow-lg shadow-sky-100 flex space-x-14'>
                <h1 onClick={() => UpdateToHttpsFiles()} className=' h-14 py-5 hover:bg-slate-200 flex cursor-pointer'>
                    <FaCheck className='w-6 h-6'/>Yes
                </h1>
                <h1 onClick={() =>clearFunc()} className='  h-14 py-5 hover:bg-red-200 flex cursor-pointer'>
                    <FaX className=' w-6 h-6 text-red-500'/>Cancel
                </h1>
            </div>
            : null}
        {confirmHttp ? 
            <div className=' m-10 w-[20vw] border shadow-lg shadow-sky-100 flex space-x-14'>
                <h1 onClick={() => UpdateToHttpFiles()} className=' h-14 py-5 hover:bg-slate-200 flex cursor-pointer'>
                    <FaCheck className='w-6 h-6'/>Yes_
                </h1>
                <h1 onClick={() =>clearFunc()} className='  h-14 py-5 hover:bg-red-200 flex cursor-pointer'>
                    <FaX className=' w-6 h-6 text-red-500'/>Cancel_
                </h1>
            </div>
            : null}
        <div 
            className=' cursor-pointer text-center m-[5vh] border p-3 text-white bg-indigo-500 hover:bg-indigo-800 hover:translate-y-[2px]' 
            onClick={() => confirmHttpsFunc()}>
            <button>CONVERT_ALL_FILES_TO_HTTPS</button>
            <h1 className=' mt-5 font-mono text-[14px] text-white font-semibold'>This is to ensure all files path that were previously recorded as http to be https</h1>
        </div>
        <div 
            className=' cursor-pointer text-center m-[5vh] border p-3 bg-green-600 hover:bg-green-800 hover:translate-y-[2px]' 
            onClick={() => confirmHttpFunc()}>
            <button>CONVERT_ALL_FILES_TO_HTTP</button>
            <h1 className=' mt-5 font-serif text-[15px] text-white font-semibold'>This is to ensure all files path that were previously recorded as https to be http</h1>
        </div>
      </div>
    </section>
  )
}

export default EditorMongodb
