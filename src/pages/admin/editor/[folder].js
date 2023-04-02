
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';
import { getImageList } from '../../../utils/fetchData';


import EditorPage from '../../../components/editor/EditorPage';
import Empty from '../../../components/editor/Empty';
import AllDone from '@/components/editor/AllDone';


export default function Editor() {

	const router = useRouter();
	
	const { folder } = router.query;

	const [images, setImages] = useState([]);

	const [doneArray, setImageDoneArray] = useState([]);

	const [currentImage, setCurrentImage] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(null);

	const [empty, setEmpty] = useState(false);

	const imagesDone = doneArray.filter(done => done);


	const addImagesToState = async (init, newImages) => {

		if (init) {

			// console.log(folder);

			if (folder) {

				const allImages = await getImageList(folder);

				const chuckContainer = [];

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
						
						// # Creating chunks of 20 images
						const chunkSize = 15;
						for (let j = 0; j < allImages.imageList.length; j += chunkSize) {

							const chunk = allImages.imageList.slice(j, j + chunkSize);
							chuckContainer.push(chunk);
							
						}

						// # Loading images in sets of 20 with timeouts
						for (let k=0; k < chuckContainer.length; k++) {

							(function(ind) {

								setTimeout(() => {
									// console.log(ind);

									chuckContainer[ind].forEach((picture) => {
										const img = new Image();
										img.src = `/api/public/images/${picture.fileRelative}`;
										// console.log(picture.fileRelative);
									});

								}, 3000 * ind);

							})(k);

						 }

						// allImages.imageList.forEach((picture) => {
						// 	const img = new Image();
						// 	img.src = `/api/public/images/${picture.fileRelative}`;
						// });
	
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

						) : imagesDone.length === images.length ? (

							<AllDone />

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

