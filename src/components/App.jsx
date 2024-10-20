import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Login from "./Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./SignUp";
import { db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";  
import '../index.css';
import { auth } from '../firebase'; // Import Firebase auth

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editHistory, setEditHistory] = useState({});
  const [showHistory, setShowHistory] = useState(false);
  const user = auth.currentUser;

  function handleLogin() {
    setIsLoggedIn(true);
    if (user) {
      fetchNotes(); 
    }
  }

  
  async function fetchNotes() {
    if (!user) return;

    const userNotesRef = collection(db, "notes", user.uid, "history");
    const querySnapshot = await getDocs(userNotesRef);
    const userNotes = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setNotes(userNotes); 
  }

  function addNote(newNote) {
    const currentDateTime = new Date().toLocaleString();
    setNotes(prevNotes => {
      return [...prevNotes, { ...newNote, createdAt: currentDateTime, lastEdited: currentDateTime }];
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => index !== id);
    });
  }

  function editNote(id, updatedNote) {
    const currentDateTime = new Date().toLocaleString();
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.map((noteItem, index) => {
        if (index === id) {
          const history = editHistory[id] || [];
          const newHistoryEntry = {
            date: currentDateTime,
            title: noteItem.title,
            content: noteItem.content,
          };

          setEditHistory({
            ...editHistory,
            [id]: [...history, newHistoryEntry],
          });

          return { ...updatedNote, lastEdited: currentDateTime, createdAt: noteItem.createdAt || currentDateTime };
        }
        return noteItem;
      });
      return updatedNotes;
    });
  }

  function toggleHistory() {
    setShowHistory(!showHistory);
  }

  function handleSortByDate() {
    const sortedNotes = [...notes].sort((a, b) => {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    setNotes(sortedNotes);
  }

  function handleSortByTitle() {
    const sortedNotes = [...notes].sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    setNotes(sortedNotes);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/notes" element={
          <>
            <Header 
              onSortByEdit={toggleHistory} 
              onSortByDate={handleSortByDate} 
              onSortByTitle={handleSortByTitle} 
            />
            <CreateArea onAdd={addNote} />
            <div className="flex flex-wrap justify-center gap-5 mt-5">
              {notes.map((noteItem, index) => (
                <Note
                  key={index}
                  id={index}
                  title={noteItem.title}
                  content={noteItem.content}
                  category={noteItem.category}
                  createdAt={noteItem.createdAt}
                  lastEdited={noteItem.lastEdited}
                  onDelete={deleteNote}
                  onEdit={editNote}
                  showHistory={showHistory}
                  editHistory={editHistory[index]}
                />
              ))}
            </div>
          </>
        } />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
