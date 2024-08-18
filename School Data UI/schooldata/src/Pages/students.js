import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';

let columns = [{id:1,label:"Roll No."},{id:2,label:"Name"},{id:3,label:"Photo"},{id:4,label:"Class"},{id:5,label:"Age"},{id:6,label:"Sex"}]


export default function Students() {
    const [studentsData,setStudentsData] = useState([])
    const [word,setWord] = useState("")
    const [classVal,setClassVal] = useState("")
    const [filters,setFilters] = useState({"name":"",class: ""});

    const getStudentData = () => {
       // console.log(filters);
        axios.post('http://localhost:5246/api/Students/GetStudent',filters)
        .then((result) => {
            //console.log(result)
            setStudentsData(result.data || []);
        })
        .catch((error) => {
            console.log(error);
        })
    }

    useEffect(()=>{
getStudentData();
    },[filters]);

  return (
    <div>
    <div style={{display:"flex",gap:10,alignItems:"center"}}>
    <h2>Students</h2>
    <div style={{marginLeft:"auto",alignSelf:"center",display:"inline-flex",gap:10}}>
    <input type="text" placeholder="Search by Name" onChange={(e)=>setWord(e.target.value)} value={word}/>
    <input type="text" placeholder="Search by clcass" onChange={(e)=>setClassVal(e.target.value)} value={classVal}/>
    <button onClick={(e)=>setFilters({...filters , name : word,class:classVal})}>Search</button>
    </div>
    <Link to={{pathname:"/student-create"}}><button>Add New</button></Link>
    
    </div>
    <TableContainer>
        {studentsData && studentsData.length > 0 ?
        <Table>
            <TableHead>
                <TableRow>
                    {columns.map((c)=>{
                        return <th key={c.id}>{c.label}</th>})}
                </TableRow>
            </TableHead>
            <TableBody>
                {studentsData.map((s,i)=>{
                    return(<TableRow key={i}>
                    <td>{s.roll_Number}</td>
                    <td>{s.name}</td>
                    <td>{s.image && s.image !== 'NA' ? <img src={require(`../StudentImages/${s.image}`)}  style={{width:50,height:50}} alt={"Student"}/>: "-"}</td>
                    <td>{s.class || "-"}</td>
                    <td>{s.age || "-"}</td>
                    <td>{s.sex || "-"}</td>
                </TableRow>)})}
            </TableBody>
        </Table> : <p>No data found</p>}
        </TableContainer>
    </div>
  )
}
