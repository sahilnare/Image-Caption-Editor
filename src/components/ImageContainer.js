




import { Card, Image, CardBody, Stack, Heading, Divider, Text, Flex, Box } from '@chakra-ui/react';

export default function ImageContainer({ imgSrc, doneArray, imgTotal, currentIndex }) {

	const imagesDone = doneArray.filter(done => done);

	const isDone = doneArray[currentIndex];

	return (
		<Card maxW='3xl'>
			<CardBody>
				<Image
					src={imgSrc}
					alt='Image'
					borderRadius='lg'
					w="800px"
				/>
				<Stack mt='6' spacing='3'>
					<Heading size='md'>{imgSrc}</Heading>
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