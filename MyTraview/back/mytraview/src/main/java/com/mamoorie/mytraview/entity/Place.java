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

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Place {

	@Id
	@Column(name = "PLACE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "PLACE_AREA_CODE")
	private String areaCode;
	
	@Column(name = "PLACE_MAP_X")
	private Double mapX;
	
	@Column(name = "PLACE_MAP_Y")
	private Double mapY;
	
	@Column(name = "PLACE_NAME")
	private String placeName;
	
	@Column(name = "PLACE_CATEGORY")
	private String category;
	
	@Column(name = "PLACE_RATING")
	private Double rating;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn
	@JsonBackReference(value = "article-place")
	private Article article;

	public void setArticle(Article article) {
		this.article = article;
		article.getPlaces().add(this);
	}

	@Getter @Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Request{
		
		private Integer id;
		private String areaCode;
		private Double mapX;
		private Double mapY;
		private String placeName;
		private String category;
		private Double rating;
		private Article article;
		
		public static Place toEntity(Place.Request req) {
			return Place.builder()
					.id(req.getId())
					.areaCode(req.getAreaCode())
					.mapX(req.getMapX())
					.mapY(req.getMapY())
					.placeName(req.getPlaceName())
					.category(req.getCategory())
					.rating(req.getRating())
					.article(req.getArticle())
					.build();
		}
		
		
	}

	@Getter @Setter
	@NoArgsConstructor
	@AllArgsConstructor
	@Builder
	public static class Response{
		
		private Integer id;
		private String areaCode;
		private Double mapX;
		private Double mapY;
		private String placeName;
		private String category;
		private Double rating;
		private Integer reviewCount;
		
		public static Place.Response toResponse(Place place) {
			return Place.Response.builder()
					.id(place.getId())
					.areaCode(place.getAreaCode())
					.mapX(place.getMapX())
					.mapY(place.getMapY())
					.placeName(place.getPlaceName())
					.category(place.getCategory())
					.rating(place.getRating())
					.build();
		}
		
		public static List<Place.Response> toResponseList(List<Place> places){
			List<Place.Response> placeList = new ArrayList<Place.Response>();
			
			for (Place place: places) {
				placeList.add(Place.Response.toResponse(place));
			}
			
			return placeList;
		}
		
	}
}
