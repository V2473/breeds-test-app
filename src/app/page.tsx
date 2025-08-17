"use client";
import BreedDeck from "@/components/breedDeck";

export default function Home() {
  return (
    <div className={'flex flex-wrap flex-col items-center justify-center overflow-hidden'}>
      <BreedDeck cardsCount={30} />
      <footer className="h-15 pt-5 text-center text-gray-500 bg-gray-100 w-full overflow-hidden">
        © {new Date().getFullYear()} 
      </footer>
    </div>
  );
}
