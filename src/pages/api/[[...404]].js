import { StatusCodes } from 'http-status-codes';

export default function handler(req, res) {

	res.status(StatusCodes.NOT_FOUND).json({ msg: 'API Route does not exists' });

}
