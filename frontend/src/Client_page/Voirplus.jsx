import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useNavigate, useParams } from 'react-router-dom'
import './voirplus.css'
import Swal from 'sweetalert2'
import {MoonLoader} from 'react-spinners'
import Cookies from 'js-cookie'
import NoFound from '../NoFound'

const Voirplus = () => {
  axios.defaults.withCredentials = true;
  const nav = useNavigate()
  const {id} = useParams()
  const [dataFormation,setDataFormation] = useState([])
  const [name,setName] = useState('')
  const [inscrit,setInscrit] = useState(true)
  const [voir,setVoir] = useState(false)
  const [load,setLoad] = useState(true)
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
      setTimeout(() => {setLoad(false)},1000)
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
        setVoir(true)
    }else{}})
    .catch(err => console.log(err))
  })
  //Inscription au cours
  const inscription = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
  }).then((result) => {
  if (result.isConfirmed) {
    const expiration = dataFormation.expiration+dataFormation.unite
    axios.post('http://localhost:8081/inscription',{id,name,expiration})
    .then(res => {window.location.reload(true)})
    .catch(err => console.log(err))
    Swal.fire(
      {   text:"Task failed successfully",
          showConfirmButton:false,
          icon:'success',
      }
  )
  }
}
)}
  const viewdetail = (identifiant) => {
    nav('/ViewDetail/'+identifiant)
  }
  const token = Cookies.get('token')
  const admin = Cookies.get('admin_token')
    if(!token && !admin){
        return (
            <NoFound/>
        )
    }
  if(load){
    return <div> 
     <div className="load_more">
        <MoonLoader size={50}/>
     </div>
     </div>
 }
  return (
    <div>
      <div className='voir_main_container'>
      <div className='information_container'>
        <h1>{dataFormation.nom_formation}</h1>
        <p>{dataFormation.description_formation}</p>
        <div className='btn_container'>
          {!admin ?
          <> 
          {inscrit && <button className='inscription_btn' onClick={inscription}>S'inscrire</button>}
          {voir && <button className='inscription_btn' onClick={() => viewdetail(dataFormation.id_formation)}>Accéder au contenu</button>}
            </> : 
            <> 
            <button className='inscription_btn' onClick={() => viewdetail(dataFormation.id_formation)}>Accéder au contenu</button>
            </>
          }
          <button className='back_btn' onClick={() => nav('/Formation')}>Retour</button>
        </div>
      </div>
      <div className='image_container'>

      </div>
      </div>
    </div>
  )
}

export default Voirplus