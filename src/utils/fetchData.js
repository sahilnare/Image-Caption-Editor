import axios from 'axios';


export const renameImage = async (oldPath, newPath) => {

	try {

		const result = await axios.post(`/api/v1/images/rename`, {
			oldPath,
			newPath
		});

		return result.data;
		
	} catch (error) {

		console.log(error);

		return null;
		
	}

};

export const getImageList = async (folder) => {

	try {

		const result = await axios.get(`/api/v1/images/images?folder=${folder}`);

		return result.data;
		
	} catch (error) {

		console.log(error);

		return null;
		
	}

};