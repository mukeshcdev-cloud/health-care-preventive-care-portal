import { Box } from "@mui/material";
import {
  Favorite,
  LocalHospital,
  FitnessCenter,
  SelfImprovement,
  MonitorHeart,
  Healing,
} from "@mui/icons-material";
import "./FloatingIcons.css";

const FloatingIcons = () => {
  const icons = [
    { Icon: Favorite, delay: 0, position: { top: "10%", left: "5%" } },
    { Icon: LocalHospital, delay: 1, position: { top: "20%", right: "8%" } },
    { Icon: FitnessCenter, delay: 2, position: { top: "60%", left: "10%" } },
    {
      Icon: SelfImprovement,
      delay: 3,
      position: { bottom: "15%", right: "12%" },
    },
    { Icon: MonitorHeart, delay: 4, position: { top: "40%", left: "3%" } },
    { Icon: Healing, delay: 5, position: { bottom: "25%", left: "15%" } },
  ];

  return (
    <>
      {icons.map(({ Icon, delay, position }, index) => (
        <Box
          key={index}
          className="floating-icon"
          sx={{
            position: "absolute",
            ...position,
            animation: `float 6s ease-in-out ${delay}s infinite`,
            opacity: 0.15,
            zIndex: 0,
          }}
        >
          <Icon
            sx={{
              fontSize: { xs: 40, md: 60 },
              color: index % 2 === 0 ? "#00897B" : "#0288D1",
            }}
          />
        </Box>
      ))}
    </>
  );
};

export default FloatingIcons;
