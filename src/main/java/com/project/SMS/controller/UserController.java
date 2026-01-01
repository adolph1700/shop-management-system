package com.project.SMS.controller;

import com.project.SMS.dto.ApiResponse;
import com.project.SMS.entity.User;
import com.project.SMS.service.UserSignInService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public UserSignInService userSignInService;
    public UserController(UserSignInService userSignInService) {
        this.userSignInService = userSignInService;
    }
    @PostMapping("/user/signup")
    public ResponseEntity<ApiResponse> signUp(@RequestBody User user) {
        userSignInService.signUp(user);
        ApiResponse apiResponse= new ApiResponse(
                "Your account has been created successfully. Please proceed to sign in.",
                HttpStatus.CREATED.value());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }
}
