
import { createRouter, expressWrapper } from 'next-connect';
import { onError, onNoMatch } from '../../../../../server/middleware/errorHandler';
import { getImageList } from '../../../../../server/controllers/imageController';

const router = createRouter();


router
	.get(getImageList);


export default router.handler({
	onError,
	onNoMatch
});

