import { useState, useEffect, useMemo, useRef } from 'react'
import './App.css'
import { attachmentProducts, catalogProducts, featuredProducts } from './data/catalog'
import ProductCard from './components/ProductCard'
import StoreEmbed from './components/StoreEmbed'

// Image references
const heroLoader = '/src/assets/hero.png';
const heroVideo = '/media/hero-wheel-loader.mp4';
const aboutKonstructzMachinery = '/about-skoop-typhon-banner.png';
const stoneCrusher = '/src/assets/stone_crusher.png';
const constructionBg = '/src/assets/construction_bg.png';
const loaderAction = '/src/assets/loader_action.png';
const typhonFactoryEngineer = '/src/assets/typhon_factory_engineer.png';
const loaderCarryingGravel = '/src/assets/loader_carrying_gravel.png';
const trackLoaderFarm = '/src/assets/track_loader_farm.png';
const dumperConstruction = '/src/assets/dumper_construction.png';
const tigerWatermark = '/src/assets/tiger_watermark.png';
const tigerLogo = '/src/assets/tiger_logo.png';
const konstructzLogo = '/src/assets/konstructz_logo.png';
const supportHero = '/src/assets/support_hero.png';
const supportCallCenter = '/src/assets/support_call_center.png';

const systemAttachmentSlides = [
  {
    name: 'Lawnmower Tool',
    module: 'SEC-08',
    registry: 'TYPH-8023',
    image: '/system-attachments/lawnmower-tool.png'
  },
  {
    name: 'KUVUO Excavator',
    module: 'EXC-27',
    registry: 'TYPH-8011',
    image: '/system-attachments/kuvuo-excavator.png'
  },
  {
    name: 'Skoop II Loader',
    module: 'LDX-18',
    registry: 'TYPH-8015',
    image: '/system-attachments/skoop-loader.png'
  },
  {
    name: 'Spider One Towable Excavator',
    module: 'SPN-10',
    registry: 'TYPH-8016',
    image: '/system-attachments/spider-one.png'
  },
  {
    name: 'Stomp V950 Track Loader',
    module: 'STP-95',
    registry: 'TYPH-8017',
    image: '/system-attachments/stomp-v950.png'
  },
  {
    name: 'ThunderDump 180',
    module: 'DMP-18',
    registry: 'TYPH-8018',
    image: '/system-attachments/thunderdump-180.png'
  },
  {
    name: 'Stomp V980 Compact Track Loader',
    module: 'STP-98',
    registry: 'TYPH-8019',
    image: '/system-attachments/stomp-v980.png'
  },
  {
    name: 'StoneKrusher K3',
    module: 'KSH-03',
    registry: 'TYPH-8020',
    image: '/system-attachments/stonekrusher-k3.png'
  }
];

const brandLogos = [
  {
    name: 'STONEKRUSHER',
    src: '/src/assets/machine-logos/stonekrusher.png',
    reflection: '/src/assets/machine-logos/stonekrusher-reflection.png'
  },
  {
    name: 'STOMP',
    src: '/src/assets/machine-logos/stomp.png',
    reflection: '/src/assets/machine-logos/stomp-reflection.png'
  },
  {
    name: 'SPIDER ONE',
    src: '/src/assets/machine-logos/spider-one.png',
    reflection: '/src/assets/machine-logos/spider-one-reflection.png'
  },
  {
    name: 'ThunderDump',
    textLogo: 'ThunderDump'
  },
  {
    name: 'KUVUO',
    src: '/src/assets/machine-logos/kuvuo.png',
    reflection: '/src/assets/machine-logos/kuvuo-reflection.png'
  }
];

const engineLogos = [
  { name: 'Honda Engine', src: '/src/assets/engine-logos/honda-power-equipment.png' },
  { name: 'Yanmar Engine', src: '/src/assets/engine-logos/yanmar-engine.png' },
  { name: 'Kubota Engine', src: '/src/assets/engine-logos/kubota.png' },
  { name: 'B & S Engine', src: '/src/assets/engine-logos/briggs-stratton.png' },
  { name: 'Lithium Battery', src: '/src/assets/engine-logos/battery-express.png' },
  { name: 'Lead Acid Battery', src: '/src/assets/engine-logos/recycle-battery.png' }
];

const blogPosts = [
  {
    slug: 'excavator-maintenance-tips',
    title: 'Excavator maintenance tips: How to keep your excavator running smoothly.',
    seoTitle: 'Excavator Maintenance Tips | KONSTRUCTZ Blog',
    seoDescription: 'Practical excavator maintenance tips for keeping compact machines reliable, efficient, and ready for daily jobsite work.',
    category: 'Equipment Care',
    date: 'June 12, 2026',
    publishedDate: '2026-06-12',
    updatedDate: '2026-06-17',
    desc: 'Learn our top maintenance habits for keeping compact excavators reliable without slowing down the workday.',
    sections: [
      {
        h2: 'Daily checks before startup',
        body: 'Start with fluids, visible leaks, track tension, attachment pins, grease points, and hydraulic hoses. A short walkaround catches small problems before they become downtime.'
      },
      {
        h2: 'Hydraulics and attachments',
        body: 'Keep couplers clean, inspect quick-connect fittings, and match hydraulic flow to the attachment. Clean connections protect pumps, seals, and valves from avoidable wear.',
        h3: 'Keep grease on schedule',
        h3Body: 'Buckets, thumbs, augers, and breakers all depend on pivot points staying lubricated. Grease after hard use and before long storage.'
      },
      {
        h2: 'Track and undercarriage care',
        body: 'Remove packed soil and debris after use, especially around sprockets and rollers. Correct track tension improves traction and reduces strain on drive components.'
      }
    ]
  },
  {
    slug: 'choosing-wheel-loaders-and-skid-steers',
    title: 'Choosing the right loader: A guide to wheel loaders and skid steers.',
    seoTitle: 'Choosing Wheel Loaders and Mini Skid Steers | KONSTRUCTZ Blog',
    seoDescription: 'Compare wheel loaders and mini skid steers for loading, grading, material handling, landscaping, and tight jobsite work.',
    category: 'Buyer Guide',
    date: 'May 28, 2026',
    publishedDate: '2026-05-28',
    updatedDate: '2026-06-17',
    desc: 'Compare loader styles, lift needs, maneuverability, and jobsite conditions before choosing your next machine.',
    sections: [
      {
        h2: 'Start with the jobsite',
        body: 'Wheel loaders suit repeated loading, yard work, and material handling. Mini skid steers shine when access is tight and attachments need to change quickly.'
      },
      {
        h2: 'Think about lift and traction',
        body: 'Match operating weight, rated capacity, tire or track style, and lift height to the material you move most often.',
        h3: 'Attachment range matters',
        h3Body: 'Buckets, forks, augers, tillers, grapples, and trenchers can turn one compact loader into a flexible daily machine.'
      },
      {
        h2: 'Plan for service and storage',
        body: 'Choose a machine that fits your trailer, storage area, maintenance routine, and operator comfort needs.'
      }
    ]
  },
  {
    slug: 'heavy-machinery-jobsite-safety',
    title: 'Safety on the job site: Tips for operating heavy machinery.',
    seoTitle: 'Heavy Machinery Jobsite Safety Tips | KONSTRUCTZ Blog',
    seoDescription: 'Jobsite safety tips for compact construction equipment operators, including checks, visibility, communication, and attachment handling.',
    category: 'Safety',
    date: 'May 15, 2026',
    publishedDate: '2026-05-15',
    updatedDate: '2026-06-17',
    desc: 'Use simple operating habits to improve visibility, communication, and machine control around active work areas.',
    sections: [
      {
        h2: 'Make communication visible',
        body: 'Use a spotter when sightlines are limited, agree on hand signals, and keep workers clear of swing radius, travel paths, and attachment movement.'
      },
      {
        h2: 'Respect terrain and load limits',
        body: 'Avoid side loading, sudden turns on slopes, and carrying material higher than needed. Stable machine movement protects both operators and nearby crews.',
        h3: 'Secure attachments first',
        h3Body: 'Confirm pins, couplers, hydraulic lines, and safety locks before putting a tool under load.'
      },
      {
        h2: 'Shut down with intention',
        body: 'Lower attachments, release hydraulic pressure, set the brake, and remove the key when leaving the operator station.'
      }
    ]
  },
  {
    slug: 'future-of-construction-technology',
    title: 'Future of construction: How technology is changing the industry.',
    seoTitle: 'Future of Construction Technology | KONSTRUCTZ Blog',
    seoDescription: 'Explore how compact machinery, better controls, efficient engines, and attachment systems are changing construction workflows.',
    category: 'Industry',
    date: 'April 30, 2026',
    publishedDate: '2026-04-30',
    updatedDate: '2026-06-17',
    desc: 'Compact machines, smarter attachments, and better controls are changing how small crews tackle serious work.',
    sections: [
      {
        h2: 'Compact machines are doing bigger work',
        body: 'Modern mini excavators, loaders, dumpers, and attachments help smaller crews complete tasks that once required larger fleets.'
      },
      {
        h2: 'Controls are becoming more operator-friendly',
        body: 'Cleaner layouts, pilot controls, better visibility, and faster attachment changes make equipment easier to learn and more productive on repeat tasks.',
        h3: 'Efficiency is a competitive edge',
        h3Body: 'Fuel use, transport size, service access, and uptime all affect the real cost of ownership.'
      },
      {
        h2: 'Attachments expand the machine',
        body: 'A strong attachment catalog gives contractors more ways to dig, load, grade, drill, break, sweep, and clear with the same base machine.'
      }
    ]
  }
];

// High-fidelity SVG Fallbacks for a clean blueprint look when images are missing
const WheelLoaderSvg = () => (
  <svg viewBox="0 0 100 60" className="machinery-svg-fallback" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="28" cy="42" r="10" fill="#111211" stroke="var(--accent)" strokeWidth="2"/>
    <circle cx="28" cy="42" r="3" fill="var(--accent)"/>
    <circle cx="72" cy="42" r="10" fill="#111211" stroke="var(--accent)" strokeWidth="2"/>
    <circle cx="72" cy="42" r="3" fill="var(--accent)"/>
    <path d="M 20 42 L 80 42 L 72 26 L 35 26 Z" fill="rgba(96, 122, 78, 0.15)" stroke="var(--accent)" strokeWidth="2"/>
    <path d="M 40 26 L 46 12 L 60 12 L 66 26 Z" stroke="var(--text-dark-bg-secondary)" strokeWidth="1.5"/>
    <path d="M 62 30 L 82 28 L 88 42 L 96 42 L 92 20 L 70 20" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M 88 42 L 98 42 L 94 32 Z" fill="var(--accent)"/>
  </svg>
);

const SkidSteerSvg = () => (
  <svg viewBox="0 0 100 60" className="machinery-svg-fallback" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="25" y="38" width="50" height="8" rx="4" fill="var(--accent)"/>
    <circle cx="32" cy="42" r="5" fill="#111" stroke="var(--text-dark-bg-secondary)"/>
    <circle cx="68" cy="42" r="5" fill="#111" stroke="var(--text-dark-bg-secondary)"/>
    <path d="M 30 38 L 70 38 L 65 18 L 38 18 Z" fill="rgba(255,255,255,0.03)" stroke="var(--accent)" strokeWidth="2"/>
    <path d="M 28 38 L 14 38 L 8 28 Z" fill="rgba(96, 122, 78, 0.2)" stroke="var(--accent)" strokeWidth="2"/>
  </svg>
);

const StoneCrusherSvg = () => (
  <svg viewBox="0 0 100 60" className="machinery-svg-fallback" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="15" y="35" width="70" height="15" rx="2" fill="rgba(96, 122, 78, 0.1)" stroke="var(--accent)" strokeWidth="2"/>
    <circle cx="35" cy="25" r="10" stroke="var(--accent)" strokeWidth="3"/>
    <line x1="35" y1="25" x2="35" y2="15" stroke="var(--accent)" strokeWidth="2"/>
    <path d="M 50 20 L 85 10 L 80 35 Z" fill="rgba(255, 255, 255, 0.05)" stroke="var(--accent)" strokeWidth="1.5"/>
    <line x1="10" y1="45" x2="90" y2="45" stroke="var(--text-dark-bg-secondary)" strokeWidth="2"/>
  </svg>
);

const ExcavatorSvg = () => (
  <svg viewBox="0 0 100 60" className="machinery-svg-fallback" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="35" y="42" width="45" height="8" rx="3" fill="#111" stroke="var(--accent)" strokeWidth="2"/>
    <path d="M 45 42 L 70 42 L 65 24 L 50 24 Z" fill="rgba(96, 122, 78, 0.15)" stroke="var(--accent)" strokeWidth="2"/>
    <path d="M 52 24 L 20 15 L 10 32 Z" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M 10 32 L 6 40 L 18 38 Z" fill="var(--accent)"/>
  </svg>
);

export default function App() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeKonstructzSubcategory, setActiveKonstructzSubcategory] = useState('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState('home');
  const [inventorySearchQuery, setInventorySearchQuery] = useState('');
  const [inventorySortBy, setInventorySortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);
  const [activeGalleryImage, setActiveGalleryImage] = useState(null);
  const [detailTab, setDetailTab] = useState('overview');
  const [activeAttachmentMenu, setActiveAttachmentMenu] = useState('Mini Excavators (2.5 Tons)');
  const [activeAttachmentFilter, setActiveAttachmentFilter] = useState('All Attachments');
  const [activeAttachmentSubcategory, setActiveAttachmentSubcategory] = useState('All');
  const [attachmentsDropdownOpen, setAttachmentsDropdownOpen] = useState(false);
  const [addedCartItem, setAddedCartItem] = useState(null);
  const [storedCsvName, setStoredCsvName] = useState('');
  const [storedCsvText, setStoredCsvText] = useState('');
  const [csvPreviewRows, setCsvPreviewRows] = useState([]);
  const [csvPreviewHeaders, setCsvPreviewHeaders] = useState([]);
  const [csvStatus, setCsvStatus] = useState('');
  const [checkoutItem, setCheckoutItem] = useState(null);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const carouselGridRef = useRef(null);

  const scrollCarousel = (direction) => {
    if (carouselGridRef.current) {
      const card = carouselGridRef.current.querySelector('.carousel-card');
      if (card) {
        const cardWidth = card.offsetWidth;
        const scrollAmount = direction === 'next' ? (cardWidth + 24) : -(cardWidth + 24);
        carouselGridRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav-item-dropdown')) {
        setDropdownOpen(false);
        setAttachmentsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (window.location.hash && currentView === 'home') {
      if (window.location.hash.startsWith('#!')) {
        return;
      }

      const el = document.getElementById(window.location.hash.substring(1));
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [currentView]);

  const parseCsvPreview = (text) => {
    const rows = [];
    let row = [];
    let value = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"' && inQuotes && nextChar === '"') {
        value += '"';
        i += 1;
      } else if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        row.push(value.trim());
        value = '';
      } else if ((char === '\n' || char === '\r') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i += 1;
        }
        row.push(value.trim());
        if (row.some(cell => cell.length > 0)) {
          rows.push(row);
        }
        row = [];
        value = '';
      } else {
        value += char;
      }
    }

    row.push(value.trim());
    if (row.some(cell => cell.length > 0)) {
      rows.push(row);
    }

    return {
      headers: rows[0] || [],
      rows: rows.slice(1, 11)
    };
  };

  useEffect(() => {
    const savedText = localStorage.getItem('konstructzProductCsvText') || '';
    const savedName = localStorage.getItem('konstructzProductCsvName') || '';

    if (savedText) {
      const preview = parseCsvPreview(savedText);
      setStoredCsvText(savedText);
      setStoredCsvName(savedName || 'stored-products.csv');
      setCsvPreviewHeaders(preview.headers);
      setCsvPreviewRows(preview.rows);
      setCsvStatus(`Loaded ${savedName || 'stored-products.csv'} from browser storage.`);
    }
  }, []);
  
  // Image error states for fallbacks
  const [heroImageError, setHeroImageError] = useState(false);
  const [crusherImageError, setCrusherImageError] = useState(false);
  const [activeSystemAttachment, setActiveSystemAttachment] = useState(0);
  const [systemSlideDirection, setSystemSlideDirection] = useState('next');

  // FAQ Expand state
  const [openFaqId, setOpenFaqId] = useState(null);

  const products = catalogProducts;
  const homeProducts = featuredProducts;
  const attachments = attachmentProducts;
  const activeSystemSlide = systemAttachmentSlides[activeSystemAttachment];
  const goToPreviousSystemAttachment = () => {
    setSystemSlideDirection('previous');
    setActiveSystemAttachment((current) => (
      current === 0 ? systemAttachmentSlides.length - 1 : current - 1
    ));
  };
  const goToNextSystemAttachment = () => {
    setSystemSlideDirection('next');
    setActiveSystemAttachment((current) => (
      current === systemAttachmentSlides.length - 1 ? 0 : current + 1
    ));
  };

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setSystemSlideDirection('next');
      setActiveSystemAttachment((current) => (
        current === systemAttachmentSlides.length - 1 ? 0 : current + 1
      ));
    }, 4500);

    return () => window.clearInterval(slideTimer);
  }, []);

  const categoryLabels = {
    'Mini Excavator': 'Mini Excavators',
    'Wheel Loader': 'Wheel Loaders',
    'Skid Steer': 'Mini Skid Steers',
    'Trencher': 'Trenchers',
    'Stone Crusher': 'Stone Crushers',
    'Mini Dumper': 'Mini Dumpers',
    Forklift: 'Forklifts',
    'Road Roller': 'Road Rollers',
    'Scissor Lifts': 'Scissor Lifts',
    Backhoe: 'Backhoes',
    'Konstructz': 'KONSTRUCTZ'
  };
  const konstructzSubcategories = [
    'Backhoe Loader',
    'Dumper',
    'Excavator',
    'Towable Excavator',
    'Stone Crasher',
    'Trenchers',
    'Wheel Loader',
    'Skid Steer'
  ];
  const categoryOrder = [
    'Konstructz',
    'Mini Excavator',
    'Wheel Loader',
    'Skid Steer',
    'Forklift',
    'Road Roller',
    'Scissor Lifts',
    'Backhoe'
  ];
  const productCategories = categoryOrder.filter(category =>
    products.some(product => product.category === category)
  );
  const equipmentMenuItems = [
    { id: 'Mini Excavator', label: 'Mini Excavators' },
    { id: 'Skid Steer', label: 'Mini Skid Steers' },
    { id: 'Forklift', label: 'Forklifts' },
    { id: 'Wheel Loader', label: 'Wheel Loaders' },
    { id: 'Road Roller', label: 'Road Rollers' },
    { id: 'Scissor Lifts', label: 'Scissor Lifts' }
  ];
  const inventoryTabs = [
    { id: 'All', label: 'All' },
    ...productCategories.map(category => ({
      id: category,
      label: categoryLabels[category] || category
    })),
    ...(attachments.length ? [{ id: 'Attachments', label: 'Attachments' }] : [])
  ];

  const filteredProducts = homeProducts;

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(String(item.price || '').replace(/[^0-9.]/g, ''));
    return Number.isFinite(price) ? total + (price * item.quantity) : total;
  }, 0);
  const hasQuotedCartItems = cartItems.some(item => !Number.isFinite(parseFloat(String(item.price || '').replace(/[^0-9.]/g, ''))));

  const handleAddToCart = (item) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
    setAddedCartItem(item);
  };

  const updateCartQuantity = (itemId, quantity) => {
    const nextQuantity = Math.max(1, quantity);
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: nextQuantity } : item
    ));
  };

  const removeCartItem = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const requestCartQuote = () => {
    const productList = cartItems
      .map(item => `${item.quantity} x ${item.name}`)
      .join(', ');

    setAddedCartItem(null);
    navigate('contact', { inquiry: 'Get a quote' });
    setFormValues(prev => ({
      ...prev,
      inquiryType: 'Get a quote',
      message: productList ? `I would like a quote for: ${productList}` : prev.message
    }));
  };

  const getStoreHash = (item) => {
    const storeUrl = item?.checkoutUrl || item?.externalUrl || item?.hash || '';
    const hashIndex = storeUrl.indexOf('#!');

    return hashIndex >= 0 ? storeUrl.slice(hashIndex) : '';
  };

  const openCheckoutPage = (item) => {
    const storeHash = getStoreHash(item);
    const itemId = item?.slug || item?.id || '';
    const checkoutUrl = `${window.location.pathname}?page=checkout&id=${encodeURIComponent(itemId)}${storeHash}`;

    window.history.pushState({}, '', checkoutUrl);
    setCheckoutItem(item);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setCsvStatus('Please choose a CSV file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      const preview = parseCsvPreview(text);

      localStorage.setItem('konstructzProductCsvText', text);
      localStorage.setItem('konstructzProductCsvName', file.name);
      setStoredCsvText(text);
      setStoredCsvName(file.name);
      setCsvPreviewHeaders(preview.headers);
      setCsvPreviewRows(preview.rows);
      setCsvStatus(`Saved ${file.name} with ${Math.max(0, preview.rows.length)} preview rows.`);
    };
    reader.onerror = () => {
      setCsvStatus('Could not read that CSV file.');
    };
    reader.readAsText(file);
  };

  const handleClearCsv = () => {
    localStorage.removeItem('konstructzProductCsvText');
    localStorage.removeItem('konstructzProductCsvName');
    setStoredCsvText('');
    setStoredCsvName('');
    setCsvPreviewHeaders([]);
    setCsvPreviewRows([]);
    setCsvStatus('Stored product CSV cleared.');
  };

  const handleDownloadCsv = () => {
    if (!storedCsvText) {
      setCsvStatus('No product CSV is stored yet.');
      return;
    }

    const blob = new Blob([storedCsvText], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = storedCsvName || 'konstructz-products.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleProductDetail = (item) => {
    setSelectedProduct(item);
    setActiveGalleryImage(item.image || (item.images && item.images[0]) || null);
    setAddedCartItem(null);
    setCheckoutItem(null);
    setCurrentView('product-detail');
    window.scrollTo(0,0);
  };

  const getFallbackSvg = (cat) => {
    switch (cat) {
      case 'Mini Excavator': return <ExcavatorSvg />;
      case 'Wheel Loader': return <WheelLoaderSvg />;
      case 'Skid Steer': return <SkidSteerSvg />;
      case 'Trencher': return <SkidSteerSvg />;
      case 'Mini Dumper': return <WheelLoaderSvg />;
      case 'Road Roller': return <StoneCrusherSvg />;
      case 'Stone Crusher': return <StoneCrusherSvg />;
      case 'Forklift': return <WheelLoaderSvg />;
      case 'Scissor Lifts': return <SkidSteerSvg />;
      case 'Backhoe': return <ExcavatorSvg />;
      case 'Konstructz': return <WheelLoaderSvg />;
      default: return <WheelLoaderSvg />;
    }
  };

  const allInventory = useMemo(() => [
    ...products.map(p => ({ ...p, type: 'Machinery', sortWeight: parseFloat(p.weight) || 0 })),
    ...attachments.map(a => ({ 
      id: `a-${a.id}`, 
      name: a.name, 
      category: 'Attachments', 
      weight: a.weight, 
      engine: 'N/A', 
      cap: a.specs, 
      price: a.price,
      image: a.image,
      externalUrl: a.externalUrl,
      checkoutUrl: a.checkoutUrl,
      hash: a.hash,
      fitmentCategory: a.fitmentCategory,
      subcategory: a.subcategory,
      type: 'Attachment', 
      sortWeight: parseFloat(a.weight) / 1000 || 0 
    }))
  ], [products, attachments]);

  const carouselProducts = homeProducts;

  // Helper to change view and update the URL query parameters (for crawlability)
  const navigate = (view, additionalParams = {}) => {
    const params = new URLSearchParams();
    params.set('page', view);
    Object.entries(additionalParams).forEach(([k, v]) => {
      if (v !== null && v !== undefined) {
        params.set(k, v);
      }
    });
    
    const hash = view === 'store' || view === 'checkout' || !window.location.hash.startsWith('#!')
      ? window.location.hash
      : '';
    const newUrl = `${window.location.pathname}?${params.toString()}${hash}`;
    window.history.pushState({}, '', newUrl);

    // Sync state
    setCurrentView(view);
    if (view === 'contact' && additionalParams.inquiry) {
      setFormValues(prev => ({ ...prev, inquiryType: additionalParams.inquiry }));
    }
    if (additionalParams.id) {
      const item = allInventory.find(p => p.id === additionalParams.id || p.slug === additionalParams.id);
      if (item) {
        setSelectedProduct(item);
        setActiveGalleryImage(item.image || (item.images && item.images[0]) || null);
      }

      const post = blogPosts.find(blogPost => blogPost.slug === additionalParams.id);
      if (post) {
        setSelectedBlogPost(post);
      }
    }
    if (additionalParams.category) {
      setActiveCategory(additionalParams.category);
      if (additionalParams.category !== 'Konstructz') {
        setActiveKonstructzSubcategory('All');
      }
    }
    if (additionalParams.subcategory !== undefined) {
      setActiveKonstructzSubcategory(additionalParams.subcategory);
    }
    window.scrollTo(0, 0);
  };

  // Sync state with URL query parameters on mount and back/forward browser buttons
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const requestedView = params.get('page') || 'home';
      const view = requestedView === 'store' ? 'home' : requestedView;
      const productId = params.get('id');
      const blogPostId = params.get('id');
      const category = params.get('category');
      const subcategory = params.get('subcategory');
      const search = params.get('search');

      if (view !== 'store' && view !== 'checkout' && window.location.hash.startsWith('#!')) {
        window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`);
      }

      if (requestedView === 'store') {
        window.history.replaceState({}, '', `${window.location.pathname}?page=home`);
      }

      if ((view === 'product-detail' || view === 'checkout') && productId) {
        const item = allInventory.find(p => p.id === productId || p.slug === productId);
        if (item) {
          setSelectedProduct(item);
          setActiveGalleryImage(item.image || (item.images && item.images[0]) || null);
          setCheckoutItem(view === 'checkout' ? item : null);
          setCurrentView(view);
        } else {
          setCurrentView('home');
        }
      } else if (view === 'blog-post' && blogPostId) {
        const post = blogPosts.find(blogPost => blogPost.slug === blogPostId);
        if (post) {
          setSelectedBlogPost(post);
          setCurrentView('blog-post');
        } else {
          setCurrentView('home');
        }
      } else {
        setCurrentView(view);
        if (view === 'contact') {
          const inquiry = params.get('inquiry');
          if (inquiry) {
            setFormValues(prev => ({ ...prev, inquiryType: inquiry }));
          }
        }
        if (category) {
          setActiveCategory(category);
          if (category !== 'Konstructz') {
            setActiveKonstructzSubcategory('All');
          }
        } else {
          setActiveCategory('All');
          setActiveKonstructzSubcategory('All');
        }
        if (subcategory) {
          setActiveKonstructzSubcategory(subcategory);
        } else {
          setActiveKonstructzSubcategory('All');
        }
        if (view === 'all-products' && search) {
          setInventorySearchQuery(search);
        }
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, [allInventory]);

  // Dynamic Page Title, Meta Description, and JSON-LD Structured Data
  useEffect(() => {
    const siteUrl = 'https://konstructzmachinery.com';
    const siteName = 'KONSTRUCTZ';
    const defaultImage = `${siteUrl}/favicon.svg`;
    let title = 'KONSTRUCTZ | Premium Construction Equipment';
    let description = 'Explore the future of construction with KONSTRUCTZ. Discover our premium line of mini excavators, wheel loaders, attachments, and stone crushers built for contractors who demand performance and durability.';
    let publishedDate = null;
    let modifiedDate = null;
    let canonicalPath = '/';
    let pageType = 'website';
    let robotsContent = 'index, follow, max-image-preview:large';
    let image = defaultImage;
    
    if (currentView === 'all-products') {
      title = 'Heavy Machinery Inventory | KONSTRUCTZ';
      description = 'Browse our complete inventory of heavy construction machinery. Premium mini excavators, loaders, rollers, and stone crushers available for sale.';
      canonicalPath = activeCategory && activeCategory !== 'All'
        ? `/?page=all-products&category=${encodeURIComponent(activeCategory)}`
        : '/?page=all-products';
    } else if (currentView === 'blog') {
      title = 'KONSTRUCTZ Blog | Machinery Guides, News & Field Tips';
      description = 'Read KONSTRUCTZ machinery guides, industry news, equipment tips, safety advice, and maintenance articles for construction crews.';
      canonicalPath = '/?page=blog';
    } else if (currentView === 'topic') {
      title = 'Help Center & Topics | KONSTRUCTZ';
      description = 'Find answers about KONSTRUCTZ machinery warranties, delivery, payment, maintenance, spare parts, and support topics.';
      canonicalPath = '/?page=topic';
    } else if (currentView === 'support') {
      title = 'Service & Support | KONSTRUCTZ';
      description = 'Get official KONSTRUCTZ heavy machinery user manuals, documents, and technical service support. Apply for online self-service repairs and inquire about value-added services.';
      canonicalPath = '/?page=support';
      image = `${siteUrl}${supportHero}`;
    } else if (currentView === 'attachments') {
      title = 'Excavator & Mini Skid Steer Attachments | Konstructz';
      description = 'High-performance heavy machinery attachments built for real jobsite work. Search buckets, augers, hammers, rakes, and landscape tools.';
      canonicalPath = '/?page=attachments';
    } else if (currentView === 'about') {
      title = 'About Us | KONSTRUCTZ & KOUEGIE Series';
      description = 'Learn about KONSTRUCTZ, our premium KOUEGIE compact series, and our commitment to vision, mission, and quality support.';
      canonicalPath = '/?page=about';
      image = `${siteUrl}${typhonFactoryEngineer}`;
    } else if (currentView === 'contact') {
      title = 'Contact Us | KONSTRUCTZ';
      description = 'Get in touch with the KONSTRUCTZ sales, support, and technical team. Request quotes, ask questions, or visit our Detroit, MI location.';
      canonicalPath = '/?page=contact';
    } else if (currentView === 'cart') {
      title = 'Product Cart | KONSTRUCTZ';
      description = 'Review selected KONSTRUCTZ machinery and attachments, adjust quantities, and request a quote from our sales team.';
      canonicalPath = '/?page=cart';
      robotsContent = 'noindex, nofollow';
    } else if (currentView === 'checkout' && checkoutItem) {
      title = `Checkout ${checkoutItem.name} | KONSTRUCTZ`;
      description = `Complete checkout for ${checkoutItem.name}.`;
      canonicalPath = `/?page=checkout&id=${encodeURIComponent(checkoutItem.slug || checkoutItem.id)}`;
      robotsContent = 'noindex, nofollow';
    } else if (currentView === 'product-detail' && selectedProduct) {
      title = `${selectedProduct.name} | KONSTRUCTZ`;
      description = selectedProduct.desc || selectedProduct.fullDesc || `${selectedProduct.name} specs, pricing, and availability from KONSTRUCTZ. Built for contractors and operators.`;
      canonicalPath = `/?page=product-detail&id=${encodeURIComponent(selectedProduct.slug || selectedProduct.id)}`;
      pageType = 'product';
      image = selectedProduct.image || defaultImage;
    } else if (currentView === 'blog-post' && selectedBlogPost) {
      title = selectedBlogPost.seoTitle || `${selectedBlogPost.title} | KONSTRUCTZ Blog`;
      description = selectedBlogPost.seoDescription || selectedBlogPost.desc;
      publishedDate = selectedBlogPost.publishedDate;
      modifiedDate = selectedBlogPost.updatedDate || selectedBlogPost.publishedDate;
      canonicalPath = `/?page=blog-post&id=${encodeURIComponent(selectedBlogPost.slug)}`;
      pageType = 'article';
    } else if (currentView === 'store-data') {
      title = 'Product Data Store | Konstructz Admin';
      description = 'Internal product CSV upload and preview utility for KONSTRUCTZ product data.';
      canonicalPath = '/?page=store-data';
      robotsContent = 'noindex, nofollow';
    }

    document.title = title;
    const canonicalUrl = `${siteUrl}${canonicalPath}`;
    const shortDescription = description.substring(0, 160);
    const metaImage = image.startsWith('http')
      ? image
      : `${siteUrl}${image.startsWith('/') ? image : `/${image}`}`;
    
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) {
      descMeta.setAttribute('content', shortDescription);
    }

    const upsertMeta = (selector, attributes) => {
      let meta = document.querySelector(selector);
      if (!meta) {
        meta = document.createElement('meta');
        document.head.appendChild(meta);
      }
      Object.entries(attributes).forEach(([key, value]) => meta.setAttribute(key, value));
    };

    const upsertLink = (selector, attributes) => {
      let link = document.querySelector(selector);
      if (!link) {
        link = document.createElement('link');
        document.head.appendChild(link);
      }
      Object.entries(attributes).forEach(([key, value]) => link.setAttribute(key, value));
    };

    const removeMeta = (selector) => {
      const meta = document.querySelector(selector);
      if (meta) {
        meta.remove();
      }
    };

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonicalUrl });
    upsertMeta('meta[name="robots"]', { name: 'robots', content: robotsContent });
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: pageType });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: shortDescription });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: metaImage });
    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: shortDescription });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: metaImage });

    if (publishedDate) {
      upsertMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: publishedDate
      });
      upsertMeta('meta[property="article:modified_time"]', {
        property: 'article:modified_time',
        content: modifiedDate
      });
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
    }

    // Dynamic JSON-LD Structured Data
    let schemaData = null;

    if (currentView === 'product-detail' && selectedProduct) {
      schemaData = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        'name': selectedProduct.name,
        'image': metaImage,
        'description': (selectedProduct.desc || selectedProduct.fullDesc || `Specification of ${selectedProduct.name}`).substring(0, 300),
        'brand': {
          '@type': 'Brand',
          'name': 'Konstructz'
        },
        'category': selectedProduct.category || selectedProduct.fitmentCategory || 'Machinery',
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'USD',
          'price': parseFloat(String(selectedProduct.price || '').replace(/[^0-9.]/g, '')) || 0,
          'availability': 'https://schema.org/InStock',
          'url': canonicalUrl
        }
      };
    } else if (currentView === 'blog-post' && selectedBlogPost) {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        'headline': selectedBlogPost.title,
        'description': (selectedBlogPost.seoDescription || selectedBlogPost.desc).substring(0, 300),
        'image': 'https://konstructzmachinery.com/favicon.svg',
        'datePublished': selectedBlogPost.publishedDate,
        'dateModified': selectedBlogPost.updatedDate || selectedBlogPost.publishedDate,
        'author': {
          '@type': 'Organization',
          'name': 'Konstructz'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'KONSTRUCTZ',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://konstructzmachinery.com/favicon.svg'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': canonicalUrl
        }
      };
    } else {
      schemaData = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        'name': 'KONSTRUCTZ',
        'image': 'https://konstructzmachinery.com/favicon.svg',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1200 Industrial Parkway, Suite A',
          'addressLocality': 'Detroit',
          'addressRegion': 'MI',
          'postalCode': '48201',
          'addressCountry': 'US'
        },
        'telephone': '+1-555-234-9800',
        'email': 'sales@konstructzmachinery.com',
        'url': siteUrl
      };
    }

    const breadcrumbItems = [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl }
    ];

    if (currentView !== 'home') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: currentView === 'product-detail' && selectedProduct
          ? selectedProduct.name
          : currentView === 'blog-post' && selectedBlogPost
            ? selectedBlogPost.title
            : title.split(' | ')[0],
        item: canonicalUrl
      });
    }

    const baseSchemaGraph = [
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        'name': siteName,
        'url': siteUrl,
        'logo': {
          '@type': 'ImageObject',
          'url': defaultImage
        },
        'contactPoint': {
          '@type': 'ContactPoint',
          'telephone': '+1-555-234-9800',
          'contactType': 'sales',
          'areaServed': 'US',
          'availableLanguage': 'English'
        }
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        'url': siteUrl,
        'name': siteName,
        'publisher': {
          '@id': `${siteUrl}/#organization`
        },
        'potentialAction': {
          '@type': 'SearchAction',
          'target': `${siteUrl}/?page=all-products&search={search_term_string}`,
          'query-input': 'required name=search_term_string'
        }
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        'url': canonicalUrl,
        'name': title,
        'description': shortDescription,
        'isPartOf': {
          '@id': `${siteUrl}/#website`
        }
      },
      {
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbItems
      }
    ];

    schemaData = {
      '@context': 'https://schema.org',
      '@graph': schemaData ? [...baseSchemaGraph, schemaData] : baseSchemaGraph
    };

    const oldSchema = document.getElementById('seo-schema-jsonld');
    if (oldSchema) {
      oldSchema.remove();
    }

    if (schemaData) {
      const script = document.createElement('script');
      script.id = 'seo-schema-jsonld';
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }
  }, [currentView, selectedProduct, selectedBlogPost, checkoutItem, activeCategory]);


  const filteredInventory = allInventory.filter(item => {
    const matchesCategory = activeCategory === 'All' 
      ? item.type === 'Machinery' 
      : item.category === activeCategory;
    const matchesKonstructzSubcategory = activeCategory !== 'Konstructz' ||
      activeKonstructzSubcategory === 'All' ||
      item.subcategory === activeKonstructzSubcategory;

    const matchesSearch = item.name.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(inventorySearchQuery.toLowerCase()) ||
                          (item.fitmentCategory && item.fitmentCategory.toLowerCase().includes(inventorySearchQuery.toLowerCase())) ||
                          (item.subcategory && item.subcategory.toLowerCase().includes(inventorySearchQuery.toLowerCase())) ||
                          (item.engine && item.engine.toLowerCase().includes(inventorySearchQuery.toLowerCase())) ||
                          (item.cap && item.cap.toLowerCase().includes(inventorySearchQuery.toLowerCase()));

    return matchesCategory && matchesKonstructzSubcategory && matchesSearch;
  });

  const sortedInventory = [...filteredInventory].sort((a, b) => {
    switch (inventorySortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'weight-asc':
        return a.sortWeight - b.sortWeight;
      case 'weight-desc':
        return b.sortWeight - a.sortWeight;
      default:
        return 0;
    }
  });

  const attachmentMenus = [
    {
      id: 'Mini Excavators (2.5 Tons)',
      label: 'Attachments for Mini Excavators (2.5 Tons)',
      children: ['X2 Attachments', 'XXV Attachments']
    },
    {
      id: 'Mini Excavators (2 Tons and Below)',
      label: 'Attachments for Mini Excavators (2 Tons and Below)',
      children: ['Compact Excavator Attachments']
    },
    {
      id: 'Skid Steer Attachments',
      label: 'Mini Skid Steer Attachments',
      children: ['Compact Series (501-507)', 'Standard Series (X1300, 509)']
    }
  ];

  const attachmentFilters = ['All Attachments', ...attachmentMenus.map(menu => menu.id)];
  const attachmentFilterLabels = {
    'Skid Steer Attachments': 'Mini Skid Steer Attachments'
  };
  const visibleAttachments = attachments.filter(item => (
    (activeAttachmentFilter === 'All Attachments' || item.fitmentCategory === activeAttachmentFilter) &&
    (activeAttachmentSubcategory === 'All' || item.subcategory === activeAttachmentSubcategory)
  ));



  const faqs = [
    {
      id: 1,
      question: 'What kind of warranty comes with the machines?',
      answer: 'All our brand-new heavy machinery comes with an industry-leading 3-Year / 3000-hour comprehensive warranty. This covers major components including the engine, hydraulic pump, and main control valve.'
    },
    {
      id: 2,
      question: 'What is the return policy for machinery?',
      answer: 'We offer a 100% satisfaction guarantee. If any select machinery fails to meet the operational standards set in your agreement within the first 14 days or 25 operating hours, we will exchange the unit or offer a full refund.'
    },
    {
      id: 3,
      question: 'Do you provide shipping and delivery?',
      answer: 'Yes, we have reliable freight partners offering door-to-door delivery. We manage all shipping, loading, customs documentation, and logistics to ensure your equipment arrives safely at your job site.'
    },
    {
      id: 4,
      question: 'Are there financing options available?',
      answer: 'Yes, we partner with top industrial lenders to provide flexible financing, lease-to-own plans, and seasonal payment plans tailored to your construction business budget.'
    },
    {
      id: 5,
      question: 'Are there any hidden fees or extra costs for purchases?',
      answer: 'No, we provide completely transparent pricing. All standard import duties, local taxes, and freight handling charges are detailed clearly in your written quote before order finalization.'
    }
  ];

  return (
    <div className="app-container">
      {/* HEADER / NAVBAR */}
      <header className={`main-header dark-bg ${currentView === 'home' ? 'home-header' : ''}`}>
        <div className="header-content">
          <nav className="nav-links nav-links-left">
            <a href="?page=home" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a>
            <div className="nav-item-dropdown">
              <button 
                className="nav-dropdown-trigger-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                  setAttachmentsDropdownOpen(false);
                }}
              >
                Equipment ▾
              </button>
              <div className={`dropdown-menu equipment-dropdown glass-panel ${dropdownOpen ? 'show' : ''}`}>
                {/* Konstructz with sub-menu */}
                <div className="equipment-menu-item-with-submenu">
                  <a
                    href="?page=all-products&category=Konstructz"
                    className="equipment-menu-link has-submenu"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('all-products', { category: 'Konstructz', subcategory: 'All' });
                      setDropdownOpen(false);
                    }}
                  >
                    <span>KONSTRUCTZ</span>
                    <span className="submenu-arrow">›</span>
                  </a>
                  
                  {/* Flyout Submenu */}
                  <div className="equipment-submenu glass-panel">
                    <a
                      href="?page=all-products&category=Konstructz&subcategory=All"
                      className="equipment-submenu-link view-all-link"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('all-products', { category: 'Konstructz', subcategory: 'All' });
                        setDropdownOpen(false);
                      }}
                    >
                      View All KONSTRUCTZ
                    </a>
                    {konstructzSubcategories.map(sub => (
                      <a
                        key={sub}
                        href={`?page=all-products&category=Konstructz&subcategory=${encodeURIComponent(sub)}`}
                        className="equipment-submenu-link"
                        onClick={(e) => {
                          e.preventDefault();
                          navigate('all-products', { category: 'Konstructz', subcategory: sub });
                          setDropdownOpen(false);
                        }}
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Other simple links */}
                {equipmentMenuItems.map(item => (
                  <a
                    key={item.id}
                    href={`?page=all-products&category=${encodeURIComponent(item.id)}`}
                    className="equipment-menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('all-products', { category: item.id });
                      setDropdownOpen(false);
                    }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="nav-item-dropdown">
              <button
                className="nav-dropdown-trigger-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setAttachmentsDropdownOpen(!attachmentsDropdownOpen);
                  setDropdownOpen(false);
                }}
              >
                Attachments ▾
              </button>
              <div className={`attachments-mega-menu glass-panel ${attachmentsDropdownOpen ? 'show' : ''}`}>
                <div className="attachments-menu-left">
                  {attachmentMenus.map(menu => (
                    <button
                      key={menu.id}
                      className={`attachment-menu-item ${activeAttachmentMenu === menu.id ? 'active' : ''}`}
                      onMouseEnter={() => setActiveAttachmentMenu(menu.id)}
                      onClick={() => {
                        setActiveAttachmentMenu(menu.id);
                        setActiveAttachmentFilter(menu.id);
                        setActiveAttachmentSubcategory('All');
                        navigate('attachments');
                        setAttachmentsDropdownOpen(false);
                      }}
                    >
                      <span>{menu.label}</span>
                      <span>›</span>
                    </button>
                  ))}
                </div>
                <div className="attachments-menu-right">
                  {attachmentMenus.find(menu => menu.id === activeAttachmentMenu)?.children.map(child => (
                    <button
                      key={child}
                      className="attachment-submenu-item"
                      onClick={() => {
                        setActiveAttachmentFilter(activeAttachmentMenu);
                        setActiveAttachmentSubcategory(child);
                        navigate('attachments');
                        setAttachmentsDropdownOpen(false);
                      }}
                    >
                      {child}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <a href="?page=blog" onClick={(e) => { e.preventDefault(); navigate('blog'); }}>Blog</a>
          </nav>

          <a href="?page=home" className="logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
            <img src={konstructzLogo} alt="KONSTRUCTZ" className="logo-img" />
          </a>

          <div className="header-right-col">
            <nav className="nav-links nav-links-right">
              <a href="?page=topic" onClick={(e) => { e.preventDefault(); navigate('topic'); }}>Topic</a>
              <a href="?page=support" onClick={(e) => { e.preventDefault(); navigate('support'); }}>Support</a>
              <a href="?page=about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>About Us</a>
              <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>Contact</a>
            </nav>

            <div className="header-actions">
              <div className={`search-container ${searchOpen ? 'open' : ''}`}>
                <button className="search-btn" onClick={() => setSearchOpen(!searchOpen)} aria-label="Search">
                  <svg className="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', display: 'block', color: 'var(--text-dark-bg-secondary)' }}>
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
                {searchOpen && (
                  <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setInventorySearchQuery(searchQuery);
                        navigate('all-products');
                        setSearchOpen(false);
                      }
                    }}
                    className="search-input"
                  />
                )}
              </div>
              <div
                className="cart-badge"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  navigate('cart');
                  setAddedCartItem(null);
                }}
              >
                <svg className="action-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px', display: 'block', color: 'var(--text-dark-bg-secondary)' }}>
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                <span className="badge-count">{cartCount}</span>
              </div>
              <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="cta-button nav-cta">Get Quote</a>
            </div>
          </div>
        </div>
      </header>

      {currentView === 'home' ? (
        <>
          {/* HERO SECTION */}
          <section id="home" className="hero-section dark-bg">
            {!heroImageError ? (
              <video
                className="hero-background-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroLoader}
                aria-label="Konstructz heavy wheel loader in motion"
                onError={() => setHeroImageError(true)}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            ) : (
              <img src={heroLoader} alt="KONSTRUCTZ Heavy Wheel Loader" className="hero-background-image" />
            )}
            <div className="hero-overlay"></div>
            <div className="section-content hero-full-content">
              <div className="hero-copy">
                <p className="hero-kicker">Compact Wheel Loader</p>
                <h1 className="hero-display-title">SKOOP II</h1>
                <p className="hero-body">
                  Future-ready machinery for construction, earthmoving, and industrial crews who need dependable power in a compact footprint.
                </p>
                <div className="hero-actions-row">
                  <a href="#products" className="hero-action hero-action-outline">Learn More</a>
                  <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="hero-action hero-action-primary">Request A Quotation</a>
                </div>
              </div>

              <div className="hero-bottom-row">
                <div className="hero-awards">
                  <div className="hero-award-box">
                    <strong>1Y</strong>
                    <span>Warranty</span>
                  </div>
                  <div className="hero-award-box">
                    <strong>24/7</strong>
                    <span>Support</span>
                  </div>
                </div>

                <div className="hero-progress" aria-hidden="true">
                  <span className="active"></span>
                  <span></span>
                </div>

                <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="hero-floating-contact">Contact</a>
              </div>
            </div>
          </section>

      {/* Brand Logos Infinite Marquee Section */}
      <section className="brand-logo-marquee-section">
        <div className="brand-logo-marquee-content">
          <div className="brand-logo-marquee-window">
            <div className="brand-logo-fade brand-logo-fade-left"></div>
            <div className="brand-logo-fade brand-logo-fade-right"></div>

            <div className="brand-logo-marquee-track">
              {[0, 1, 2].map(group => (
                <div className="brand-logo-set" key={`brand-logo-set-${group}`}>
                  {brandLogos.map((logo, idx) => (
                    <div className="brand-logo-item" key={`brand-logo-${group}-${idx}`}>
                      {logo.textLogo ? (
                        <span className="brand-logo-textmark">{logo.textLogo}</span>
                      ) : (
                        <img src={logo.src} alt={logo.name} className="brand-logo-img" />
                      )}
                      <div className="brand-logo-reflection" aria-hidden="true">
                        {logo.textLogo ? (
                          <span className="brand-logo-textmark">{logo.textLogo}</span>
                        ) : (
                          <img src={logo.reflection || logo.src} alt="" className="brand-logo-img" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ATTACHMENTS SHOWCASE */}
      <section className="system-attachments-section dark-bg">
        <div className="section-content system-attachments-content">
          <div className="system-attachments-heading">
            <span className="system-kicker">// CORE ECOSYSTEM CONFIGURATOR</span>
            <h2>NEW PRODUCT FEATURED</h2>
            <span className="system-heading-line" aria-hidden="true"></span>
          </div>

          <div className={`system-showcase-card slide-${systemSlideDirection}`}>
            <div className="system-image-stage">
              <img
                key={activeSystemSlide.image}
                src={activeSystemSlide.image}
                alt={`${activeSystemSlide.name} in operation`}
                className="system-showcase-image"
              />
              <div className="system-image-shade"></div>
            </div>

            <div className="system-showcase-footer">
              <div key={`${activeSystemSlide.registry}-copy`} className="system-slide-copy">
                <p className="system-module">// SYSTEM BLUEPRINT MODULE: {activeSystemSlide.module}</p>
                <h3>{activeSystemSlide.name}</h3>
              </div>
              <div className="system-action-group">
                <span className="system-registry">REGISTRY // {activeSystemSlide.registry}</span>
                <button type="button" className="system-analyze-button">
                  Analyze Hardware
                </button>
              </div>
            </div>
          </div>

          <div className="system-carousel-controls" aria-label="System attachments carousel controls">
            <button type="button" className="system-nav-button" onClick={goToPreviousSystemAttachment} aria-label="Previous attachment">
              ‹
            </button>
            <div className="system-dots">
              {systemAttachmentSlides.map((slide, index) => (
                <button
                  key={slide.registry}
                  type="button"
                  className={`system-dot ${index === activeSystemAttachment ? 'active' : ''}`}
                  onClick={() => setActiveSystemAttachment(index)}
                  aria-label={`Show ${slide.name}`}
                  aria-pressed={index === activeSystemAttachment}
                />
              ))}
            </div>
            <button type="button" className="system-nav-button" onClick={goToNextSystemAttachment} aria-label="Next attachment">
              ›
            </button>
          </div>
        </div>
      </section>

      {/* NEW PRODUCT SECTION */}
      <section id="products" className="products-section white-bg">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title text-black">New Product</h2>
          </div>

          <div className="products-carousel">
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                item={p}
                badge={categoryLabels[p.category] || p.category}
                eyebrow="Equipment"
                specs={[
                  { label: 'Op. Weight', value: p.weight },
                  { label: 'Engine', value: p.engine },
                  { label: 'Price', value: p.price || p.cap }
                ]}
                fallback={!heroImageError ? (
                  <img
                    src={heroLoader}
                    alt={p.name}
                    className="card-image"
                    onError={() => setHeroImageError(true)}
                  />
                ) : (
                  getFallbackSvg(p.category)
                )}
                onView={handleProductDetail}
                onAddToCart={handleAddToCart}
              />
            ))}
            {filteredProducts.length === 0 && (
              <div className="no-products-msg">
                <p>No products found under this category.</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* MACHINE USE CASES SECTION */}
      <section className="machine-use-section light-sage-bg">
        <div className="section-content machine-use-content">
          <div className="machine-use-header">
            <span className="machine-use-kicker"><span></span> What These Machines Do</span>
            <h2>One compact machine. Real worksite work.</h2>
            <p>
              Built around the jobs small contractors, landscapers and property owners actually face - not edge-case fleet scenarios.
            </p>
          </div>

          <div className="machine-use-layout">
            <div className="machine-use-feature">
              <span className="machine-use-feature-tag"><span></span> Featured Capability</span>
              <h3>Built for real worksites - from residential lots to working farms.</h3>
              <p>
                KUVUO compact machines are designed for the in-between work full-size equipment can't reach: tight-access digs, drainage runs, fence line clearing, gravel work and finish grading. One platform, one quick-hitch, many billable jobs.
              </p>
              <div className="machine-use-stats">
                <div>
                  <strong>4T</strong>
                  <span>Operating weight class</span>
                </div>
                <div>
                  <strong>6+</strong>
                  <span>Compatible attachment types</span>
                </div>
              </div>
            </div>

            <div className="machine-use-grid">
              {[
                ['01', 'Excavation & Trenching', 'Footings, utility trenches, drainage runs and small foundations.'],
                ['02', 'Loading & Material Handling', 'Move dirt, gravel, mulch and debris between trucks and stockpiles.'],
                ['03', 'Farmland & Property', 'Brush clearing, irrigation lines, fence post setting and land reshaping.'],
                ['04', 'Road & Driveway Work', 'Shoulder cuts, driveway leveling, sub-base prep and patch repairs.'],
                ['05', 'Desilting & Drainage', 'Clear ditches and culverts, maintain field drainage to keep water moving.'],
                ['06', 'Small Construction', 'Site prep, backfill, landscaping and finish-grade for residential builds.']
              ].map(([number, title, body]) => (
                <div className="machine-use-card" key={number}>
                  <span>Use - {number}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ENGINE BRANDS SECTION */}
      <section className="engine-brands-section white-bg border-top">
        <div className="section-content">
          <div className="brands-showcase">
            <span className="brands-pill">Power By</span>
            <h3 className="brands-title">Built on power. Driven by trust.</h3>
            <p className="brands-subtitle">
              Premium industrial machinery engineered for durability, performance, and demanding jobsites.
            </p>
            <div className="brands-grid">
              {engineLogos.map(logo => (
                <div className="brand-card-item" key={logo.name}>
                  <div className="engine-logo-panel">
                    <img src={logo.src} alt={logo.name} className="engine-logo-img" />
                  </div>
                  <div className="engine-logo-label">{logo.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section white-bg">
        <div className="section-content">
          <div className="about-section-header">
            <span className="about-eyebrow">About KONSTRUCTZ</span>
            <h2>Machinery built for dependable jobsite performance.</h2>
            <p>Compact equipment, practical support, and rugged capability for crews that need machines ready to work.</p>
          </div>
          <div className="about-grid">
            <div className="about-text-card olive-bg">
              <span className="section-tag-white">ABOUT KONSTRUCTZ HEAVY MACHINERY</span>
              <h3>Reliable machines for construction, industrial, and earthmoving projects.</h3>
              <p className="about-para-white">
                At KONSTRUCTZ, we provide powerful and reliable heavy machinery for all your construction, industrial, and earthmoving projects. Our machines are engineered with advanced technology, robust durability, and safety features to handle the demanding tasks of your job site.
              </p>
            </div>
            <div className="about-image-wrapper">
              <img 
                src={aboutKonstructzMachinery} 
                alt="Konstructz Skoop II Typhon wheel loader on a construction site" 
                className="about-image"
              />
              <div className="image-border-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: STONE CRUSHER */}
      <section id="featured" className="featured-section white-bg border-top">
        <div className="section-content">
          <div className="featured-grid">
            <div className="featured-text-area">
              <span className="black-pill-tag">New Product</span>
              <h2 className="featured-title text-black">New Konstructz <span className="highlight-olive">Stone Crusher</span></h2>
              <p className="featured-desc">
                Delivering strength, durability, and modern technology. Our crushers crush rocks faster and more efficiently. Built for contractors who demand reliable performance.
              </p>

              <div className="features-pill-list">
                <div className="feature-pill">✓ High Efficiency</div>
                <div className="feature-pill">✓ Strong Crushing Capacity</div>
                <div className="feature-pill">✓ Reliable Performance</div>
                <div className="feature-pill">✓ Built for Tough Sites</div>
              </div>

              <div className="featured-buttons">
                <a href="#specs" className="cta-button white-pill-dark-border">Get Specification</a>
                 <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="cta-button white-pill-dark-border">Contact Sales</a>
              </div>
            </div>

            <div className="featured-image-wrapper-with-specs">
              <div className="featured-image-wrapper">
                {!crusherImageError ? (
                  <img 
                    src={stoneCrusher} 
                    alt="KONSTRUCTZ Stone Crusher" 
                    className="featured-image"
                    onError={() => setCrusherImageError(true)}
                  />
                ) : (
                  <StoneCrusherSvg />
                )}
              </div>
              <div className="spec-grid-overlay">
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">📏</span>
                  <p>Feed Opening</p>
                  <strong>250 x 400 mm</strong>
                </div>
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">🪨</span>
                  <p>Max Feed Size</p>
                  <strong>210 mm</strong>
                </div>
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">⚡</span>
                  <p>Capacity</p>
                  <strong>15-45 t/h</strong>
                </div>
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">🔌</span>
                  <p>Power</p>
                  <strong>15-30 kW</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA PARALLAX SECTION */}
      <section className="cta-banner-section" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url(${constructionBg})` }}>
        <div className="section-content">
          <div className="banner-content">
            <span className="black-pill-tag align-center">Construction Machinery</span>
            <h2>The Future of Construction <span className="highlight-green">Starts Here</span></h2>
            <p>
              Designed for contractors, builders, and operators who demand better. Built to last, ready for results every day.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="faq-section white-bg">
        <div className="section-content">
          <div className="section-header">
            <h2 className="section-title text-black">Frequently <span className="highlight-olive">Asked Questions</span></h2>
          </div>

          <div className="faq-accordion">
            {faqs.map(faq => (
              <div key={faq.id} className={`faq-item ${openFaqId === faq.id ? 'open' : ''}`}>
                <button className="faq-question-btn" onClick={() => setOpenFaqId(openFaqId === faq.id ? null : faq.id)}>
                  <span className="faq-question text-black">{faq.question}</span>
                  <span className="faq-arrow">{openFaqId === faq.id ? '▼' : '▶'}</span>
                </button>
                <div className="faq-answer-container">
                  <p className="faq-answer">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Support features */}
          <div className="support-features">
            <div className="support-item border-card">
              <span className="sup-icon">🏭</span>
              <h4>Manufacturer Direct</h4>
              <p>Direct pricing from factory floor</p>
            </div>
            <div className="support-item solid-green-card">
              <span className="sup-icon">🤝</span>
              <h4>Manufacturer Support</h4>
              <p>Onsite configuration & guidance</p>
            </div>
            <div className="support-item border-card">
              <span className="sup-icon">🌍</span>
              <h4>Global Shipping</h4>
              <p>Customs clearance & delivery</p>
            </div>
            <div className="support-item border-card">
              <span className="sup-icon">🔒</span>
              <h4>100% Secure Transaction</h4>
              <p>Fully certified transaction portal</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE STATS & TESTIMONIALS */}
      <section className="stats-section white-bg border-top">
        <div className="section-content">
          <div className="stats-header">
            <h2 className="text-black">Built for those who build the world.</h2>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card black-bg">
              <div className="stat-number">100%</div>
              <div className="stat-label">Customer satisfaction</div>
            </div>
            <div className="stat-card black-bg">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Projects completed worldwide</div>
            </div>
            <div className="stat-card black-bg">
              <div className="stat-number">100%</div>
              <div className="stat-label">Machine capability</div>
            </div>
            <div className="stat-card black-bg">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer support</div>
            </div>
          </div>

          {/* Feature values block */}
          <div className="values-grid">
            <div className="value-card border-card">
              <h4 className="text-black">Advanced technology</h4>
              <p>Clean and powerful diesel engines for maximum efficiency.</p>
            </div>
            <div className="value-card border-card">
              <h4 className="text-black">Proven durability</h4>
              <p>Heavy duty construction built to withstand the toughest jobs.</p>
            </div>
            <div className="value-card border-card">
              <h4 className="text-black">Operator first</h4>
              <p>Ergonomic cabs with intuitive controls for all-day comfort.</p>
            </div>
            <div className="value-card border-card">
              <h4 className="text-black">Environmental support</h4>
              <p>Engines comply with the latest emissions standards.</p>
            </div>
          </div>

          <div className="view-all-wrap values-buttons">
            <a 
              href="?page=all-products" 
              className="cta-button white-pill-dark-border" 
              style={{ display: 'inline-block', textAlign: 'center' }} 
              onClick={(e) => { e.preventDefault(); navigate('all-products', { category: 'All' }); }}
            >
              Explore Inventory
            </a>
            <a href="#dealers" className="cta-button white-pill-dark-border">Find a Dealer</a>
          </div>
        </div>
      </section>



      {/* BLOG SECTION */}
      <section id="blog" className="blog-section light-sage-bg">
        <div className="section-content">
          <div className="blog-section-header">
            <div className="blog-head-left">
              <span className="blog-section-tag text-black">KONSTRUCTZ Blog</span>
              <h2 className="blog-section-title text-black">Trusted by those who build every day</h2>
            </div>
            <a href="?page=blog" className="view-all-blog-link" onClick={(e) => { e.preventDefault(); navigate('blog'); }}>View all Blog</a>
          </div>

          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.slug} className="blog-card-white">
                <div className="blog-img-placeholder">
                  {!heroImageError ? (
                    <img 
                      src={heroLoader} 
                      alt={post.title} 
                      className="blog-card-img"
                      onError={() => setHeroImageError(true)}
                    />
                  ) : (
                    <WheelLoaderSvg />
                  )}
                </div>
                <div className="blog-card-info">
                  <span className="blog-card-cat">{post.category}</span>
                  <h3 className="blog-card-name text-black">{post.title}</h3>
                  <span className="blog-card-date">Published {post.date} · Updated {post.updatedDate}</span>
                  <p className="blog-card-desc">{post.desc}</p>
                  <a
                    href={`?page=blog-post&id=${post.slug}`}
                    className="blog-card-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedBlogPost(post);
                      navigate('blog-post', { id: post.slug });
                    }}
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section white-bg">
        <div className="section-content">
          <div className="section-header">
            <span className="light-green-tag">Customer Feedback</span>
            <h2 className="section-title text-black">Trusted by those who build every day</h2>
          </div>

          <div className="testimonials-grid">
            {[
              {
                quote: "Our fleet has seen zero downtime since upgrading to KONSTRUCTZ crawlers. Power and fuel economy are top-tier.",
                author: "Marcus Chen",
                role: "Operations Director, Apex Build Corp"
              },
              {
                quote: "The 3-year warranty gave us the confidence to purchase 5 WL100 loaders. Outstanding customer service and fast shipping.",
                author: "David Vance",
                role: "Fleet Manager, Terra Earthmoving"
              },
              {
                quote: "Compact, powerful, and easy to service ourselves. These machines outperform competitors at a fraction of the cost.",
                author: "Elena Rostov",
                role: "Owner, Rostov Residential Excavations"
              }
            ].map((test, index) => (
              <div key={index} className="testimonial-card-grey">
                <div className="test-rating">⭐⭐⭐⭐⭐</div>
                <p className="test-quote">"{test.quote}"</p>
                <div className="test-author">
                  <strong className="text-black">{test.author}</strong>
                  <span>{test.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      ) : currentView === 'blog' ? (
        <main className="blog-page">
          <section className="blog-page-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.5)), url(${constructionBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="blog-page-hero-overlay"></div>
            <div className="section-content blog-page-hero-content">
              <h1>KONSTRUCTZ Blog</h1>
              <p>Industry news, machine guides, and expert tips straight from the field.</p>
            </div>
          </section>

          <section className="blog-page-list white-bg">
            <div className="section-content blog-page-layout">
              <div className="blog-page-main">
                <h2 className="blog-page-kicker text-black">Choose the categories you like</h2>
                <div className="blog-page-grid">
                  {blogPosts.map((post) => (
                    <article key={post.slug} className="blog-page-card">
                      <a
                        href={`?page=blog-post&id=${post.slug}`}
                        className="blog-page-card-media"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBlogPost(post);
                          navigate('blog-post', { id: post.slug });
                        }}
                      >
                        <span>{post.category}</span>
                      </a>
                      <div className="blog-page-card-body">
                        <div className="blog-page-card-meta">
                          <span>{post.category}</span>
                          <time dateTime={post.updatedDate}>{post.updatedDate}</time>
                          <span>KONSTRUCTZ</span>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.desc}</p>
                        <a
                          href={`?page=blog-post&id=${post.slug}`}
                          className="blog-page-read"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedBlogPost(post);
                            navigate('blog-post', { id: post.slug });
                          }}
                        >
                          Read More →
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              <aside className="blog-page-sidebar">
                <div className="blog-page-search">
                  <input type="search" placeholder="search..." aria-label="Search blog posts" />
                  <span>⌕</span>
                </div>

                <div className="blog-page-filter">
                  <h3>Popular Categories</h3>
                  {['All', 'Guide', 'Industry news', 'Machine reviews', 'Tips & maintenance', 'Case Studies'].map(category => (
                    <label key={category} className="blog-page-checkbox">
                      <input type="checkbox" />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>

                <div className="blog-page-filter">
                  <h3>Tags</h3>
                  <div className="blog-page-tags">
                    {['excavators', 'loaders', 'attachments', 'maintenance', 'safety'].map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </main>
      ) : currentView === 'blog-post' && selectedBlogPost ? (
        <main className="blog-post-page">
          <section className="blog-post-hero dark-bg">
            <div className="section-content blog-post-hero-content">
              <a
                href="?page=home#blog"
                className="blog-post-back-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('home');
                  window.location.hash = '#blog';
                }}
              >
                Back to Blog
              </a>
              <span className="blog-post-category">{selectedBlogPost.category}</span>
              <h1>{selectedBlogPost.title}</h1>
              <p>{selectedBlogPost.desc}</p>
              <div className="blog-post-dates">
                <time dateTime={selectedBlogPost.publishedDate}>Published {selectedBlogPost.date}</time>
                <time dateTime={selectedBlogPost.updatedDate}>Updated {selectedBlogPost.updatedDate}</time>
              </div>
            </div>
          </section>

          <article className="blog-post-article white-bg">
            <div className="section-content blog-post-content">
              <div className="blog-post-featured-image">
                {!heroImageError ? (
                  <img
                    src={heroLoader}
                    alt={selectedBlogPost.title}
                    onError={() => setHeroImageError(true)}
                  />
                ) : (
                  <WheelLoaderSvg />
                )}
              </div>

              <div className="blog-post-body">
                <h2>Overview</h2>
                <p>{selectedBlogPost.seoDescription}</p>

                {selectedBlogPost.sections.map((section) => (
                  <section key={section.h2}>
                    <h2>{section.h2}</h2>
                    <p>{section.body}</p>
                    {section.h3 && (
                      <>
                        <h3>{section.h3}</h3>
                        <p>{section.h3Body}</p>
                      </>
                    )}
                  </section>
                ))}
              </div>
            </div>
          </article>
        </main>
      ) : currentView === 'attachments' ? (
        <main className="attachments-page">
          <section className="attachments-hero dark-bg">
            <div className="section-content attachments-hero-content">
              <span className="black-pill-tag">Attachment Catalog</span>
              <h1 className="attachments-page-title">Attachments Built For Real Jobsite Work</h1>
              <p className="attachments-page-subtitle">
                Browse mini excavator and mini skid steer attachments by fitment, job type, and machine class.
              </p>
            </div>
          </section>

          <section className="attachments-catalog white-bg">
            <div className="section-content">
              <div className="attachments-page-header">
                <div>
                  <h2 className="section-title text-black">Attachments</h2>
                  <p className="attachments-count">
                    Showing {visibleAttachments.length} of {attachments.length} attachments
                    {activeAttachmentSubcategory !== 'All' ? ` in ${activeAttachmentSubcategory}` : ''}
                  </p>
                </div>
                <button
                  className="cta-button black-pill-btn attachments-view-all"
                  onClick={() => {
                    setActiveAttachmentFilter('All Attachments');
                    setActiveAttachmentSubcategory('All');
                  }}
                >
                  View All
                </button>
              </div>

              <div className="attachment-filter-tabs">
                {attachmentFilters.map(filter => (
                  <button
                    key={filter}
                    className={`tab-btn ${activeAttachmentFilter === filter && activeAttachmentSubcategory === 'All' ? 'active' : ''}`}
                    onClick={() => {
                      setActiveAttachmentFilter(filter);
                      setActiveAttachmentSubcategory('All');
                    }}
                  >
                    {attachmentFilterLabels[filter] || filter}
                  </button>
                ))}
              </div>

              <div className="attachment-subcategory-rail">
                {attachmentMenus
                  .filter(menu => activeAttachmentFilter === 'All Attachments' || menu.id === activeAttachmentFilter)
                  .flatMap(menu => menu.children)
                  .map(child => (
                    <button
                      key={child}
                      className={`attachment-chip ${activeAttachmentSubcategory === child ? 'active' : ''}`}
                      onClick={() => setActiveAttachmentSubcategory(activeAttachmentSubcategory === child ? 'All' : child)}
                    >
                      {child}
                    </button>
                  ))}
              </div>

              <div className="inventory-grid attachment-grid">
                {visibleAttachments.map(item => (
                  <ProductCard
                    key={item.id}
                    item={item}
                    className="inventory-card attachment-card"
                    imageClassName="attachment-image-area"
                    badge={item.fitmentCategory}
                    eyebrow="Attachment"
                    specs={[
                      { label: 'Type', value: item.subcategory },
                      { label: 'Specs', value: item.specs },
                      { label: 'Price', value: item.price || 'Call for pricing' }
                    ]}
                    fallback={(
                      <span className="attachment-icon-mark">
                        {item.subcategory === 'X2 Attachments' ? 'X2' :
                          item.subcategory === 'XXV Attachments' ? 'XXV' :
                          item.subcategory.includes('Compact') ? 'CMP' :
                          item.subcategory.includes('Standard') ? 'STD' : 'ATT'}
                      </span>
                    )}
                    onView={handleProductDetail}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'topic' ? (
        <main className="topic-page">
          <section className="topic-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.54)), url(${constructionBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="topic-hero-overlay"></div>
            <div className="section-content topic-hero-content">
              <p>
                Whether you have questions about our machines, need technical support, want to request a quote, or are ready to place an order, our team is here to help every step of the way.
              </p>
            </div>
          </section>

          <section className="topic-help white-bg">
            <div className="section-content topic-help-content">
              <div className="topic-title-block">
                <span className="topic-section-line"></span>
                <span className="topic-section-label">Help center</span>
                <h1>Frequently asked questions</h1>
                <p>Popular searches</p>
              </div>

              <div className="topic-search-tags" aria-label="Popular searches">
                {['Warranty', 'Delivery', 'Request a demo', 'Payment', 'Maintenance', 'Spare parts'].map(tag => (
                  <button key={tag}>{tag}</button>
                ))}
              </div>

              <div className="topic-faq-layout">
                <aside className="topic-category-list">
                  <h2>Category</h2>
                  {[
                    'Machines',
                    'Buying & pricing',
                    'Delivery',
                    'Warranty',
                    'Service & parts',
                    'Financing'
                  ].map(category => (
                    <button key={category} className={category === 'Machines' ? 'active' : ''}>
                      <span className="topic-category-icon">▣</span>
                      {category}
                    </button>
                  ))}
                </aside>

                <div className="topic-faq-panel">
                  {[
                    {
                      id: 'topic-1',
                      question: 'What types of machines does KONSTRUCTZ manufacture?',
                      answer: 'KONSTRUCTZ offers compact and jobsite-ready machinery including mini excavators, wheel loaders, mini skid steers, dumpers, rollers, forklifts, and attachments.'
                    },
                    {
                      id: 'topic-2',
                      question: 'What is the difference between the K2-500 and K2-731 wheel loaders?',
                      answer: 'The right loader depends on operating weight, lift requirements, engine package, and jobsite access. Our team can help compare models against your daily workload.'
                    },
                    {
                      id: 'topic-3',
                      question: 'Can I see the machines before purchasing?',
                      answer: 'Yes. Contact our sales team to request photos, video walkthroughs, available demos, or current inventory details before you place an order.'
                    },
                    {
                      id: 'topic-4',
                      question: 'Are KONSTRUCTZ machines certified to international standards?',
                      answer: 'Machines are selected and documented for the target market. Ask our team for the exact compliance and certification details for your machine and destination.'
                    }
                  ].map(item => (
                    <div key={item.id} className={`topic-faq-item ${openFaqId === item.id ? 'open' : ''}`}>
                      <button onClick={() => setOpenFaqId(openFaqId === item.id ? null : item.id)}>
                        <span>{item.question}</span>
                        <span>{openFaqId === item.id ? '⌃' : '⌄'}</span>
                      </button>
                      <div className="topic-faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  ))}

                  <div className="topic-contact-box">
                    <strong>Still have a question?</strong>
                    <p>Our team is ready to help. Reach out and we will get back to you within 24 hours.</p>
                    <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>
                      Contact Us ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'store-data' ? (
        <main className="store-data-page">
          <section className="store-data-hero dark-bg">
            <div className="section-content store-data-hero-content">
              <span className="black-pill-tag">Product Data</span>
              <h1 className="store-data-title">Store Product CSV</h1>
              <p className="store-data-subtitle">
                Upload the product CSV file here to keep a browser-stored copy ready for review and catalog mapping.
              </p>
            </div>
          </section>

          <section className="store-data-panel white-bg">
            <div className="section-content">
              <div className="csv-store-layout">
                <div className="csv-uploader-panel">
                  <div>
                    <h2 className="csv-panel-title text-black">CSV file</h2>
                    <p className="csv-panel-copy">
                      Choose a comma-separated product file. The app will save it locally in this browser and show the first 10 product rows.
                    </p>
                  </div>

                  <label className="csv-dropzone" htmlFor="product-csv-file">
                    <span className="csv-dropzone-title">Select product CSV</span>
                    <span className="csv-dropzone-meta">Accepted format: .csv</span>
                    <input
                      id="product-csv-file"
                      type="file"
                      accept=".csv,text/csv"
                      onChange={handleCsvUpload}
                    />
                  </label>

                  <div className="csv-actions">
                    <button className="cta-button black-pill-btn" onClick={handleDownloadCsv}>
                      Download Stored CSV
                    </button>
                    <button className="cta-button white-pill-dark-border" onClick={handleClearCsv}>
                      Clear Stored CSV
                    </button>
                  </div>

                  {csvStatus && <p className="csv-status">{csvStatus}</p>}
                </div>

                <div className="csv-summary-panel">
                  <h2 className="csv-panel-title text-black">Stored data</h2>
                  <div className="csv-summary-grid">
                    <div className="csv-summary-item">
                      <span>File</span>
                      <strong>{storedCsvName || 'No file stored'}</strong>
                    </div>
                    <div className="csv-summary-item">
                      <span>Columns</span>
                      <strong>{csvPreviewHeaders.length}</strong>
                    </div>
                    <div className="csv-summary-item">
                      <span>Preview rows</span>
                      <strong>{csvPreviewRows.length}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div className="csv-preview-wrap">
                <div className="csv-preview-header">
                  <h2 className="csv-panel-title text-black">Preview</h2>
                  <p>First 10 rows from the stored CSV.</p>
                </div>

                {csvPreviewHeaders.length > 0 ? (
                  <div className="csv-table-scroll">
                    <table className="csv-preview-table">
                      <thead>
                        <tr>
                          {csvPreviewHeaders.map((header, index) => (
                            <th key={`${header}-${index}`}>{header || `Column ${index + 1}`}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvPreviewRows.map((row, rowIndex) => (
                          <tr key={`csv-row-${rowIndex}`}>
                            {csvPreviewHeaders.map((_, colIndex) => (
                              <td key={`csv-cell-${rowIndex}-${colIndex}`}>{row[colIndex] || ''}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="csv-empty-state">
                    <h3>No CSV stored yet</h3>
                    <p>Send or upload the product CSV file and it will appear here.</p>
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'product-detail' && selectedProduct ? (
        <main className="detail-page">
          {/* DETAIL BREADCRUMBS */}
          <div className="detail-breadcrumbs white-bg">
            <div className="section-content">
              <a href="?page=home" className="breadcrumb-link" onClick={(e) => { e.preventDefault(); navigate('home'); }}>Home</a>
              <span className="breadcrumb-separator">/</span>
              <a href={selectedProduct.fitmentCategory ? "?page=attachments" : "?page=all-products"} className="breadcrumb-link" onClick={(e) => { e.preventDefault(); navigate(selectedProduct.fitmentCategory ? 'attachments' : 'all-products'); }}>
                {selectedProduct.fitmentCategory ? 'Attachments' : 'Equipment'}
              </a>
              <span className="breadcrumb-separator">/</span>
              <span className="breadcrumb-current">{selectedProduct.name}</span>
            </div>
          </div>

          {/* MAIN PRODUCT HERO SECTION */}
          <section className="product-hero-section white-bg">
            <div className="section-content">
              <div className="product-hero-grid">
                {/* Image Gallery Frame */}
                <div className="product-gallery-frame" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
                  <div className="gallery-main-image">
                    {activeGalleryImage ? (
                      <img src={activeGalleryImage} alt={selectedProduct.name} />
                    ) : selectedProduct.image ? (
                      <img src={selectedProduct.image} alt={selectedProduct.name} />
                    ) : (
                      getFallbackSvg(selectedProduct.category)
                    )}
                  </div>
                  {/* Thumbnails grid */}
                  {selectedProduct.images && selectedProduct.images.length > 0 && (
                    <div className="product-thumbnails-grid">
                      {selectedProduct.images.map((imgUrl, i) => (
                        <div 
                          key={i} 
                          className={`thumbnail-box ${activeGalleryImage === imgUrl ? 'active' : ''}`}
                          onClick={() => setActiveGalleryImage(imgUrl)}
                        >
                          <img src={imgUrl} alt={`${selectedProduct.name} View ${i + 1}`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info and Actions */}
                <div className="product-hero-info">
                  <div className="detail-category-label">
                    {categoryLabels[selectedProduct.category] || selectedProduct.category || (selectedProduct.fitmentCategory ? 'Attachment' : 'Machinery')}
                  </div>
                  <h1 className="product-detail-name text-black">{selectedProduct.name}</h1>
                  <div className="detail-price-text">
                    {selectedProduct.price || 'Quote on request'}
                  </div>
                  
                  {/* Description directly under title & price */}
                  <div className="detail-description-block">
                    <p>
                      {selectedProduct.fullDesc || selectedProduct.desc || `The ${selectedProduct.name} is built to handle everyday material movement and site work with confidence and brings a clean mix of power, reliability, and precision control to your projects.`}
                    </p>
                  </div>

                  {/* Metadata Flex boxes */}
                  <div className="detail-meta-boxes">
                    <div className="meta-box">
                      <span className="meta-box-label">Category</span>
                      <span className="meta-box-value">{categoryLabels[selectedProduct.category] || selectedProduct.category || 'Machinery'}</span>
                    </div>
                    <div className="meta-box">
                      <span className="meta-box-label">Condition</span>
                      <span className="meta-box-value">New</span>
                    </div>
                    {selectedProduct.weight && selectedProduct.weight !== 'N/A' && (
                      <div className="meta-box">
                        <span className="meta-box-label">Operating Weight</span>
                        <span className="meta-box-value">{selectedProduct.weight}</span>
                      </div>
                    )}
                    {selectedProduct.engine && selectedProduct.engine !== 'N/A' && selectedProduct.engine !== 'See details' && (
                      <div className="meta-box">
                        <span className="meta-box-label">Engine</span>
                        <span className="meta-box-value">{selectedProduct.engine}</span>
                      </div>
                    )}
                  </div>

                  {/* Buttons row */}
                  <div className="detail-action-row">
                    <button className="btn-add-to-cart" onClick={() => handleAddToCart(selectedProduct)}>Add to Cart</button>
                    <button className="btn-buy-now" onClick={() => {
                      openCheckoutPage(selectedProduct);
                    }}>Buy Now</button>
                    <button className="btn-view-cart" onClick={() => {
                      navigate('cart');
                    }}>View Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* RELATED PRODUCTS */}
          <section className="related-products-section white-bg border-top">
            <div className="section-content">
              <div className="related-subtitle">Related Equipment</div>
              <h2 className="related-title-new">You may also like</h2>
              <div className="inventory-grid" style={{ marginTop: '24px' }}>
                {(() => {
                  const related = (selectedProduct.fitmentCategory ? attachments : homeProducts)
                    .filter(item => item.category === selectedProduct.category && item.id !== selectedProduct.id)
                    .slice(0, 4);
                  
                  if (related.length === 0) {
                    return <p className="no-related-msg">No similar items found in this category.</p>;
                  }

                  return related.map(item => (
                    <a 
                      key={item.id} 
                      href={`?page=product-detail&id=${item.slug || item.id}`}
                      className="related-card-new" 
                      onClick={(e) => { e.preventDefault(); handleProductDetail(item); }}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <div className="related-card-image">
                        {item.image ? (
                          <img src={item.image} alt={item.name} />
                        ) : (
                          getFallbackSvg(item.category)
                        )}
                      </div>
                      <div className="related-card-info">
                        <h3 className="related-card-title">{item.name}</h3>
                        <div className="related-card-price">{item.price || 'Quote on request'}</div>
                        <span className="related-card-view-btn" style={{ display: 'inline-block', textAlign: 'center' }}>View</span>
                      </div>
                    </a>
                  ));
                })()}
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'checkout' && (checkoutItem || selectedProduct) ? (
        <main className="checkout-page">
          {(() => {
            const productForCheckout = checkoutItem || selectedProduct;
            return (
              <>
                <section className="checkout-hero dark-bg">
                  <div className="section-content checkout-hero-content">
                    <span className="black-pill-tag">Secure checkout</span>
                    <h1 className="checkout-title">Complete Your Purchase</h1>
                    <p className="checkout-subtitle">
                      You are checking out {productForCheckout.name}. The store loads only on this checkout page after Buy Now is selected.
                    </p>
                    <button
                      className="checkout-back-link"
                      onClick={() => handleProductDetail(productForCheckout)}
                    >
                      Back to product
                    </button>
                  </div>
                </section>

                <section className="checkout-body white-bg">
                  <div className="section-content">
                    <div className="checkout-shell">
                      <div className="checkout-summary-card">
                        <div className="checkout-summary-media">
                          {productForCheckout.image ? (
                            <img src={productForCheckout.image} alt={productForCheckout.name} />
                          ) : (
                            getFallbackSvg(productForCheckout.category)
                          )}
                        </div>
                        <div>
                          <span className="checkout-summary-label">
                            {categoryLabels[productForCheckout.category] || productForCheckout.category || 'Equipment'}
                          </span>
                          <h2>{productForCheckout.name}</h2>
                          <p>{productForCheckout.price || 'Quote on request'}</p>
                        </div>
                      </div>

                      <div className="hidden-checkout-panel checkout-store-panel">
                        <div className="hidden-checkout-header">
                          <div>
                            <span className="hidden-checkout-kicker">Store checkout</span>
                            <h2>Checkout for {productForCheckout.name}</h2>
                          </div>
                        </div>
                        <StoreEmbed key={`${productForCheckout.id}-${getStoreHash(productForCheckout)}`} />
                      </div>
                    </div>
                  </div>
                </section>
              </>
            );
          })()}
        </main>
      ) : currentView === 'cart' ? (
        <main className="cart-page">
          <section className="cart-page-hero dark-bg">
            <div className="section-content cart-page-hero-content">
              <span className="black-pill-tag">Product Cart</span>
              <h1 className="cart-page-title">Review Your Selected Equipment</h1>
              <p className="cart-page-subtitle">
                Adjust quantities, remove items, and send the cart to our sales team for current pricing, freight, and availability.
              </p>
            </div>
          </section>

          <section className="cart-page-body white-bg">
            <div className="section-content">
              {cartItems.length > 0 ? (
                <div className="cart-layout">
                  <div className="cart-items-panel">
                    <div className="cart-items-header">
                      <h2 className="text-black">Cart Items</h2>
                      <button className="cart-clear-btn" onClick={clearCart}>Clear cart</button>
                    </div>

                    <div className="cart-item-list">
                      {cartItems.map(item => (
                        <article key={item.id} className="cart-line-item">
                          <button className="cart-line-media" onClick={() => handleProductDetail(item)} aria-label={`View ${item.name}`}>
                            {item.image ? (
                              <img src={item.image} alt={item.name} />
                            ) : (
                              getFallbackSvg(item.category)
                            )}
                          </button>

                          <div className="cart-line-copy">
                            <span className="cart-line-category">
                              {categoryLabels[item.category] || item.fitmentCategory || item.category || 'Equipment'}
                            </span>
                            <h3>{item.name}</h3>
                            <p>{item.price || item.cap || item.subcategory || 'Quote on request'}</p>
                          </div>

                          <div className="cart-line-controls">
                            <div className="cart-qty-control" aria-label={`Quantity for ${item.name}`}>
                              <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">-</button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateCartQuantity(item.id, Number(e.target.value) || 1)}
                              />
                              <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">+</button>
                            </div>
                            <button className="cart-remove-btn" onClick={() => removeCartItem(item.id)}>Remove</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>

                  <aside className="cart-summary-panel">
                    <h2 className="text-black">Order Summary</h2>
                    <div className="cart-summary-row">
                      <span>Items</span>
                      <strong>{cartCount}</strong>
                    </div>
                    <div className="cart-summary-row">
                      <span>Estimated subtotal</span>
                      <strong>{cartSubtotal > 0 ? `$${cartSubtotal.toLocaleString()}` : 'Quote needed'}</strong>
                    </div>
                    {hasQuotedCartItems && (
                      <p className="cart-summary-note">
                        Some items require current quote pricing. Freight, taxes, and lead time are confirmed by our sales team.
                      </p>
                    )}
                    <button className="cta-button black-pill-btn cart-checkout-btn" onClick={requestCartQuote}>
                      Request Quote
                    </button>
                    <button className="cta-button white-pill-dark-border cart-shop-btn" onClick={() => navigate('all-products', { category: 'All' })}>
                      Continue Shopping
                    </button>
                  </aside>
                </div>
              ) : (
                <div className="cart-empty-state">
                  <h2 className="text-black">Your cart is empty</h2>
                  <p>Add machinery or attachments to build a quote request for your project.</p>
                  <button className="cta-button black-pill-btn" onClick={() => navigate('all-products', { category: 'All' })}>
                    Browse Equipment
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      ) : currentView === 'about' ? (
        <main className="about-page">
          {/* Hero Banner Section */}
          <section className="about-hero dark-bg" style={{ backgroundImage: `linear-gradient(rgba(15, 17, 14, 0.8), rgba(15, 17, 14, 0.8)), url(${heroLoader})` }}>
            <div className="section-content about-hero-content">
              <div className="about-hero-logo-wrap">
                <img src={konstructzLogo} alt="KONSTRUCTZ Brand Logo" className="about-hero-logo" />
              </div>
              <h1 className="about-hero-title">ABOUT US</h1>
            </div>
          </section>

          {/* Brand/Partner Ribbon Section */}
          <section className="about-brand-ribbon">
            <div className="section-content brand-marquee">
              <div className="brand-item">STONEKRUSHER</div>
              <div className="brand-item">STOMP</div>
              <div className="brand-item">SPIDER ONE</div>
              <div className="brand-item">THUNDERDUMP</div>
              <div className="brand-item">KUVUO</div>
            </div>
          </section>

          {/* KOUEGIE Compact Series Section */}
          <section className="about-series-section white-bg">
            <div className="section-content series-container">
              <div className="series-left">
                <span className="series-kicker">KOUEGIE COMPACT SERIES</span>
                <h2 className="series-title text-black">Engineered for Tough Jobsites</h2>
                <p className="series-desc">
                  The KOUEGIE Compact Series represents our signature line of heavy-duty, high-efficiency compact machinery. Engineered for tight spaces and high performance, these machines deliver unmatched reliability, quick attachment changes, and operator comfort.
                </p>
                <p className="series-desc">
                  Designed for crews that need real capability without excessive bulk, KOUEGIE compact loaders, excavators, and dumpers are built to work harder, run smoother, and last longer.
                </p>
                <button 
                  className="cta-button black-pill-btn series-cta"
                  onClick={() => navigate('contact')}
                >
                  Contact Us Now
                </button>
              </div>
              <div className="series-right">
                <div className="collage-grid">
                  <div className="collage-main">
                    <img src={loaderCarryingGravel} alt="KOUEGIE Compact Loader working on gravel" className="collage-img" />
                  </div>
                  <div className="collage-stacked">
                    <img src={trackLoaderFarm} alt="KOUEGIE Track Loader working on crop field" className="collage-img" />
                    <img src={dumperConstruction} alt="KOUEGIE Crawler Dumper on construction site" className="collage-img" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Who We Are Section */}
          <section className="who-we-are-section dark-bg">
            <div className="section-content who-we-are-container">
              <div className="who-we-are-left">
                <div className="factory-image-wrap">
                  <img src={typhonFactoryEngineer} alt="TYPHON assembly plant and professional engineer" className="factory-img" />
                </div>
              </div>
              <div className="who-we-are-right">
                <span className="who-kicker">TYPHON PARTNERSHIP</span>
                <h2 className="who-title text-white">Who We Are</h2>
                <p className="who-desc">
                  We are a leading distributor of high-performance heavy machinery and compact attachments. Working closely with world-class manufacturers like TYPHON, we bring heavy-duty engineering to your local jobsite.
                </p>
                <p className="who-desc">
                  Our machinery is trusted by thousands of contractors, landscape architects, and agricultural operators across North America. From assembly plant to field operation, we ensure every machine is tested to the highest standards of power, efficiency, and reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Core Values Section with Watermark */}
          <section className="about-values-section white-bg">
            <div className="values-watermark-wrap">
              <img src={konstructzLogo} alt="" className="values-watermark-img" />
            </div>
            
            <div className="section-content values-container">
              <div className="values-header">
                <h2 className="values-section-title text-black">Our Core Pillars</h2>
                <p className="values-section-subtitle">The foundation of every machine and service we deliver.</p>
              </div>
              
              <div className="values-grid">
                <div className="value-card glass-panel">
                  <div className="value-icon">👁️‍|</div>
                  <h3 className="value-card-title text-black">Our Vision</h3>
                  <p className="value-card-desc">
                    To redefine compact machinery by delivering premium, state-of-the-art equipment that empowers operators to complete jobs faster, safer, and with ultimate precision.
                  </p>
                </div>

                <div className="value-card glass-panel">
                  <div className="value-icon">🎯</div>
                  <h3 className="value-card-title text-black">Our Mission</h3>
                  <p className="value-card-desc">
                    To provide contractors and operators with reliable, heavy-duty machinery and attachment solutions backed by unmatched customer support and continuous innovation.
                  </p>
                </div>

                <div className="value-card glass-panel">
                  <div className="value-icon">🤝</div>
                  <h3 className="value-card-title text-black">Our Commitment</h3>
                  <p className="value-card-desc">
                    We stand behind every machine we sell. With 24/7 technical support, readily available spare parts, and transparent pricing, we are committed to keeping your business moving.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section dark-bg">
            <div className="section-content testimonials-container">
              <div className="testimonials-header">
                <span className="testimonials-kicker">WHAT CLIENT SAY</span>
                <h2 className="testimonials-title">Happy Our Customers</h2>
              </div>
              
              <div className="testimonials-grid">
                <div className="testimonial-card glass-panel-dark">
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                  <p className="testimonial-text">
                    "The KOUEGIE loader has transformed our landscaping operations. It fits in tight suburban backyards where other loaders can't, but still has the power to haul heavy gravel and pavers."
                  </p>
                  <div className="testimonial-author">
                    <strong>Marcus Vance</strong>
                    <span>Vance Landscaping Group</span>
                  </div>
                </div>

                <div className="testimonial-card glass-panel-dark">
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                  <p className="testimonial-text">
                    "We've been running the TYPHON mini excavator for over 600 hours now without a single issue. The support team is fast, and getting attachments is simple and transparent."
                  </p>
                  <div className="testimonial-author">
                    <strong>Sarah Jenkins</strong>
                    <span>Jenkins Construction & Excavation</span>
                  </div>
                </div>

                <div className="testimonial-card glass-panel-dark">
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                  <p className="testimonial-text">
                    "Awesome compact dumpers. The ThunderDump and crawler dumpers have cut our jobsite transport times in half. Reliable, simple controls, and extremely rugged build quality."
                  </p>
                  <div className="testimonial-author">
                    <strong>Dave Rodriguez</strong>
                    <span>BuildCorp Development</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'support' ? (
        <main className="support-page">
          {/* Hero Banner Section */}
          <section className="support-hero dark-bg" style={{ backgroundImage: `linear-gradient(rgba(15, 17, 14, 0.75), rgba(15, 17, 14, 0.75)), url(${supportHero})` }}>
            <div className="section-content">
              <h1 className="support-hero-title text-white">Service and Support</h1>
              <p className="support-hero-subtitle">Welcome to KONSTRUCTZ service and support</p>
            </div>
          </section>

          {/* Popular Services Section */}
          <section className="popular-services-section white-bg">
            <div className="section-content">
              <h2 className="support-section-title text-black">Popular Services</h2>
              <div className="popular-services-grid">
                <div className="popular-service-card glass-panel">
                  <h3>Online Self-Service Repair</h3>
                  <p>Apply for repairs online and track your active equipment service status.</p>
                </div>
                <div className="popular-service-card glass-panel">
                  <h3>Core Value-Added Services</h3>
                  <p>Explore custom machinery maintenance packages and extended warranty programs.</p>
                </div>
                <div className="popular-service-card glass-panel">
                  <h3>Personal Service Center</h3>
                  <p>Access your equipment fleet records, download invoices, and manage company profile.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Download Center Section */}
          <section id="download-center" className="download-center-section white-bg border-top">
            <div className="section-content">
              <h2 className="support-section-title text-black">Download Center</h2>
              <div className="download-center-grid">
                <div className="download-card glass-panel">
                  <h3>Documents and Manuals</h3>
                  <p>Get official documents such as user manuals, instructions for use, quick start guides, and more with product information at your fingertips</p>
                </div>
                <div className="download-card glass-panel">
                  <h3>Hydraulic Schematics</h3>
                  <p>Download standard user manuals, parts manuals, hydraulic schematics and other official documents to make after-sales and service more professional and efficient</p>
                </div>
              </div>
              <div className="download-center-link-wrap">
                <a href="?page=topic" onClick={(e) => { e.preventDefault(); navigate('topic'); }} className="download-center-link">
                  DOWNLOAD CENTER
                </a>
              </div>
            </div>
          </section>

          {/* Product Support Section (Carousel) */}
          <section className="product-support-section white-bg border-top">
            <div className="section-content">
              <h2 className="support-section-title text-black">Product Support</h2>
              <p className="support-section-subtitle text-black" style={{ textAlign: 'center', marginBottom: '32px' }}>Solve your doubts about product usage and provide you with more professional information</p>
              
              <div className="carousel-container">
                <button className="carousel-arrow prev" aria-label="Previous product" onClick={() => scrollCarousel('prev')}>‹</button>
                <div className="carousel-grid" ref={carouselGridRef}>
                  {carouselProducts.map((p) => (
                    <div key={p.id} className="carousel-card glass-panel">
                      <h4 className="carousel-card-title text-black">{p.name}</h4>
                      <div className="carousel-card-image-wrap">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="carousel-card-img" />
                        ) : (
                          <div className="carousel-card-fallback">{p.name}</div>
                        )}
                      </div>
                      <button 
                        className="cta-button black-pill-btn carousel-card-btn"
                        onClick={() => handleProductDetail(p)}
                      >
                        View Specs
                      </button>
                    </div>
                  ))}
                </div>
                <button className="carousel-arrow next" aria-label="Next product" onClick={() => scrollCarousel('next')}>›</button>
              </div>
            </div>
          </section>

          {/* Service Application Section */}
          <section id="repair-application" className="service-apps-section white-bg border-top">
            <div className="section-content">
              <h2 className="support-section-title text-black">Service Application and Information Support</h2>
              <p className="support-section-subtitle text-black" style={{ textAlign: 'center', marginBottom: '32px' }}>The service journey begins, with various information presented</p>
              
              <div className="service-apps-grid">
                <div className="service-app-card glass-panel">
                  <div className="app-card-icon" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Warranty Registration</h3>
                  <p>Register your machinery online to activate your standard 1-year warranty coverage and verify purchase records.</p>
                  <a href="?page=contact&inquiry=Warranty%20Registration" onClick={(e) => { e.preventDefault(); navigate('contact', { inquiry: 'Warranty Registration' }); }} className="app-card-link">
                    REGISTER NOW &gt;
                  </a>
                </div>

                <div className="service-app-card glass-panel">
                  <div className="app-card-icon" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Schedule Field Service</h3>
                  <p>Request a factory-certified technician for maintenance, emergency inspections, or repairs directly at your site.</p>
                  <a href="?page=contact&inquiry=Technical%20Support" onClick={(e) => { e.preventDefault(); navigate('contact', { inquiry: 'Technical Support' }); }} className="app-card-link">
                    REQUEST SERVICE &gt;
                  </a>
                </div>

                <div className="service-app-card glass-panel">
                  <div className="app-card-icon" style={{ color: 'var(--accent)', marginBottom: '16px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3>Order Spare Parts</h3>
                  <p>Request quotes for OEM replacement parts, standard maintenance filters, replacement track pads, and hydraulic cylinder seals.</p>
                  <a href="?page=contact&inquiry=Order%20Spare%20Parts" onClick={(e) => { e.preventDefault(); navigate('contact', { inquiry: 'Order Spare Parts' }); }} className="app-card-link">
                    ORDER PARTS &gt;
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Value-added Services Section */}
          <section className="value-added-banner-section" style={{ backgroundImage: `linear-gradient(rgba(15, 17, 14, 0.65), rgba(15, 17, 14, 0.65)), url(${typhonFactoryEngineer})` }}>
            <div className="section-content banner-text-wrap">
              <h2 className="banner-title text-white">Value-added Services</h2>
              <p className="banner-subtitle">Various security services, comprehensive and secure protection</p>
              <a href="?page=topic" onClick={(e) => { e.preventDefault(); navigate('topic'); }} className="banner-link">
                All service &gt;
              </a>
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="support-contact-section white-bg border-top">
            <div className="section-content">
              <h2 className="support-section-title text-black" style={{ marginBottom: '40px' }}>Contact Us</h2>
              <div className="support-contact-container">
                <div className="contact-image-col">
                  <img src={supportCallCenter} alt="KONSTRUCTZ customer service team" className="contact-callcenter-img" />
                </div>
                <div className="contact-details-col glass-panel">
                  <h3>Online Customer Service</h3>
                  <p className="hours-text">Monday to Sunday: 8:00 AM – 5:00 PM EST</p>
                  <p className="phone-text">Phone: +1 (555) 234-9800</p>
                  <p className="email-text">Email: support@konstructzmachinery.com</p>
                  <p className="address-text">Address: 1200 Industrial Parkway, Suite A, Detroit, MI 48201</p>
                  <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="contact-service-link">
                    Contact the customer service &gt;
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : currentView === 'contact' ? (
        <main className="contact-page">
          {/* Hero Banner Section */}
          <section className="contact-hero dark-bg" style={{ backgroundImage: `linear-gradient(rgba(15, 17, 14, 0.75), rgba(15, 17, 14, 0.75)), url(${heroLoader})` }}>
            <div className="section-content">
              <h1 className="contact-hero-title text-white">Let's talk. We're ready to help.</h1>
              <p className="contact-hero-subtitle">
                Whether you have questions about our machines, need technical support, want to request a quote, or are ready to place an order - our team is here to help you every step of the way.
              </p>
            </div>
          </section>

          {/* 4 Cards Grid Section */}
          <section className="contact-info-section white-bg">
            <div className="section-content">
              <div className="contact-info-grid">
                <div className="contact-info-card glass-panel">
                  <div className="card-icon">📞</div>
                  <div className="card-body">
                    <h4>Call us</h4>
                    <p className="highlight-text">+1 (555) 234-9800</p>
                    <p className="subtext">Mon – Fri, 8:00 AM – 6:00 PM EST. Our sales and support team is standing by.</p>
                  </div>
                </div>

                <div className="contact-info-card glass-panel">
                  <div className="card-icon">✉️</div>
                  <div className="card-body">
                    <h4>Email us</h4>
                    <p className="highlight-text">hello@konstructzmachinery.com</p>
                    <p className="subtext">We respond to all inquiries within 24 hours on business days.</p>
                  </div>
                </div>

                <div className="contact-info-card glass-panel">
                  <div className="card-icon">📍</div>
                  <div className="card-body">
                    <h4>Visit us</h4>
                    <p className="highlight-text">1200 Industrial Parkway</p>
                    <p className="subtext">Suite A, Detroit, MI 48201</p>
                  </div>
                </div>

                <div className="contact-info-card glass-panel">
                  <div className="card-icon">🛠️</div>
                  <div className="card-body">
                    <h4>24/7 support</h4>
                    <p className="highlight-text">support@konstructzmachinery.com</p>
                    <p className="subtext">For urgent technical issues and breakdowns – we never sleep.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Form and Map Layout Section */}
          <section className="contact-form-map-section white-bg">
            <div className="section-content form-map-container">
              
              {/* Form Card or Success Message */}
              <div className="form-card-container">
                {!formSubmitted ? (
                  <div className="contact-form-card">
                    <h2 className="form-title text-black">Send us a message</h2>
                    <p className="form-subtitle">Fill in the form and we'll get back to you within 24 hours.</p>
                    
                    <form onSubmit={handleFormSubmit} className="contact-actual-form">
                      <div className="form-row-two">
                        <div className="form-group">
                          <label>First Name</label>
                          <input 
                            type="text" 
                            name="firstName" 
                            placeholder="John" 
                            required 
                            value={formValues.firstName}
                            onChange={handleFormInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Last Name</label>
                          <input 
                            type="text" 
                            name="lastName" 
                            placeholder="Evans" 
                            required 
                            value={formValues.lastName}
                            onChange={handleFormInputChange}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Email address</label>
                        <input 
                          type="email" 
                          name="email" 
                          placeholder="john@gmail.com" 
                          required 
                          value={formValues.email}
                          onChange={handleFormInputChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          placeholder="+1 (555) 000-0000" 
                          value={formValues.phone}
                          onChange={handleFormInputChange}
                        />
                      </div>

                      <div className="form-group dropdown-group">
                        <label>Inquiry type</label>
                        <div className="custom-select-wrapper">
                          <select 
                            name="inquiryType" 
                            required
                            value={formValues.inquiryType}
                            onChange={handleFormInputChange}
                          >
                            <option value="">Select topic</option>
                            <option value="Product inquiry">Product inquiry</option>
                            <option value="Request a demo">Request a demo</option>
                            <option value="Get a quote">Get a quote</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Warranty Registration">Warranty Registration</option>
                            <option value="Order Spare Parts">Order Spare Parts</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Your message</label>
                        <textarea 
                          name="message" 
                          placeholder="Tell us about your project" 
                          rows="4" 
                          required
                          value={formValues.message}
                          onChange={handleFormInputChange}
                        ></textarea>
                      </div>

                      <button type="submit" className="cta-button submit-btn accent-pill-btn">
                        <span>Send Message</span>
                        <span className="btn-icon">➡️</span>
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="success-state-container text-black">
                    <div className="success-icon">✓</div>
                    <h2 className="success-title">Message sent successfully!</h2>
                    <p className="success-text">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  </div>
                )}
              </div>

              {/* Follow Us & Map Container */}
              <div className="follow-map-container">
                <div className="follow-us-section">
                  <h3 className="follow-title">FOLLOW US</h3>
                  <div className="social-icons-row">
                    <a href="#fb" className="social-icon fb">Facebook</a>
                    <a href="#ig" className="social-icon ig">Instagram</a>
                    <a href="#yt" className="social-icon yt">YouTube</a>
                    <a href="#pin" className="social-icon pin">Pinterest</a>
                    <a href="#x" className="social-icon x">X</a>
                  </div>
                </div>

                <div className="map-wrapper">
                  <iframe 
                    title="KONSTRUCTZ Location Map"
                    src="https://maps.google.com/maps?q=1200%20Industrial%20Parkway%2C%20Detroit%2C%20MI%2048201&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="320" 
                    style={{ border: 0, borderRadius: '12px' }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>

            </div>
          </section>

          {/* Department Contacts Section */}
          <section className="department-contacts-section white-bg border-top">
            <div className="section-content">
              <h3 className="department-section-title text-black" style={{ textAlign: 'center', marginBottom: '32px', fontSize: '24px' }}>Contact the right department</h3>
              
              <div className="department-grid">
                <div className="department-card border-card">
                  <div className="dep-icon">🛒</div>
                  <div className="dep-info">
                    <h5>Sales</h5>
                    <a href="mailto:sales@konstructzmachinery.com">sales@konstructzmachinery.com</a>
                  </div>
                </div>

                <div className="department-card border-card">
                  <div className="dep-icon">⚙️</div>
                  <div className="dep-info">
                    <h5>Technical support</h5>
                    <a href="mailto:support@konstructzmachinery.com">support@konstructzmachinery.com</a>
                  </div>
                </div>

                <div className="department-card border-card">
                  <div className="dep-icon">📰</div>
                  <div className="dep-info">
                    <h5>Media & press</h5>
                    <a href="mailto:media@konstructzmachinery.com">media@konstructzmachinery.com</a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="inventory-page">
          {/* Page Banner */}
          <section className="inventory-banner dark-bg">
            <div className="section-content">
              <div className="hero-bg-glow"></div>
              <h1 className="inventory-title">Equipment Inventory</h1>
              <p className="inventory-subtitle">Explore our complete range of heavy machinery and high-performance attachments.</p>
            </div>
          </section>

          {/* Controls Bar (Filter, Sort, Search) */}
          <section className="inventory-controls white-bg">
            <div className="section-content">
              <div className="controls-grid">
                {/* Search input */}
                <div className="search-box-wrap">
                  <span className="search-icon-inside">🔍</span>
                  <input 
                    type="text" 
                    placeholder="Search equipment model, brand, spec..." 
                    value={inventorySearchQuery}
                    onChange={(e) => setInventorySearchQuery(e.target.value)}
                    className="inventory-search-input"
                  />
                  {inventorySearchQuery && (
                    <button className="clear-search-btn" onClick={() => setInventorySearchQuery('')}>×</button>
                  )}
                </div>

                {/* Sort selector */}
                <div className="sort-box-wrap">
                  <label htmlFor="inventory-sort" className="sort-label">Sort By:</label>
                  <select 
                    id="inventory-sort" 
                    value={inventorySortBy}
                    onChange={(e) => setInventorySortBy(e.target.value)}
                    className="inventory-sort-select"
                  >
                    <option value="default">Featured</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="name-desc">Name (Z-A)</option>
                    <option value="weight-asc">Weight (Light to Heavy)</option>
                    <option value="weight-desc">Weight (Heavy to Light)</option>
                  </select>
                </div>
              </div>

              {/* Category Filter Tabs */}
              <div className="tabs-container inventory-tabs">
                {inventoryTabs.map(tab => {
                  const count = tab.id === 'All'
                    ? allInventory.filter(item => item.type === 'Machinery').length
                    : allInventory.filter(item => item.category === tab.id).length;
                  return (
                    <button 
                      key={tab.id} 
                      className={`tab-btn ${activeCategory === tab.id ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCategory(tab.id);
                        if (tab.id !== 'Konstructz') {
                          setActiveKonstructzSubcategory('All');
                        }
                      }}
                    >
                      {tab.label} ({count})
                    </button>
                  );
                })}
              </div>
              {activeCategory === 'Konstructz' && (
                <div className="konstructz-subcategory-rail" aria-label="Konstructz subcategory filters">
                  <button
                    type="button"
                    className={`konstructz-subcategory-btn ${activeKonstructzSubcategory === 'All' ? 'active' : ''}`}
                    onClick={() => setActiveKonstructzSubcategory('All')}
                  >
                    All ({allInventory.filter(item => item.category === 'Konstructz').length})
                  </button>
                  {konstructzSubcategories.map(subcategory => {
                    const count = allInventory.filter(item => item.category === 'Konstructz' && item.subcategory === subcategory).length;
                    return (
                      <button
                        type="button"
                        key={subcategory}
                        className={`konstructz-subcategory-btn ${activeKonstructzSubcategory === subcategory ? 'active' : ''}`}
                        onClick={() => setActiveKonstructzSubcategory(subcategory)}
                      >
                        {subcategory} ({count})
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Product Grid */}
          <section className="inventory-results white-bg">
            <div className="section-content">
              <div className="inventory-grid">
                {sortedInventory.map(p => (
                  <ProductCard
                    key={p.id}
                    item={p}
                    className="inventory-card"
                    badge={p.category === 'Konstructz' && p.subcategory ? p.subcategory : (categoryLabels[p.category] || p.fitmentCategory || p.category || p.type)}
                    eyebrow={p.type}
                    specs={p.type === 'Machinery' ? [
                      ...(p.category === 'Konstructz' && p.subcategory ? [{ label: 'Type', value: p.subcategory }] : []),
                      { label: 'Op. Weight', value: p.weight },
                      { label: 'Engine', value: p.engine },
                      { label: 'Price', value: p.price || p.cap }
                    ] : [
                      { label: 'Specs', value: p.cap },
                      { label: 'Price', value: p.price || 'Call for pricing' }
                    ]}
                    fallback={getFallbackSvg(p.category)}
                    onView={handleProductDetail}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>

              {sortedInventory.length === 0 && (
                <div className="no-results-found">
                  <h3>No matching equipment found</h3>
                  <p>Try checking your spelling or adjusting your category and search filters.</p>
                  <button className="cta-button black-pill-btn reset-filters-btn" onClick={() => { setInventorySearchQuery(''); setActiveCategory('All'); }}>Reset Filters</button>
                </div>
              )}
            </div>
          </section>
        </main>
      )}

      {addedCartItem && (
        <div className="cart-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="cart-modal-title">
          <div className="cart-modal">
            <button className="cart-modal-close" onClick={() => setAddedCartItem(null)} aria-label="Close cart popup">×</button>
            <p id="cart-modal-title" className="cart-modal-kicker">Item added to your cart</p>
            <div className="cart-modal-content">
              <div className="cart-modal-image-wrap">
                {addedCartItem.image ? (
                  <img src={addedCartItem.image} alt={addedCartItem.name} className="cart-modal-image" />
                ) : (
                  <div className="cart-modal-fallback">{addedCartItem.category || 'Item'}</div>
                )}
              </div>
              <div className="cart-modal-copy">
                <h3>{addedCartItem.name}</h3>
                <p>{addedCartItem.price || addedCartItem.cap || addedCartItem.subcategory || 'Added successfully'}</p>
              </div>
            </div>
            <div className="cart-modal-actions">
              <button className="cart-modal-btn" onClick={() => {
                setAddedCartItem(null);
                navigate('cart');
              }}>View my cart</button>
              <button
                className="cart-modal-btn"
                onClick={() => {
                  handleProductDetail(addedCartItem);
                  setAddedCartItem(null);
                }}
              >
                Product Detail
              </button>
              <button className="cart-modal-link" onClick={() => setAddedCartItem(null)}>Continue shopping</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="main-footer-white">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="?page=home" className="logo text-black" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
              <img src={konstructzLogo} alt="KONSTRUCTZ" className="logo-img" />
            </a>
            <p className="footer-address">
              <span>2522 S Malt Ave.</span>
              <span>Commerce, CA 90040 United States</span>
            </p>
            <p className="footer-phone">📞 +1 213-214-2203</p>
            <p className="footer-email">✉️ sales@konstructzmachinery.com</p>
          </div>
          
          <div className="footer-links-col">
            <h4 className="text-black">Get in touch</h4>
            <a href="#inquiry">General Inquiry</a>
            <a href="#support">Business Support</a>
            <a href="#leases">Financing & Leases</a>
            <a href="#service">Technical Service</a>
          </div>

          <div className="footer-links-col">
            <h4 className="text-black">Information</h4>
            <a href="?page=about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>About Us</a>
            <a href="?page=home#products" onClick={(e) => { e.preventDefault(); navigate('home'); window.location.hash = '#products'; }}>Products</a>
            <a href="?page=support" onClick={(e) => { e.preventDefault(); navigate('support'); }}>Support</a>
            <a href="?page=home#faq" onClick={(e) => { e.preventDefault(); navigate('home'); window.location.hash = '#faq'; }}>FAQ</a>
          </div>

          <div className="footer-links-col">
            <h4 className="text-black">Connect</h4>
            <div className="social-links-grid">
              <a href="#fb">🌐 Facebook</a>
              <a href="#tw">🐦 Twitter</a>
              <a href="#ig">📸 Instagram</a>
              <a href="#li">💼 LinkedIn</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 KONSTRUCTZ. All Rights Reserved. Built for power and reliability.</p>
        </div>
      </footer>
    </div>
  )
}
