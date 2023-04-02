import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
    return (
        <div className='cards'>
          <div className='cards__container'>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                        <CardItem 
                            src="/assets/cards/AiPicture.jpg"
                            text="Text jest"
                            label="IA"

                        />
                        <CardItem 
                            src="/assets/cards/duck.png"
                            text="Obrazek przedstawia kaczkę która jest żółta"
                            label="Pixel"

                        />
                        
                         <CardItem 
                            src="/assets/cards/AiPicture.jpg"
                            text="Obraz wygenerowany przez sztuczną inteligęcję"
                            label="IAv4"

                        />
                        
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards;