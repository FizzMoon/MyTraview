package com.mamoorie.mytraview.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mamoorie.mytraview.entity.Place;


@Repository
public interface PlaceRepository extends JpaRepository<Place, Integer> {
	
	Boolean existsByMapXAndMapYAndPlaceName(Double mapX, Double mapY, String placeName);
	Boolean existsByPlaceName(String placeName);
	
	List<Place> findAllByPlaceName(String placeName);
	List<Place> findAllByAreaCode(String areaCode);
	List<Place> findAllByMapXAndMapY(double mapX, double mapY);
	List<Place> findAllByCategory(String category);
	List<Place> findAllByPlaceNameAndMapXAndMapY(String placeName, double mapX, double mapY);
}
