/* eslint-disable react/prop-types */
import styles from "./Gallery.module.css";

import { useEffect, useState } from "react";

const Gallery = ({ images }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    setGalleryImages(images);
  }, [images]);

  return (
    <>
      {galleryImages.map((url) => {
        return url.includes(".webm") ? // (
        //   <video className={styles.videos} key={url} autoPlay loop muted>
        //     <source src={url} type="video/webm" loading="lazy" />
        //     Your browser does not support the video tag.
        //   </video>
        // )
        null : (
          <img className={styles.images} key={url} src={url} alt="image" loading="lazy" />
        );
      })}
    </>
  );
};

export default Gallery;
