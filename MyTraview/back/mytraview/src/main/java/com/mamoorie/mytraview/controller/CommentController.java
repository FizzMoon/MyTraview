package com.mamoorie.mytraview.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mamoorie.mytraview.entity.Article;
import com.mamoorie.mytraview.entity.Comment;
import com.mamoorie.mytraview.entity.User;
import com.mamoorie.mytraview.repository.ArticleRepository;
import com.mamoorie.mytraview.repository.CommentRepository;
import com.mamoorie.mytraview.repository.UserRepository;
import com.mamoorie.mytraview.service.CommentService;
import com.mamoorie.mytraview.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("comment")
@RequiredArgsConstructor
public class CommentController {
	
	private final UserRepository userRepository;
	
	private final ArticleRepository articleRepository;
	
	private final CommentRepository commentRepository;
	
	private final CommentService commentService;
	
	private final UserService userService;
	
		@PostMapping
		public ResponseEntity<?> createComment(@Valid @RequestBody Comment.Request req, @AuthenticationPrincipal String email) {
			Comment comment = Comment.Request.toEntity(req);

			Article findArticle = articleRepository.findById(comment.getArticleId()).get();
			User findUser = userRepository.findByEmail(email);
			comment.setUser(findUser);
			comment.setArticle(findArticle);
			comment.setWriter(findUser.getName()); 
			comment.setArticleId(findArticle.getId()); 
			commentService.saveComment(comment);

			Comment.Response res = Comment.Response.toResponse(comment);
			return ResponseEntity.ok().body(res);
		}

		@GetMapping("/articleId={id}")
		public ResponseEntity<?> getCommentList(@PathVariable Integer id, @AuthenticationPrincipal String email) {

			List<Comment> comments = commentService.retrieveCommentList(id);
			List<Comment.Response> commentList = Comment.Response.toResponseList(comments);

			return ResponseEntity.ok().body(commentList);
		}
		
		@GetMapping("/name")
		public ResponseEntity<?> getCommentListByName(@RequestBody Comment.Request req){
			List<Comment> comments = commentRepository.findAllByWriter(req.getWriter());
			List<Comment.Response> res = Comment.Response.toResponseList(comments);
			return ResponseEntity.ok().body(res);
		}

		@PutMapping
		public ResponseEntity<?> updateComment(@Valid @RequestBody Comment.Request req, @AuthenticationPrincipal String email) {

			Comment findComment = commentRepository.findById(req.getId()).get();

			if (!findComment.getUser().getEmail().equals(email)) {
				
				return ResponseEntity.badRequest().body(Comment.Response.builder().resMessage("작성자만 가능합니다.").build());
				
			}
			
				Comment updatedComment = commentService.updateComment(req);
				
				Comment.Response res = Comment.Response.toResponse(updatedComment);
				
				return ResponseEntity.ok().body(Comment.Response.builder().resMessage("수정이 완료 되었습니다.").build());

		}

		@DeleteMapping
		@Transactional
		public ResponseEntity<?> deleteComment(@RequestBody Comment.Request req, @AuthenticationPrincipal String email) {

			Comment findComment = commentRepository.findById(req.getId()).get();

			if (!findComment.getUser().getEmail().equals(email)) {
				return ResponseEntity.badRequest().body(Comment.Response.builder().resMessage("작성자만 가능합니다.").build());
			}
			
				commentService.deleteComment(findComment);

				return ResponseEntity.ok().body(Comment.Response.builder().resMessage("삭제 되었습니다.").build());

		}
		
		@PostMapping("/reply")
		public ResponseEntity<?> createReplyComment(@RequestBody Comment.Request req, @AuthenticationPrincipal String email){
			
			Comment replyComment = Comment.Request.toEntity(req);
			
			Comment findComment = commentRepository.findById(req.getParentId()).get();
			
			User findUser = userService.findUser(email);
			
			replyComment.setUser(findUser);
			
			replyComment.setCommentLevel(1);
			
			replyComment.setReplyComment(findComment);
			
			replyComment.setWriter(findUser.getName());
			
			Comment createReplyComment = commentRepository.save(replyComment);
			
			return ResponseEntity.ok(Comment.Response.toResponse(createReplyComment));
			
		}
		
		@PutMapping("/updateReply")
		public ResponseEntity<?> updateReplyComment(@RequestBody Comment.Request req, @AuthenticationPrincipal String email){
			
			Comment findReplyComment = commentRepository.findById(req.getId()).get();
			
			String findEmail = findReplyComment.getUser().getEmail();
			
			if(!findEmail.equals(email)) {
				return ResponseEntity.badRequest().body(Comment.Response.builder().resMessage("작성자만 가능합니다.").build());
			}
			
			findReplyComment.setContent(req.getContent());
			
			Comment updateReplyComment = commentRepository.save(findReplyComment);
			
			Comment.Response res = Comment.Response.toResponse(updateReplyComment);
			
			return ResponseEntity.ok(res);
			
		}
		
		@DeleteMapping("/deleteReply")
		@Transactional
		public ResponseEntity<?> deleteReplyComment(@RequestBody Comment.Request req, @AuthenticationPrincipal String email){
			
			Comment findReplyComment = commentRepository.findById(req.getId()).get();
			
			String findEmail = findReplyComment.getUser().getEmail();
			
			if(!findEmail.equals(email)) {
				return ResponseEntity.badRequest().body(Comment.Response.builder().resMessage("작성자만 가능합니다.").build());
			}
			
			commentRepository.delete(findReplyComment);
			
			return ResponseEntity.ok(Comment.Response.builder().resMessage("삭제 되었습니다.").build());
		}
		
		
	
}