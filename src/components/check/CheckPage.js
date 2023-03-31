
import { useEffect, useState } from 'react';

import { Box, Button, SimpleGrid } from '@chakra-ui/react';

import { renameImage } from '../../utils/fetchData';

import ImageContainer from './ImageContainer';
import CaptionForm from './CaptionForm';

export default function CheckPage({ nextImage, prevImage, currentImage, images, currentIndex, addImagesToState }) {

	const handleKeyDown = async (e) => {

		if (e.keyCode === 37) {

			// console.log('delete');
			prevImage();

		}

		if (e.keyCode === 39) {

			// console.log('delete');
			nextImage();

		}
		
	}

	// const handleClick = (e) => {

	// 	// console.log('click');
	// 	prevImage();
		
	// }

	useEffect(() => {

		document.addEventListener('keydown', handleKeyDown);


		return () => {
			document.body.removeEventListener('keydown', handleKeyDown);
		}

	}, [currentImage]);


	const handleSubmit = async () => {

		const oldFileName = `./public/images/${currentImage.fileRelative}`;

		// const fileNameWithExtension = `${caption}_${currentIndex + 1}${currentImage.extension}`;

		// const newFileName = oldFileName.replace(currentImage.fileName, fileNameWithExtension);
		const newFileName = `./public/images/trash/${currentImage.fileName}`;

		const result = await renameImage(oldFileName, newFileName);

		// console.log(result);


		const newImages = images.filter((img, index) => index !== currentIndex);

		await addImagesToState(false, newImages);

	}

	// console.log(currentImage);

	return (
		<>
			<ImageContainer imgSrc={currentImage ? `/api/public/images/${currentImage.fileRelative}` : ''} currentIndex={currentIndex} imgTotal={images.length} />
					
			<Box pt="30px" w="700px">
				<CaptionForm handleSubmit={handleSubmit} currentImage={currentImage} />

				<SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
					<Button
						fontSize="sm"
						fontWeight="500"
						variant='solid'
						colorScheme='green'
						w="100%"
						h="50"
						mb="24px"
						onClick={() => prevImage()}
					>
						Previous Image
					</Button>
					<Button
						fontSize="sm"
						fontWeight="500"
						variant='solid'
						colorScheme='green'
						w="100%"
						h="50"
						mb="24px"
						onClick={() => nextImage()}
					>
						Next Image
					</Button>
				</SimpleGrid>
				
			</Box>
		</>
	)

}