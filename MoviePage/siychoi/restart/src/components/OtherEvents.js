import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import processedData from './JsonData';

function isTodayBeforeStartDate(todayTimestamp, eventStartDate) {
  const today = new Date(todayTimestamp);
  const startDate = new Date(eventStartDate);
  return today < startDate;
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function OtherEvents() {
  const { id } = useParams();
  const [otherGenreEvent, setOtherGenreEvent] = useState([]);
  const [otherGuEvent, setOtherGuEvent] = useState([]);
  const [eventDetail, setEventDetail] = useState(null);
  const [reload, setReload] = useState(false);

  const reloadStateChange = () => {
    setReload(true);
  };

  useEffect(() => {
    if (reload) window.scrollTo(0, 0);
    setReload(false);
    const todayTimestamp = new Date(); // 오늘의 타임스탬프
    if (processedData) {
      const eventDetailData = processedData.find(event => event.id === parseInt(id));
      if (eventDetailData) {
        setEventDetail(eventDetailData);
        setOtherGenreEvent(processedData.filter(event =>
          event.themecode === eventDetailData.themecode &&
          isTodayBeforeStartDate(todayTimestamp, event.end_date) &&
          event.id !== parseInt(id)));
        setOtherGuEvent(processedData.filter(event =>
          event.guname === eventDetailData.guname &&
          isTodayBeforeStartDate(todayTimestamp, event.end_date) &&
          event.id !== parseInt(id)));
      }
    }
  }, [processedData, id]);

  shuffle(otherGenreEvent);
  shuffle(otherGuEvent);

  return (
    <>
      {eventDetail ?
        <>
          <div className="bg-white">
            <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-2xl font-bold text-black-700">"{eventDetail.themecode ? eventDetail.themecode : "기타"}" 다른 행사는 어때요?</span>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {otherGenreEvent.slice(0, 8).map((product) => (
                  <Link key={product.id} to={`/detail/${product.id}`} className="group" onClick={reloadStateChange}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.main_img}
                        alt={product.title}
                        className=" h-60 w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mb-6">
            <dd className="mt-5 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Link state={eventDetail.themecode} key={1} to={`/list`} className="rounded-3xl bg-indigo-600 px-10 py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{eventDetail.themecode} 행사 더보기 ></Link>
            </dd>
          </div>
          <hr className="mb-5" />
          <div className="bg-white">
            <span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-2xl font-bold text-black-700">{eventDetail.guname}에서 진행하는 다른 행사는 어때요?</span>
            <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {otherGuEvent.slice(0, 8).map((product) => (
                  <Link key={product.id} to={`/detail/${product.id}`} className="group" onClick={reloadStateChange}>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={product.main_img}
                        alt={product.title}
                        className=" h-60 w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <p className="mt-1 text-lg font-medium text-gray-900">{product.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mb-6">
            <dd className="mt-5 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <Link state={eventDetail.guname} key={1} to={`/list`} className="rounded-3xl bg-indigo-600 px-10 py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{eventDetail.guname} 행사 더보기 ></Link>
            </dd>
          </div>
        </>
        : null}
    </>
  )
}

export default OtherEvents;