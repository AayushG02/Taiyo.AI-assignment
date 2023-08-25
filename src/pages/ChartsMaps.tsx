import LineGraph from "../components/LineGraph";
import Map from "../components/Map";
const ChartsMaps = () => {
  return (
    <div className="flex-1 flex flex-col gap-8 h-full">
      <LineGraph />
      <Map />
    </div>
  );
};

export default ChartsMaps;
