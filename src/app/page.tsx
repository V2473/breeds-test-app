"use client";
import BreedDeck from "./breedDeck";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold mb-8">Dog Breeds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <BreedDeck cardsCount={10} />
      </div>
      <footer className="mt-16 text-center text-gray-500">
        © {new Date().getFullYear()} Dog Breeds App
      </footer>
    </div>
  );
}
