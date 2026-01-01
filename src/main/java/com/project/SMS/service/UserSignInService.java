package com.project.SMS.service;

import com.project.SMS.entity.User;
import com.project.SMS.exception.UserAlreadyExistsException;
import com.project.SMS.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserSignInService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    public UserSignInService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signUp(User user)
    {
        if(userRepository.findByUsername(user.getUsername()).isPresent())
        {
            throw new UserAlreadyExistsException("Username already exists: "+user.getUsername());
        }
        if (userRepository.findByPhoneNumber(user.getPhoneNumber()).isPresent()) {
            throw new UserAlreadyExistsException("Phone number already exists: "+user.getPhoneNumber());
        }
        if(userRepository.findByEmail(user.getEmail()).isPresent())
        {
            throw new UserAlreadyExistsException("Email id already exists: "+user.getEmail());
        }
        user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        user.setActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }

}
