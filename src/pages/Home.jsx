import { useCallback, useEffect, useState } from 'react';
import Gallery from '../components/Gallery/Gallery';
import styles from './Home.module.css';

import IGLogo from '../assets/IGLogo.svg';
import WhatsappLogo from '../assets/WhatsappLogo.svg';
import mainLogo from '../assets/mainLogo.png';
import navBurger from '../assets/navBurger.svg';

const Home = () => {
  const [matches, setMatches] = useState(window.matchMedia('(min-width: 768px)').matches);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (e) => setMatches(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [dir, setDir] = useState(() => import.meta.glob(`../assets/gallery/party/*.{jpg,jpeg,png,webp,webm}`));
  const [galleryImages, setGalleryImages] = useState([]);
  const [imageCache, setImageCache] = useState({});

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = Object.keys(dir).map(async (img) => {
        if (imageCache[img]) {
          return imageCache[img];
        } else {
          const data = await dir[img]();
          const imageUrl = data.default;
          setImageCache((prevCache) => ({ ...prevCache, [img]: imageUrl }));
          return imageUrl;
        }
      });
      const loadedImages = await Promise.all(imagePromises);
      setGalleryImages(loadedImages);
    };
    loadImages();
  }, [dir, imageCache]);

  const handleGallerySwap = useCallback((activeGallery) => {
    let newDir;
    switch (activeGallery) {
      case 'party':
        newDir = import.meta.glob(`../assets/gallery/party/*.{jpg,jpeg,png,webp,webm}`);
        break;
      case 'wedding':
        newDir = import.meta.glob(`../assets/gallery/wedding/*.{jpg,jpeg,png,webp,webm}`);
        break;
      case 'mature':
        newDir = import.meta.glob(`../assets/gallery/mature/*.{jpg,jpeg,png,webp,webm}`);
        break;
      case 'beauty clean':
      default:
        newDir = import.meta.glob(`../assets/gallery/beauty clean/*.{jpg,jpeg,png,webp,webm}`);
    }
    setDir(newDir);
  }, []);

  const [isMNMActive, setIsMNMActive] = useState(`${styles.MNMhidden}`);
  const [mobileNavOpacity, setMobileNavOpacity] = useState(`${styles.mobileNavTrans}`);
  const handleBurgerClick = useCallback(() => {
    setIsMNMActive(isMNMActive === `${styles.MNMhidden}` ? `${styles.MNMactive}` : `${styles.MNMhidden}`);
    setMobileNavOpacity(
      mobileNavOpacity === `${styles.mobileNavTrans}` ? `${styles.mobileNavOpaque}` : `${styles.mobileNavTrans}`
    );
  }, [isMNMActive, mobileNavOpacity]);

  const returnNavHeader = () => {
    return (
      <div className={styles.mainLogo}>
        <img src={mainLogo} alt="Main Logo" />
      </div>
    );
  };

  return (
    <>
      <div className={styles.homeContainer}>
        {matches ? (
          // | ----- DESKTOP VIEW ----- |
          <div className={styles.navContainer}>
            <div className={styles.navInnerContainer}>
              {returnNavHeader()}
              <div className={styles.navSubHeader}>Jakarta | Indonesia</div>
              <div className={styles.scrollable}>
                <div className={styles.navList}>
                  <ul>
                    <li onClick={() => handleGallerySwap('party')}>Party</li>
                    <li onClick={() => handleGallerySwap('wedding')}>Wedding</li>
                    <li onClick={() => handleGallerySwap('mature')}>Mature</li>
                    <li onClick={() => handleGallerySwap('beauty clean')}>Beauty Clean</li>
                    {/* <li>Behind the Brushes</li>  Disabled behind the brushes until filled*/}
                  </ul>
                </div>
                <div className={styles.navContactLinks}>
                  <a href="" target="blank">
                    <img src={IGLogo} alt="Instagram Logo" />
                  </a>
                  <a href="" target="blank">
                    <img src={WhatsappLogo} alt="Whatsapp Logo" />
                  </a>
                </div>
                <div className={styles.navFooter}>Copyright @ All rights reserved.</div>
              </div>
            </div>
          </div>
        ) : (
          // | ----- MOBILE VIEW ----- |
          <>
            <div className={`${styles.mobileNavContainer} ${mobileNavOpacity}`}>
              {returnNavHeader()}
              <img
                className={styles.mobileNavBurger}
                onClick={handleBurgerClick}
                src={navBurger}
                alt="Navigation Burger"
              />
            </div>
            <div className={`${styles.mobileNavMenu} ${isMNMActive}`}>
              <div className={styles.navList}>
                <ul>
                  <li
                    onClick={() => {
                      handleGallerySwap('party');
                      handleBurgerClick();
                    }}>
                    Party
                  </li>
                  <div className={styles.mobileNavMenuLines} />
                  <li
                    onClick={() => {
                      handleGallerySwap('wedding');
                      handleBurgerClick();
                    }}>
                    Wedding
                  </li>
                  <div className={styles.mobileNavMenuLines} />
                  <li
                    onClick={() => {
                      handleGallerySwap('mature');
                      handleBurgerClick();
                    }}>
                    Mature
                  </li>
                  <div className={styles.mobileNavMenuLines} />
                  <li
                    onClick={() => {
                      handleGallerySwap('beauty clean');
                      handleBurgerClick();
                    }}>
                    Beauty Clean
                  </li>
                  {/* <div className={styles.mobileNavMenuLines} />
                  <li>Behind the Brushes</li>  Disabled behind the brushes until filled */}
                </ul>
              </div>
              <div className={styles.mobileNavFooter}>
                <div className={styles.navContactLinks}>
                  <a href="" target="blank">
                    <img src={IGLogo} alt="Instagram Logo" />
                  </a>
                  <a href="" target="blank">
                    <img src={WhatsappLogo} alt="Whatsapp Logo" />
                  </a>
                </div>
                <div className={styles.navFooter}>Copyright @ All rights reserved.</div>
              </div>
            </div>
          </>
        )}
        <div className={styles.galleryContainer}>
          <div className={styles.gallery}>
            <Gallery images={galleryImages} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
