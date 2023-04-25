package com.mamoorie.mytraview.controller;


import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import com.mamoorie.mytraview.entity.Article;
import com.mamoorie.mytraview.entity.Heart;
import com.mamoorie.mytraview.service.ArticleService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mamoorie.mytraview.entity.User;
import com.mamoorie.mytraview.preferences.jwt.JwtTokenProvider;
import com.mamoorie.mytraview.repository.UserRepository;
import com.mamoorie.mytraview.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@RestController
@RequiredArgsConstructor
@RequestMapping("user")
@Slf4j
public class UserController {

    private final JwtTokenProvider jwtTokenProvider;

    private final UserService userService;

    private final UserRepository userRepository;

    private final ArticleService articleService;

    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @GetMapping("/duplicate")
    public ResponseEntity<?> checkDuplicateEmail(@RequestParam String email) {

        log.warn("중복 이메일 확인 중:" + email);

        if (userRepository.existsByEmail(email)) {

            log.warn("checkDuplicatedEmail message: 이미 회원이 존재합니다.");

            return ResponseEntity.badRequest().body(User.Response.builder().resMessage("해당 이메일이 이미 존재합니다.").build());
        }
        return ResponseEntity.ok().body(User.Response.builder().resMessage("해당 이메일은 사용 가능합니다.").build());
    }

    @GetMapping
    public ResponseEntity<?> findUser(@AuthenticationPrincipal String email) {
    	
    	if (userRepository.existsByEmail(email)) {
    		User user = userService.findUser(email);
    		
    		User.Response searchUser = User.Response.toResponse(user);
    		
    		return ResponseEntity.ok().body(searchUser);
    	} else {
    		return ResponseEntity.badRequest().body(User.Response.builder().resMessage("전송에 실패하였습니다.").build());
    	}
    	
    }

    @GetMapping("/all-users")
    public List<User.Response> findAllUser() {

    	List<User> users = userService.findAllUser();

        List<User.Response> response = User.Response.toResponseList(users);

        return response;
    }



    @PostMapping("/join")
    public ResponseEntity<?> saveUser(@Valid @RequestBody User.Request req) {

        try {

            User user = User.Request.toEntity(req);

            user.setPw(passwordEncoder.encode(req.getPw()));

            User savedUser = userService.saveUser(user);

            User.Response response = User.Response.toResponse(savedUser);

            return ResponseEntity.ok().body(response);

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(User.Response.builder().resMessage("잘못된 요청입니다. 다시 한 번 확인해주세요.").build());

        }

    }


    @PostMapping("/login")
    public ResponseEntity<User.Response> LoginUser(@RequestBody User.Request req) {
        
        User user = userService.getByCredentials(req.getEmail(), req.getPw(), passwordEncoder);

        String token = jwtTokenProvider.makeJwtToken(user);

        log.warn(user.toString());

        User.Response responseData = User.Response.toResponse(user);

        responseData.setToken(token);

        return ResponseEntity.ok().body(responseData);
    }
    
    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User.Request req, @AuthenticationPrincipal String email) {

        if (userRepository.existsByEmail(email)) {

            User user = userService.update(email, req);

            User.Response res = User.Response.toResponse(user);

            return ResponseEntity.ok().body(res);

        } else {

            return ResponseEntity.badRequest().body(User.Response.builder().resMessage("잘못된 요청입니다. 다시 한 번 확인해주세요.").build());

        }
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<?> deleteUser(@AuthenticationPrincipal String email) {

    	if (userRepository.existsByEmail(email)) {
            try {
                userService.delete(email);


                return ResponseEntity.ok().body(User.Response.builder().resMessage("회원탈퇴가 완료 되었습니다."));

            } catch (Exception e) {

                String err = e.getMessage();

                User.Response res = User.Response.builder().resMessage(err).build();

                return ResponseEntity.badRequest().body(res);
            }
        } else {

            return ResponseEntity.badRequest().body(User.Response.builder().resMessage("해당 요청을 완료하지 못했습니다.").build());


        }
    }

    @GetMapping("/articles")
    public ResponseEntity<?> viewAllByWritten(@AuthenticationPrincipal String email){

        User findUser = userService.findUser(email);

        List<Article> findAllArticle = findUser.getArticles();

        List<Article.Response> res = Article.Response.toResponseList(findAllArticle);

        if(res == null){
            return ResponseEntity.ok().body(Article.Response.builder().resMessage("작성한 게시글이 존재하지 않습니다.").build());
        }

        return ResponseEntity.ok().body(res);
    }

    @GetMapping("/hearts")
    public ResponseEntity<?> viewAllHeartByUser(@AuthenticationPrincipal String email){

        User findUser = userService.findUser(email);

        if(findUser.getHearts() == null) {
            return ResponseEntity.ok().body(Heart.Response.builder().email("좋아요를 누른 리뷰가 없습니다.").build());
        }

        List<Heart> findHeart = findUser.getHearts();

        List<Integer> onHeartIndex = new ArrayList<>();

        for(int i=0; i< findHeart.size(); i++){

        	onHeartIndex.add(findHeart.get(i).getArticleId());

        }

        List<Article> findArticle = new ArrayList<>();

        for (int i = 0; i < onHeartIndex.size(); i++) {

            Article getArticle = articleService.findArticle(onHeartIndex.get(i));

            findArticle.add(getArticle);
        }

        List<Article.Response> res = Article.Response.toResponseList(findArticle);

        return ResponseEntity.ok().body(res);

    }


}