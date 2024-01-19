import axios from 'axios'
import React, { useState,useEffect } from 'react'
import "./insert_module.css"
import { GrClose } from 'react-icons/gr'
import Swal from 'sweetalert2'


const InsertModule = ({closeModal}) => {
    const [file,setFile] = useState(null)
    const [pdf,setPdf] = useState(null)
    const [ppt,setPpt] = useState(null)
    const [description,setDescription] = useState('')
    const [selectedOption, setSelectedOption] = useState("");
    // const [nom,setNom] = useState('')
    const handleUpload = (e) => {
        setFile(e.target.files[0])
    }
    const PdfUpload = (e) => {
        setPdf(e.target.files[0])
    }
    const pptUpload = (e) => {
        setPpt(e.target.files[0])
    }
    const uploadfile = (e) => {
    if(file === null || pdf === null || ppt === null || description === '' || selectedOption === ''){
            Swal.fire({
                text:"Veuillez remplir tous les champs",
                timer:2000,
                showConfirmButton:false,
                position:"top"
            })
        }else{
        e.preventDefault();
        const formData = new FormData();
        formData.append('video',file);
        formData.append('description',description);
        formData.append('id_formation',selectedOption);
        formData.append('pdf',pdf);
        formData.append('ppt',ppt);
        axios.post('http://localhost:8081/upload',formData)
        .then(res => {
            if(res.data.Status === "Success"){
                window.location.reload(true)
                console.log("Success")
            }else{
                console.log("Failed")
            }
        })
        .catch(err => console.log(err))
}}
    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
    };
    const [donnee,setDonnee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/getFormation')
        .then(res => setDonnee(res.data))
        .catch(err => console.log(err))
    })
    return (
        <div>
            <div className="module_main_container">
            <div className="field_container">
                
                <GrClose className='close' onClick={() => closeModal(false)}/>
                <p>Formation</p>
                <select value={selectedOption} onChange={handleDropdownChange}>
                    <option value="">Sélectionnez une formation</option>
                    {donnee.map(item => {
                        return <option key={item.id_formation} value={item.id_formation}>
                            {item.nom_formation}
                        </option>
                    })}
                </select>
                <p>Videos</p>
                <input type="file" id='vid' onChange={handleUpload}/>
                <p>Description de la module</p>
                <textarea cols="30" rows="7" placeholder="Veuillez saisir la description dans cette section" onChange={e => setDescription(e.target.value)}/>
                <p>Support</p>
                <input type="file" id="pdf" onChange={PdfUpload}/>
                <p>Exercice</p>
                <input type="file" id='ppt' onChange={pptUpload}/>
                <button onClick={uploadfile}>Ajouter</button>
            </div>
            </div>
        </div>
    )
}

export default InsertModule
