


import { useState, useEffect } from 'react';

import { Card, Image, CardBody, Stack, Heading, Divider, Text, Flex, Box, Spinner } from '@chakra-ui/react';

export default function ImageContainer({ imgSrc, imgTotal, currentIndex }) {

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
					<Heading size='md'>{imgSrc}</Heading>
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