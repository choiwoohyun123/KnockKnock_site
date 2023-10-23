import { statusCode } from '../utils/statusCode.js';

const fileController = {
    getImageUrl: async (req, res, next) => {
        try {
            const imageUrl = req?.file?.location;

            statusCode.setResponseCode200(res);
            return res.send(imageUrl);
        } catch (error) {
            next(error);
        }
    },
};

export { fileController };
