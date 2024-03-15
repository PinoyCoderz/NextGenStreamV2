import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./style.module.scss";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const Carousel = ({ images, setIndex }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("");
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    return () => {
      setInterval(() => {
        handleNext();
      }, 10000);
    }
  }, []);

  const slideVariants = {
    hiddenRight: {
      x: "10%",
      opacity: 0,
    },
    hiddenLeft: {
      x: "-10%",
      opacity: 0,
    },
    visible: {
      x: "0",
      opacity: imageLoaded ? 1 : 0,
      transition: {
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      x: "-10%",
      transition: {
        duration: 0.7,
      },
    },
  };

  const handleNext = () => {
    console.log({ images });

    setDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : (prevIndex + 1) % (images.length)
    );
    setIndex((prevIndex: number) =>
      prevIndex === images.length - 1 ? 0 : (prevIndex + 1) % (images.length)
    );
  };

  const handlePrevious = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
    setIndex((prevIndex: number) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.carousel_images}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={direction === "right" ? "hiddenRight" : "hiddenLeft"}
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className={`skeleton`}
            onLoad={() => { setImageLoaded(true); }}
            loading="lazy"
            style={imageLoaded ? { opacity: 1 } : { opacity: 0 }}
          />
        </AnimatePresence>
        <div className={styles.slide_direction}>
          <BsCaretLeftFill
            className={styles.left}
            onClick={handlePrevious} />

          <BsCaretRightFill className={styles.right}
            onClick={handleNext} />
        </div>
      </div>
    </div >
  );
};
export default Carousel;