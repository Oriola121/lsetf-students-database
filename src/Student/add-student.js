/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import AlertDialog from "./alert-dialog"
const AddStudentForm = ({ initialData, onSubmit, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(initialData?.image || null);
  const [imageFile, setImageFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showUpdateWarning, setShowUpdateWarning] = useState(false);
  const [formData, setFormData] = useState(null);


  useEffect(() => {
    if (initialData?.image) {
      setImagePreview(initialData.image);
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      description: e.target.description.value,
      image: imagePreview,
      facebook: e.target.facebook.value,
      linkedin: e.target.linkedin.value,
      github: e.target.github.value,
      email: e.target.email.value,
      whatsapp: e.target.whatsapp.value,
    };

    if (initialData) {
      setFormData(data);
      setShowUpdateWarning(true);
    } else {
      submitForm(data);
    }
  };
  const submitForm = async (data) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 overflow-y-auto">
      <AlertDialog
        isOpen={showUpdateWarning}
        onClose={() => setShowUpdateWarning(false)}
        onConfirm={() => submitForm(formData)}
        title="Update Student Information"
        description="Are you sure you want to update this student's information? This action can be undone later."
        confirmText="Update"
        confirmStyle="bg-blue-500 hover:bg-blue-600"
      />
      <div className="absolute right-4 top-4">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={24} className="text-gray-600" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          {initialData ? "Update Student Info" : "Add New Student"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-xl p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                Basic Information
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={initialData?.name || ""}
                  required
                  className="mt-1 block w-full rounded-lg p-2 border border-[#474747] shadow-sm focus:outline-none"
                  placeholder="Enter student's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={initialData?.description || ""}
                  required
                  rows="4"
                  className="mt-1 block w-full rounded-lg p-2 border border-[#474747] shadow-sm focus:outline-none"
                  placeholder="Write a brief description about the student"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center ${
                    dragActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {imagePreview ? (
                    <div className="relative w-48 h-48 mx-auto">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setImageFile(null);
                        }}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="relative text-blue-500 hover:text-blue-600 cursor-pointer">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      Drag and drop an image, or browse
                      <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Social Links */}
            <div className="space-y-6">
              <div className="text-lg font-semibold text-gray-700 mb-4">
                Social Links
              </div>

              {[
                "facebook",
                "linkedin",
                "github",
                "email",
                "whatsapp",
              ].map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700">
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={platform}
                    defaultValue={initialData?.[platform] || ""}
                    className="mt-1 block w-full rounded-lg p-2 border border-[#474747] shadow-sm focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !imagePreview}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="animate-spin mr-2" size={18} />
                    {initialData ? "Updating..." : "Adding..."}
                  </span>
                ) : (
                  initialData ? "Update Student" : "Add Student"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
