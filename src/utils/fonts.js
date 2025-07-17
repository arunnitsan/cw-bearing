import { Inter, Lato } from 'next/font/google';

// Configure Inter font for general use
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// Configure Lato font (similar to your existing typography fonts)
export const lato = Lato({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
});

// Custom font loader for FontAwesome and other custom fonts
export const customFonts = {
  fontAwesome: {
    src: [
      {
        path: '../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf',
        weight: '900',
        style: 'normal',
      },
    ],
  },
  typography: {
    src: [
      {
        path: '../assets/fonts/typography-font/lato-regular-webfont.ttf',
        weight: '400',
        style: 'normal',
      },
      {
        path: '../assets/fonts/typography-font/lato-italic-webfont.ttf',
        weight: '400',
        style: 'italic',
      },
      {
        path: '../assets/fonts/typography-font/lato-semibold-webfont.ttf',
        weight: '600',
        style: 'normal',
      },
      {
        path: '../assets/fonts/typography-font/lato-medium-webfont.ttf',
        weight: '500',
        style: 'normal',
      },
      {
        path: '../assets/fonts/typography-font/lato-bold-webfont.ttf',
        weight: '700',
        style: 'normal',
      },
    ],
  },
};
