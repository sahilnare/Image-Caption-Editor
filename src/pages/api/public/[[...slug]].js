
import fs from "fs";
import path from 'path';
import sharp from 'sharp';

const mime = {
    html: 'text/html',
    txt: 'text/plain',
    css: 'text/css',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    js: 'application/javascript'
};

export default function handler(req, res) {
		if (req.query.slug && req.query.slug.length) {

			const publicDir = __dirname.split(".next")[0] + "public/"

			const fileUrl = req.query.slug.join("/")

			// fs.readFile(publicDir + fileUrl, (error, data) => {

			// 	if(error) {
			// 		return res.status(404).send(null)
			// 	}
			// 	return res.status(200).send(data)

			// })

			const file = publicDir + fileUrl;

			const type = mime[path.extname(file).slice(1)] || 'text/plain';
			const s = fs.createReadStream(file);


			// console.log(path.extname(file).slice(1));

			const newchunks = [];
			s.on('data', (chunk) => {

				newchunks.push(chunk);

			}).on('end', () => {

				const compressedBuffer = sharp(Buffer.concat(newchunks)).jpeg({ quality: 40, mozjpeg: true });
				// console.log(compressedBuffer);

				res.setHeader('Content-Type', type);
				s.pipe(compressedBuffer).pipe(res);


			});

			// s.on('open', function () {
			// 	res.setHeader('Content-Type', type);
			// 	s.pipe(res);
			// });

			s.on('error', function () {
				res.setHeader('Content-Type', 'text/plain');
				res.status(404).end('Not found');
			});

		} else {

			res.status(404).send(null);

		}
}
