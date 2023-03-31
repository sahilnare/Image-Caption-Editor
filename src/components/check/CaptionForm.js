
import { FormControl, Input, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function CaptionForm({ handleSubmit }) {

	return (
		<form onSubmit={async (e) => {
			e.preventDefault();
			await handleSubmit();
		}}>

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
					{'Delete'}
				</Button>
			</FormControl>
		</form>
	)
}