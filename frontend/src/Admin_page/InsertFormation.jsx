import axios from 'axios'
import React, { useState,useEffect } from 'react'
import './insertFormation.css'
import { GrClose } from 'react-icons/gr'
import Swal from 'sweetalert2'

const InsertFormation = () => {
  const [nom, setNom] = useState('')
  const [desc, setDesc] = useState('')
  const [open, setOpen] = useState(false)
  const [delai,setDelai] = useState('')
  const [unite,setUnite] = useState('')
  const showAlert = (id,idFormation) => {
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
    axios.delete('http://localhost:8081/delformation/'+id)
    .then(res => {
      axios.delete('http://localhost:8081/deleteinscription/'+idFormation)
      .then(res => console.log('deleted successfully'))
      .catch(err => console.log(err))
      window.location.reload();})
    .catch(err => console.log(err))
    Swal.fire(
        {   text:"Task failed successfully",
            showConfirmButton:false,
            icon:'success',
        }
    )}
    })
}

  const add = (e) => {
    e.preventDefault()
    const expiration = delai+unite
    try {
      axios.post('http://localhost:8081/Formation', { nom, desc,expiration })
        .then(res => {console.log(res)
        window.location.reload(true)})
        .catch(err => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }
  const [donnee,setDonnee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/getFormation')
        .then(res => setDonnee(res.data))
        .catch(err => console.log(err))
    })

  return (
    <div>
      {open && (
        <div className='modal_main_container'>
          <div className='modal_container'>
            <GrClose className='close' onClick={() => setOpen(false)} />
            <input
              type="text"
              id="nom"
              placeholder='Nom'
              value={nom}
              onChange={e => setNom(e.target.value)}
            />
            <div className='expiration'>
              <input type="number" id="nbr" onChange={e => setDelai(e.target.value)}/>
              <select id="unite" onChange={e => setUnite(e.target.value)}>
                <option value="d">Jour</option>
                <option value="h">Heure</option>
                <option value="m">Minute</option>
                <option value="s">Seconde</option>
              </select>
            </div>
            <textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              placeholder='Description'
              value={desc}
              onChange={e => setDesc(e.target.value)}
            ></textarea>
            <button className='post' onClick={add}>Ajouter</button>
          </div>
        </div>
      )}
      <div className='insert_formation_container'>
        <div className='add_formation' onClick={() => setOpen(true)}>Ajouter</div>
        <div>
      <table className="table">
                <thead>
                    <tr className="thead">
                        <th>Nom de la formation</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        donnee.map((value,index) => {
                            return <tr key={index} className="tbody">
                                <td>{value.nom_formation}</td>
                                <td>{value.description_formation}</td>
                                <td><button onClick={() => showAlert(value.id_formation,value.nom_formation)} className="del">delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
      </div>
      </div>
    </div>
  )
}

export default InsertFormation