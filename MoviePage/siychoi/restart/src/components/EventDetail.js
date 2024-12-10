import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import processedData from './JsonData';

const { naver } = window;

function calculateDaysDiff(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // 두 날짜의 차이를 밀리초로 계산
  const diff = end - start;

  // 밀리초를 일, 시간, 분, 초로 변환
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const days = Math.floor(diff / millisecondsPerDay); // 일 수 계산
  const years = Math.floor(days / 365); // 연 수 계산

  // 연도를 포함한 총 일 수 계산
  const totalDays = days + (years * 365);

  return totalDays;
}

function EventDetail() {
  const { id } = useParams();
  const [eventDataDetail, setEventDataDetail] = useState(null);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [eventDetailRange, seteventDetailRange] = useState();
  
  useEffect(() => {
    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0]; // 현재 날짜를 YYYY-MM-DD 형식으로 포맷

    // 주어진 ID에 해당하는 이벤트 정보를 JSON 데이터에서 찾기
    if (processedData) {
      const eventDetail = processedData.find(event => event.id === parseInt(id));

      // 찾은 이벤트 상세 정보를 상태에 설정
      if (eventDetail) {
        setEventDataDetail(eventDetail);

        // 이벤트 시작일과 오늘 날짜를 비교하여 이벤트 등록 상태 설정
        const eventStartDate = new Date(eventDetail.strtdate);
        const eventStartFormatted = eventStartDate.toISOString().split("T")[0];
        const dday = calculateDaysDiff(todayFormatted, eventStartFormatted);
        if (dday === 0) {
          setRegistrationStatus("D-Day");
        } else if (dday > 0) {
          setRegistrationStatus(`D-${dday}`);
        } else {
          setRegistrationStatus("시작됨");
        }
        const eventRange = eventDetail.date;
        const [startDate, endDate] = eventRange.split("~");
        seteventDetailRange(calculateDaysDiff(startDate, endDate));

        // //navermap----

        // if (eventDetail.lot && eventDetail.lat) {
        //   const location = new naver.maps.LatLng(eventDetail.lat, eventDetail.lot);
        //   const map = new naver.maps.Map('navermap', {
        //     center: location,
        //     zoom: 16,
        //     zoomControl: true,
        //     minZoom: 11,
        //   });
        //   new naver.maps.Marker({
        //     position: location,
        //     map,
        //   })
        // }
        // //navermap----
      }
    }
  }, [processedData, id]); // ID가 변경될 때마다 실행
  
  return (<>
    {eventDataDetail ?
      <div>
        <h1 className="mt-5 font-semibold text-xl sm:text-2xl">
          {eventDataDetail.title}
        </h1>
        <span className="inline-flex items-center rounded-md bg-green-50 my-5 px-2 py-1 text-xl font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
          {registrationStatus}
        </span>
      </div>
      : null}
    <div className="w-full sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
      {eventDataDetail && (
        <div className="w-full max-w-md min-w-80 pr-10">
          <img src={eventDataDetail.main_img} alt={eventDataDetail.title}/>
        </div>
      )}
      {eventDataDetail && (
        <>
          <div className="w-full">
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">{eventDetailRange > 0 ? "기간" : "일시"}</dt>
                  <dd className="w-full mt-1 text-m leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDetailRange > 0 ? eventDataDetail.date : eventDataDetail.date.slice(0,10)}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">장소</dt>
                  <dd className="w-full mt-1 text-m leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDataDetail.place}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">분류</dt>
                  <dd className="w-full mt-1 text-m leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDataDetail.codename}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">주관</dt>
                  <dd className="w-full mt-1 text-m leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDataDetail.org_name}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">대상</dt>
                  <dd className="w-full mt-1 text-m leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{eventDataDetail.use_trgt}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">비용</dt>
                  <dd className="w-full mt-1 text-m leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{(eventDataDetail.is_free === "무료") ? eventDataDetail.is_free : eventDataDetail.use_fee}</dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-m font-bold leading-6 text-gray-900">공식 홈페이지</dt>
                  <dd className=" w-40 mt-5 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <a href={eventDataDetail.org_link} variant="plain" target="_blank">
                      <span className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">홈페이지 바로가기</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      )}
    </div>
    
  </>
  );
}


export default EventDetail;