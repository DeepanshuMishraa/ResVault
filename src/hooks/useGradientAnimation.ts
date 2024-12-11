import { useEffect } from "react";

export const useGradientAnimation = () => {
  useEffect(() => {
    const colors = [
      "from-purple-600 via-pink-500 to-red-500",
      "from-blue-500 via-teal-500 to-green-500",
      "from-yellow-400 via-orange-500 to-red-500",
    ];
    let currentIndex = 0;

    const animateGradient = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        navbar.classList.remove(...colors);
        currentIndex = (currentIndex + 1) % colors.length;
        navbar.classList.add(colors[currentIndex]);
      }
    };

    const intervalId = setInterval(animateGradient, 5000); 

    return () => clearInterval(intervalId);
  }, []);
};
