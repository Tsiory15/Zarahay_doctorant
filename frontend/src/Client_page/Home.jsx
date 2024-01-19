import React from 'react'
import './home.css'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className='body1'>
            <div className="body1_container">
                <div className="content">
                    <h1>Bienvenue sur le site de formation en ligne<br/><span>Zarahay doctorant</span></h1>
                    {/* <button className='btn'>Commencez</button> */}
                </div>
                </div>
            </div>
            <div className='body2'>
                <div>   
    <section class="features">
        <h2>Ce que Zarahay doctorant vous propose :</h2>
        <p>
       <span style={{fontWeight:'bold'}}>Cours Expertisés par des Professionnels : </span>Nos cours en ligne sont développés et dispensés par des experts renommés dans leurs domaines respectifs. Apprenez auprès de chercheurs émérites et de professionnels de l'industrie. <br />
       <span></span><br />

       <span style={{fontWeight:'bold'}}>Formation sur Mesure pour Doctorants : </span>Nous comprenons les besoins uniques des doctorants. Nos programmes de formation sont spécifiquement conçus pour renforcer vos compétences de recherche, rédaction, communication et bien plus encore. <br />
       <span></span><br />
       <span style={{fontWeight:'bold'}}>Accès Illimité aux Ressources : </span>Explorez une vaste bibliothèque de ressources, articles, guides pratiques et outils de recherche. Restez informé des dernières avancées dans votre domaine d'études. <br />
       <span></span><br />
       <span style={{fontWeight:'bold'}}>Communauté Dynamique : </span>Rejoignez une communauté en ligne exclusive de doctorants du monde entier. Partagez vos expériences, collaborez sur des projets de recherche et élargissez votre réseau professionnel. <br />
       <span></span><br />
       <span style={{fontWeight:'bold'}}>Suivi Personnalisé : </span>Bénéficiez d'un suivi personnalisé par des mentors et des tuteurs expérimentés. Obtenez des conseils spécifiques à votre domaine de recherche et améliorez votre productivité académique. <br />
        </p>
    </section>

    <section class="why-choose">
        <h2>Pourquoi Choisir Zarahay doctorant :</h2>
        <p>
        <span style={{fontWeight:'bold'}}>Flexibilité d'Apprentissage : </span>Accédez à nos cours à tout moment, de n'importe où, pour vous adapter à votre emploi du temps de doctorant chargé. <br />
        <span></span><br />
        <span style={{fontWeight:'bold'}}>Formation de Qualité : </span>Profitez d'une formation de qualité supérieure, élaborée par des professionnels du secteur académique et de l'industrie. <br />
        <span></span><br />
        <span style={{fontWeight:'bold'}}>Innovation Continue : </span>Restez à la pointe de votre domaine grâce à des contenus actualisés régulièrement pour refléter les dernières tendances et découvertes. <br />
        </p>
    </section>

    <section class="call-to-action">
        <p>Rejoignez Zarahay doctorant dès aujourd'hui et prenez les rênes de votre parcours doctoral avec confiance. Ensemble, construisons un avenir académique exceptionnel.</p>
        <Link to={'/Create'}>Inscrivez-vous maintenant</Link>
    </section>
</div>
            </div>
            </div>
    )
}

export default Home
