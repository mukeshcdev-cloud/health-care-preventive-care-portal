import { Box, Typography } from "@mui/material";
import "./HeroIllustration.css";

const HeroIllustration = () => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: 500,
        textAlign: "center",
      }}
    >
      {/* Main Illustration Container */}
      <Box
        className="hero-illustration"
        sx={{
          position: "relative",
          width: "100%",
          height: 400,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background Circles */}
        <Box
          className="circle-bg circle-1"
          sx={{
            position: "absolute",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(0, 137, 123, 0.1) 0%, rgba(2, 136, 209, 0.1) 100%)",
            animation: "pulse 4s ease-in-out infinite",
          }}
        />
        <Box
          className="circle-bg circle-2"
          sx={{
            position: "absolute",
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "linear-gradient(135deg, rgba(2, 136, 209, 0.05) 0%, rgba(0, 137, 123, 0.05) 100%)",
            animation: "pulse 4s ease-in-out 1s infinite",
          }}
        />

        {/* Doctor/Healthcare Professional SVG */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            width: 280,
            height: 280,
          }}
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%" }}
          >
            {/* Doctor figure */}
            <circle cx="100" cy="60" r="25" fill="#00897B" opacity="0.9" />
            <path
              d="M100 90 L100 140 M100 110 L80 130 M100 110 L120 130"
              stroke="#00897B"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.9"
            />
            <path
              d="M80 140 L80 170 M120 140 L120 170"
              stroke="#00897B"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Medical cross */}
            <rect x="85" y="45" width="30" height="8" fill="white" rx="2" />
            <rect x="96" y="34" width="8" height="30" fill="white" rx="2" />

            {/* Heartbeat line */}
            <path
              className="heartbeat-line"
              d="M20 100 L40 100 L50 80 L60 120 L70 100 L180 100"
              stroke="#0288D1"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.6"
            />

            {/* Floating hearts */}
            <g className="floating-heart heart-1">
              <path
                d="M160 40 C160 35 165 30 170 30 C175 30 180 35 180 40 C180 50 170 55 170 55 C170 55 160 50 160 40 Z"
                fill="#FF6B9D"
                opacity="0.7"
              />
            </g>
            <g className="floating-heart heart-2">
              <path
                d="M25 160 C25 157 28 154 31 154 C34 154 37 157 37 160 C37 166 31 170 31 170 C31 170 25 166 25 160 Z"
                fill="#FF6B9D"
                opacity="0.7"
              />
            </g>

            {/* Medical shield */}
            <g className="medical-shield">
              <path
                d="M170 120 L170 100 L180 95 L190 100 L190 120 C190 130 180 138 180 138 C180 138 170 130 170 120 Z"
                fill="#4FC3F7"
                opacity="0.8"
              />
              <rect x="176" y="108" width="8" height="3" fill="white" rx="1" />
              <rect x="178" y="106" width="4" height="8" fill="white" rx="1" />
            </g>
          </svg>
        </Box>

        {/* Decorative elements */}
        <Box
          className="deco-element deco-1"
          sx={{
            position: "absolute",
            top: "10%",
            right: "10%",
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4FC3F7 0%, #0288D1 100%)",
            opacity: 0.2,
            animation: "float 5s ease-in-out infinite",
          }}
        />
        <Box
          className="deco-element deco-2"
          sx={{
            position: "absolute",
            bottom: "15%",
            left: "5%",
            width: 40,
            height: 40,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4DB6AC 0%, #00897B 100%)",
            opacity: 0.2,
            animation: "float 4s ease-in-out 1s infinite",
          }}
        />
      </Box>

      {/* Hero Text */}
      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(135deg, #00897B 0%, #0288D1 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          Your Health,
          <br />
          Our Priority
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 400, mx: "auto" }}
        >
          Comprehensive wellness and preventive care solutions for a healthier
          tomorrow
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroIllustration;
