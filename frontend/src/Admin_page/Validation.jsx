import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Validation = () => {
    const [inscrit,setInscrit] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/getinscrit')
        .then(res => setInscrit(res.data))
        .catch(err => console.log(err))
    }, [])
    const Validate = (id_inscription) => {
        axios.post('http://localhost:8081/validate',{id_inscription})
        .then(res => {
            window.location.reload(true)
            console.log(res)})
        .catch(err => console.log(err))
    }
    const admin_token = Cookies.get('admin_token')
    const nav = useNavigate()
    if(!admin_token){
        nav('/pagenotfound')
    }
    return (
        <div>
            <div className="table_container">
            <table className="table">
                <thead>
                    <tr className="thead">
                        <th>Nom</th>
                        <th>Formation</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        inscrit.map((value,index) => {
                            return <tr key={index} className="tbody">
                                <td>{value.nom}</td>
                                <td>{value.id_formation}</td>
                                <td>{value.status}</td>
                                <td><button className='del' onClick={() => Validate(value.id_inscription)}>Valider</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            </div>
            </div>
    )
}

export default Validation