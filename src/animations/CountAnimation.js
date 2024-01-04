import {  useInView } from "@react-spring/web";

const useCountInView = (toCount, duration = 600, delay = 0) => {
  const [ref, springs] = useInView(() => ({
    from: {
      count: 0,
      opacity: 0,
    },
    to: {
      count: toCount,
      opacity: 1,
    },
    config: { duration: duration, delay: delay },
  }));

  return [ref, springs];
};
export default useCountInView