import { useEffect, useState } from "react";

export default function useWindowDimensions(){
    const [Dimensions, setDimensions] = useState(320);

    useEffect(() => {
        function handleResize(){
            setDimensions(320);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return Dimensions;
};