import { useQuery } from "react-query";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const fetchData = async () => {
  const res = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return res.data;
};

const LineGraph = () => {
  const { data, error, isLoading } = useQuery("data", fetchData);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  const chartData = {
    labels: Object.keys(data.cases),
    datasets: [
      {
        label: "Cases",
        data: Object.values(data.cases),
        fill: false,
        borderColor: "rgb(37 99 235)",
        tension: 0.1,
        responsive: true,
      },
    ],
  };
  return (
    <div className="w-full pt-8">
      <h2 className="flex items-center justify-center w-11/12 mx-auto bg-blue-100 h-16 border border-blue-700 text-blue-700 border-b-0 rounded-md rounded-b-none text-4xl lg:text-3xl md:text-2xl">
        Corona Cases
      </h2>
      <div className="bg-white border border-blue-700 w-11/12 mx-auto rounded-md rounded-t-none">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineGraph;
