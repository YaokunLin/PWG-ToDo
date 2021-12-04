import React, { FC, ChangeEvent, useState, useEffect } from "react";
import Header from './Components/Header';
import "./App.css";
import TodoTask from "./Components/ToDoTask";
import DateTimePicker from './Components/DataTimePicker';
import Checkbox from './Components/Checkbox';
import { ITask } from "./Interfaces";

import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import Textfield from './Components/TextfieldWrapper';
import ButtonWarapper from './Components/Button';

import { db } from "./firebase-config";
import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, query, where, orderBy, serverTimestamp, updateDoc
} from 'firebase/firestore'

const useStyles = makeStyles((theme) => ({
  formWrapper: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
}));

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const INITIAL_FORM_STATE = {
  title: '',
  description: '',
  createdDate: today.toLocaleDateString('en-CA'),
  completedDate: tomorrow.toLocaleDateString('en-CA'),
  isCompleted: false,




};

const FORM_VALIDATION = Yup.object().shape({
  title: Yup.string().length(4)
    .required('Required'),
  description: Yup.string().min(20)
    .required('Required'),
  createdDate: Yup.date()
    .required('Required'),
  completedDate: Yup.date()
    .required('Required'),
  isCompleted: Yup.boolean()
    // .oneOf([true], 'Has the task been completed?')
    .required('Has the task been completed?'),




});


const App: FC = () => {


  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
    } else {
      setDealine(Number(event.target.value));
    }
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setDealine(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
      todoList.filter((task) => {
        return task.taskName != taskNameToDelete;
      })
    );
  };


  //const [newName, setNewName] = useState("");
  //const [newAge, setNewAge] = useState(0);
  const [ToDos, setToDos] = useState([])
  const usersCollectionRef = collection(db, "ToDos");


  const [task, setTask] = useState<string>("");
  const [deadline, setDealine] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);





  return (
    <div className="App">

      {/*<div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          />
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="todoList">
        {todoList.map((task: ITask, key: number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />;
        })}
      </div>*/}



      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <div>

              <Formik
                initialValues={{
                  ...INITIAL_FORM_STATE
                }}

                validationSchema={FORM_VALIDATION}
                onSubmit={values => {
                  //console.log(values);
                  localStorage.setItem("description", values.description);
                  localStorage.setItem("title", values.title);
                  localStorage.setItem("createdDate", values.createdDate);
                  localStorage.setItem("completedDate", values.completedDate);
                  localStorage.setItem("isCompleted", values.isCompleted.toString());

                  //localStorage.setItem("email", email);
                  //localStorage.setItem("profilePic", profilePic);
                  //localStorage.setItem("clientPlatform", clientPlatform);
                  //localStorage.setItem("sdkClientVersion", sdkClientVersion);


                }}>
                <Form onSubmit={values => {
                  console.log(values);
                }}
                >
                  <br />
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography>
                        To Do Form
                      </Typography>
                    </Grid>




                    <Grid item xs={12}>
                      <Textfield
                        name="title"
                        label="Title: (must be 4 characters long)"
                      />
                    </Grid>



                    <Grid item xs={12}>
                      <Textfield
                        name="description"
                        label="Description: (must be at least 20 characters long)"
                      />
                    </Grid>


                    <Grid item xs={6}>
                      <DateTimePicker
                        name="createdDate"
                        label="Created Date"
                      />
                    </Grid>


                    <Grid item xs={6}>
                      <DateTimePicker
                        name="completedDate"
                        label="Completed Date"
                      />
                    </Grid>



                    <Grid item xs={12}>
                      <Checkbox
                        name="isCompleted"
                        legend="Task Completed?"
                        label="Yupsolutely!"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <ButtonWarapper>
                        Submit Form
                      </ButtonWarapper>
                    </Grid>



                  </Grid>




                </Form>
              </Formik>
            </div>
          </Container>
        </Grid>
      </Grid>

    </div >
  );
};

export default App;