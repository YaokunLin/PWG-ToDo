import React, { useState, useEffect } from 'react'
import { db } from "./firebase-config";
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc, getDocs
} from 'firebase/firestore'

// collection ref
const colRef = collection(db, 'ToDos')

// queries
//const q = query(colRef)//, where("author", "==", "patrick rothfuss"), orderBy('title'))
//const q = query(colRef, orderBy('completedDate', 'isCompleted'))
const q = query(colRef)

let ToDosFirebase = []
onSnapshot(q, (snapshot) => {

  snapshot.docs.forEach(doc => {
    ToDosFirebase.push({ ...doc.data(), id: doc.id })
  })
  //console.log(ToDosFirebase)
})



if (localStorage.getItem("title")) {
  const newToDo = {
    title: localStorage.getItem("title"),
    description: localStorage.getItem("description"),
    createdDate: localStorage.getItem("createdDate"),
    completedDate: localStorage.getItem("completedDate"),
    isCompleted: localStorage.getItem("isCompleted"),
  }

  console.log(newToDo)
  addDoc(colRef, newToDo)
  //ToDosFirebase.push(newToDo)
  localStorage.setItem("title", "")
}

console.log(ToDosFirebase)


function ToDoList() {
  const [users, setUsers] = useState([])
  const usersCollectionRef = collection(db, "ToDos");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    console.log(users);
  }, []);

  const deleteUser = async (id) => {
    const userDoc = doc(db, "ToDos", id);
    await deleteDoc(userDoc);
  };


  return (
    <div>
      {!ToDosFirebase && 'loading...'}
      <h1>DATA Fetched from FIREBASE:</h1>
      {ToDosFirebase.map((task, index) => {
        return <div key={task.id}>
          <h3>Item - {index + 1}</h3>
          <h3>task.title: {task.title}</h3>
          <h3>task.description: {task.description}</h3>
          <h3>task.createdDate: {task.createdDate}</h3>
          <h3>task.completedDate: {task.completedDate}</h3>
          <h3>task.isCompleted: {task.isCompleted}</h3>
          <button
            onClick={() => {
              deleteUser(task.id);
            }}
          >
            {" "}
            Delete Task
          </button>



          <br /><br />
        </div>
      })}

    </div>
  )
}

export default ToDoList
