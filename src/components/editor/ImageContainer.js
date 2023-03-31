


import { useState, useEffect } from 'react';

import { Card, Image, CardBody, Stack, Heading, Divider, Text, Flex, Box, Spinner } from '@chakra-ui/react';

export default function ImageContainer({ imgSrc, doneArray, imgTotal, imgText, currentIndex }) {

	const imagesDone = doneArray.filter(done => done);

	const isDone = doneArray[currentIndex];

	const [imageLoaded, setimageLoaded] = useState(false);

	useEffect(() => {

		setimageLoaded(false);

	}, [imgSrc]);

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
					<Heading size='md'>{imgText}</Heading>
					<Flex
						direction="row"
						justifyContent="space-between"
					>
						<Box>
							<Text color='blue.600' fontSize='xl'>
								{`Done: ${imagesDone.length} out of ${imgTotal}`}
							</Text>
							<Text color='blue.600' fontSize='xl'>
								{`Index: ${currentIndex + 1}/${imgTotal}`}
							</Text>
						</Box>
						<Text color={isDone ? 'green.700' : 'red.700'} fontSize='xl' fontWeight="bold">
							{isDone ? 'Done' : 'Not Done'}
						</Text>
					</Flex>
				</Stack>
			</CardBody>
			<Divider />
		</Card>
	)

}