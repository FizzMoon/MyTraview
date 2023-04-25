package com.mamoorie.mytraview.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mamoorie.mytraview.entity.Article;
import com.mamoorie.mytraview.entity.Heart;
import com.mamoorie.mytraview.entity.User;
import com.mamoorie.mytraview.repository.ArticleRepository;
import com.mamoorie.mytraview.repository.HeartRespository;
import com.mamoorie.mytraview.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class HeartService {
	
	private final HeartRespository heartRespository;
	
	private final UserRepository userRepository;
	
	private final ArticleRepository articleRepository;
	
	//좋아요 On
	public Heart onHeart(Heart.Request req, String email) {
		
		Heart oneHeart = Heart.Request.toEntity(req);
		
		User findUser = userRepository.findByEmail(email);
		
		Article findArticle = articleRepository.findById(req.getArticleId()).get();
		
		oneHeart.setUser(findUser);
		
		oneHeart.setArticle(findArticle);
		
		oneHeart.setEmail(findUser.getEmail());
		
		heartRespository.save(oneHeart);
			
		return oneHeart;
	}
	
	//좋아요 Off
	public List<?> offHeart(Heart.Request req, String email) {
		
		Heart oneHeart = Heart.Request.toEntity(req);
		
		heartRespository.deleteByArticleIdAndEmail(oneHeart.getArticleId(), email);;
		
		return heartRespository.findAll();
	}
	
	//유저가 좋아요 누른 글들 확인
	public List<Heart> viewUserHeart(String email){
		
		return heartRespository.findAllByEmail(email);
	}
	
	//한 게시글의 좋아요(좋아요 누른 수 확인용)
	public List<Heart> viewAllByArticleId(Integer articleId){
		
		return heartRespository.findAllByArticleId(articleId);
	}
	
	//게시글 좋아요 유지되는 용으로 쓰임
	public Heart viewByArticleIdAndEmail(String email, Integer articleId) {
		
		return heartRespository.findByArticleIdAndEmail(articleId, email);
	}
	
	//테스트용(등록된 모든 좋아요 확인)
	public List<Heart> viewAll(){
		return heartRespository.findAll();
	}

}
