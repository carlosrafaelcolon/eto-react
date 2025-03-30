export const breakpointStops: { [key: string]: number } = {
    // Deprecated names
    smaller: 590,
    smallish: 750,
    small: 900,
    medium: 1100,
    phone_small: 360,
    // Default/base screen width
    phone_regular: 410,
    phone_large: 590,
    tablet_small: 750,
    tablet_regular: 900,
    desktop_regular: 1100,
    desktop_large: 1400
  };
  const mediaQueries: { [key: string]: string } = Object.fromEntries(
    Object.entries(breakpointStops).map(([name, size]) => [
      name,
      `@media (min-width: ${size}px)`,
    ])
  );
  export default mediaQueries;  
