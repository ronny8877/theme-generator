import { useState, useEffect } from "react";

/**
 * Custom hook to detect if the current viewport is desktop (md breakpoint and above)
 * Uses Tailwind's md breakpoint (768px)
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === "undefined") return;

    const checkIsDesktop = () => {
      // Using Tailwind's md breakpoint (768px)
      setIsDesktop(window.innerWidth >= 768);
    };

    // Set initial value
    checkIsDesktop();

    // Add event listener
    window.addEventListener("resize", checkIsDesktop);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return isDesktop;
}
