/* eslint-disable prettier/prettier */
import {
    ExceptionFilter, // Base interface for custom exception filters
    Catch, // Decorator to bind this filter to specific exceptions
    ArgumentsHost, // Provides details about the current execution context
    HttpException, // Base class for HTTP exceptions
    HttpStatus, // Enum for common HTTP status codes
  } from '@nestjs/common';
  
  @Catch() // Catch all exceptions (default behavior when no specific exception is provided)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp(); // Switches context to HTTP (useful in a web app)
      const response = ctx.getResponse(); // Get the response object to send back a response
      const status =
        exception instanceof HttpException
          ? exception.getStatus() // Use the exception's status if it's an HttpException
          : HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 for unknown exceptions
  
      const message =
        exception instanceof HttpException
          ? exception.getResponse() // Use the exception's response if it's an HttpException
          : 'Internal server error'; // Default error message for unknown exceptions
  
      // Return a standardized error response
      response.status(status).json({
        statusCode: status, // HTTP status code
        message: message, // Error message
        timestamp: new Date().toISOString(), // Timestamp of the error
      });
    }
  }
  