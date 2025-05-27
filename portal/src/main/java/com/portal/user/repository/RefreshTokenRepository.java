package com.portal.user.repository;


import com.portal.user.Entities.RefreshToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RefreshTokenRepository extends MongoRepository<RefreshToken, String> {
    RefreshToken findByRefreshToken(String refreshToken);
    RefreshToken findByUserEmail(String userEmail);
}
