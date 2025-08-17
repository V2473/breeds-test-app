import React from 'react';
import BreedCard from '@/components/breedCard';
import { Breed } from '@/types/breedCardsTypes';

interface BreedCardsProps {
  cardsCount: number;
  initialBreeds: Breed[] | null;
}

const BreedDeck: React.FC<BreedCardsProps> = ({ cardsCount, initialBreeds }) => {
  if (!initialBreeds) {
    return <div>Loading breeds...</div>;
  }

  const breedsDeck = [...initialBreeds];
  const randomBreedsDeck: Array<Breed> = [];

  const count = Math.min(cardsCount, breedsDeck.length);

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * breedsDeck.length);
    const selectedBreed = breedsDeck.splice(randomIndex, 1);
    if (selectedBreed.length > 0) {
      randomBreedsDeck.push(selectedBreed[0]);
    }
  }

  return (
    <div className="breed-deck flex flex-wrap gap-4 items-center justify-center p-4 bg-gray-200">
      {randomBreedsDeck.map((breed, index) => (
        <BreedCard key={`${breed.name}-${index}`} breed={breed} />
      ))}
    </div>
  );
};

export default BreedDeck;