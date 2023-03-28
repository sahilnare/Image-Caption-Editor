




import { Card, Image, CardBody, Stack, Heading, Divider, Text } from '@chakra-ui/react';

export default function ImageContainer({ imgSrc, imgDone, imgTotal, currentIndex }) {

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
					<Text color='blue.600' fontSize='xl'>
						{`Done: ${imgDone} out of ${imgTotal}`}
					</Text>
					<Text color='blue.600' fontSize='xl'>
						{`Index: ${currentIndex + 1}/${imgTotal}`}
					</Text>
				</Stack>
			</CardBody>
			<Divider />
		</Card>
	)

}