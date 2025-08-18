/* eslint-disable @next/next/no-img-element */

"use client";
import { use, useEffect, useState } from 'react'

export default function BreedPage({ params }: {
  params: Promise<{ breed: string }>
}) {

  const [breedInfo, setBreedInfo] = useState<string>('');
  const [imgData, setImgData] = useState<string>('');

  const { breed } = use(params)
  const id = breed.split('-')[0];
  const breedName = breed.split('-').slice(1).join(' ');
  const API_KEY = id.length > 3 ? process.env.CAT_API_KEY : process.env.DOG_API_KEY;
  const infoUrl = id.length > 3 ?
    `https://api.thecatapi.com/v1/breeds/${id}` :
    `https://api.thedogapi.com/v1/breeds/${id}`;
  const imgUrl = id.length > 3 ?
    `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${id}` :
    `https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${id}`;
  const imgUrlDirect = id.length > 3 ?
    'https://cdn2.thecatapi.com/images/' :
    'https://cdn2.thedogapi.com/images/';
  const breedDataText = id.length > 3 ? 'description' : `temperament`;



  useEffect(() => {
    const fetchBreedDetails = async () => {
      try {
        const responseBreedDetails = await fetch(infoUrl, {
          headers: {
            'x-api-key': API_KEY || '',
          },
        });
        if (!responseBreedDetails.ok) { throw new Error(`Failed to fetch breed details, ${responseBreedDetails.status}`); }

        const breedInfoFetched = await responseBreedDetails.text();

        setBreedInfo(breedInfo => breedInfo + breedInfoFetched);
      }
      catch (error: Error | unknown) { if (error instanceof Error) console.error('Error fetching breed details:', error); }
    };

    fetchBreedDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchBreedImageUrls = async () => {
      try {
        const imgLinksResponse = await fetch(imgUrl)
        if (!imgLinksResponse.ok) { throw new Error(`Failed to fetch breed image, ${imgLinksResponse.status}`); }
        const imgDataFetch = await imgLinksResponse.text();
        setImgData(imgData => imgData + imgDataFetch);
      }
      catch (error: Error | unknown) { if (error instanceof Error) console.error('Error fetching breed image:', error); }
    };
    fetchBreedImageUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Breed info corrupted Json parsing
  const descriptionStart = breedInfo.indexOf('"', breedInfo.indexOf(`${breedDataText}`) + 12);
  const descriptionEnd = breedInfo.substring(descriptionStart + 1, breedInfo.indexOf('"', descriptionStart + 1));
  const breedDescrioptionData = `Breed: ${breedName}. \nDescription: ${descriptionEnd}`;

  //Image data corrupted Json parsing
  const allPhotos: Array<string> = [];
  let imgDataParsedFull: string = imgData;
  let imgDataParsed: string = '';
  let imgDataStart = 0;
  let imgUrlParsed = '';

  while (imgDataParsedFull.includes('id"')) {
    imgDataStart = imgDataParsedFull.indexOf('id"') + 5;
    imgUrlParsed = imgDataParsedFull.substring(imgDataStart, imgDataStart + 9);
    if (imgUrlParsed.length > 8) {
      imgDataParsed = imgDataParsed + "," + imgUrlParsed;
    } imgDataParsedFull = imgDataParsedFull.slice(imgDataStart);
  }
  imgDataParsed.split(',').forEach((imgUrl) => {
    if (imgUrl.length > 8) { allPhotos.push(imgUrlDirect + imgUrl + '.jpg'); }
  });

  return (
    <div className="breed-page flex flex-wrap flex-row items-center justify-center p-4 bg-gray-100">
      <p className='w-100'>{breedDescrioptionData}</p>
      {allPhotos.length > 0 ? allPhotos.map((img, index) => (
        <img key={`${breedName}-${index}`} src={img} alt={`Image of ${breedName}`} className="max-h-80 object-cover w-80 m-2" />)
      ) : <p>No images available for this breed.</p>}
    </div>
  )
}