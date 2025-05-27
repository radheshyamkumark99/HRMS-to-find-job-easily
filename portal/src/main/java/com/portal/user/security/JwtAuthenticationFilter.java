package com.portal.user.security;

import com.portal.user.security.JwtHelper;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtHelper jwtHelper;

    Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String path = request.getServletPath();

        // Skip JWT validation for auth-related endpoints and file upload
        if (path.equals("/api/v1/auth/signup") || path.equals("/api/v1/auth/signin") || path.equals("/proxy/putObject")) {
            logger.info("Skipping JWT validation for path: " + path);
            filterChain.doFilter(request, response);
            return;
        }

        // Handle preflight OPTIONS requests for CORS
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            logger.info("Handling preflight OPTIONS request");
            response.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins or set specific domains (e.g., localhost and vercel)
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type, Accept");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        // Process Authorization Header
        String requestHeader = request.getHeader("Authorization");
        String username = null;
        String token = null;

        if (requestHeader != null && requestHeader.startsWith("Bearer ")) {
            token = requestHeader.substring(7);
            try {
                username = this.jwtHelper.getUsernameFromToken(token);
            } catch (IllegalArgumentException e) {
                logger.error("Illegal Argument while fetching the username", e);
            } catch (ExpiredJwtException e) {
                logger.error("JWT token has expired", e);
            } catch (MalformedJwtException e) {
                logger.error("Invalid JWT token", e);
            } catch (Exception e) {
                logger.error("Unexpected error while processing JWT", e);
            }
        } else {
            logger.warn("Invalid or missing Authorization header");
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // Fetch user details from username
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
            boolean validateToken = this.jwtHelper.validateToken(token);
            if (validateToken) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                logger.warn("JWT validation failed for username: " + username);
            }
        }

        filterChain.doFilter(request, response);
    }
}
