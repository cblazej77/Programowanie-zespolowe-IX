package com.pz.designmatch.controller;

import com.pz.designmatch.dto.response.UserResponse;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import com.pz.designmatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

import static com.pz.designmatch.constants.Constants.apiVersionAccept;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    public UserProfileController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/getUserById", produces = apiVersionAccept)
    public ResponseEntity<UserResponse> getAllUsers() {
        Optional<UserEntity> user = userRepository.findById(2L);
        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User not found");
        }
        UserResponse userResponse = mapUserEntityToDto(user.get());
        return ResponseEntity.ok(userResponse);
    }

    @GetMapping(value = "/getAllUsernames", produces = apiVersionAccept)
    public ResponseEntity<List<String>> getAllUsernames() {
        List<String> usernames = userService.getAllUsernames();
        return ResponseEntity.ok(usernames);
    }

    private UserResponse mapUserEntityToDto(UserEntity userEntity) {
        return new UserResponse(
                userEntity.getEmail(),
                userEntity.getUsername());
    }

}
