export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadAllProjectImages = async (images: string[]): Promise<void> => {
  const preloadPromises = images.map(src => preloadImage(src));
  await Promise.all(preloadPromises);
};