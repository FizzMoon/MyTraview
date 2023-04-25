package com.mamoorie.mytraview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mamoorie.mytraview.entity.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer>{
	
	
	List<Comment> findAllByArticleId(Integer id); // ArticleId에 해당하는 전체 댓글조회
	
	List<Comment> findAllByWriter(String name); // 해당 클라이언트의 모든 댓글 조회
}
