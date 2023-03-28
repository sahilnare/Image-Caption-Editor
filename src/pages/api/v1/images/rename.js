
import { createRouter } from 'next-connect';
import { onError, onNoMatch } from '../../../../../server/middleware/errorHandler';
import { renameImage } from '../../../../../server/controllers/imageController';


const router = createRouter();


router
	.post(renameImage);


export default router.handler({
	onError,
	onNoMatch
});
