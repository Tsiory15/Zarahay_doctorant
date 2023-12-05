import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "./utilisateur.css"
import Swal from 'sweetalert2';
import {MoonLoader} from 'react-spinners'

const Utilisateur = () => {
    const [data,setData] = useState([])
    const [load,setLoad] = useState(true)
    const showAlert = (id) => {
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
        axios.delete('http://localhost:8081/delete/'+id)
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
    useEffect(() => {
        axios.get('http://localhost:8081/getall')
        .then(res => {
            setTimeout(() => {
                setLoad(false)
            },2000)
            setData(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    if(load){
       return <div> 
        <div className="loading">
           <MoonLoader size={50}/>
        </div>
        </div>
    }
    return (
        <div>
            <div className="table_container">
            <table className="table">
                <thead>
                    <tr className="thead">
                        <th>Nom</th>
                        <th>E-mail</th>
                        <th>Membre depuis</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((value,index) => {
                            return <tr key={index} className="tbody">
                                <td>{value.nom}</td>
                                <td>{value.mail}</td>
                                <td>{value.date_creation.slice(0,10)}</td>
                                <td><button onClick={() => showAlert(value.id)} className="del">delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
    )
}

export default Utilisateur
