package com.project.SMS.repository;

import com.project.SMS.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    Optional<User> findByPhoneNumber(String phoneNumber);

    @Query("SELECT u FROM User u WHERE u.username = :identifier OR u.email = :identifier OR u.phoneNumber = :phoneNumber")
    Optional<User> findByUsernameOrEmailOrPhoneNumber(@Param("identifier") String identifier,
                                                      @Param("phoneNumber") Long phoneNumber);
}