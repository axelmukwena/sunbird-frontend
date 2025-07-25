/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideUpAndFade: {
          from: { opacity: "0", transform: "translateY(2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: "translateX(-2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideDownAndFade: {
          from: { opacity: "0", transform: "translateY(-2px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: "translateX(2px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "linear-loader-one": {
          "0%": {
            left: "-35%",
            right: "100%",
          },
          "60%": {
            left: "100%",
            right: "-90%",
          },
          "100%": {
            left: "100%",
            right: "-90%",
          },
        },
        "linear-loader-two": {
          "0%": {
            left: "-200%",
            right: "100%",
          },
          "60%": {
            left: "107%",
            right: "-8%",
          },
          "100%": {
            left: "107%",
            right: "-8%",
          },
        },
        // Spinner Animation
        "spinner-leaf-fade": {
          "0%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0.15",
          },
        },
      },
      animation: {
        slideUpAndFade: "slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideRightAndFade:
          "slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideDownAndFade:
          "slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        slideLeftAndFade:
          "slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        "linear-loader-one":
          "linear-loader-one 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite",
        "linear-loader-two":
          "linear-loader-two 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite",
        "spinner-leaf-fade": "spinner-leaf-fade 800ms linear infinite",
      },
    },
  },
};
