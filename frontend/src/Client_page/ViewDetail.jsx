import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './viewdetail.css'
import ReactPlayer from 'react-player'
import {FaCaretRight} from 'react-icons/fa'
import Discussion from '../Discussion'
import Cookies from 'js-cookie'
import NoFound from '../NoFound'

const ViewDetail = () => {
    const {id} = useParams()
    const [datamodule,setDataModule] = useState([])
    const [dataplay,setDataplay] = useState([])
    useEffect(() => {
        axios.post(`http://localhost:8081/getmoduleformation/${id}`)
        .then(res => {
            setDataModule(res.data)
        })
        .catch(err => console.log(err))
    })
    const play = (id) => {
        axios.post(`http://localhost:8081/play/`+id)
        .then(res => setDataplay(res.data[0]))
        .catch(err => console.log(err))
    }
    const token = Cookies.get('token')
    const admin = Cookies.get('admin_token')
    if(!token && !admin){
        return (
            <NoFound/>
        )
    }
  return (
    <div>
        <Discussion/>
        <div className='detail_main_container'>
        <div className='detail_container1'>
            {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis totam voluptates odio, repudiandae aliquam omnis. Cum qui sint corrupti dolorem, quasi, omnis hic tenetur similique iusto natus eaque, culpa totam?</p> */}
            <ReactPlayer className="videos" height={"auto"} width={"100%"} controls={true} url={'http://localhost:8081/videos/'+dataplay.videos}/>
            <h1>Titre</h1>
            <p>{dataplay.description_module}</p>
            <p className='fichier'>Support</p>
            <a href={`http://localhost:8081/videos/${dataplay.pdf}`}>{dataplay.pdf}</a><br />
            <p className='fichier'>Exercice</p>
            <a href={`http://localhost:8081/videos/${dataplay.ppt}`}>{dataplay.ppt}</a>
        </div>
        <div className='detail_container2'>
        {datamodule.map(value => {
            return <div key={value.id_module} className='detail'>
                <div className='switch' onClick={() => play(value.id_module)}>
                    <FaCaretRight/> 
                </div>
                <ReactPlayer className="videos" height={"auto"} width={"100%"} url={'http://localhost:8081/videos/'+value.videos}/>   
            </div>
        })}
        </div>
        </div>
    </div>
  )
}

export default ViewDetail