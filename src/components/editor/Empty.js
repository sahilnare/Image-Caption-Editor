
import { Box, Text } from '@chakra-ui/react';

export default function Empty({ nextImage, currentImage, imagesDone, images }) {



	return (
		<>
					
			<Box pt="30px" w="700px">
				<Text fontSize="xl" fontWeight="bold" >No Images</Text>
			</Box>
		</>
	)

}