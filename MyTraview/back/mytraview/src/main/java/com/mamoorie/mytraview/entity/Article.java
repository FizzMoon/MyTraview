package com.mamoorie.mytraview.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@DynamicInsert
public class Article {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ARTICLE_ID")
	private Integer id;

	@Column(name = "ARTICLE_TITLE")
	private String title;
	
	@Column(name = "ARTICLE_CONTENT")
	private String content;

	@Column(name = "ARTICLE_UPLOAD_DATE")
	private String uploadDate;

	@Column(name = "ARTICLE_VIEW_COUNT")
	@ColumnDefault("0")
	private Integer viewCount;

	@Column(name = "ARTICLE_LIKED_COUNT")
	@ColumnDefault("0")
	private Integer likedCount;

	@Column(name = "ARTICLE_WRITER")
	private String writer;
	
	@OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
	@JsonManagedReference(value = "article-comment")
	private List<Comment> comments;

	@OneToMany(mappedBy = "article", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
	@JsonManagedReference(value = "article-place")
	private List<Place> places;
	
	@OneToMany(mappedBy = "article", cascade = CascadeType.ALL)
	@JsonManagedReference(value = "article-heart")
	private List<Heart> hearts;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "user-article")
	private User user;  
	
	private String resMessage;

	public void setUser(User user) {
		this.user = user;
		user.getArticles().add(this);
	}
	
	@Setter
	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request {

		private Integer id;
		private String title;
		private String content;
		private String uploadDate;
		private Integer viewCount;
		private Integer likedCount;
		private String writer;
		private List<Comment> comments;
		private List<Place> places;
		private User user;
		
		public static Article toEntity(final Article.Request request) {
			return Article.builder()
					.id(request.getId())
					.title(request.getTitle())
					.content(request.getContent())
					.uploadDate(request.getUploadDate())
					.viewCount(request.getViewCount())
					.writer(request.getWriter())
					.likedCount(request.getLikedCount())
					.comments(request.getComments())
					.places(request.getPlaces())
					.user(request.getUser())
					.build();
		}
		
	}

	@Setter
	@Getter
	@Builder
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response {

		private Integer id;
		private String title;
		private String content;
		private String uploadDate;
		private Integer viewCount;
		private Integer likedCount;
		private String writer;
		private String resMessage;
		
		private List<Comment> comments;
		private List<Place> places;
		private List<Heart> hearts;

		public static Article.Response toResponse(final Article article) {
			return Article.Response.builder()
					.id(article.getId())
					.title(article.getTitle())
					.content(article.getContent())
					.uploadDate(article.getUploadDate())
					.viewCount(article.getViewCount())
					.writer(article.getWriter())
					.likedCount(article.getLikedCount())
					.comments(article.getComments())
					.places(article.getPlaces())
					.hearts(article.getHearts())
					.build();
		}

		public static List<Article.Response> toResponseList(final List<Article> articles) {
			List<Article.Response> resList = new ArrayList<>();
			for (Article article : articles) {
				resList.add(Article.Response.toResponse(article));
			}
			return resList;
		}
		
	}
}