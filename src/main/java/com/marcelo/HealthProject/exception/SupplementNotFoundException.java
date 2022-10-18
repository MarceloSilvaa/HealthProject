package com.marcelo.HealthProject.exception;

public class SupplementNotFoundException extends RuntimeException {
	
	public SupplementNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}

	public SupplementNotFoundException(String message) {
		super(message);
	}

	public SupplementNotFoundException(Throwable cause) {
		super(cause);
	}
	
}
