import { FC } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Row, Col } from "antd";

interface DonutChartProps {
  ageStats: Record<string, number>;
}

const colors = [
  "#3AAFA9",
  "#2C7873",
  "#76D7C4",
  "#A2DED0",
  "#E5E8E8",
  "#E74C3C",
  "#AED6F1",
];

const fakeData = [
  { label: "0-1", value: 40 },
  { label: "1-2", value: 24 },
  { label: "2-3", value: 12 },
  { label: "3-4", value: 10 },
  { label: "4-5", value: 8 },
  { label: "5-6", value: 4 },
  { label: "6-7", value: 2 },
];

const DonutChart: FC<DonutChartProps> = ({ ageStats }) => {
  let data = Object.entries(ageStats).map(([label, value]) => ({
    label,
    value,
  }));

  const total = data.reduce((acc, cur) => acc + cur.value, 0);
  if (total === 0) {
    data = fakeData;
  }

  return (
    <Row align="middle">
      <Col>
        <PieChart width={200} height={200}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={80}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Pie>
        </PieChart>
      </Col>
      <Col style={{ marginLeft: "51px" }}>
        {data.map((item, index) => (
          <Row
            key={index}
            style={{ alignItems: "center", marginBottom: "6px" }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                backgroundColor: colors[index],
                marginRight: 8,
                borderRadius: 2,
              }}
            />
            <span style={{ marginRight: 10 }}>{item.label}</span>
            <span style={{ fontWeight: "bold" }}>{item.value}%</span>
          </Row>
        ))}
      </Col>
    </Row>
  );
};

export default DonutChart;
