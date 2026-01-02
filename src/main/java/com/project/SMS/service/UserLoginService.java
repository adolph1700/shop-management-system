package com.project.SMS.service;

import com.project.SMS.entity.User;
import com.project.SMS.exception.IncorrectPasswordException;
import com.project.SMS.exception.UserNotFoundException;
import com.project.SMS.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserLoginService {
    private final UserRepository userRepository;
    private BCryptPasswordEncoder passwordEncoder;


    public UserLoginService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User login(String identifier, String password) {
        User user;

        Long phoneNumber = null;
        try {
            phoneNumber = Long.parseLong(identifier);
        } catch (NumberFormatException ignored) {
            // Not a number, leave phoneNumber null
        }

        user = userRepository.findByUsernameOrEmailOrPhoneNumber(identifier, phoneNumber)
                .orElseThrow(() -> new UserNotFoundException("Invalid username/email/phone or password"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new IncorrectPasswordException("Invalid password");
        }

        return user;
    }
}
