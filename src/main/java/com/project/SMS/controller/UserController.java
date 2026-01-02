package com.project.SMS.controller;

import com.project.SMS.dto.ApiResponse;
import com.project.SMS.dto.LoginRequest;
import com.project.SMS.entity.User;
import com.project.SMS.service.UserLoginService;
import com.project.SMS.service.UserSignUpService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    public final UserSignUpService userSignUpService;
    public final UserLoginService userLoginService;
    public UserController(UserSignUpService userSignUpService, UserLoginService userLoginService) {
        this.userLoginService = userLoginService;
        this.userSignUpService = userSignUpService;
    }
    @PostMapping("/user/signup")
    public ResponseEntity<ApiResponse> signUp(@RequestBody User user) {
        userSignUpService.signUp(user);
        ApiResponse apiResponse= new ApiResponse(
                "Your account has been created successfully. Please proceed to sign in.",
                HttpStatus.CREATED.value());

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(apiResponse);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userLoginService.login(loginRequest.getIdentifier(), loginRequest.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body("Login Success!!");
    }


}
