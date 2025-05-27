package com.portal.user.service;


import com.portal.user.Entities.User;
import com.portal.user.models.JwtRequest;
import com.portal.user.models.JwtResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {
    ResponseEntity<User> getUser(String email);
    ResponseEntity<JwtResponse> createUser(User user);
    ResponseEntity<JwtResponse> loginUser(JwtRequest request);


    ResponseEntity<String> updateUser(String email, User user);
    ResponseEntity<String> deleteUser(String email);
}
