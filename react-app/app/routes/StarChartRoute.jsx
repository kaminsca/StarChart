import { StarChart } from "../pages/main_page/StarChart";

export const StarChartRoute = () => {
  return [
    { title: "StarChart" },
    { name: "description", content: "StarChart!" },
  ];
}

export default function Home() {
  return <StarChart />;
}
