import React from 'react';
import './App.css';
import {
  createBrowserRouter,
  Link,
  RouterProvider,
} from "react-router-dom";
import Students from './Pages/students';
import StudentForm from './Pages/studentForm';
import TeacherForm from './Pages/teacherForm';
import Teachers from './Pages/teachers';
import SubjectForm from './Pages/subjectForm';
import Subjects from './Pages/subjects';
import { AppBar } from '@mui/material';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div><h1>Welcome</h1></div>,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/student-create",
    element: <StudentForm/>,
  },
  {
    path: "/subjects",
    element: <Subjects />,
  },
  {
    path: "/subject-create",
    element: <SubjectForm/>,
  },  {
    path: "/teachers",
    element: <Teachers />,
  },
  {
    path: "/teacher-create",
    element: <TeacherForm/>,
  },
]);

const pages = [{title:'Students',link:"/students"},{title:'Teachers',link:"/teachers"},{title:'Subjects',link:"/subjects"}];

function App() {
  return (
    <div >
    <AppBar position="static">
    {pages && pages.length>0 &&<ul>
      {pages.map((p,i)=>{return(<li key={i}><a href={p.link}>{p.title}</a></li>)})}
    </ul>}
    </AppBar>
    <div className="App">
      <RouterProvider router={router} ></RouterProvider>
      </div>
    </div>
  );
}

export default App;
