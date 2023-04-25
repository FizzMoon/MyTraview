package com.mamoorie.mytraview.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "HEART")
@DynamicInsert
public class Heart {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "HEART_ID")
	private Integer id;
	
	@Column(name = "HEART_ARTICLE_ID")
	private Integer articleId;
	
	@Column(name = "HEART_EMAIL")
	private String email;
	
	@Column(name = "HEART_FLAG")
	@ColumnDefault("false")
	private Boolean flag;	
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "user-heart")
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "article-heart")
	private Article article;

	public void setUser(User user) {
		this.user = user;
		user.getHearts().add(this);
	}
	
	public void setArticle(Article article) {
		this.article = article;
		article.getHearts().add(this);
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Request {
		
		private Integer id;
		private Integer articleId;
		private String email;
		private User user;
		private Boolean flag;
		
		public static Heart toEntity(Heart.Request req) {
			return Heart.builder()
					.id(req.getId())
					.articleId(req.getArticleId())
					.email(req.getEmail())
					.user(req.getUser())
					.flag(req.getFlag())
					.build();
		}
	}
	
	@Data
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Response {
		
		private Integer id;
		private Integer articleId;
		private String email;
		private Boolean flag;
		
		public static Heart.Response toResponse(Heart heart) {
			return Heart.Response.builder()
					.id(heart.getId())
					.articleId(heart.getArticleId())
					.email(heart.getEmail())
					.flag(heart.getFlag())
					.build();
		}
		
		public static List<Heart.Response> toResponseList(List<Heart> hearts) {
			List<Heart.Response> heartList = new ArrayList<Heart.Response>();
			for (Heart heart : hearts) {
				heartList.add(Heart.Response.toResponse(heart));
			}
			return heartList;
		}
		
	}

}
