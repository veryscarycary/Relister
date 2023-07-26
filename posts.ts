import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// const __dirname = dirname(fileURLToPath(import.meta.url));

import { PostInfoFB } from './utils/types';

export default [
  {
    title: 'Powercolor Radeon 6700XT Graphics Card',
    price: '700',
    body: `Selling a Powercolor Red Devil Radeon 6700XT 12GB GDDR6 Video Card. The Red Devil series is renowned for its robust cooling solutions and impressive overclocking capabilities, and the Radeon 6700XT Red Devil continues this tradition. With a boost clock speed of up to 2581 MHz, this graphics card can handle demanding AAA titles and deliver excellent frame rates.

https://www.powercolor.com/product?id=1612497663

Asking $700
`,
    condition: 'Used - Good',
    category: 'Video Cards & Video Devices',
    imagePaths: ['imagePaths/IMG_2725.HEIC', 'imagePaths/IMG_2726.HEIC'].map(
      (chunk) => path.resolve(__dirname + '/..', chunk)
    ),
  },
] as PostInfoFB[];

// title: string;
// body: string;
// price: string;
// city: string;
// category: string;
// imagePaths: string[];
// name: string;
// phoneNumber: string;
// neighborhood: string;
// zipCode: string;
// condition?: string;
// manufacturer?: string;
