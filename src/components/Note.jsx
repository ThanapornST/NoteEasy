import React, { useState, useEffect } from "react";
import { auth } from '../firebase'; 
import { getFirestore, collection, query, where, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';


function Note(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: props.title,
    content: props.content,
    category: props.category,
  });
  const [notes, setNotes] = useState([]);

  const user = auth.currentUser;
  const uid = user ? user.uid : null;
  console.log("ะนนา" + user);

  const handleSaveNote = async () => {
    const db = getFirestore();
    if (uid) {  
      try {
        const noteRef = collection(db, "notes", user.uid, "history", props.id);  
        await setDoc(noteRef, {
          title: editedNote.title || "Untitled",
          content: editedNote.content || "No content",
          category: editedNote.category || "Uncategorized",
          createdAt: new Date(),
        });
        alert("Note updated successfully!");
      } catch (error) {
        console.error("Error updating note:", error);
      }
    }
  };

  function handleDelete() {
    props.onDelete(props.id); 
    alert("Note deleted from UI only!");
  }




  function handleEdit() {
    setIsEditing(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setEditedNote((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  function handleSave() {
    props.onEdit(props.id, editedNote);
    setIsEditing(false);
    handleSaveNote();
  }


  return (
    <div className="bg-white rounded-lg shadow-lg p-4 my-4 w-full max-w-xs">
      {isEditing ? (
        <div>
          <input
            name="title"
            value={editedNote.title}
            onChange={handleChange}
            placeholder="Edit Title"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="content"
            value={editedNote.content}
            onChange={handleChange}
            placeholder="Edit Content"
            rows="3"
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            name="category"
            value={editedNote.category}
            onChange={handleChange}
            placeholder="Edit Content"
            rows="3"
            className="w-full p-2 mb-2 border rounded"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-lg font-bold mb-2">{props.title}</h1>
          <p className="mb-2">{props.content}</p>
          <p className="text-sm text-gray-600">Category: {props.category}</p>
          <p className="text-sm text-gray-600">Created At: {props.createdAt}</p>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={handleEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Edit
            </button>

            <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
              Delete
            </button>

          </div>
          {props.showHistory && props.editHistory && (
            <div>
              <h4 className="mt-4 font-semibold">Edit History:</h4>
              {props.editHistory.map((entry, index) => (
                <p key={index} className="text-sm">
                  {entry.date}: {entry.title} - {entry.content}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Note;
