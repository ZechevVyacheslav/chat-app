import * as SwaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat app',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    tags: [
      {
        name: 'User',
        description: 'Everything about user auth'
      },
      {
        name: 'Admin',
        description: 'Everything about administraining'
      },
      {
        name: 'Room',
        description: 'Everything about rooms and messages'
      }
    ]
  },
  apis: ['**/*.ts']
};

const swaggerSpec = SwaggerJsDoc(options);

export default swaggerSpec;
