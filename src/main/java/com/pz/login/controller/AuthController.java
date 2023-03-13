package com.pz.login.controller;

import com.pz.login.dto.AuthResponseDTO;
import com.pz.login.dto.LoginDto;
import com.pz.login.dto.RegisterDto;
import com.pz.login.model.user.Role;
import com.pz.login.repository.RoleRepository;
import com.pz.login.repository.UserRepository;
import com.pz.login.security.CustomUserDetailsService;
import com.pz.login.security.JWTGenerator;
import com.pz.login.service.ConfirmationTokenService;
import org.hibernate.validator.internal.constraintvalidators.bv.EmailValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final JWTGenerator jwtGenerator;
    private final ConfirmationTokenService confirmationTokenService;
    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository,
                          RoleRepository roleRepository, JWTGenerator jwtGenerator, ConfirmationTokenService confirmationTokenService,
                          CustomUserDetailsService customUserDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtGenerator = jwtGenerator;
        this.confirmationTokenService = confirmationTokenService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDto loginDto) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginDto.getEmail(),
                        loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    @PostMapping("register")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
        if (userRepository.existsByEmail(registerDto.getEmail())) {
            return new ResponseEntity<>("This email is already taken!", HttpStatus.BAD_REQUEST);
        }
        if (userRepository.existsByUsername(registerDto.getUsername())) {
            return new ResponseEntity<>("This username is already taken!", HttpStatus.BAD_REQUEST);
        }
        EmailValidator emailValidator = new EmailValidator();
        if (!emailValidator.isValid(registerDto.getEmail(), null)) {
            return new ResponseEntity<>("This email is not valid!", HttpStatus.BAD_REQUEST);
        }

        Role role = roleRepository.findByName("ARTIST").orElseThrow(() -> new RuntimeException("Role not found"));
        customUserDetailsService.register(registerDto, role);

        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    @GetMapping(path = "confirm")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        return new ResponseEntity<>(confirmationTokenService.confirmToken(token), HttpStatus.OK);
    }
}
