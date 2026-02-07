
const size = 7       // Scale size (radius) of star circle in pixels
const exponent = -0.28 // Scale exponent for star size, larger = more linear

export const getStarSize = (magnitude) => {
    if (magnitude == null) return 0.1;
    const r = size * Math.exp(exponent * (magnitude + 2));
    return Math.max(r, 0.1);
}