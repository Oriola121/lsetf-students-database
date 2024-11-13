import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Base ';

export default function Database() {
  const [lsetf, setLsetf] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State to handle the search query

  const usersCollectionRef = collection(db, "students");

  const getData = async () => {
    const data = await getDocs(usersCollectionRef);
    setLsetf(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null); // State to track which description is expanded

  const toggleDescription = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // If clicked again, collapse the description
    } else {
      setExpandedIndex(index); // Expand the clicked description
    }
  };

  const socialLinks = [
    { platform: 'facebook', icon: 'fa-brands fa-facebook' },
    { platform: 'linkedin', icon: 'fa-brands fa-linkedin' },
    { platform: 'github', icon: 'fa-brands fa-github' },
    { platform: 'email', icon: 'fa-solid fa-envelope' },
    { platform: 'whatsapp', icon: 'fa fa-whatsapp' },
  ];

  // Filter students by search query
  const filteredStudents = lsetf.filter((student) => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600">
          Students Database
        </h1>
      </div>

      {/* Search Section */}
      <div className="flex justify-center mb-6">
        <input 
          type="text" 
          placeholder="Search by name..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-gray-900"
        />
        <button 
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {filteredStudents.map((props, index) => (
          <div key={props.id} className="max-w-sm w-full bg-gradient-to-br from-white/60 via-white/40 to-white/30 shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer">
            <div className="flex justify-center pt-6">
              <img src={props.image} alt={props.name} className="w-36 h-36 rounded-full border-4 border-white" />
            </div>
            <div className="text-center mt-4 px-2">
              <h2 className="text-xl font-semibold">{props.name}</h2>
              <p className="text-sm italic mt-2 px-4">{expandedIndex === index ? props.description : `${props.description.slice(0, 50)}...`}</p>
              <button
                onClick={() => toggleDescription(index)}
                className="text-blue-500 mt-2 hover:text-blue-400 transition-colors duration-300"
              >
                {expandedIndex === index ? "Read Less" : "Read More"}
              </button>
            </div>

            {/* Social Icons Section */}
            <div className="flex justify-center my-4 space-x-4">
              {socialLinks.map(({ platform, icon }) => (
                <a 
                  key={platform} 
                  href={props[platform]} 
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-black hover:text-[#FFCB05]">
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
}

 
