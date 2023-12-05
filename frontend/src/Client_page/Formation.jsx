import { useEffect,useState } from 'react'
import './formation.css'
import axios from 'axios'
import './formation.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import NoFound from '../NoFound'

const Formation = () => {
    const token = Cookies.get('token')
    const [donnee,setDonnee] = useState([])
    
    useEffect(() => {
        axios.get('http://localhost:8081/getFormation')
        .then(res => setDonnee(res.data))
        .catch(err => console.log(err))
        },[])
    const nav = useNavigate()
    const view = (id) => {
        nav('/Voirplus/'+id)
    }
    if(!token){
        return (
            <NoFound/>
        )
    }else{
    return (
        <div>
            <div className='formation_main_container'>
                {
                    donnee.map(value => {
                            return (<div key={value.id_formation} className='card'>
                                <h2>{value.nom_formation}</h2>
                                <button onClick={() => view(value.nom_formation)} className='voir_btn'>En savoir plus...</button>
                            </div>)
                        }
                    )
                }
            </div>
        </div>
    )
}
}

export default Formation
