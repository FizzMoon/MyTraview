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

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Table
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Comment {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "COMMENT_ID")
	private Integer id;
	
	@Column(name = "COMMENT_CONTENT")
	private String content;

	@Column(name = "COMMENT_PARENT_ID")
	private Integer parentId;
	
	@Column(name = "COMMENT_COMMENT_LEVEL")
	private Integer commentLevel;
	
	@OneToMany(mappedBy = "replyComment", cascade = CascadeType.ALL)
	@JsonManagedReference(value = "replyComment-replyComments")
	private List<Comment> replyComments;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "replyComment-replyComments")
	private Comment replyComment;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "user-comment")
	private User user;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "article-comment")
	private Article article;
	
	@Column(name = "COMMENT_WRITER")
	private String writer;
	
	@Column(name = "COMMENT_ARTICLE_ID")
	private Integer articleId; // �ӽ��߰�

	public void setUser(User user) {
		this.user = user;
		user.getComments().add(this);
	}

	public void setArticle(Article article) {
		this.article = article;
		article.getComments().add(this);
	}
	
	public void setReplyComment(Comment replyComment) {
		this.replyComment = replyComment;
		replyComment.getReplyComments().add(this);
	}
	
	@Builder 
	@Getter @Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Request{
		
		private Integer id;
		private String content;
		private User user;
		private Article article;
		private Integer parentId;
		private Integer articleId; // �ӽ��߰�
		private String writer;
		private Integer commentLevel;
		private Comment replyComment;
		private List<Comment> replyComments;
		
		public static Comment toEntity(Comment.Request req) {
			return Comment.builder()
					.id(req.getId())
					.user(req.getUser())
					.article(req.getArticle())
					.content(req.getContent())
					.parentId(req.getParentId())
					.articleId(req.getArticleId()) // �ӽ��߰�
					.writer(req.getWriter())
					.commentLevel(req.getCommentLevel())
					.replyComment(req.getReplyComment())
					.replyComments(req.getReplyComments())
					.build();
		}
		
		
	}
	
	@Builder
	@Getter @Setter
	@NoArgsConstructor
	@AllArgsConstructor
	public static class Response{
		
		private Integer id;
		private String content;
		private Integer parentId;
		private Integer articleId; // �ӽ��߰�
		private String writer; // �ӽ��߰�
		private Integer commentLevel;
		private Comment replyComment;
		private List<Comment> replyComments;
		private String resMessage;
		
		public static Comment.Response toResponse(Comment commentEntity){
			return Comment.Response.builder()
					.id(commentEntity.getId())
					.content(commentEntity.getContent())
					.parentId(commentEntity.getParentId())
					.articleId(commentEntity.getArticleId()) // �ӽ��߰�
					.writer(commentEntity.getWriter())
					.commentLevel(commentEntity.getCommentLevel())
					.replyComment(commentEntity.getReplyComment())
					.replyComments(commentEntity.getReplyComments())
					.build();
		}
		
		public static List<Comment.Response> toResponseList(List<Comment> comments){
			List<Comment.Response> commentList = new ArrayList<Comment.Response>();
			for (Comment comment : comments) {
				commentList.add(Comment.Response.toResponse(comment));
			}
			return commentList;
			
		}
		
	}

}