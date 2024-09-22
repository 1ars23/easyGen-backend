// swagger-responses.ts
import {
    ApiResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
  } from '@nestjs/swagger';
  
  // Define Swagger documentation
  export const LogoutApiResponse = ApiResponse({
    status: 200,
    description: 'Logout Success',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string', example: 'Logout Successfully' },
        },
        body: {
          type: 'object',
          properties: {},
        },
      },
    },
  });
  
  export const LogoutApiBadRequestResponse = ApiBadRequestResponse({
    description: 'Error message if Logout fails',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'array',
          items: { type: 'string', example: 'Invalid Auth' },
        },
        body: { type: 'object' },
      },
    },
  });
  
  export const LogoutApiInternalServerErrorResponse =
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
  