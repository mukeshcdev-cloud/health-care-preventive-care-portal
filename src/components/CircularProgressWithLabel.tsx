import { Box, CircularProgress, Typography } from "@mui/material";

interface CircularProgressWithLabelProps {
  value: number;
  color: string;
  label: string;
}

const CircularProgressWithLabel = ({
  value,
  color,
  label,
}: CircularProgressWithLabelProps) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={100}
        size={120}
        thickness={4}
        sx={{
          color: "rgba(0, 0, 0, 0.1)",
          position: "absolute",
        }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={120}
        thickness={4}
        sx={{
          color: color,
          animation: "progress 1.5s ease-in-out",
          "@keyframes progress": {
            "0%": {
              strokeDasharray: "0 100",
            },
          },
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: 700, color: color }}
        >
          {label ?? `${Math.round(value)}`}%
        </Typography>
      </Box>
    </Box>
  );
};

export default CircularProgressWithLabel;
