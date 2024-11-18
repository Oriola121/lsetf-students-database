/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './db';
import AddStudentForm from './add-student';
import { Pencil, Trash2, X } from 'lucide-react';

// Custom Alert Dialog Component
const AlertDialog = ({ isOpen, onClose, onConfirm, title, description, confirmText, confirmStyle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 rounded-md text-white ${confirmStyle}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function DataView() {
  const [lsetf, setLsetf] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [addNew, setAddNew] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, studentId: null });
  const [editDialog, setEditDialog] = useState({ isOpen: false, student: null });

  const usersCollectionRef = collection(db, "students");

  const getData = async () => {
    const data = await getDocs(usersCollectionRef);
    setLsetf(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getData();
  }, []);

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const addNewStudent = async (student) => {
    try {
      const newDocRef = await addDoc(usersCollectionRef, student);
      setLsetf([...lsetf, { ...student, id: newDocRef.id }]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async (studentId, updatedData) => {
    try {
      const studentDoc = doc(db, "students", studentId);
      await updateDoc(studentDoc, updatedData);
      setLsetf(lsetf.map(student => 
        student.id === studentId ? { ...student, ...updatedData } : student
      ));
      setEditStudent(null);
    } catch (error) {
      console.error("Error updating student:", error);
    }
  };

  const deleteStudent = async (studentId) => {
    try {
      const studentDoc = doc(db, "students", studentId);
      await deleteDoc(studentDoc);
      setLsetf(lsetf.filter(student => student.id !== studentId));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const socialLinks = [
    { platform: 'facebook', icon: 'fa-brands fa-facebook' },
    { platform: 'linkedin', icon: 'fa-brands fa-linkedin' },
    { platform: 'github', icon: 'fa-brands fa-github' },
    { platform: 'email', icon: 'fa-solid fa-envelope' },
    { platform: 'whatsapp', icon: 'fa fa-whatsapp' },
  ];

  const filteredStudents = lsetf.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, studentId: null })}
        onConfirm={() => deleteStudent(deleteDialog.studentId)}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone."
        confirmText="Delete"
        confirmStyle="bg-red-500 hover:bg-red-600"
      />

      {/* Edit Confirmation Dialog */}
      <AlertDialog
        isOpen={editDialog.isOpen}
        onClose={() => setEditDialog({ isOpen: false, student: null })}
        onConfirm={() => {
          setEditStudent(editDialog.student);
          setEditDialog({ isOpen: false, student: null });
        }}
        title="Update Student Information"
        description="Are you sure you want to update this student's information? This action can be undone later."
        confirmText="Continue"
        confirmStyle="bg-blue-500 hover:bg-blue-600"
      />

      <div className="text-center mb-12 animate__animated animate__fadeIn">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600">
          Students Database
        </h1>
      </div>

      {/* Search Section */}
      <div className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-md text-gray-900"
        />
        <button
          onClick={() => setAddNew(true)}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-md hover:opacity-90 transition-opacity"
        >
          Add New Student
        </button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8">
        {filteredStudents.map((props, index) => (
          <div key={props.id} className="max-w-sm w-full bg-gradient-to-br from-white/60 via-white/40 to-white/30 shadow-xl rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl">
            <div className="flex justify-end gap-2 p-2">
              {/* Edit Button */}
              <button
                onClick={() => setEditDialog({ isOpen: true, student: props })}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                <Pencil size={16} />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => setDeleteDialog({ isOpen: true, studentId: props.id })}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

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

            <div className="flex justify-center my-4 space-x-4">
              {socialLinks.map(({ platform, icon }) => (
                <a
                  key={platform}
                  href={props[platform]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-green-500 text-white flex items-center justify-center transition-all duration-300 ease-in-out hover:ring-2 hover:ring-black hover:text-[#FFCB05]"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {(addNew || editStudent) && (
        <AddStudentForm
          onSubmit={editStudent ? 
            (data) => updateStudent(editStudent.id, data) : 
            addNewStudent
          }
          onClose={() => {
            setAddNew(false);
            setEditStudent(null);
          }}
          initialData={editStudent}
        />
      )}
    </div>
  );
}