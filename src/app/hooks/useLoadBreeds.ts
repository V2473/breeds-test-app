import { useState, useEffect } from 'react';
import { Breed } from '../types/breedCardsTypes';

export interface FetchState {
  breeds: Array<Breed> | null;
  loading: boolean;
  error: string | null;
}

const useLoadBreeds = (): FetchState => {
  const [breeds, setBreeds] = useState<Array<Breed>>([]);
  const [catBreeds, setCatBreeds] = useState<Array<Breed>>([]);
  const [dogBreeds, setDogBreeds] = useState<Array<Breed>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const [responseCatBreeds, responseDogBreeds] = await Promise.all([
          fetch('https://api.thecatapi.com/v1/breeds', {
            headers: {
            'x-api-key': process.env.CAT_API_KEY || '',
            },
          }),
          fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
            'x-api-key': process.env.DOG_API_KEY || '',
            }
          }),
        ]);

        if (!responseCatBreeds.ok) throw new Error(`Failed to fetch Cat API breeds, ${responseCatBreeds.status}`);
        if (!responseDogBreeds.ok) throw new Error(`Failed to fetch Dog API breeds, ${responseDogBreeds.status}`);

        const catBreeds = await responseCatBreeds.json();
        const dogBreeds = await responseDogBreeds.json();

        setCatBreeds(breeds => [...breeds, ...catBreeds]);
        setDogBreeds(breeds => [...breeds, ...dogBreeds]);

      } catch (err: Error | unknown) {
        if (err instanceof Error) setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    catBreeds.forEach((breed) => {breed.isCat = true;});
    dogBreeds.forEach((breed) => {breed.isCat = false;});
    setBreeds([...catBreeds, ...dogBreeds]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (breeds.length !== 0 && !loading) {
    return {breeds, loading, error};
  }
  return {breeds: null, loading, error};
};

export default useLoadBreeds;