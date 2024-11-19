/* eslint-disable no-unused-vars */
import { X } from "lucide-react";

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
  export default AlertDialog;