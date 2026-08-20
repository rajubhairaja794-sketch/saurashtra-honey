import { resolveImage } from './src/lib/product-images';

console.log("TEST 1:", resolveImage("prod-honeycomb", "https://xyz.com/img.jpg"));
console.log("TEST 2:", resolveImage("prod-honeycomb", ""));
console.log("TEST 3:", resolveImage("prod-honeycomb", null));
console.log("TEST 4:", resolveImage(null, "https://xyz.com/img.jpg"));
