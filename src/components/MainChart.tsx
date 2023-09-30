import { ResponsiveLine } from "@nivo/line";
import { ChartData } from "./Body";

type ChartProps = {
  data: Array<ChartData>;
  invested: number;
};

export default function MainChart({ data, invested }: ChartProps) {
  const getMax = (): number => {
    let largestY: number | undefined = undefined;

    for (const chartData of data) {
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
        data={data}
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
