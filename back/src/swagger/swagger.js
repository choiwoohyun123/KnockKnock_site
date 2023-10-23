import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'KNOCK KNOCK API',
            version: '1.0.0',
            description: 'a Rest api using swagger and express.',
        },
        servers: [
            {
                url: 'http://localhost:5001',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                BearerAuth: [],
            },
        ],
    },
    apis: ['src/routers/*.js', 'src/swagger/*'],
};

const specs = swaggerJSDoc(options);

export default specs;
