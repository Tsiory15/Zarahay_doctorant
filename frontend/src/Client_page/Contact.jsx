import React, { useState } from 'react';
import './Contact.css'; // Assurez-vous de créer un fichier CSS pour le style

const Contact = () => {
  // Utilisation de useState pour gérer les champs du formulaire
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Gestionnaire pour soumettre le formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vous pouvez traiter les données du formulaire ici (envoyer à un serveur, etc.)
    console.log('Nom:', nom);
    console.log('Email:', email);
    console.log('Message:', message);

    // Réinitialiser les champs du formulaire après la soumission
    setNom('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container">
      <h2>Contactez-nous</h2>
      <form className='contact_form' onSubmit={handleSubmit}>
        <p>Nom : </p>
          <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
          <p>E-mail : </p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p>Message : </p>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        <button className='contact_btn' type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
