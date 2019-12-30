import * as SwaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat app',
      version: '1.0.0'
    },
    tags: [
      {
        name: 'Users',
        description: 'Everything about user auth'
      }
    ]
  },
  apis: ['**/*.ts']
};

const swaggerSpec = SwaggerJsDoc(options);

export default swaggerSpec;
