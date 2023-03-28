
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flex, Box, Button } from '@chakra-ui/react';
import { getImageList } from '../../utils/fetchData';


import EditorPage from '../../components/EditorPage';
import Finished from '@/components/Finished';


export default function Editor() {

	const [images, setImages] = useState([]);
	const [imagesDone, setImagesDone] = useState(0);

	const [currentImage, setCurrentImage] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(null);

	const [finished, setFinished] = useState(false);

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

	const doneUpdate = () => {

		const doneFilter = images.filter(img => img.done);

		setImagesDone(doneFilter.length);

	}

	useEffect(() => {

		const asyncFetch = async () => {

			const allImages = await getImageList();

			if (allImages) {

				// console.log(allImages);

				const imageArray = allImages.imageList.map(img => {
					const newImg = { ...img, done: false }
					return newImg;
				})
				
				setImages(imageArray);

				const ind = 0;

				setCurrentIndex(ind);

				setCurrentImage(imageArray[ind]);

			}

		};

		asyncFetch();

	}, []);

	useEffect(() => {

		setCurrentImage(images[currentIndex]);

		doneUpdate();

	}, [images])

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
								setImages={setImages}
								currentIndex={currentIndex}
							/>

						)
					}
					
					
				</Flex>

			</main>
		</>
	);
	
}

