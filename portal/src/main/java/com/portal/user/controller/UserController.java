package com.portal.user.controller;


import com.portal.user.Entities.User;
import com.portal.user.models.JwtRequest;
import com.portal.user.models.JwtResponse;
import com.portal.user.models.RefreshTokenRequest;
import com.portal.user.service.RefreshTokenService;
import com.portal.user.service.UserService;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;


    private final RefreshTokenService refreshTokenService;

    public UserController(UserService userService,RefreshTokenService refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
        this.userService = userService;
    }
    // Other controller methods...

    @GetMapping("/users/{email}")
    public ResponseEntity<User> getUser(@PathVariable String email) {
        return userService.getUser(email);
    }


    @PostMapping("/auth/signup")
    public ResponseEntity<?> signUp(@RequestBody User user) {
        try {
            User existingUser = userService.getUser(user.getEmail()).getBody();
            if (existingUser != null) {
                return ResponseEntity.badRequest().body("User already exists, please login");
            }
        } catch (IncorrectResultSizeDataAccessException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Multiple users found with same email. Please contact support.");
        }
        return userService.createUser(user);
    }


    @PostMapping("/auth/signin")
    public ResponseEntity<JwtResponse> signIn(@RequestBody JwtRequest request) {
        return userService.loginUser(request);
    }

    @PostMapping("/auth/refresh-jwt")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest request) {
        return this.refreshTokenService.refreshJwtToken(request.getToken());
    }


    @PutMapping("/users/{email}")
    public ResponseEntity<String> updateUser(@PathVariable String email, @RequestBody User user) {
        return userService.updateUser(email, user);
    }

    @DeleteMapping("/users/{email}")
    public ResponseEntity<String> deleteUser(@PathVariable String email) {
        return userService.deleteUser(email);
    }
}
