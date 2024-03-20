

const Infobar = ({firstName}) => {
  return (
    <section className=' my-2 text-lg   '>
      <div className=" ml-32 md:ml-20 flex space-x-2 ">
        <p>*Your messages</p>
        <p className=" text-[20px] md:text-xl text-blue-700 font-semibold">{firstName}</p>
      </div>
    </section>
  )
}

export default Infobar