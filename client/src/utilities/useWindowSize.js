import React from "react";


export default function useWindowSize(){
const isWindow = typeof window !== "undefined";
const [windowSize, setWindowSize] = React.useState ({
    width: isWindow ? 1200 : window.innerWidth, 
    height: isWindow ? 800 : window.innerHeight,
});

function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height:window.innerHeight});
}

React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

return () => {
    window.removeEventListener("resize", changeWindowSize);
};
}, []);

return windowSize;   
}


