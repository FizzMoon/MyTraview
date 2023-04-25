package com.mamoorie.mytraview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mamoorie.mytraview.entity.Heart;

@Repository
public interface HeartRespository extends JpaRepository<Heart, Integer> {
	
	List<Heart> findAllByEmail(String email);
	List<Heart> findAllByArticleId(Integer articleId);
	Heart findByArticleIdAndEmail(Integer articleId, String email);
	void deleteByArticleIdAndEmail(Integer articleId, String email);
}
