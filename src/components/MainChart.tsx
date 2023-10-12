import { ResponsiveLine } from "@nivo/line";
import { PortfolioState } from "../interfaces/user";
import useSWR from "swr";
import { snakeToCamel } from "../utils/camelize";

type ChartProps = {
  invested: number;
};

interface ChartDataPoint {
  x: Date;
  y: number;
}
export interface ChartData {
  id: string;
  data: Array<ChartDataPoint>;
}

const toChartData = (pStates: Array<PortfolioState>): Array<ChartData> => {
  return [
    {
      id: "portfolioData",
      data: pStates
        .filter(
          (ps) =>
            ps.portfolio.totalValue !== null &&
            //@ts-ignore
            ps.timestamp["date"]["numberLong"] !== null
        )
        .map((ps) => ({
          //@ts-ignore
          x: new Date(parseInt(ps.timestamp["date"]["numberLong"])), // Convert timestamp to a Date object
          y: ps.portfolio.totalValue,
        })),
    },
  ];
};

const portfolioStatesFetcher = async () => {
  const r = await fetch(`/api/portfolio_states`, {
    method: "GET",
    credentials: "include",
  });

  if (r.status != 200) {
    return undefined;
  }

  return await r.json();
};

export default function MainChart({ invested }: ChartProps) {
  const { data } = useSWR("portfolioStates", portfolioStatesFetcher);

  console.log(data);

  if (!data) {
    return <></>;
  }

  const convertedData = toChartData(snakeToCamel(data));

  console.log(convertedData);

  const getMax = (): number => {
    let largestY: number | undefined = undefined;

    for (const chartData of convertedData) {
      for (const dataPoint of chartData.data) {
        if (largestY === undefined || dataPoint.y > largestY) {
          largestY = dataPoint.y;
        }
      }
    }

    if (largestY && largestY > invested) {
      return largestY + 50;
    }

    return invested + 50;
  };

  return (
    <>
      <ResponsiveLine
        data={convertedData}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        yScale={{
          type: "linear",
          min: "auto",
          max: getMax(),
          stacked: true,
          reverse: false,
        }}
        axisBottom={null}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "value",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        useMesh={true}
        markers={[
          {
            axis: "y",
            value: invested,
            legend: "Invested",
            lineStyle: {
              stroke: "green",
            },
            textStyle: {
              fill: "green",
            },
          },
        ]}
      />
    </>
  );
}
