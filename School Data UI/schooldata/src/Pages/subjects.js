import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

let columns = [{id:1,label:"#"},{id:2,label:"Name"},{id:3,label:"Class"},{id:4,label:"Language"}]


export default function Subjects() {
    const [subjectsData,setSubjectsData] = useState([])
    const getSubjectsData = () => {
        axios.get('http://localhost:5246/api/Subjects/GetSubjects')
        .then((result) => {
           // console.log(result)
            setSubjectsData(result.data || []);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
        getSubjectsData();
    },[]);

  return (
    <div>
    <div style={{display:"flex"}}>
    <h2>Subjects</h2>
    <Link to={{pathname:"/subject-create"}} style={{marginLeft:"auto",alignSelf:"center"}}><button>Add New</button></Link>
    </div>
    <TableContainer>
        {subjectsData && subjectsData.length > 0 ?
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((c)=>{
                        return <th key={c.id}>{c.label}</th>})}
                </TableRow>
            </TableHead>
            <TableBody>
                {subjectsData.map((s,i)=>{
                    return(<TableRow key={i}>
                    <td>{s.id}</td>
                    <td>{s.subject_Name}</td>
                    <td>{s.class || "-"}</td>
                    <td>{s.language || "-"}</td>
                </TableRow>)})}
            </TableBody>
        </Table> : <p>No data found</p>}
        </TableContainer>
    </div>
  )
}
