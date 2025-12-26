
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  category: string;
  isFeatured: boolean;
  rating: number;
  numReviews: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Elegant Ebook Template',
    description:
      'A professionally designed ebook template to make your content shine.',
    price: 49,
    image: '/src/assets/products/ebook-template.png',
    seller: 'DesignSource',
    category: 'Templates',
    isFeatured: true,
    rating: 4.8,
    numReviews: 124,
  },
  {
    id: '2',
    name: 'Minimalist UI Kit',
    description:
      'A comprehensive UI kit for designing clean and modern interfaces.',
    price: 79,
    image: '/src/assets/products/ui-kit.png',
    seller: 'PixelPerfect',
    category: 'UI Kits',
    isFeatured: true,
    rating: 4.9,
    numReviews: 245,
  },
  {
    id: '3',
    name: 'Pro Course Bundle',
    description:
      'Unlock your potential with our complete bundle of professional courses.',
    price: 199,
    image: '/src/assets/products/course-bundle.png',
    seller: 'Learnify',
    category: 'Courses',
    isFeatured: true,
    rating: 4.7,
    numReviews: 89,
  },
    {
    id: '4',
    name: 'Social Media Pack',
    description: 'A huge pack of social media templates for all platforms.',
    price: 39,
    image: '/public/placeholder.svg',
    seller: 'SocialSavvy',
    category: 'Templates',
    isFeatured: false,
    rating: 4.6,
    numReviews: 97,
  },
  {
    id: '5',
    name: 'Web Development Bootcamp',
    description: 'A complete bootcamp to become a full-stack web developer.',
    price: 299,
    image: '/public/placeholder.svg',
    seller: 'CodeMaster',
    category: 'Courses',
    isFeatured: false,
    rating: 4.9,
    numReviews: 412,
  },
  {
    id: '6',
    name: 'Mobile App UI Kit',
    description: 'A stunning UI kit for designing beautiful mobile apps.',
    price: 69,
    image: '/public/placeholder.svg',
    seller: 'AppDesignCo',
    category: 'UI Kits',
    isFeatured: false,
    rating: 4.8,
    numReviews: 156,
  },
  {
    id: '7',
    name: 'Photography Masterclass',
    description: 'Learn the art of photography from industry professionals.',
    price: 149,
    image: '/public/placeholder.svg',
    seller: 'PhotoPro',
    category: 'Courses',
    isFeatured: false,
    rating: 4.7,
    numReviews: 72,
  },
  {
    id: '8',
    name: 'Branding Identity Kit',
    description: 'Everything you need to create a powerful brand identity.',
    price: 99,
    image: '/public/placeholder.svg',
    seller: 'BrandBuilders',
    category: 'Templates',
    isFeatured: false,
    rating: 4.9,
    numReviews: 189,
  },
];
