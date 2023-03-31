
import { FormControl, Input, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function CaptionForm({ handleSubmit, currentImage }) {

	const [caption, setCaption] = useState('');

	// console.log(currentImage);

	useEffect(() => {

		setCaption('');

	}, [currentImage]);

	return (
		<form onSubmit={async (e) => {
			e.preventDefault();
			await handleSubmit(caption);
		}}>
			<FormControl>
				<Input
					fontSize="sm"
					ms={{ base: '0px', md: '0px' }}
					type="text"
					placeholder="Enter a caption"
					mb="24px"
					fontWeight="500"
					size="lg"
					value={caption}
					onChange={(e) => {
						e.preventDefault();
						setCaption(e.target.value);
					}}
				/>
				
			</FormControl>

			<FormControl>
				<Button
					fontSize="sm"
					fontWeight="500"
					variant='solid'
					colorScheme='blue'
					w="100%"
					h="50"
					mb="24px"
					type="submit"
				>
					{'Submit'}
				</Button>
			</FormControl>
		</form>
	)
}