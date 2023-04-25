//package com.mamoorie.mytraview.service;
//
//import static org.mockito.Mockito.times;
//import static org.mockito.Mockito.verify;
//
//import org.junit.jupiter.api.Test;
//import org.junit.jupiter.api.extension.ExtendWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.junit.jupiter.MockitoExtension;
//
//import com.mamoorie.mytraview.repository.ArticleRepository;
//
//@ExtendWith(MockitoExtension.class)
//class ArticleServiceTest {
//
//    @Mock
//    private ArticleRepository articleRepository;
//
//    @InjectMocks
//    private ArticleService articleService;
//
//    @Test
//    void findAllArticles_callArticleServiceRepository() {
//        articleService.findAllArticles();
//
//        verify(articleRepository, times(1)).findAll();
//    }
//}