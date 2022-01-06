import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {useEffect} from 'react'

const containerVariants = {
  visible: { opacity: 1,y:0, transition: { duration: .4, delay: .1 } },
  hidden: { opacity: 0, y:10}
};

const Container = ({ children,className, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (<motion.div
    // initial={{ y: 10, opacity: 0 }}
    // animate={{ y: 0, opacity: 1 }}
    // transition={{ duration: 0.8, delay }}
    ref={ref}
      animate={controls}
      initial="hidden"
    variants={containerVariants}
    className={className}
  >
    {children}
  </motion.div>)
}

export default Container