'use client';

import { useState, useEffect } from 'react';

export function useImagePreloader(imageSrcs: string[]) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: Set<string> = new Set();

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // Check if image is already cached
        const img = new window.Image();
        
        img.onload = () => {
          if (isMounted) {
            loadedImages.add(src);
            setLoadingProgress((loadedImages.size / imageSrcs.length) * 100);
          }
          resolve();
        };
        
        img.onerror = () => {
          console.error(`Failed to load image: ${src}`);
          // Still resolve to not block other images
          if (isMounted) {
            loadedImages.add(src);
            setLoadingProgress((loadedImages.size / imageSrcs.length) * 100);
          }
          resolve();
        };
        
        // Force load with crossorigin
        img.crossOrigin = 'anonymous';
        img.decoding = 'async';
        img.fetchPriority = 'high';
        img.src = src;
      });
    };

    const loadAllImages = async () => {
      try {
        await Promise.all(imageSrcs.map(src => preloadImage(src)));
        if (isMounted) {
          setImagesLoaded(true);
        }
      } catch (error) {
        console.error('Error preloading images:', error);
        if (isMounted) {
          setImagesLoaded(true); // Still show content even if some images fail
        }
      }
    };

    loadAllImages();

    return () => {
      isMounted = false;
    };
  }, [imageSrcs]);

  return { imagesLoaded, loadingProgress };
}