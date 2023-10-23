import { Router } from 'express';
import { fileController } from '../controllers/fileController.js';
import { upload } from '../utils/upload.js';

const fileRouter = Router();

// S3에 이미지 업로드
fileRouter.post('/', upload.single('image'), fileController.getImageUrl);

export { fileRouter };
