import React, { useState } from 'react';
import { Breed } from '@/types/breedCardsTypes';

interface BreedSearchProps {
  breeds: Breed[];
  onSearch: (filteredBreeds: Breed[]) => void;
}

const BreedSearch: React.FC<BreedSearchProps> = ({ breeds, onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    const filtered = breeds.filter(breed =>
      breed.name.toLowerCase().includes(newQuery.toLowerCase())
    );
    onSearch(filtered);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a breed..."
        className="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default BreedSearch;