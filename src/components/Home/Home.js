import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'

function Home() {
  const [click, setClick] = useState(true)

  const handleClick = () => {
    setClick(!click)
  }

  return (
    <div className="w-full h-screen flex flex-col bg-gray-100 text-black">
      <div className="flex justify-between items-center p-5">
        <div className=" text-3xl font-bold">
          LSETF
        </div>
        <div className="block md:hidden" onClick={handleClick}>
          {click ? <FaBars /> : <FaTimes />}
        </div>
        <div className="hidden md:flex items-center justify-around w-1/2">
          <div><Link to="/student" className="block px-4 py-2 hover:bg-orange-500 rounded">Student</Link></div>
          <div><Link to="/sponsors" className="block px-4 py-2 hover:bg-orange-500 rounded">Sponsor</Link></div>
          <div><Link to="/authorpage" className="block px-4 py-2 hover:bg-orange-500 rounded">Author</Link></div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center flex-grow text-center px-6">
        <div className="text-4xl md:text-5xl font-bold leading-snug mb-4">
          Lagos State Employment Trust Fund (LSETF) <br />
          & <br />
          United States African Development Foundation (USADF) <br />
          in partnership with <br />
          LoftyInc Allied Partners
        </div>

        <div className="text-2xl md:text-3xl font-medium mt-4">
          Students/Beneficiaries Database
        </div>
      </div>
    </div>
  )
}

export default Home
