package com.marcelo.HealthProject.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class UserRestExceptionHandler {
	
	// handler for user not found exception
	@ExceptionHandler
	public ResponseEntity<UserErrorResponse> handleException(UserNotFoundException exc) {
		
		UserErrorResponse error = new UserErrorResponse();
		
		error.setStatus(HttpStatus.NOT_FOUND.value());
		error.setError(HttpStatus.valueOf(error.getStatus()).getReasonPhrase());
		error.setMessage(exc.getMessage());
		error.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
	
	// handler for supplement not found exception
	@ExceptionHandler
	public ResponseEntity<UserErrorResponse> handleException(SupplementNotFoundException exc) {
		
		UserErrorResponse error = new UserErrorResponse();
		
		error.setStatus(HttpStatus.NOT_FOUND.value());
		error.setError(HttpStatus.valueOf(error.getStatus()).getReasonPhrase());
		error.setMessage(exc.getMessage());
		error.setTimeStamp(System.currentTimeMillis());

		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}
	
	// generic exception handler to catch any exception (catch all)
	@ExceptionHandler
	public ResponseEntity<UserErrorResponse> handleException(Exception exc) {
		
		UserErrorResponse error = new UserErrorResponse();
		
		error.setStatus(HttpStatus.BAD_REQUEST.value());
		error.setError(HttpStatus.valueOf(error.getStatus()).getReasonPhrase());
		error.setMessage(exc.getMessage());
		error.setTimeStamp(System.currentTimeMillis());
				
		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}
	
}
