package com.mamoorie.mytraview.entity;


import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "USER_INFO")
public class User {
	
	@Id
    @Column(name = "USER_EMAIL", length = 100)
    @Email
    private String email;

    @Column(name = "USER_PASSWORD", length = 100, nullable = false)
    private String pw;

    @Column(name = "USER_TOKEN")
    private String token;

    @Column(name = "USER_NAME")
    private String name;

    @Column(name = "USER_PHONE")
    private String phone;

    @Column(name = "USER_PROFILE_IMG")
    private String profileImg;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference(value =  "user-article")
    private List<Article> articles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference(value =  "user-comment")
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	@JsonManagedReference(value =  "user-heart")
    private List<Heart> hearts;

    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Request {

    	private String email;
        private String pw;
        private String token;
        private String name;
        private String phone;
        private String profileImg;
        private List<Article> articles;
        private List<Comment> comments;
        private List<Heart> hearts;

	    public static User toEntity(final Request request) {
	        return User.builder()
	        		.email(request.getEmail())
	        		.pw(request.getPw())
	                .articles(request.getArticles())
	                .comments(request.getComments())
	                .phone(request.getPhone())
	                .name(request.getName())
	                .profileImg(request.getProfileImg())
	                .hearts(request.getHearts())
	                .token(request.getToken())
	                .build();
	    }

    }
    
    @Setter
    @Getter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @ToString
    public static class Response {
    	
    	private String email;
        private String token;
        private String name;
        private String phone;
        private String profileImg;
        private List<Article> articles;
        private List<Comment> comments;
        private List<Heart> hearts;

        private String resMessage;
        
	    public static User.Response toResponse(final User user) {
	        return Response.builder()
	        		.email(user.getEmail())
	                .token(user.getToken())
	        		.name(user.getName())
	        		.phone(user.getPhone())
	        		.profileImg(user.getProfileImg())
	        		.articles(user.getArticles())
	        		.comments(user.getComments())
	        		.hearts(user.getHearts())
	                .build();
	    }
	
	    public static List<Response> toResponseList(final List<User> users) {
	        List<Response> list = new ArrayList<>();
	        for (User user : users) {
	            list.add(toResponse(user));
	        }
	        return list;
	    }
    }

}
