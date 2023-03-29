
import fs from 'fs';
import path from 'path';
import { StatusCodes } from 'http-status-codes';
import UnAuthenticatedError from '../errors/unAuthenticated';
import BadRequestError from '../errors/badRequest';


const walk = async (dir) => {
	var results = [];
	
	let list = await fs.promises.readdir(dir);

	var pending = list.length;

	if (!pending) return results;

	for (const file of list) {
		const fileN = path.resolve(dir, file);
		const fileName = path.basename(fileN);
		const extension = path.extname(fileN);

		const fileRelative = path.relative(
			'/home/sahilnare78/Documents/Code_Base/Upwork/tomer/image_editor_ui/image-editor/public/images', 
			fileN
		);

		const stat = await fs.promises.stat(fileN);

		// console.log(stat);

		if (stat && stat.isDirectory()) {

			const res = await walk(fileN);

			results = results.concat(res);

			if (!--pending) return results;

		} else {
			results.push({
				fileName,
				fileRelative,
				extension,
				birth: stat.birthtimeMs
			});
			if (!--pending) return results;
		}
	}

};


export const renameImage = async (req, res) => {


	const { oldPath, newPath } = req.body;

	fs.rename(oldPath, newPath, (err) => {

		if ( err ) {

			console.log('ERROR: ' + err);
			throw new BadRequestError('Unable to change file name');

		}

	});

	res.status(StatusCodes.CREATED).json({ success: true });
	

};


export const getImageList = async (req, res) => {

	const list = await walk('./public/images');

	// console.log(list);

	const sorted = list.sort((a, b) => a.birth - b.birth);

	console.log(sorted);

	res.status(StatusCodes.OK).json({ imageList: sorted });

	// const list = await fs.promises.readdir('./public/');

	// res.status(StatusCodes.OK).json({ imageList: list });

	

};



export const getAllOrders = async (req, res) => {

	// const { user_id } = req.session.user;

	// if (!user_id) {

	// 	throw new BadRequestError('No user id provided');

	// }

	// if (!req.session.user) {

	// 	throw new UnAuthenticatedError('Cannot verify user');

	// }


	res.status(StatusCodes.CREATED).json({ data: rows });
	

};