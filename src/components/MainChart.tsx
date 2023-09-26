import { Button } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";

export default function MainChart({ data, invested }: any) {
  const onClick = async () => {
    const resp = await fetch("/api/portfolio-timeline", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(await resp.json());
  };

  return (
    <>
      <Button onClick={onClick}>Refresh</Button>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
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
