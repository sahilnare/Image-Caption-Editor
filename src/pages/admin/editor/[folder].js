
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex, Box, Button } from '@chakra-ui/react';
import { getImageList } from '../../../utils/fetchData';


import EditorPage from '../../../components/editor/EditorPage';
import Empty from '../../../components/editor/Empty';


export default function Editor() {

	const router = useRouter();
	
	const { folder } = router.query;

	const [images, setImages] = useState([]);

	const [doneArray, setImageDoneArray] = useState([]);

	const [currentImage, setCurrentImage] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(null);

	const [empty, setEmpty] = useState(false);

	const addImagesToState = async (init, newImages) => {

		if (init) {

			// console.log(folder);

			if (folder) {

				const allImages = await getImageList(folder);

				if (allImages) {

					console.log(allImages);
	
					if (allImages.imageList.length > 0) {
	
						setEmpty(false);
	
						setImages(allImages.imageList);
	
						let ind = 0;
	
						if (currentIndex) {
	
							ind = currentIndex;
	
						}
	
						setCurrentIndex(ind);
	
						setCurrentImage(allImages.imageList[ind]);
	
						const arr = allImages.imageList.map(img => false);
						// console.log(arr);
	
						setImageDoneArray(arr);
	
						allImages.imageList.forEach((picture) => {
							const img = new Image();
							img.src = `/api/public/images/${picture.fileRelative}`;
						});
	
					} else {
	
						setEmpty(true);
	
					}
	
				} 

			}

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

	}, [folder]);

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
						empty ? (

							<Empty />

						) : (
							
							<EditorPage 
								currentImage={currentImage} 
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

