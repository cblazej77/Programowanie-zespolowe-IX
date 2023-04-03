import React from 'react'
import CardItem from './CardItem'
import './Cards.css'
import {Cards2, Cards__container, Sort,Sort2, SortButton, SortLabel} from './CardsElement'

function Cards() {
    return (
        <Cards2>
        <Sort2>
          <SortLabel>Filtruj </SortLabel>
          <SortButton>filtr1 </SortButton>
          <SortButton>filtr2 </SortButton>
          <SortButton>filtr3 </SortButton>
        </Sort2>
        <Sort>
          <SortLabel>Sortuj przez: </SortLabel>
          <SortButton>Sortowanie </SortButton>
        </Sort>
          <Cards__container>
            <div className='cards__wrapper'>
              <ul className='cards__items'>
                        <CardItem 
                            src="/assets/cards/AiPicture.jpg"
                            text="Opis..."
                            label="IA"

                        />
                        <CardItem 
                            src="/assets/cards/duck.png"
                            text="Obrazek przedstawia kaczkę która jest żółta"
                            label="Pixel"

                        />
                        
                         <CardItem 
                            src="/assets/cards/AiPicture.jpg"
                            text="Obraz wygenerowany przez sztuczną inteligencję"
                            label="IAv4"

                        />
                        
                </ul>
                <ul className='cards__items'>
                        <CardItem 
                            src="/assets/cards/AiPicture.jpg"
                            text="Text jest tutaj"
                            label="IA"

                        />
                        <CardItem 
                            src="/assets/cards/duck.png"
                            text="pixel duck"
                            label="Pixel"

                        />
                        
                         <CardItem 
                            src="/assets/cards/AiPicture.jpg"
                            text="City"
                            label="IAv7"

                        />
                        
                </ul>
            </div>
        </Cards__container>
    </Cards2>
  )
}

export default Cards;