// swagger-responses.ts
import {
    ApiResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger';
  
  // Define Swagger documentation
  export const RegisterApiResponse = ApiResponse({
    status: 200,
    description: 'Register successful',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string', example: 'Register Successfully' },
        },
        body: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@gmail.com' },
            user_name: { type: 'string', example: 'Bruce Wayne' },
            password: { type: 'string', example: 'Password123!@#' },
          },
        },
      },
    },
  });
  
  export const RegisterApiBadRequestResponse = ApiBadRequestResponse({
    description: 'Error message if Register fails',
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
  
  export const RegisterApiInternalServerErrorResponse =
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
  