package com.pz.designmatch.security;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

public class FBAuth implements OAuth2User {
    private OAuth2User oAuth2User;
    public FBAuth(OAuth2User oAuth2User){
        this.oAuth2User = oAuth2User;
    }

    @Override
    public Map<String, Object> getAttributes(){
        return oAuth2User.getAttributes();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){
        return oAuth2User.getAuthorities();
    }

    @Override
    public String getName() {
        System.out.println(oAuth2User.<String>getAttribute("email"));
        return oAuth2User.getAttribute("name");
    }

    public String getEmail() {
        return oAuth2User.<String>getAttribute("email");
    }

}
