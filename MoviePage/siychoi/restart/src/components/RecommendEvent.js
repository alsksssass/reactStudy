import { useEffect, useState } from "react";
import processedData from './JsonData';
import { Link } from "react-router-dom";

const recommendKeyword = "어린이/청소년 문화행사"

function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

function isTodayBeforeStartDate(todayTimestamp, eventStartDate) {
	const today = new Date(todayTimestamp);
	const startDate = new Date(eventStartDate);
	return today < startDate;
}

function RecommendEvent() {
	const [recommendedEvent, setRecommendedEvent] = useState([]);
	const [freeEvent, setFreeEvent] = useState([]);

	useEffect(() => {
		const todayTimestamp = Date.now(); // 오늘의 타임스탬프
		if (processedData) {
			setRecommendedEvent(processedData.filter(event =>
				event.themecode === recommendKeyword &&
				isTodayBeforeStartDate(todayTimestamp, event.strtdate)));
			setFreeEvent(processedData.filter(event =>
				event.is_free === "무료" &&
				isTodayBeforeStartDate(todayTimestamp, event.strtdate)));
		}
	}, [processedData]);

	shuffle(recommendedEvent);
	shuffle(freeEvent);
	return (
		<>
			<div className="my-24">
				<div className="flex justify-center items-center">
					<span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-2xl sm:text-3xl font-bold text-black-700">어린이/청소년을 위한 행사</span>
				</div>
				<div className="bg-white text-lg">
					<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
						<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
							{recommendedEvent.slice(0, 4).map((product) => (
								<Link key={product.id} to={`/detail/${product.id}`} className="group">
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
					<div className="flex justify-center items-center ">
						<dd className="mt-5 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							<Link state={'어린이/청소년 문화행사'} key={1} to={`/list`} className="rounded-3xl bg-indigo-600 px-10 py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">어린이/청소년 행사 더보기 </Link>
						</dd>
					</div>
				</div>
			</div>
			<div className="my-24">
				<div className="flex justify-center items-center">
					<span className="inline-flex items-center rounded-md bg-white px-2 py-1 text-2xl sm:text-3xl font-bold text-black-700">무료 행사</span>
				</div>
				<div className="bg-white text-lg">
					<div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
						<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
							{freeEvent.slice(0, 4).map((product, index) => (
								<Link to={`/detail/${product.id}`} key={index} className="group">
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
					<div className="flex justify-center items-center ">
						<dd className="mt-5 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
							<Link state={true} key={2} to={`/list`} className="rounded-3xl bg-indigo-600 px-10 py-3 text-base sm:text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">무료 행사 더보기 </Link>
						</dd>
					</div>
				</div>
			</div>
		</>
	)

}

export default RecommendEvent;