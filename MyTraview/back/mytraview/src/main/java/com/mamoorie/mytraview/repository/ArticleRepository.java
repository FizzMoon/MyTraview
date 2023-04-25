package com.mamoorie.mytraview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mamoorie.mytraview.entity.Article;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Integer> {
	
	List<Article> findByPlacesCategory(String category);
	
	List<Article> findByPlacesAreaCodeAndPlacesCategory(String areaCode, String category);
	
	List<Article> findByPlacesMapXAndPlacesMapYAndPlacesPlaceName(Double mapX, Double mapY, String placeName);

	List<Article> findAllByWriter(String writer);
	
	List<Article> findAllByPlacesAreaCode(String code);
	
	//jpql은 엔티티의 필드명으로 접근
    //@Query(value="SELECT a FROM Article a left join Place p on a.id=p.article.id where p.areaCode=?1")
	//native query는 실제 db에 등록된 컬럼명으로 접근해야함.
	@Query(value="select * from article a left join place p on a.article_id = p.article_article_id where p.place_area_code= :code", nativeQuery = true)
	List<Article> findAllByPlaces(@Param("code") String code);
}