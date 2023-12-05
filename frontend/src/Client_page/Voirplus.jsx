import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'

const Voirplus = () => {
  axios.defaults.withCredentials = true;
  const nav = useNavigate()
  const {id} = useParams()
  const [dataFormation,setDataFormation] = useState([])
  const [name,setName] = useState('')
  const [inscrit,setInscrit] = useState(true)
  const [voir,setVoir] = useState(false)
  //Vérification inscription
  useEffect(() => {
    axios.get('http://localhost:8081/auth')
      .then(res => {
        if(res.data.Status === "Success"){
            setName(res.data.name);
        }else{
            console.log('Nothing')
        }
      })
      .catch(err => console.log(err))
    axios.post('http://localhost:8081/checkinscrit',{id,name})
    .then(res => {
      if(res.status === 201)
      setInscrit(false)
    })
    .catch(err => console.log(err))
  })
  //Récupération formation
  useEffect(() => {
    axios.get(`http://localhost:8081/getformationbyid/${id}`)
    .then(res => {setDataFormation(res.data[0])})
    .catch(err => console.log(err))
  },[id])
  //Vérification validation
  useEffect(() => {
    axios.post('http://localhost:8081/getvalider',{id,name})
    .then(res => {
      if(res.status === 201){
        setInscrit(false)
      setVoir(true)}else{}})
    .catch(err => console.log(err))
  })
  //Inscription au cours
  const inscription = () => {
    axios.post('http://localhost:8081/inscription',{id,name})
    .then(res => {window.location.reload(true)})
    .catch(err => console.log(err))
  }
  const viewdetail = (identifiant) => {
    nav('/ViewDetail/'+identifiant)
  }
  return (
    <div>
      <div>
          {dataFormation.nom_formation}
          {inscrit && <button onClick={inscription}>S'inscrire</button>}
          {voir && <button onClick={() => viewdetail(dataFormation.id_formation)}>Apprendre</button>}
      </div>
    </div>
  )
}

export default Voirplus