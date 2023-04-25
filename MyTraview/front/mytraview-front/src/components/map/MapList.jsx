import React, { useEffect, useState } from 'react'
import { API_BASE_URL } from '../../api_config/ApiBaseUrl';
import { call } from '../../api_config/ApiService';
import ListTable from '../article/ListTable';
const { kakao } = window;

const MapList = (props) => {

  const [myMap, setMyMap] = useState('');
  const [myMarker, setMyMarKer] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [areaCode, setAreaCode] = useState('');
  const [category, setCategory] = useState('');
  const [rating, setRating] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [myInfowindow, setMyInfowindow] = useState('');
  var [markers, setMarkers] = useState([]);
  const [myPs, setMyPs] = useState('');
  const rate = [1,2,3,4,5];
  const selecteCategory = ['숙박','먹거리', '교통', '관광지', '레져', '테마별 코스', '전체'];

  const handleRating = (e) => {
    setRating(e.target.value);
  }

  const handleCategory = (e) => {
    setCategory(e.target.value)
  }

  let req = {
    areaCode: areaCode,
    mapX: latitude,
    mapY: longitude,
    placeName: placeName,
    category: category,
    rating: rating
  }

  const selectedLatLng = () => {
    console.log("마지막으로 선택하신 위도 및 경도의 값은 " + "위도는:" + latitude + "경도는: " + areaCode);
    console.log("areaCode는: " + areaCode);
  }

  const savePlace = () => {
    call('/place', 'POST', req)
      .then(
        (res) => {
          console.log(res);
        }
      )
  }

  const retrieveByCategory = (categoryValue) => {

    call(`/place/category=${categoryValue}`, 'GET')
      .then((res) => {
        removeMarker();
        for (var i = 0; i < res.length; i++) {


          // 마커 이미지의 이미지 크기 입니다
          var imageSize = new kakao.maps.Size(24, 35);

          // 마커 이미지를 생성합니다    
          // var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

          // 마커를 생성합니다
          var marker = new kakao.maps.Marker({
            map: myMap, // 마커를 표시할 지도
            position: new kakao.maps.LatLng(res[i].mapX, res[i].mapY) // 마커를 표시할 위치
            // title : items[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            // image : markerImage // 마커 이미지 
          });

          markers.push(marker);
        }
        console.log(markers);
      })

  }

  const retrieveResponse = () => {
    console.log(markers);
  }

  const removeMarker = () => {

    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
  }

  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  var mapTypeControl = new kakao.maps.MapTypeControl();

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  var zoomControl = new kakao.maps.ZoomControl();

  var geocoder = new kakao.maps.services.Geocoder();

  function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
  }

  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
  function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
      var infoDiv = document.getElementById('centerAddr');

      for (var i = 0; i < result.length; i++) {
        // 행정동의 region_type 값은 'H' 이므로
        if (result[i].region_type === 'H') {
          infoDiv.innerHTML = result[i].address_name;
          break;
        }
      }
    }
  }

  //-------------------------지도에 검색 기능 추가 22.12.27-------------------------

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces() {

    var keyword = document.getElementById('keyword').value;

    if (!keyword.replace(/^\s+|\s+$/g, '')) {
      alert('키워드를 입력해주세요!');
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    myPs.keywordSearch(keyword, placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === kakao.maps.services.Status.OK) {

      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);

      // 페이지 번호를 표출합니다
      displayPagination(pagination);

    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {

      alert('검색 결과가 존재하지 않습니다.');
      return;

    } else if (status === kakao.maps.services.Status.ERROR) {

      alert('검색 결과 중 오류가 발생했습니다.');
      return;

    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {

    var listEl = document.getElementById('placesList'),
      menuEl = document.getElementById('menu_wrap'),
      fragment = document.createDocumentFragment(),
      bounds = new kakao.maps.LatLngBounds(),
      listStr = '';

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();

    for (var i = 0; i < places.length; i++) {

      // 마커를 생성하고 지도에 표시합니다
      var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function (marker, title) {
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          displayInfowindow(marker, title);
        });

        kakao.maps.event.addListener(marker, 'mouseout', function () {
          myInfowindow.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title);
        };

        itemEl.onmouseout = function () {
          myInfowindow.close();
        };
      })(marker, places[i].place_name);

      fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    myMap.setBounds(bounds);
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(index, places) {

    var el = document.createElement('li'),
      itemStr = '<span className="markerbg marker_' + (index + 1) + '"></span>' +
        '<div className="info">' +
        '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
      itemStr += '    <span>' + places.road_address_name + '</span>' +
        '   <span className="jibun gray">' + places.address_name + '</span>';
    } else {
      itemStr += '    <span>' + places.address_name + '</span>';
    }

    itemStr += '  <span className="tel">' + places.phone + '</span>' +
      '</div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx, title) {
    var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37),  // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage
      });

    marker.setMap(myMap); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
  }


  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement('a');
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = 'on';
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          }
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title) {
    var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

    myInfowindow.setContent(content);
    myInfowindow.open(myMap, marker);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }



  //-------------------------지도에 검색 기능 추가 22.12.27-------------------------

  useEffect(() => {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.46833675493725, 126.88624594942107), //지도의 중심좌표.
      level: 5 //지도의 레벨(확대, 축소 정도)
    };

    var kakaoMap = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    kakaoMap.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    kakaoMap.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker(),
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();  

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // 키워드로 장소를 검색합니다
    // searchPlaces();

    // 지도에 마커를 표시합니다
    marker.setMap(kakaoMap);
    setMyMarKer(marker);
    setMyInfowindow(infowindow);
    setMyPs(ps);





    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(kakaoMap, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
          detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

          var content = '<div className="bAddr">' +
            '<span className="title">법정동 주소정보</span>' +
            detailAddr +
            '</div>';
          // 클릭한 위도, 경도 정보를 가져옵니다 
          var latlng = mouseEvent.latLng;

          removeMarker();
          // 마커 위치를 클릭한 위치로 옮깁니다
          marker.setPosition(latlng);

          // markers.push(marker);

          var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
          message += '경도는 ' + latlng.getLng() + ' 입니다';

          // var resultDiv = document.getElementById('clickLatlng'); 
          console.log(message);

          setLatitude(latlng.getLat());

          setLongitude(latlng.getLng())

          // marker.setMap(kakaoMap);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(kakaoMap, marker);
          const addrName = result[0].address.address_name
          const areaCode = addrName.split(' ');
          setAreaCode(areaCode[0]);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(kakaoMap, 'idle', function () {
      searchAddrFromCoords(kakaoMap.getCenter(), displayCenterInfo);
    });



    setMyMap(kakaoMap)
  }
    , [markers])

  return (
    <>
    <div className='my-10 text-3xl font-extrabold text-slate-300'>{props.areaCode}</div>

    {/* {props.추천글} */}
    <div className='my-10 text-2xl font-extrabold text-slate-300'>{props.areaCode}'s Best Review</div>
    <div className='mb-10'><ListTable areaCode={props.areaCode}/></div>

    <div className="text-lg font-bold text-slate-200" id="retrieveByCategory" style={{ width: "500px", display: "flex", justifyContent: "space-between" }}>
        <button onClick={() => { retrieveByCategory("숙박"); console.log("숙박"); }}>숙박</button>
        <button onClick={() => { retrieveByCategory("먹거리"); console.log("먹거리"); }}>먹거리</button>
        <button onClick={() => { retrieveByCategory("교통"); console.log("교통"); }}>교통</button>
        <button onClick={() => { retrieveByCategory("관광지"); console.log("관광지"); }}>관광지</button>
        <button onClick={() => { retrieveByCategory("레져"); console.log("레져");}}>레져</button>
      </div>

      <div className="map_wrap m-auto">
        <div id="map" style={{ width: '100%', height: '500px', paddingBottom: '24px'}}></div>
        <div className="hAddr">
          <span className="title">지도 중심부의 주소</span>
          <span id="centerAddr"></span>
        </div>
      </div>

      <br /><br /><br /><br /><br />


    </>
  )
}

export default MapList
