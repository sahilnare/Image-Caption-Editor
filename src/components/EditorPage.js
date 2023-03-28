

import { Box, Button, SimpleGrid } from '@chakra-ui/react';

import { renameImage } from '../utils/fetchData';

import ImageContainer from './ImageContainer';
import CaptionForm from './CaptionForm';

export default function EditorPage({ nextImage, prevImage, currentImage, imagesDone, images, setImages, currentIndex }) {


	const handleSubmit = async (caption) => {

		if (caption.length > 1) {

			const oldFileName = `./public/images/${currentImage.fileRelative}`;

			const newFileName = oldFileName.replace(currentImage.fileName, `${caption}_${currentImage.fileName}`);

			const result = await renameImage(oldFileName, newFileName);

			const fileRelative = `${currentImage.fileRelative}`.replace(currentImage.fileName, `${caption}_${currentImage.fileName}`);

			// console.log(result);

			const newImages = [
				...images.slice(0, currentIndex),
				{...currentImage, done: true, fileRelative }, 
				...images.slice(currentIndex + 1)
			];

			setImages(newImages);

		} else {

			// No changes made

		}

	}

	return (
		<>
			<ImageContainer imgSrc={currentImage ? `/images/${currentImage.fileRelative}` : ''} currentIndex={currentIndex} imgDone={imagesDone} imgTotal={images.length} />
					
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