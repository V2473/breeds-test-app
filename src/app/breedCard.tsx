/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Breed } from './types/breedCardsTypes';

interface BreedCardProps {
  breed: Breed;
}
const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  const imgUrl = breed.isCat ? 
  `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg` : 
  `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
  
  return (
    <div className="breed-card">
      <h2>{breed.name}</h2>
      <img src={imgUrl} alt={`${breed.name} picture`} />
    </div>
  );}

export default BreedCard;