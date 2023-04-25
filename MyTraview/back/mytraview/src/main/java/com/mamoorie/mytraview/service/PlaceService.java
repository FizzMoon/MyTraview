package com.mamoorie.mytraview.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.mamoorie.mytraview.entity.Place;
import com.mamoorie.mytraview.repository.PlaceRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class PlaceService {
	
	private final PlaceRepository placeRepository;
	
	
	// Create place data
	public void savePlace(Place place) {
//		if(
//		placeRepository.existsByMapXAndMapYAndName(place.getMapX(), place.getMapY(), place.getPlace_name())) {
//			log.warn("占쎈퉸占쎈뼣 占쎌삢占쎈꺖 獄쏉옙 占쎈씜筌ｋ똻�벥 �뵳�됰윮揶쏉옙 占쎌뵠沃섓옙 鈺곕똻�삺占쎈�占쎈빍占쎈뼄.");
//		}
		placeRepository.save(place);
	}
	
	// 筌띾뜆鍮� 獄쏉옙 占쎌맄燁삼옙 占쎌젟癰귣�占쏙옙 占쎈ご占쎈뻻占쎈릭疫뀐옙 占쎌맄占쎈립 占쎌읈筌ｏ옙 占쎈쑓占쎌뵠占쎄숲 鈺곌퀬�돳 = R
	public List<Place> viewAllPlaces(){
		List<Place> findByAllPlaceData = placeRepository.findAll();
		return findByAllPlaceData;
	}
	
	// 筌띾뜆鍮� 獄쏉옙 占쎌맄燁삼옙 占쎌젟癰귣�占쏙옙 占쎄깻占쎌뵬占쎌뵠占쎈섧占쎈뱜揶쏉옙 占쎄퐨占쎄문占쎈립 鈺곌퀗援�(占쎌삢占쎈꺖筌륅옙)占쎌몵嚥∽옙 占쎈쑓占쎌뵠占쎄숲 鈺곌퀬�돳 = R 
	public List<Place> viewByPlaceName(String placeName){
		
		List<Place> chosenPlace = placeRepository.findAllByPlaceName(placeName);
		return chosenPlace;
	}
	
	// 筌욑옙占쎈열�굜遺얜굡嚥∽옙 占쎈퉸占쎈뼣 筌욑옙占쎈열 占쎌젟癰귨옙 筌뤴뫀紐®몴占� 揶쏉옙占쎌죬占쎌긾
	public List<Place> viewAllByAreaCode(String areaCode){
		
		return placeRepository.findAllByAreaCode(areaCode);
	}
	
	
	// 占쎌맄占쎈즲, 野껋럥猷꾣에占� 占쎈퉸占쎈뼣 占쎌삢占쎈꺖 筌뤴뫀諭� 占쎈쑓占쎌뵠占쎄숲�몴占� 揶쏉옙占쎌죬占쎌긾
	public List<Place> viewAllByLatLng(Double mapX, Double mapY){
		
		return placeRepository.findAllByMapXAndMapY(mapX, mapY);
	}
	
	// 燁삳똾�믤�⑥쥓�봺嚥∽옙 占쎌삢占쎈꺖占쎌벥 占쎈쑓占쎌뵠占쎄숲�몴占� 揶쏉옙占쎌죬占쎌긾.
	public List<Place> viewAllByCategory(String category){
		return placeRepository.findAllByCategory(category);
	}
	
	public List<Place> viewAllByPlaceNameAndLatLng(Place place){
		
		List<Place> findPlace = placeRepository.findAllByPlaceNameAndMapXAndMapY(place.getPlaceName(), place.getMapX(), place.getMapY());
		
		return findPlace;
		
	}
	
	// 占쎌삢占쎈꺖 占쎈쑓占쎌뵠占쎄숲 占쎈땾占쎌젟
	public Place updatePlaceInfo(Place placeEntity) {
		Optional<Place> selectedPlace = placeRepository.findById(placeEntity.getId());
		selectedPlace.ifPresent(place->{
			place.setCategory(placeEntity.getCategory());
			place.setMapX(placeEntity.getMapX());
			place.setMapY(placeEntity.getMapY());
			place.setPlaceName(placeEntity.getPlaceName());
			place.setRating(placeEntity.getRating());
			placeRepository.save(place);
		  }
		);
		Optional<Place> place = placeRepository.findById(placeEntity.getId());
		Place updatedPlace = place.get();  
		return updatedPlace;
	}
	
	// 占쎌삢占쎈꺖 占쎈쑓占쎌뵠占쎄숲 占쎄텣占쎌젫
	public void deletePlaceInfo(Place placeEntity) {
		placeRepository.deleteById(placeEntity.getId());
	}
	
}
