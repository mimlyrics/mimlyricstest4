import React from 'react';
import { Link } from 'react-router-dom';
const AdminDashBoard = () => {
  return (
    <section className='mx-1 md:py-4 md:mx-48 lg:mx-64 md:text-xl'>
      <div className='border bg-blue-300 text-center py-2  '>
        <h1>Admin DashBoard</h1>
      </div>
      <div className='ml-24 font-bold text-purple-800 text-lg py-2'>
        <h1>____Management___*</h1>
      </div>
      <ul className='flex flex-col  border text-center text-violet-800 text-lg'>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/user">Users</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/room">Rooms</Link>
        <Link className='border-b-2 py-3 md:py-5 hover:bg-indigo-100' to="/admin/role">Roles</Link>
      </ul>
    </section>
  )
}

export default AdminDashBoard
