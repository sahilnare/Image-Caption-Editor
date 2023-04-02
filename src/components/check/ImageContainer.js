


import { useState, useEffect } from 'react';

import { Card, Image, CardBody, Stack, Heading, Divider, Text, Flex, Box, Spinner } from '@chakra-ui/react';

export default function ImageContainer({ imgSrc, imgTotal, imgText, currentIndex }) {

	const [imageLoaded, setimageLoaded] = useState(false);
	const [imageHeading, setImageHeading] = useState('');

	useEffect(() => {

		setimageLoaded(false);

	}, [imgSrc]);

	useEffect(() => {

		if (imgText) {

			const underscore = imgText.lastIndexOf('_');
			if (underscore === -1) return;

			const newHeading = imgText.slice(0, underscore);

			setImageHeading(newHeading);

		}

	}, [imgText]);

	return (
		<Card maxW='3xl'>
			<CardBody>

				{
					imageLoaded ? null : (

						<Spinner size='xl' color='red.700' />

					)
				}

				<Image
					src={imgSrc}
					alt='Image'
					borderRadius='lg'
					display={imageLoaded ? 'block' : 'none'}
					w="512px"
					onLoad={() => setimageLoaded(true)}
				/>
				
				<Stack mt='6' spacing='3'>
					<Heading size='md'>{imageHeading}</Heading>
					<Flex
						direction="row"
						justifyContent="space-between"
					>
						<Box>
							<Text color='blue.600' fontSize='xl'>
								{`Index: ${currentIndex + 1}/${imgTotal}`}
							</Text>
						</Box>
					</Flex>
				</Stack>
			</CardBody>
			<Divider />
		</Card>
	)

}