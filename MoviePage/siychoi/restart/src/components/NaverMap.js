import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import processedData from './JsonData';

const NaverMap = () => {
  const { id } = useParams();

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve(); // 이미 스크립트가 로드된 경우
          return;
        }

        const script = document.createElement("script");
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAP_ID}`;
        script.type = "text/javascript";
        script.async = true;

        script.onload = () => resolve(); // 스크립트 로드 성공
        script.onerror = () => reject(new Error("Failed to load Naver Map script"));

        document.head.appendChild(script);
      });
    };

    loadNaverMapScript()
      .then(() => {
        if (processedData) {
          const eventDetail = processedData.find(event => event.id === parseInt(id));
        
        // Naver 지도 초기화
        const location = new window.naver.maps.LatLng(eventDetail.lat, eventDetail.lot);
        const map = new window.naver.maps.Map("map", {
          center: location,
          zoom: 16,
          zoomControl: true,
          minZoom: 11,
        });
        }
      })
      .catch((error) => {
        console.error("Naver Map script load error:", error);
      });
  }, []);

  return (
    <div>
      <hr className="my-3"/>
      <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-2xl font-bold text-black-700">길찾기</span>
      <div id="map" className="flex w-full h-96 px-2 py-1 mt-5"></div>
      <hr className="my-3"/>
    </div>
  );
};

export default NaverMap;
