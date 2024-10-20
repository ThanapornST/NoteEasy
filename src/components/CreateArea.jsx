import React, { useState } from "react";
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore'; // นำเข้า Firestore
import { auth } from '../firebase'; 

function CreateArea(props) {
  const [note, setNote] = useState({
    props_id : 0,
    title: "",
    content: "",
    category: ""
  });

  const db = getFirestore(); 
  const user = auth.currentUser; 

  function handleChange(event) {
    const { name, value } = event.target;
    setNote(prevNote => ({
      ...prevNote,
      [name]: value
    }));
  }

  async function submitNote(event) {
    event.preventDefault();

    const currentDateTime = new Date().toLocaleString();
    const newNote = {
      ...note,
      createdAt: currentDateTime,
      uid: user ? user.uid : null 
    };

    try {
      if (user && user.uid) {
        const historyCollectionRef = collection(db, "notes", user.uid, "history");
        await addDoc(historyCollectionRef, newNote); 
        props.onAdd(newNote); 
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    setNote({
      title: "",
      content: "",
      category: ""
    });
  }

  return (
    <div className="flex justify-center mt-20">
      <form className="relative w-96 bg-white p-4 rounded-md shadow-md my-4">
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          className="w-full p-2 text-lg border rounded-md mb-2 outline-none"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
          className="w-full p-2 text-lg border rounded-md mb-2 outline-none"
        />
        <input
          name="category"
          onChange={handleChange}
          value={note.category}
          placeholder="Select Category"
          className="w-full p-2 text-lg border rounded-md mb-2 outline-none"
        />

        <button
          onClick={submitNote}
          className="absolute right-4 bottom-[-18px] bg-blue-500 text-white rounded-full w-9 h-9 shadow-lg focus:outline-none">
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
