package com.portal.user.service;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface RefreshTokenService {
    ResponseEntity<com.portal.user.Entities.RefreshToken> createToken(String email);
    ResponseEntity<Boolean> tokenIsValid(String refreshToken);
    ResponseEntity<?> refreshJwtToken(String refreshToken);
}
