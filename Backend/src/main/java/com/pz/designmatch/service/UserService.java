package com.pz.designmatch.service;

import com.pz.designmatch.model.enums.Provider;
import com.pz.designmatch.model.user.UserEntity;
import com.pz.designmatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public void processOAuthPostLogin(String username){
        Optional<UserEntity> existUser = userRepository.findByUsername(username);
        if(existUser.isEmpty()){
            UserEntity newUser = new UserEntity();
            newUser.setUsername(username);
            newUser.setProvider(Provider.FACEBOOK);
            newUser.setEnabled(true);
            userRepository.save(newUser);
        }
    }
}
