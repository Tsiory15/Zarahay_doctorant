import React from 'react'

const Test = () => {
    const afficher = () => {
        alert('Bonjour')
    }
  return (
    <div>
        <button onClick={afficher}>
            Veuillez appuyez sur ce bouton
        </button>
    </div>
  )
}

export default Test