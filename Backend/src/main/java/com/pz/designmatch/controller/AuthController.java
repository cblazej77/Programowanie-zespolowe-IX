package com.pz.designmatch.controller;

import com.pz.designmatch.dto.LocalUserDto;
import com.pz.designmatch.dto.request.ArtistRegisterRequest;
import com.pz.designmatch.dto.request.CompanyRegisterRequest;
import com.pz.designmatch.dto.request.LoginRequest;
import com.pz.designmatch.dto.request.RegisterRequest;
import com.pz.designmatch.dto.response.ApiResponse;
import com.pz.designmatch.dto.response.JwtAuthenticationResponse;
import com.pz.designmatch.exception.UserAlreadyExistAuthenticationException;
import com.pz.designmatch.service.ConfirmationTokenService;
import com.pz.designmatch.service.UserService;
import com.pz.designmatch.service.impl.ConfirmationTokenServiceImpl;
import jakarta.validation.ValidationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.stream.Collectors;

import static com.pz.designmatch.model.user.Role.ROLE_ARTIST;
import static com.pz.designmatch.model.user.Role.ROLE_COMPANY;

@Slf4j
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final JwtEncoder encoder;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final ConfirmationTokenService confirmationTokenService;

    public AuthController(JwtEncoder encoder, UserService userService, AuthenticationManager authenticationManager,
                          ConfirmationTokenServiceImpl confirmationTokenService) {
        this.encoder = encoder;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.confirmationTokenService = confirmationTokenService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken
                (loginRequest.getEmail(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        LocalUserDto localUser = (LocalUserDto) authentication.getPrincipal();
        String jwt = getToken(localUser);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/token")
    public ResponseEntity<?> getToken(Authentication authentication) {
        LocalUserDto localUser = (LocalUserDto) authentication.getPrincipal();
        String jwt = getToken(localUser);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }

    @PostMapping("/registerArtist")
    public ResponseEntity<?> registerArtist(@RequestBody ArtistRegisterRequest artistRegisterRequest) {
        return registerUser(artistRegisterRequest, ROLE_ARTIST);
    }

    @PostMapping("/registerCompany")
    public ResponseEntity<?> registerCompany(@RequestBody CompanyRegisterRequest companyRegisterRequest) {
        return registerUser(companyRegisterRequest, ROLE_COMPANY);
    }

    @GetMapping(path = "/confirmEmail")
    public ResponseEntity<String> confirm(@RequestParam("token") String token) {
        return new ResponseEntity<>(confirmationTokenService.confirmToken(token), HttpStatus.OK);
    }

    private ResponseEntity<?> registerUser(RegisterRequest registerRequest, String roleName) {
        try {
            userService.registerNewUser(registerRequest, roleName);
        } catch (UserAlreadyExistAuthenticationException | ValidationException e) {
            log.error("Exception Occurred", e);
            return new ResponseEntity<>(new ApiResponse(false, e.getMessage()), HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(new ApiResponse(true, "Pomyślnie zarejestrowano!"));
    }

    private String getToken(LocalUserDto localUser) {
        Instant now = Instant.now();
        long expiry = 36000L;
        String scope = localUser.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .expiresAt(now.plusSeconds(expiry))
                .subject(localUser.getUsername())
                .claim("scope", scope)
                .build();
        return this.encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
