/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Breed } from '@/types/breedCardsTypes';
import Link from "next/link";

interface BreedCardProps {
  breed: Breed;
}
const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  const imgUrl = breed.isCat ? 
  `https://cdn2.thecatapi.com/images/${breed.reference_image_id}.jpg` : 
  `https://cdn2.thedogapi.com/images/${breed.reference_image_id}.jpg`;
  const url = breed.name.replaceAll(" ", "-");
  return (
    <Link href={`/${encodeURIComponent(breed.isCat ? `${breed.id}-${url}` : `${breed.id}-${url}`)}`} className="no-underline">
    <div className={`breed-card w-100 h-130 border rounded-lg shadow-lg flex flex-col items-center ${breed.isCat ? 'bg-blue-100' : 'bg-yellow-100'} p-4`}>
      <div className={`m-2 p-0 overflow-hidden flex flex-col items-center justify-center`}>
      <h2 className={`m-2 p-2 font-bold`}>{breed.name}</h2>
      <img src={imgUrl} alt={`${breed.name} picture`} className={`max-h-80 object-cover w-80`} />
      <p className={` ${breed.rare ? 'text-red-400 font-bold text-2x1 text-centr m-2' : 'hidden'} ` }> !! RARE !!</p>
      <p className={` ${breed.rex ? 'text-blue-400 font-bold text-3x1 text-centr m-2' : 'hidden'} ` }> __REX__</p>
      </div>

    </div>
    </Link>
  );}

export default BreedCard;