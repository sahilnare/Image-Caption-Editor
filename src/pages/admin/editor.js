
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flex, Box, Button } from '@chakra-ui/react';
import { getImageList } from '../../utils/fetchData';


import EditorPage from '../../components/EditorPage';
import Finished from '@/components/Finished';


export default function Editor() {

	const [images, setImages] = useState([]);
	const [imagesDone, setImagesDone] = useState(0);

	const [doneArray, setImageDoneArray] = useState([]);

	const [currentImage, setCurrentImage] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(null);

	const [finished, setFinished] = useState(false);

	const addImagesToState = async (init, newImages) => {

		if (init) {

			const allImages = await getImageList();

			if (allImages) {

				// console.log(allImages);
				
				setImages(allImages.imageList);

				let ind = 0;

				if (currentIndex) {

					ind = currentIndex;

				}

				setCurrentIndex(ind);

				setCurrentImage(allImages.imageList[ind]);

			}

			const arr = allImages.imageList.map(img => false);
			console.log(arr);

			setImageDoneArray(arr);

		} else {

			setImages(newImages);

			nextImage();

		}
	}

	const nextImage = () => {

		if (currentIndex < images.length - 1) {

			let nextIndex = currentIndex + 1;

			setCurrentIndex(nextIndex);

			setCurrentImage(images[nextIndex]);

		}

	}

	const prevImage = () => {

		if (currentIndex > 0) {

			let prevIndex = currentIndex - 1;

			setCurrentIndex(prevIndex);

			setCurrentImage(images[prevIndex]);

		}

	}

	useEffect(() => {

		const asyncFetch = async () => {

			await addImagesToState(true);

		};

		asyncFetch();

	}, []);

	useEffect(() => {

		setCurrentImage(images[currentIndex]);

	}, [images]);

	return (
		<>
			<Head>
				<title>Edit Captions</title>
			</Head>
			<main>
				

				<Flex 
					direction="column"
					alignItems="center"
					justifyContent="center"
					pt="40px"
				>

					
					

					{
						finished ? (

							<Finished />

						) : (
							
							<EditorPage 
								currentImage={currentImage} 
								imagesDone={imagesDone} 
								images={images} 
								nextImage={nextImage} 
								prevImage={prevImage}
								currentIndex={currentIndex}
								addImagesToState={addImagesToState}
								setImageDoneArray={setImageDoneArray}
								doneArray={doneArray}
							/>

						)
					}
					
					
				</Flex>

			</main>
		</>
	);
	
}

