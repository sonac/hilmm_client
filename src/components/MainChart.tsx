import { Button } from "@chakra-ui/react";
import { ResponsiveLine } from "@nivo/line";

export default function MainChart({ data /* see data tab */ }: any) {
  const onClick = async () => {
    const resp = await fetch("http://localhost:8000/api/portfolio-timeline", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(await resp.json());
  };

  const chartTheme = () => {
    return {
      grid: {
        line: {
          stroke: "rgba(0,0,0,0.05)",
        },
      },
      axis: {
        legend: {
          text: {
            fill: "rgba(0,0,0,0.3)",
            fontSize: 12,
          },
        },
        ticks: {
          text: {
            fill: "rgba(0,0,0,0.3)",
            fontSize: 12,
          },
          line: {
            stroke: "rgba(0,0,0,0.3)",
            strokeWidth: 1,
          },
        },
        domain: {
          line: {
            stroke: "rgba(0,0,0,0.1)",
            strokeWidth: 1,
          },
        },
      },
      crosshair: {
        line: {
          stroke: "rgba(0,0,0,0.5)",
          strokeWidth: 1,
          strokeOpacity: 0.35,
        },
      },
    };
  };

  return (
    <>
      <Button onClick={onClick}>Refresh</Button>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisBottom={null}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        theme={chartTheme()}
      />
    </>
  );
}
