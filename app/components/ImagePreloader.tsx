'use client';

import { useEffect } from 'react';
import { projects } from '../constants';
import { preloadAllProjectImages } from '../utils/imagePreloader';

export default function ImagePreloader() {
  useEffect(() => {
    const projectImages = projects.map(p => p.image);
    preloadAllProjectImages(projectImages).catch(console.error);
  }, []);

  return null;
}