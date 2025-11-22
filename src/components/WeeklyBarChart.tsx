import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import type { FC } from "react";
import type { DayOfWeek } from "../constants/days";

// Styled wrapper using MUI theme
const ChartContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: 300,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
}));

type Props = {
  data: { day: DayOfWeek; value: number }[];
};
const WeeklyBarChart: FC<Props> = ({ data }) => {
  const theme = useTheme();
  return (
    <div>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weekly Hours
        </Typography>

        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Tooltip />
              <XAxis />
              {/* ⛔️ No <Legend /> */}
              <Bar dataKey="value" fill="#673AB7" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </div>
  );
};
export default WeeklyBarChart;
