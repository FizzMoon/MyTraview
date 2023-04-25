package com.mamoorie.mytraview.service;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.mamoorie.mytraview.entity.User;
import com.mamoorie.mytraview.preferences.jwt.JwtTokenProvider;
import com.mamoorie.mytraview.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.mamoorie.mytraview.entity.User;
import com.mamoorie.mytraview.preferences.jwt.JwtTokenProvider;
import com.mamoorie.mytraview.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    private final JwtTokenProvider jwtTokenProvider;
    
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User saveUser(User newUser){
        return userRepository.save(newUser);
    }

    public List<User> findAllUser() {
        return userRepository.findAll();
    }

    public User findUser(String email) {
        return userRepository.findByEmail(email);
    }

    public User LoginUser(User.Request request){
        return userRepository.findByEmail(request.getEmail());
    }
    
    private void validation(final User user) {

        if (user == null) {

            throw new RuntimeException("user는 null 허용 불가");
        }

    };

    public User update(String email, User.Request req){
    	final User user = userRepository.findByEmail(email);
        validation(user);
        user.setPw(passwordEncoder.encode(req.getPw()));
        user.setName(req.getName());
        user.setPhone(req.getPhone());
//        user.setRole(req.getRole());
        User updatedUser = userRepository.save(user);
        return updatedUser;
    }



    public void delete(final String email) {

        User findUser = userRepository.findByEmail(email);

        try {

            userRepository.delete(findUser);

        } catch (Exception e) {

            log.error("User 삭제 중 에러 발생.", e);

            throw new RuntimeException("삭제 중 에러 발생" + email);
        }

    }

    public User getByCredentials(final String email, final String password, final PasswordEncoder encoder) {
		final User originalUser = userRepository.findByEmail(email);
		
		// matches 메서드를 이용해 패스워드가 같은지 확인
		if(originalUser != null && encoder.matches(password, originalUser.getPw())) {
			return originalUser;
		}
		return null;
		
	}


    public String parseBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
