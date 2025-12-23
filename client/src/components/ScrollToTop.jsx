import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ setIsLoading }) => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Show preloader
        if (setIsLoading) setIsLoading(true);

        // Scroll to top
        window.scrollTo(0, 0);

        // Hide preloader after delay
        const timer = setTimeout(() => {
            if (setIsLoading) setIsLoading(false);
        }, 400); // 400ms delay for faster transition

        return () => clearTimeout(timer);
    }, [pathname, setIsLoading]);

    return null;
};

export default ScrollToTop;
