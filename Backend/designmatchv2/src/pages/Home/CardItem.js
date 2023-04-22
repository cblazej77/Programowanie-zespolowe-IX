import React from 'react';
import { Link } from 'react-router-dom';
import { CardAvatar, CardLabel, NameText, ProjectPhoto, RatingText, SimpleInfoContainer } from './CardsElement';
import { Rating } from 'react-simple-star-rating';

// function CardItem(props) {
//     return (
//       <>
//         <li className='cards__item'>
//           <Link className='cards__item__link' to={props.path}>
//             <figure className='cards__item__pic-wrap' data-category={props.label}>
//               <img
//                 className='cards__item__img'
//                 alt='Image'
//                 src={props.src}
//               />
//             </figure>
//             <div className='cards__item__info'>
//               <h5 className='cards__item__text'>{props.text}</h5>
//             </div>
//           </Link>
//         </li>
//       </>
//     );
//   }

// export default CardItem;

function CardItem(props) {
  return (
    <CardLabel>
      <SimpleInfoContainer>
        <CardAvatar src={props.avatar} />
        <NameText>{props.name} {props.surname}</NameText>
        <div>
        <Rating initialValue={props.rating} readonly={true} precision={0.5} size="1.6vw"/>
        <RatingText>({props.ratingCount} opinii)</RatingText>
        </div>
      </SimpleInfoContainer>
      <ProjectPhoto src={props.project1}/>
      <ProjectPhoto src={props.project2}/>
      <ProjectPhoto src={props.project3}/>
      <ProjectPhoto src={props.project4}/>
    </CardLabel>
  );
}

export default CardItem;