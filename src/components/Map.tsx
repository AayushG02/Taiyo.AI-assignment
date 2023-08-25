import { useQuery } from "react-query";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "../assets/marker.png";
import axios from "axios";
import { CountryInterface } from "../models/state";

const fetchData = async () => {
  const res = await axios.get("https://disease.sh/v3/covid-19/countries");
  return res.data;
};

const Map = () => {
  const { data, error, isLoading } = useQuery("countryData", fetchData);
  const customMarker = L.icon({
    iconUrl: markerIcon,
    iconSize: [20, 30],
    iconAnchor: [15, 30],
  });
  console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  return (
    <div className="w-full h-full mb-12">
      <h2 className="flex items-center justify-center w-11/12 mx-auto bg-blue-100 h-16 border border-blue-700 text-blue-700 border-b-0 rounded-md rounded-b-none text-4xl">
        World Map
      </h2>
      <div className="w-11/12 mx-auto border border-blue-700 rounded-md rounded-t-none ">
        <MapContainer
          className="w-full h-[600px]"
          center={[20, 77]}
          zoom={4}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {data.map((country: CountryInterface) => (
            <Marker
              icon={customMarker}
              key={country.countryInfo._id}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h2 className="text">{country.country}</h2>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
