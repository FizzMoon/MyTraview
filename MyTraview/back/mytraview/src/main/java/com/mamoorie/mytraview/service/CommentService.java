package com.mamoorie.mytraview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mamoorie.mytraview.entity.Comment;
import com.mamoorie.mytraview.repository.ArticleRepository;
import com.mamoorie.mytraview.repository.CommentRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;

	private final ArticleRepository articleRepository;

	// 댓글 작성 = C
	public void saveComment(Comment comment) {

		commentRepository.save(comment);

	}

	// 댓글 전체 조회 = R
	public List<Comment> retrieveCommentList(Integer id) {

		List<Comment> getComments = commentRepository.findAllByArticleId(id);

		return getComments;
	}

	// 댓글 수정 = U
	public Comment updateComment(Comment.Request req) {

		Comment commentEntity = Comment.Request.toEntity(req);

		validation(commentEntity);

		Optional<Comment> findComment = commentRepository.findById(req.getId());

		findComment.ifPresent(comment -> {
			comment.setContent(req.getContent());
			commentRepository.save(comment);
		});

		Comment updateComment = findComment.get();

		return updateComment;
	}

	// 댓글 삭제 = D
	public List<Comment> deleteComment(final Comment comment) {

		commentRepository.deleteById(comment.getId());

		List<Comment> comments = commentRepository.findAll();

		return comments;
	}

	private void validation(final Comment commentEntity) {

		if (commentEntity == null) {

			log.warn("commentEntity cannat be null");

			throw new RuntimeException("commentEntity는 null 허용 불가");
		}

		if (commentEntity.getContent() == null) {

			log.warn("Conntent == null");

			throw new RuntimeException("내용을 입력해주세요.");
		}
	};
}
