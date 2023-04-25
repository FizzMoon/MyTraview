package com.mamoorie.mytraview.service;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.mamoorie.mytraview.entity.Article;
import com.mamoorie.mytraview.repository.ArticleRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleService {

	final private ArticleRepository articleRepository;

	public Article findArticle(Integer articleId) {
		return articleRepository.findById(articleId).get();
	}
	
	public List<Article> findAllArticles() {
		return articleRepository.findAll();
	}

	public List<Article> findByCategory(String category) {
		return articleRepository.findByPlacesCategory(category);
	}

	public List<Article> findByPlacesAreaCodeAndPlacesCategory(String areaCode, String category) {
		return articleRepository.findByPlacesAreaCodeAndPlacesCategory(areaCode, category);
	}

	public List<Article> findByPlacesMapXAndPlacesMapYAndPlacesPlaceName(Double mapX, Double mapY, String placeName) {
		return articleRepository.findByPlacesMapXAndPlacesMapYAndPlacesPlaceName(mapX, mapY, placeName);
	}

	public Article createArticle(Article newArticle) {
		return articleRepository.save(newArticle);
	}

	public Article update(Article articleEntity) {
		validation(articleEntity);

		final Article findArticle = articleRepository.findById(articleEntity.getId()).get();

		findArticle.setTitle(articleEntity.getTitle());

		findArticle.setContent(articleEntity.getContent());

		findArticle.setUploadDate(new SimpleDateFormat("yyyy/MM/dd").format(new Date()));

		articleRepository.save(findArticle);

		return articleRepository.findById(findArticle.getId()).get();
	}

	public List<Article> delete(Integer articleId) {

		Article findArticle = articleRepository.findById(articleId).get();

		articleRepository.delete(findArticle);

		return articleRepository.findAllByWriter(findArticle.getWriter());
	}

	private void validation(final Article articleEntity) {

		if (articleEntity == null) {

			log.warn("postEntity cannat be null");

			throw new RuntimeException("PostEntity는 null 허용 불가");
		}

	}
}