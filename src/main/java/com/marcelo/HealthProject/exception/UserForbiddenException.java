package com.marcelo.HealthProject.exception;

public class UserForbiddenException extends RuntimeException {

	public UserForbiddenException(String message, Throwable cause) {
		super(message, cause);
	}

	public UserForbiddenException(String message) {
		super(message);
	}

	public UserForbiddenException(Throwable cause) {
		super(cause);
	}
	
}
