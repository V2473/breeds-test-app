import React from 'react';
import useLoadBreeds from '@/hooks/useLoadBreeds';
import BreedCard from '@/components/breedCard';
import { Breed } from '@/types/breedCardsTypes';

interface BreedCardsProps {
  cardsCount: number;
}

const BreedDeck: React.FC<BreedCardsProps> = ({cardsCount}) => {
  const { breeds, loading, error } = useLoadBreeds();
  const randomBreedsDeck: Array<Breed> = [];
  let breedsDeck: Array<Breed> = [];
  
  if (loading) {
    return <div>Loading breeds...</div>;
  } if (error) {
    return <div>Error: {error}</div>;
  } else if (breeds !== null) {
    
    breedsDeck = breeds;
    for (let i = 0; i < cardsCount; i++) {
      const randomIndex = Math.floor(Math.random() * breedsDeck.length);
      randomBreedsDeck.push(breedsDeck.splice(randomIndex, 1)[0]);
    }

  return (
    <div className="breed-deck flex flex-wrap gap-4 items-center justify-center p-4 bg-gray-200">
      {randomBreedsDeck.map((breed, index) => (
        <BreedCard key={`${breed.name}-${index}`} breed={breed} /> 
      ))}
    </div>
  );}
};

export default BreedDeck;