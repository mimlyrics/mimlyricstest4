import { Link } from "react-router-dom"

const EditorDashboard = () => {
  return (
    <section className=' md:absolute md:top-14 md:-left-6 lg:left-0 md:w-[55%] lg:w-[55%]  mx-1 md:py-4 md:mx-48 lg:mx-64 md:text-xl'>
      <div className='border bg-blue-300 text-center py-2  '>
        <h1>Editor DashBoard</h1>
      </div>
      <div className='ml-24 font-bold text-purple-800 text-lg py-2'>
        <h1>____Management___*</h1>
      </div>
      <ul className='flex flex-col  border text-center text-violet-800 text-lg'>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/video/category">Videos</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/lyric/category">Lyrics</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/artist">Artist</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/album">Albums</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/news">News</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/appData">App Data</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/database">Conversion</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/editor/statistics">Statistics</Link>
      </ul>
    </section>
  )
}

export default EditorDashboard