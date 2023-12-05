import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './module.css'
// import {Link} from "react-router-dom"
import {MoonLoader} from "react-spinners"
import Swal from 'sweetalert2'  
import ReactPlayer from 'react-player'
import InsertModule from './InsertModule'
// import InsertModule from './InsertModule'

const Module = () => {
    const [load,setLoad] = useState(true)
    const [data_module,setData_module] = useState([])
    const [show,setShow] = useState(false)
    useEffect(() => {
        axios.get('http://localhost:8081/getmodule')
        .then(res => {
            setTimeout(() => setLoad(false),2000)
            setData_module(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    const onDelete = (id) => {
        console.log(id)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
        if (result.isConfirmed) {
        axios.delete('http://localhost:8081/deleteModule/'+id)
        .then(res => {window.location.reload();})
        .catch(err => console.log(err))
        Swal.fire(
            {   text:"Task failed successfully",
                showConfirmButton:false,
                icon:'success',
            }
        )}
        })
    }
    if(load){
        return <div className="loading_page"><MoonLoader size={50}/></div>
    }else{
    return (
        <div>
            {show && <InsertModule closeModal={setShow}/>}
            {/* <InsertModule/> */}
        <div className="module_page_container">
        <div className="inserer_module" onClick={() => setShow(true)}><span>Ajouter</span></div>
            <div className="div_module">
            {data_module.map((value,index) => {
                return <div key={index} className="module_list">
                    <ReactPlayer controls={true} height="300px" width="500px" url={'http://localhost:8081/videos/'+value.videos}/>
                    <p>{value.description_module}</p>
                    {/* <button>View</button> */}
                    <button onClick={() => onDelete(value.id_module)}>Delete</button>
                    </div>
            })}
            </div>
        </div>
        </div>
    )
}
}

export default Module
