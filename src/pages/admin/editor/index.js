
import { FormControl, Input, Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/router'



export default function EditorPage() {

	const router = useRouter();

	const [folder, setFolder] = useState('');

	const handleSubmit = () => {

		if (folder) {

			router.push(`/admin/editor/${folder}`);

		}

	}


	return (
		<Flex pt="30px" w="100%" h="600px" alignItems="center" justifyContent="center">

			<form onSubmit={(e) => {
					e.preventDefault();
					handleSubmit();
				}}
				style={{width: "600px"}}
			>
				<FormControl>
					<Input
						fontSize="sm"
						ms={{ base: '0px', md: '0px' }}
						type="text"
						placeholder="Enter the name of the folder"
						mb="24px"
						fontWeight="500"
						size="lg"
						value={folder}
						onChange={(e) => {
							e.preventDefault();
							setFolder(e.target.value);
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
			
		</Flex>
	)

}