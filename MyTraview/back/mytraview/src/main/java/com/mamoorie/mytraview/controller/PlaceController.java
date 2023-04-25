package com.mamoorie.mytraview.controller;

import java.util.List;
import java.util.regex.Pattern;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mamoorie.mytraview.entity.Article;
import com.mamoorie.mytraview.entity.Place;
import com.mamoorie.mytraview.repository.PlaceRepository;
import com.mamoorie.mytraview.service.ArticleService;
import com.mamoorie.mytraview.service.PlaceService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("place")
@RequiredArgsConstructor
@Slf4j
public class PlaceController {
	
	private final PlaceService placeService;
	
	private final ArticleService articleService;
	
	//리뷰 장소 저장
	@PostMapping
	public ResponseEntity<?> registrationPlace(@RequestBody Place.Request req){
		
		if(req == null) {
			return ResponseEntity.badRequest().body("잘못된 요청입니다. 내용을 확인해주세요.");
		}
		
		Place placeEntity = Place.Request.toEntity(req);
		Article findArticle = articleService.findArticle(req.getArticle().getId());
		placeEntity.setArticle(findArticle);
		placeService.savePlace(placeEntity);
		Place.Response res = Place.Response.toResponse(placeEntity);
		
		return ResponseEntity.ok().body(res);
	}
	
	
	// 카테고리 별 조회
	@GetMapping("/category={category}")
	public ResponseEntity<?> retrieveByCategory(@PathVariable("category") String category){
		if(category == null) {
			return ResponseEntity.badRequest().body("카테고리를 입력해주세요.");
		}
		List<Place> selectedPlace = placeService.viewAllByCategory(category);
		List<Place.Response> Places = Place.Response.toResponseList(selectedPlace);
		return ResponseEntity.ok().body(Places);
	}
	
	@PostMapping("/reviews")
	public ResponseEntity<?> countReview(@RequestBody Place place){
		
	    List<Place> findPlace = placeService.viewAllByPlaceNameAndLatLng(place);
		
	    Integer count = findPlace.size();
	    
		return ResponseEntity.ok().body(Place.Response.builder().reviewCount(count).build());
	}
	
	//장소 정보 수정
	@PutMapping
	public ResponseEntity<?> modifyPlace(Place.Request req){
		if(req == null) {
			return ResponseEntity.badRequest().body("잘못된 요청입니다. 다시 한 번 확인해주세요.");
		}
		Place placeEntity = Place.Request.toEntity(req);
		Place updatedPlaceInfo = placeService.updatePlaceInfo(placeEntity);
		return ResponseEntity.ok().body(updatedPlaceInfo);
	}
	
	//리뷰 장소 삭제
	@DeleteMapping
	@Transactional
	public void removePlace(Place.Request req) {
		if(req == null) {
			log.warn("요청 정보의 상태가 Null");
		}
		Place placeEntity = Place.Request.toEntity(req);
		placeService.deletePlaceInfo(placeEntity);
	}
	
	
	
	//---------------------------테스트용-----------------------------//
	// 장소명으로 조회
		@GetMapping("/retrieve1")
		public ResponseEntity<?> retrieveByPlaceName(@RequestParam("placeName") String placeName){
			if(placeName == null) {
				return ResponseEntity.badRequest().body("장소를 입력해주세요.");
			}
			List<Place> selectedPlace = placeService.viewByPlaceName(placeName);
			
			return ResponseEntity.ok().body(selectedPlace);
		}
		
		// 지역 코드로 조회 ex) 서울, 경기
		@GetMapping("/retrieve2")
		public ResponseEntity<?> retrieveByAreaCode(@RequestParam("areaCode") String areaCode){
			if(areaCode == null) {
				return ResponseEntity.badRequest().body("지역코드를 입력해주세요.");
			}
			List<Place> selectedPlace = placeService.viewAllByAreaCode(areaCode);
			
			return ResponseEntity.ok().body(selectedPlace);
		}
		
		// 위도 및 경도로 조회
		@GetMapping("/retrieve3")
		public ResponseEntity<?> retrieveByLatLng(@RequestParam("lat") Double lat, @RequestParam("lng") Double lng){
			if(lat == null && lng == null) {
				return ResponseEntity.badRequest().body("위도 및 경도 확인할 것");
			}
		
			List<Place> selectedPlace = placeService.viewAllByLatLng(lat, lng);
			return ResponseEntity.ok().body(selectedPlace);
		}
		//---------------------------테스트용-----------------------------//
	
	
	
}
