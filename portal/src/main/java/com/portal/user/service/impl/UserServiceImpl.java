package com.portal.user.service.impl;

import com.mongodb.DuplicateKeyException;
import com.portal.Role;
import com.portal.user.Entities.RefreshToken;
import com.portal.user.Entities.User;
import com.portal.user.models.JwtRequest;
import com.portal.user.models.JwtResponse;
import com.portal.user.repository.UserRepository;
import com.portal.user.security.JwtHelper;
import com.portal.user.service.RefreshTokenService;
import com.portal.user.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;
import java.util.TreeSet;

@Service
public class UserServiceImpl implements UserService {

    Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    private final PasswordEncoder passwordEncoder;
    private final JwtHelper jwtHelper;
    private final RefreshTokenService refreshTokenService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public UserServiceImpl(
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtHelper jwtHelper,
            UserRepository userRepository,
            RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
        this.jwtHelper = jwtHelper;
        this.userRepository = userRepository;
    }

    private boolean isRefreshTokenValid(RefreshToken refreshToken) {
        return refreshToken != null && refreshToken.getExpireMs().isAfter(Instant.now());
    }

    private JwtResponse generateTokens(User user) {
        RefreshToken refreshToken = user.getRefreshToken();

        if (!isRefreshTokenValid(refreshToken)) {
            return null;
        }

        String accessToken = jwtHelper.generateTokenFromUsername(user.getUsername());

        return JwtResponse.builder()
                .username(user.getEmail())
                .jwtToken(accessToken)
                .refreshToken(refreshToken.getRefreshToken())
                .build();
    }

    private Boolean isHr(String email) {
        Set<String> emailSet = new TreeSet<>();
        emailSet.add("keshav.iesbpl@gmail.com");
        emailSet.add("iamayush891@gmail.com");
        emailSet.add("ommohangaur029@gmail.com");
        emailSet.add("mdjunaid8352@gmail.com");
        emailSet.add("ravirajvishwakarma76321@gmail.com");
        return emailSet.contains(email);
    }

    @Override
    public ResponseEntity<JwtResponse> createUser(User user) {
        User existing = userRepository.findByEmail(user.getEmail());
        if (existing != null) {
            throw new IllegalStateException("User already exists with this email");
        }

        try {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole(isHr(user.getEmail()) ? Role.HR : Role.APPLICANT);
            user.setCreatedAt(LocalDateTime.now());

            RefreshToken refreshToken = refreshTokenService.createToken(user.getEmail()).getBody();
            user.setRefreshToken(refreshToken);

            userRepository.save(user);

            JwtResponse jwtResponse = generateTokens(user);
            return ResponseEntity.ok(jwtResponse);
        } catch (DuplicateKeyException e) {
            throw new IllegalStateException("User with this email already exists");
        } catch (Exception e) {
            throw new RuntimeException("Could not create user, please try again");
        }
    }

    @Override
    public ResponseEntity<JwtResponse> loginUser(JwtRequest request) {
        User user = authenticate(request);

        if (user != null && passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            RefreshToken refreshToken = refreshTokenService.createToken(user.getEmail()).getBody();
            user.setRefreshToken(refreshToken);
            userRepository.save(user);

            JwtResponse jwtResponse = generateTokens(user);
            if (jwtResponse == null) return ResponseEntity.badRequest().body(null);
            return ResponseEntity.ok(jwtResponse);
        }

        return ResponseEntity.badRequest().body(null);
    }

    private User authenticate(JwtRequest input) {
        UsernamePasswordAuthenticationToken authentication =
                new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword());
        try {
            authenticationManager.authenticate(authentication);
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Invalid Username or Password!!");
        }

        return userRepository.findByEmail(input.getEmail());
    }

    @Override
    public ResponseEntity<User> getUser(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email))
                .map(user -> {
                    if (!isRefreshTokenValid(user.getRefreshToken())) {
                        ResponseEntity.status(401).build();
                    }
                    return ResponseEntity.ok(user);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @Override
    public ResponseEntity<String> updateUser(String email, User user) {
        return Optional.ofNullable(userRepository.findByEmail(email))
                .map(oldUser -> {
                    oldUser.setName(user.getName());
                    oldUser.setEmail(user.getEmail());
                    oldUser.setPassword(passwordEncoder.encode(user.getPassword()));

                    userRepository.save(oldUser);
                    return ResponseEntity.ok("User updated successfully");
                })
                .orElse(ResponseEntity.badRequest().body("User not found"));
    }

    @Override
    public ResponseEntity<String> deleteUser(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email))
                .map(user -> {
                    userRepository.delete(user);
                    return ResponseEntity.ok("User deleted successfully");
                })
                .orElse(ResponseEntity.badRequest().body("User not found"));
    }
}
