package com.pz.designmatch.util;

import com.pz.designmatch.model.user.Role;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class CommonUtils {

    public static List<SimpleGrantedAuthority> buildSimpleGrantedAuthorities(final Set<Role> userRoles) {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Role userRole : userRoles) {
            authorities.add(new SimpleGrantedAuthority(userRole.getName()));
        }
        return authorities;
    }
}
