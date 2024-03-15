import { useState } from 'react'
import styles from "./style.module.scss";
import Link from 'next/link';
import { motion } from "framer-motion";
import Skeleton from 'react-loading-skeleton';


const MovieCardSmall = ({ data, media_type }: any) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Link key={data.id} href={`/detail?type=${media_type}&id=${data.id}`} className={styles.MovieCardSmall}>
      {/* <img src={process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data.poster_path} alt="" /> */}
      <div className={`${styles.img} skeleton`}>
        <motion.img
          key={data.id}
          src={process.env.NEXT_PUBLIC_TMBD_IMAGE_URL + data.poster_path}
          initial={{ opacity: 0 }}
          animate={{
            opacity: imageLoading ? 0 : 1
          }}
          height="100%"
          width="100%"
          exit="exit"
          className={`${styles.img} skeleton`}
          onLoad={() => { setImageLoading(false); }}
          loading="lazy"
          style={!imageLoading ? { opacity: 1 } : { opacity: 0 }}
        />
      </div>
      <p>{data?.title || data?.name || <Skeleton />}</p>
    </Link>
  )
}

export default MovieCardSmall