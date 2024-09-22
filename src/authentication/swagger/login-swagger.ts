// swagger-responses.ts
import {
    ApiResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger';
  
  // Define Swagger documentation
  export const LoginApiResponse = ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string', example: 'Login Successfully' },
        },
        body: {
          type: 'object',
          properties: {
            access_token: { type: 'string', example: 'example_access_token' },
          },
        },
      },
    },
  });
  
  export const LoginApiBadRequestResponse = ApiBadRequestResponse({
    description: 'Error message if Login fails',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string', example: 'Email or password is wrong' },
        },
        body: { type: 'object' },
      },
    },
  });
  
  export const LoginApiInternalServerErrorResponse =
    ApiInternalServerErrorResponse({
      description: 'Unexpected error happened',
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'array',
            items: {
              type: 'string',
              example:
                'unexpected error happened. Please contact support with Error ID 1234567890123-a98as7f9',
            },
          },
          body: {
            type: 'object',
            properties: {
              error_id: { type: 'string', example: '1234567890123-a98as7f9' },
            },
          },
        },
      },
    });
  