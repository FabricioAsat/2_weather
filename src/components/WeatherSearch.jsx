import React from "react";

const WeatherSearch = ({ data }) => {
	return (
		<div className="mx-auto max-w-xl">
			<div className="mx-4 border rounded-2xl py-4 px-8 border-green-600">
				<h2 className="font-bold text-3xl ">
					{data.name} - {data.country}
				</h2>
				<picture className="flex items-center justify-center gap-4">
					<span>
						Temp: <b className="font-bold">{data.temp_c}°C</b>
					</span>
					<span>
						Condition: <b className="font-bold">{data.condition.text}</b>
					</span>
					<img src={data.condition.icon} alt="Icon" />
				</picture>
				<aside className="flex flex-col italic mb-4">
					<small>Local Time: {data.local_time}</small>
					<small>Last Updated: {data.last_update}</small>
				</aside>
				<picture>
					<iframe
						title="Map"
						src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d9930.520819863848!2d${data.lon}!3d${data.lat}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1654012159454!5m2!1ses!2sar`}
						width="100%"
						height="250"
						allowfullscreen=""
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"></iframe>
				</picture>
			</div>
		</div>
	);
};

export default WeatherSearch;
