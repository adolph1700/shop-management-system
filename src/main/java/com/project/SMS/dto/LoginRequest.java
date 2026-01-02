package com.project.SMS.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    private String identifier;
    private String password;
}