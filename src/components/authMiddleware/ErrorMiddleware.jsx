
const ErrorMiddleware = ({errMsg}) => {
  return (
    <section className="">
        {errMsg ? 
            <div className="text-center border shadow rounded-md text-lg 
                md:text-2xl font-bold text-gray-800 bg-violet-100">
                <div className="relative w-[80vw] h-[80vh]">
                    <h1 className=" absolute top-[35vh] mx-4 md:mx-60">{errMsg}</h1>  
                    <h1 className=" text-red-500 top-[50vh] absolute mx-4 md:mx-96">401</h1>    
                </div>
            </div> : null
        }    
    </section>
  )
}

export default ErrorMiddleware
