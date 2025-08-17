"use client";
import { useState } from "react";
import BreedDeck from "@/components/breedDeck";
import BreedSearch from "@/components/breedSearch";
import useLoadBreeds from "@/hooks/useLoadBreeds";
import { Breed } from "@/types/breedCardsTypes";

export default function Home() {
  const { breeds, loading, error } = useLoadBreeds();
  const [filteredBreeds, setFilteredBreeds] = useState<Breed[] | null>(null);

  const handleSearch = (filtered: Breed[]) => {
    setFilteredBreeds(filtered);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={'flex flex-wrap flex-col items-center justify-center overflow-hidden'}>
      <BreedSearch breeds={breeds || []} onSearch={handleSearch} />
      <BreedDeck cardsCount={30} initialBreeds={filteredBreeds !== null ? filteredBreeds : breeds} />
      <footer className="h-15 pt-5 text-center text-gray-500 bg-gray-100 w-full overflow-hidden">
        © {new Date().getFullYear()}
      </footer>
    </div>
  );
}
