

import { Box, Button, SimpleGrid } from '@chakra-ui/react';

import { renameImage } from '../../utils/fetchData';

import ImageContainer from './ImageContainer';
import CaptionForm from './CaptionForm';

export default function EditorPage({ nextImage, prevImage, currentImage, images, setImageDoneArray, doneArray, currentIndex, addImagesToState }) {


	const handleSubmit = async (caption) => {

		if (caption.length > 1) {

			const oldFileName = `./public/images/${currentImage.fileRelative}`;

			const fileNameWithExtension = `${caption}_${currentIndex + 1}${currentImage.extension}`;

			const newFileName = oldFileName.replace(currentImage.fileName, fileNameWithExtension);

			const result = await renameImage(oldFileName, newFileName);

			const fileRelative = currentImage.fileRelative.replace(currentImage.fileName, fileNameWithExtension);

			// console.log(result);

			const newImages = [
				...images.slice(0, currentIndex),
				{...currentImage, done: true, fileRelative, fileName: fileNameWithExtension }, 
				...images.slice(currentIndex + 1)
			];

			await addImagesToState(false, newImages);

			const newDone = doneArray.map((done, i) => {
				if (i === currentIndex) return true;

				return done;
			});

			setImageDoneArray(newDone);

		} else {

			// No changes made

		}

	}

	// console.log(currentImage);

	return (
		<>
			<ImageContainer imgSrc={currentImage ? `/api/public/images/${currentImage.fileRelative}` : ''} imgText={currentImage ? `${currentImage.fileRelative}` : ''} currentIndex={currentIndex} doneArray={doneArray} imgTotal={images.length} />
					
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