import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

let columns = [{id:1,label:"#"},{id:2,label:"Name"},{id:3,label:"Image"},{id:4,label:"Age"},{id:5,label:"Sex"}]


export default function Teachers() {
    const [teachersData,setTeachersData] = useState([])
    const getStudentData = () => {
        axios.get('http://localhost:5246/api/Teachers/GetTeacher')
        .then((result) => {
            //console.log(result)
            setTeachersData(result.data || []);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
getStudentData();
    },[]);

  return (
    <div>
    <div style={{display:"flex"}}>
    <h2>Teachers</h2>
    <Link to={{pathname:"/teacher-create"}} style={{marginLeft:"auto",alignSelf:"center"}}><button>Add New</button></Link>
    </div>
    <TableContainer>
        {teachersData && teachersData.length > 0 ?
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((c)=>{
                        return <th key={c.id}>{c.label}</th>})}
                </TableRow>
            </TableHead>
            <TableBody>
                {teachersData.map((s,i)=>{
                    return(<TableRow key={i}>
                    <td>{s.id}</td>
                    <td>{s.name}</td>
                    <td>{s.image && s.image !== 'NA' ? <img src={require(`../TeacherImages/${s.image}`)} style={{width:50,height:50}} alt={"Student"}/>: "-"}</td>
                    <td>{s.age || "-"}</td>
                    <td>{s.sex || "-"}</td>
                </TableRow>)})}
            </TableBody>
        </Table> : <p>No data found</p>}
        </TableContainer>
    </div>
  )
}
