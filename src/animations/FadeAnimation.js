import { useSpring, animated } from "@react-spring/web";
import React from "react";

function FadeAnimation({children, time = 500, ...rest}) {
  const fade = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: time },
  });
  return <animated.div style={fade} {...rest}>
    {children}
  </animated.div> ;
}

export default FadeAnimation;
