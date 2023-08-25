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

// Registering chart elements and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Function to fetch data
const fetchData = async () => {
  const res = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return res.data;
};

const LineGraph = () => {
  // Fetching data using react-query
  const { data, error, isLoading } = useQuery("data", fetchData);

  // Handling loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong...</div>;

  // Constructing chart data
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

  // Rendering the chart
  return (
    <div className="w-full pt-8">
      <h2 className="flex items-center justify-center w-11/12 mx-auto bg-blue-100 h-16 border border-blue-700 text-blue-700 border-b-0 rounded-md rounded-b-none text-2xl sm:text-4xl">
        Corona Cases
      </h2>
      <div className="bg-white border border-blue-700 w-11/12 mx-auto rounded-md rounded-t-none">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default LineGraph;
