package com.portal.user.service.impl;

import com.portal.user.Entities.RefreshToken;
import com.portal.user.Entities.User;
import com.portal.user.models.JwtResponse;
import com.portal.user.repository.RefreshTokenRepository;
import com.portal.user.repository.UserRepository;
import com.portal.user.security.JwtHelper;
import com.portal.user.service.RefreshTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {
    Logger logger = LoggerFactory.getLogger(RefreshTokenServiceImpl.class);

    private final int refreshTokenValidity = 7 * 24 * 60 * 60;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UserRepository userRepository;
    private final JwtHelper jwtHelper;

    public RefreshTokenServiceImpl(
            RefreshTokenRepository refreshTokenRepository,
            UserRepository userRepository,
            JwtHelper jwtHelper
    ) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.userRepository = userRepository;
        this.jwtHelper = jwtHelper;
    }

    @Override
    public ResponseEntity<RefreshToken> createToken(String email) {
        try {
            RefreshToken refreshToken = RefreshToken.builder()
                    .userEmail(email)
                    .refreshToken(UUID.randomUUID().toString())
                    .expireMs(Instant.now().plusSeconds(refreshTokenValidity))
                    .build();

            RefreshToken oldToken = refreshTokenRepository.findByUserEmail(email);
            if (oldToken != null) {
                oldToken.setRefreshToken(refreshToken.getRefreshToken());
                oldToken.setExpireMs(refreshToken.getExpireMs());
                return ResponseEntity.ok(refreshTokenRepository.save(oldToken));
            }

            return ResponseEntity.ok(refreshTokenRepository.save(refreshToken));
        } catch (Exception e) {
            throw new RuntimeException("Error creating refresh token: " + e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Boolean> tokenIsValid(String refreshToken) {
        return Optional.ofNullable(refreshTokenRepository.findByRefreshToken(refreshToken))
                .map(token -> {
                    logger.info("Token expiry: {}", token.getExpireMs());
                    boolean isValid = token.getExpireMs().isAfter(Instant.now());
                    if (!isValid) {
                        refreshTokenRepository.delete(token);
                    }
                    return ResponseEntity.ok(isValid);
                })
                .orElse(ResponseEntity.badRequest().body(Boolean.FALSE));
    }

    @Override
    public ResponseEntity<?> refreshJwtToken(String refreshToken) {
        Boolean isValid = tokenIsValid(refreshToken).getBody();
        if (isValid == null || !isValid) {
            return ResponseEntity.badRequest().body("Invalid refresh token");
        }

        RefreshToken oldToken = refreshTokenRepository.findByRefreshToken(refreshToken);
        if (oldToken == null) {
            return ResponseEntity.badRequest().body("Refresh token not found");
        }

        String userEmail = oldToken.getUserEmail();

        // Generate new refresh token
        String newToken = UUID.randomUUID().toString();
        Instant newExpiry = Instant.now().plusSeconds(refreshTokenValidity);

        oldToken.setRefreshToken(newToken);
        oldToken.setExpireMs(newExpiry);
        refreshTokenRepository.save(oldToken);

        // Update User entity
        User user = userRepository.findByEmail(userEmail);
        if (user != null) {
            user.setRefreshToken(oldToken);
            userRepository.save(user);
        }

        String newAccessToken = jwtHelper.generateTokenFromUsername(userEmail);

        JwtResponse jwtResponse = JwtResponse.builder()
                .refreshToken(newToken)
                .jwtToken(newAccessToken)
                .username(userEmail)
                .build();

        return ResponseEntity.ok(jwtResponse);
    }
}
