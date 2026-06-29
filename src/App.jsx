import { useState, useEffect, useMemo, useRef } from 'react'
import './App.css'
import { attachmentProducts, catalogProducts, featuredProducts } from './data/catalog'
import ProductCard from './components/ProductCard'
import StoreEmbed from './components/StoreEmbed'
import heroLoaderAsset from './assets/hero.png'
import typhonFactoryEngineerAsset from './assets/typhon_factory_engineer.png'
import tigerWatermarkAsset from './assets/tiger_watermark.png'
import tigerLogoAsset from './assets/tiger_logo.png'
import konstructzLogoAsset from './assets/konstructz_logo.png'
import supportHeroAsset from './assets/support_hero.png'
import supportCallCenterAsset from './assets/support_call_center.png'
import kuvuoProductAsset from './assets/products/kuvuo.png'
import spiderOneProductAsset from './assets/products/spider-one.png'
import skoopIiLoaderShowcaseAsset from './assets/products/skoop-ii-loader-showcase.webp'
import skoopyDigProductAsset from './assets/products/skoopydig.png'
import stoneCrusherAsset from './assets/products/skoop-ii-jobsite-loader.png'
import stonekrusherLogoAsset from './assets/machine-logos/stonekrusher.png'
import stonekrusherReflectionAsset from './assets/machine-logos/stonekrusher-reflection.png'
import stompLogoAsset from './assets/machine-logos/stomp.png'
import stompReflectionAsset from './assets/machine-logos/stomp-reflection.png'
import spiderOneLogoAsset from './assets/machine-logos/spider-one.png'
import spiderOneReflectionAsset from './assets/machine-logos/spider-one-reflection.png'
import kuvuoLogoAsset from './assets/machine-logos/kuvuo.png'
import kuvuoReflectionAsset from './assets/machine-logos/kuvuo-reflection.png'
import hondaEngineLogoAsset from './assets/engine-logos/honda-power-equipment.png'
import yanmarEngineLogoAsset from './assets/engine-logos/yanmar-engine.png'
import kubotaEngineLogoAsset from './assets/engine-logos/kubota.png'
import briggsStrattonLogoAsset from './assets/engine-logos/briggs-stratton.png'
import batteryExpressLogoAsset from './assets/engine-logos/battery-express.png'
import recycleBatteryLogoAsset from './assets/engine-logos/recycle-battery.png'

// Image references
const heroLoader = heroLoaderAsset;
const heroVideo = '/media/hero-wheel-loader.mp4';
const aboutKonstructzMachinery = '/about-skoop-typhon-banner.png';
const stoneCrusher = stoneCrusherAsset;
const constructionBg = stoneCrusherAsset;
const loaderAction = '/src/assets/loader_action.png';
const typhonFactoryEngineer = typhonFactoryEngineerAsset;
const loaderCarryingGravel = '/about-skoop-construction-main.png';
const trackLoaderFarm = '/about-skoop-park.png';
const dumperConstruction = '/about-skoop-construction-side.png';
const tigerWatermark = tigerWatermarkAsset;
const tigerLogo = tigerLogoAsset;
const konstructzLogo = konstructzLogoAsset;
const supportHero = supportHeroAsset;
const supportCallCenter = supportCallCenterAsset;
const kuvuoProduct = kuvuoProductAsset;
const spiderOneProduct = spiderOneProductAsset;
const skoopIiLoaderShowcase = skoopIiLoaderShowcaseAsset;
const skoopyDigProduct = skoopyDigProductAsset;

const fallbackBlogImagesBySlug = {
  'excavator-maintenance-tips': '/about-skoop-park.png',
  'choosing-wheel-loaders-and-skid-steers': '/about-skoop-construction-main.png',
  'heavy-machinery-jobsite-safety': '/about-skoop-construction-side.png',
  'future-of-construction-technology': stoneCrusher
};

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
    src: stonekrusherLogoAsset,
    reflection: stonekrusherReflectionAsset
  },
  {
    name: 'STOMP',
    src: stompLogoAsset,
    reflection: stompReflectionAsset
  },
  {
    name: 'SPIDER ONE',
    src: spiderOneLogoAsset,
    reflection: spiderOneReflectionAsset
  },
  {
    name: 'ThunderDump',
    textLogo: 'ThunderDump'
  },
  {
    name: 'KUVUO',
    src: kuvuoLogoAsset,
    reflection: kuvuoReflectionAsset
  }
];

const engineLogos = [
  { name: 'Honda Engine', src: hondaEngineLogoAsset },
  { name: 'Yanmar Engine', src: yanmarEngineLogoAsset },
  { name: 'Kubota Engine', src: kubotaEngineLogoAsset },
  { name: 'B & S Engine', src: briggsStrattonLogoAsset },
  { name: 'Lithium Battery', src: batteryExpressLogoAsset },
  { name: 'Lead Acid Battery', src: recycleBatteryLogoAsset }
];

const machineComparisonFaqs = [
  {
    question: 'Which machine is better for loading and material handling?',
    answer: 'Skoop II Loader is the better choice for moving soil, gravel, mulch, pallets, and jobsite materials when daily loading, hauling, and cleanup speed matter most.'
  },
  {
    question: 'Which machine is better for digging and trenching?',
    answer: 'SkoopyDig is built for projects that need loader utility plus excavator-style digging reach, including trenching, drainage work, small foundations, and mixed landscaping jobs.'
  },
  {
    question: 'What is the main difference between Skoop II Loader and SkoopyDig?',
    answer: 'Skoop II Loader focuses on front-bucket loading and material movement. SkoopyDig adds backhoe-style digging capability for crews that need to load, dig, trench, and place material with one compact machine.'
  },
  {
    question: 'Can KONSTRUCTZ help choose between Skoop II Loader and SkoopyDig?',
    answer: 'Yes. KONSTRUCTZ can help match the right machine to your jobsite, attachments, digging needs, loading volume, delivery location, and daily production goals.'
  }
];

const aiProductKnowledge = [
  {
    name: 'KUVUO 2.7 Mini Excavator',
    aliases: ['kuvuo', 'kuvuo 2.7', 'mini excavator', 'excavator'],
    type: 'Mini excavator',
    bestFor: 'trenching, drainage, residential construction, landscaping, small foundations, and utility work',
    terrain: 'flat ground, prepared jobsites, residential lots, and compact work areas',
    price: 'Contact for quote',
    delivery: 'Available to most U.S. locations, including California',
    leadTime: 'typically 5-7 business days after order confirmation',
    support: 'warranty, parts, manuals, and after-sales service'
  },
  {
    name: 'SKOOP II Wheel Loader',
    aliases: ['skoop', 'skoop ii', 'wheel loader', 'loader'],
    type: 'Compact wheel loader',
    bestFor: 'moving soil, gravel, mulch, pallets, materials, and jobsite supplies',
    terrain: 'construction yards, farms, landscape sites, warehouses, and compact material-handling areas',
    price: '$15,499.00',
    delivery: 'Free shipping is listed; confirm current delivery terms with sales',
    leadTime: 'call sales to confirm current stock and delivery schedule',
    support: '1-year warranty, manuals, parts, operator guidance, and after-sales service'
  },
  {
    name: 'Spider One Walking Excavator',
    aliases: ['spider', 'spider one', 'walking excavator', 'towable excavator'],
    type: 'Walking excavator',
    bestFor: 'slopes, orchards, vineyards, farms, wetland edges, riverbanks, and hard-to-reach terrain',
    terrain: 'steep, soft, uneven, remote, and sensitive ground',
    price: 'Contact for quote',
    delivery: 'Available by freight with destination-based logistics',
    leadTime: 'confirmed after stock and delivery address review',
    support: 'warranty, parts, setup guidance, and after-sales service'
  },
  {
    name: 'Stomp V950 Track Loader',
    aliases: ['stomp', 'stomp v950', 'track loader', 'skid steer'],
    type: 'Compact track loader',
    bestFor: 'tight-access loading, grading, clearing, property work, and attachment-driven jobs',
    terrain: 'dirt, gravel, landscaping sites, compact jobsites, and uneven ground',
    price: 'Contact for quote',
    delivery: 'Available by freight with lead time confirmed by location',
    leadTime: 'confirmed with inventory and destination',
    support: 'warranty, attachments, parts, and after-sales service'
  }
];

const konstructzAssistantFacts = {
  company: 'KONSTRUCTZ',
  site: 'https://cwqv.com/',
  phone: '+1 424-653-6764',
  whatsapp: '+1 323-532-5703',
  email: 'sales@cwqv.com',
  address: '7025 Slauson Ave, Commerce, CA 90040, United States',
  productFocus: 'compact construction equipment including SKOOP II wheel loaders, mini excavators, skid steer and compact track loaders, towable and walking excavators, trenchers, dumpers, stone crushers, and jobsite attachments',
  quoteTip: 'For the most accurate quote, share the machine name, delivery city/state, attachments, timeline, and your phone or email.'
};

const aiGeneralEquipmentGuide = {
  miniExcavator: {
    label: 'Mini excavators',
    bestFor: 'digging trenches, drainage lines, foundations, landscaping, utility work, and residential construction',
    buyerTip: 'Choose by operating weight, digging depth, hydraulic flow, attachment needs, and access width.',
    questions: 'Ask for price, delivery, bucket options, warranty, parts, or whether it fits your jobsite.'
  },
  wheelLoader: {
    label: 'Wheel loaders',
    bestFor: 'moving soil, gravel, mulch, pallets, materials, and supplies across yards, farms, warehouses, and jobsites',
    buyerTip: 'Choose by lift capacity, bucket size, machine width, tire type, hydraulic options, and daily material volume.',
    questions: 'Ask for SKOOP II pricing, delivery, stock, warranty, attachments, or loader comparison.'
  },
  trackLoader: {
    label: 'Skid steer and compact track loaders',
    bestFor: 'grading, loading, property cleanup, material handling, attachment work, and tight-access jobs',
    buyerTip: 'Choose by rated operating capacity, ground condition, hydraulic flow, track or wheel preference, and attachment use.',
    questions: 'Ask about buckets, forks, augers, trenchers, breakers, warranty, or stock availability.'
  },
  attachments: {
    label: 'Attachments',
    bestFor: 'turning one machine into a digging, loading, trenching, grading, drilling, breaking, or material-handling tool',
    buyerTip: 'Attachment fit depends on machine model, coupler size, hydraulic flow, weight limits, and the job you need to complete.',
    questions: 'Tell me the machine model and job type, and I can suggest the right attachment category.'
  }
};

const createAiMessage = (content, extra = {}) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  sender: 'ai',
  content,
  ...extra
});

const createUserMessage = (content) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  sender: 'user',
  content
});

const defaultComments = [
  {
    id: 'c-1',
    blogSlug: 'excavator-maintenance-tips',
    authorName: 'Alex Mercer',
    authorEmail: 'alex@mercerbuild.com',
    content: 'This guide saved us a lot of trouble last week. We were having some pressure drop in the bucket hydraulic cylinders and cleaning the quick-connect fittings as suggested here solved it immediately!',
    date: 'June 18, 2026',
    status: 'Approved'
  },
  {
    id: 'c-2',
    blogSlug: 'choosing-wheel-loaders-and-skid-steers',
    authorName: 'Sarah Jenkins',
    authorEmail: 'sjenkins@jenkinslandscaping.com',
    content: 'We ended up purchasing the SKOOP II wheel loader for our landscaping crew and the compact footprint has been a lifesaver in residential gated communities.',
    date: 'June 20, 2026',
    status: 'Approved'
  },
  {
    id: 'c-3',
    blogSlug: 'heavy-machinery-jobsite-safety',
    authorName: 'Robert Thorne',
    authorEmail: 'r.thorne@safetyfirst.org',
    content: 'Excellent operating checklist. The visual hand signal agreement is often overlooked but crucial when working with high-noise attachments like augers and breakers.',
    date: 'June 21, 2026',
    status: 'Approved'
  }
];

const defaultInquiries = [
  {
    id: 'inq-1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@builder.com',
    phone: '+1 (555) 123-4567',
    inquiryType: 'Get a quote',
    message: 'I would like a quote for: 2 x Konstructz SKOOP II Loader, 1 x mini excavator track attachment.',
    date: 'Jun 22, 2026, 09:14 AM',
    status: 'Pending'
  },
  {
    id: 'inq-2',
    firstName: 'Michael',
    lastName: 'Chang',
    email: 'mchang@pacificexcavation.com',
    phone: '+1 (555) 987-6543',
    inquiryType: 'Product inquiry',
    message: 'What is the shipping lead time to the Pacific Northwest for a fleet of 5 mini dumpers? We need these on-site by early August.',
    date: 'Jun 23, 2026, 02:30 PM',
    status: 'Contacted'
  },
  {
    id: 'inq-3',
    firstName: 'Amanda',
    lastName: 'Ross',
    email: 'aross@terradevelopers.com',
    phone: '+1 (555) 456-7890',
    inquiryType: 'Warranty Registration',
    message: 'Registering WL100 loader (Serial #KN-WL100-8023) purchased direct last month. Everything is performing beautifully.',
    date: 'Jun 24, 2026, 08:05 AM',
    status: 'Closed'
  }
];

const defaultBlogPosts = [
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
    status: 'Published',
    tags: ['maintenance', 'excavators'],
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
    status: 'Published',
    tags: ['loaders', 'buying'],
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
    status: 'Published',
    tags: ['safety', 'loaders'],
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
    status: 'Published',
    tags: ['loaders', 'excavators', 'attachments'],
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

const emptyBlogForm = {
  slug: '',
  title: '',
  seoTitle: '',
  seoDescription: '',
  category: 'Guide',
  image: '',
  date: '',
  publishedDate: '',
  updatedDate: '',
  desc: '',
  status: 'Published',
  tags: '',
  sectionOneTitle: '',
  sectionOneBody: '',
  sectionTwoTitle: '',
  sectionTwoBody: '',
  sectionThreeTitle: '',
  sectionThreeBody: ''
};

const formatDisplayDate = (dateValue) => {
  if (!dateValue) return '';
  const date = new Date(`${dateValue}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const createSlug = (value) => (
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
);

const normalizeBlogCategory = (value) => (
  value
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
);

const BLOG_SYNC_HASH_KEY = 'blogPosts';
const BLOG_SYNC_HASH_LIMIT = 120000;
const BLOG_SYNC_PORTS = ['5173', '5174', '5175', '5176', '5177', '5178', '5179'];
const BLOG_POSTS_STORAGE_KEY = 'konstructzBlogPosts';
const BLOG_POSTS_UPDATED_STORAGE_KEY = 'konstructzBlogPostsUpdatedAt';
const BLOG_DEFAULT_POSTS_MIGRATION_KEY = 'konstructzDefaultBlogPostsMerged';
const BLOG_USER_HAS_MANAGED_POSTS_KEY = 'konstructzUserHasManagedBlogPosts';
const BLOG_POSTS_API_PATH = '/api/blog-posts';
const BLOG_PREVIEW_ORIGIN_STORAGE_KEY = 'konstructzBlogPreviewOrigin';
const BLOG_COMMENTS_STORAGE_KEY = 'konstructzComments';
const KONSTRUCTZ_DB_NAME = 'konstructzLocalContent';
const KONSTRUCTZ_DB_STORE = 'content';
const BLOG_DEFAULT_POSTS_VERSION = defaultBlogPosts.map(post => post.slug).join('|');

const isLocalhostName = (hostname) => hostname === 'localhost' || hostname === '127.0.0.1';

const isAllowedLocalBlogSyncOrigin = (origin) => {
  try {
    const url = new URL(origin);
    return isLocalhostName(url.hostname) && BLOG_SYNC_PORTS.includes(url.port);
  } catch {
    return false;
  }
};

const openKonstructzDb = () => new Promise((resolve, reject) => {
  if (typeof indexedDB === 'undefined') {
    reject(new Error('IndexedDB is not available.'));
    return;
  }

  const request = indexedDB.open(KONSTRUCTZ_DB_NAME, 1);
  request.onupgradeneeded = () => {
    request.result.createObjectStore(KONSTRUCTZ_DB_STORE);
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});

const readPersistentContent = async (key) => {
  const db = await openKonstructzDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(KONSTRUCTZ_DB_STORE, 'readonly');
    const request = transaction.objectStore(KONSTRUCTZ_DB_STORE).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
};

const writePersistentContent = async (key, value) => {
  const db = await openKonstructzDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(KONSTRUCTZ_DB_STORE, 'readwrite');
    const request = transaction.objectStore(KONSTRUCTZ_DB_STORE).put(value, key);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
};

const saveJsonBackup = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Could not save ${key} to localStorage. IndexedDB backup will be used.`, err);
  }
};

const mergeMissingDefaultBlogPosts = (posts) => {
  if (!Array.isArray(posts)) {
    return { posts: defaultBlogPosts, changed: true };
  }

  try {
    if (localStorage.getItem(BLOG_USER_HAS_MANAGED_POSTS_KEY) === 'true') {
      return { posts, changed: false };
    }
    if (localStorage.getItem(BLOG_DEFAULT_POSTS_MIGRATION_KEY) === BLOG_DEFAULT_POSTS_VERSION) {
      return { posts, changed: false };
    }
  } catch {
    return { posts, changed: false };
  }

  const existingSlugs = new Set(posts.map(post => post?.slug).filter(Boolean));
  const missingDefaults = defaultBlogPosts.filter(post => !existingSlugs.has(post.slug));

  if (missingDefaults.length === 0) {
    try {
      localStorage.setItem(BLOG_DEFAULT_POSTS_MIGRATION_KEY, BLOG_DEFAULT_POSTS_VERSION);
    } catch {}
    return { posts, changed: false };
  }

  try {
    localStorage.setItem(BLOG_DEFAULT_POSTS_MIGRATION_KEY, BLOG_DEFAULT_POSTS_VERSION);
  } catch {}

  return {
    posts: [...posts, ...missingDefaults],
    changed: true
  };
};

const getSavedBlogPostsWithDefaults = (savedPosts) => {
  if (!savedPosts) {
    return { posts: defaultBlogPosts, changed: false };
  }
  const parsedPosts = JSON.parse(savedPosts);
  return mergeMissingDefaultBlogPosts(parsedPosts);
};

const readBlogPostsFromApi = async () => {
  const response = await fetch(BLOG_POSTS_API_PATH, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Blog API read failed with ${response.status}`);
  }

  const payload = await response.json();
  return Array.isArray(payload.posts) ? payload.posts : null;
};

const writeBlogPostsToApi = async (posts) => {
  const response = await fetch(BLOG_POSTS_API_PATH, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ posts })
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    throw new Error(payload.error || `Blog API save failed with ${response.status}`);
  }
};

const encodeBlogPostsForUrl = (posts) => {
  try {
    const payload = JSON.stringify(posts);
    const bytes = new TextEncoder().encode(payload);
    let binary = '';
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return btoa(binary);
  } catch (err) {
    console.error('Failed to encode blog posts for preview:', err);
    return '';
  }
};

const decodeBlogPostsFromUrl = (value) => {
  try {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (err) {
    console.error('Failed to import blog posts from preview URL:', err);
    return null;
  }
};

const getLocalBlogPreviewUrl = (posts = null) => {
  if (typeof window === 'undefined') return '/?page=blog';
  const url = new URL(window.location.href);
  url.search = '?page=blog';
  url.hash = '';

  if (isLocalhostName(url.hostname) && url.port === '5173') {
    try {
      const savedPreviewOrigin = localStorage.getItem(BLOG_PREVIEW_ORIGIN_STORAGE_KEY);
      if (savedPreviewOrigin && isAllowedLocalBlogSyncOrigin(savedPreviewOrigin)) {
        const previewOrigin = new URL(savedPreviewOrigin);
        url.protocol = previewOrigin.protocol;
        url.hostname = previewOrigin.hostname;
        url.port = previewOrigin.port;
      } else {
        url.port = '5175';
      }
    } catch {
      url.port = '5175';
    }
  }

  if (posts) {
    const encodedPosts = encodeBlogPostsForUrl(posts);
    if (encodedPosts && encodedPosts.length <= BLOG_SYNC_HASH_LIMIT) {
      url.hash = `${BLOG_SYNC_HASH_KEY}=${encodedPosts}`;
    }
  }

  return url.toString();
};

const postToForm = (post) => ({
  slug: post.slug,
  title: post.title,
  seoTitle: post.seoTitle || '',
  seoDescription: post.seoDescription || '',
  category: post.category,
  image: post.image || '',
  date: post.date,
  publishedDate: post.publishedDate,
  updatedDate: post.updatedDate,
  desc: post.desc,
  status: post.status || 'Published',
  tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
  sectionOneTitle: post.sections?.[0]?.h2 || '',
  sectionOneBody: post.sections?.[0]?.body || '',
  sectionTwoTitle: post.sections?.[1]?.h2 || '',
  sectionTwoBody: post.sections?.[1]?.body || '',
  sectionThreeTitle: post.sections?.[2]?.h2 || '',
  sectionThreeBody: post.sections?.[2]?.body || ''
});

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

const BlogImage = ({ src, alt, className, fallbackSvg }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError || !src) {
    return fallbackSvg || <WheelLoaderSvg />;
  }
  
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      onError={() => setHasError(true)} 
    />
  );
};

const topicFaqs = {
  'Machines': [
    {
      id: 'machines-1',
      question: 'What types of machines does KONSTRUCTZ manufacture?',
      answer: 'KONSTRUCTZ offers premium, jobsite-ready machinery including mini excavators, wheel loaders, mini skid steers, dumpers, and specialized attachments built for contractors.'
    },
    {
      id: 'machines-2',
      question: 'What is the difference between the K2-500 and K2-731 wheel loaders?',
      answer: 'The K2-500 is optimized for maximum tight-access maneuverability with a light footprint, while the K2-731 features a heavy-duty chassis, higher lift capacities, and an upgraded diesel engine package.'
    },
    {
      id: 'machines-3',
      question: 'Can I see the machines before purchasing?',
      answer: 'Yes. We can coordinate virtual live tours, detailed video walkthroughs, and direct photos of our current stock. Contact our sales department to request detailed equipment reports.'
    },
    {
      id: 'machines-4',
      question: 'Are KONSTRUCTZ machines certified to international standards?',
      answer: 'Absolutely. All our machines are fully certified with CE compliance, ISO manufacturing approvals, and EPA-compliant engines where applicable for target markets.'
    }
  ],
  'Buying & pricing': [
    {
      id: 'buying-1',
      question: 'How do I request a quote?',
      answer: 'You can add equipment and attachments to your request list using the cart, then submit a quote request. Alternatively, contact us directly at sales@cwqv.com or call our support line.'
    },
    {
      id: 'buying-2',
      question: 'Are there any hidden fees or extra costs for purchases?',
      answer: 'No, we provide completely transparent pricing. All standard import duties, local taxes, and freight handling charges are detailed clearly in your written quote before order finalization.'
    },
    {
      id: 'buying-3',
      question: 'What payment methods do you accept?',
      answer: 'We accept Bank Wire Transfers (T/T), Letters of Credit (L/C) for commercial orders, and all major corporate credit cards for attachment orders.'
    },
    {
      id: 'buying-4',
      question: 'Do you offer bulk discounts for fleet purchases?',
      answer: 'Yes, we offer tiered volume pricing for contractors and rental firms looking to acquire multiple units. Please request a custom quote from our sales department.'
    }
  ],
  'Delivery': [
    {
      id: 'delivery-1',
      question: 'Do you ship worldwide, and how are machines transported?',
      answer: 'Yes, we ship globally. Heavy machines are secured in shipping containers or shipped via Roll-on/Roll-off (RoRo) ocean transport, then delivered via flatbed trucks directly to your yard or jobsite.'
    },
    {
      id: 'delivery-2',
      question: 'What is the typical lead time for delivery?',
      answer: 'In-stock machinery is typically prepared and shipped within 7-10 business days. Custom builds or backordered equipment have a lead time of 45-60 days depending on manufacturer backlog.'
    },
    {
      id: 'delivery-3',
      question: 'How can I track my shipment?',
      answer: 'Once your order departs our logistics center, you will receive a tracking link along with bill of lading documentation, freight carrier details, and regular email status updates.'
    },
    {
      id: 'delivery-4',
      question: 'What happens if the machine is damaged during transit?',
      answer: 'All shipments are fully insured. In the extremely rare event of transit damage, document it immediately on the delivery receipt and contact us so we can process the insurance claim and dispatch replacement parts or a technician.'
    }
  ],
  'Warranty': [
    {
      id: 'warranty-1',
      question: 'What does the KONSTRUCTZ warranty cover?',
      answer: 'We provide a comprehensive 1-Year/1000-Hour warranty covering all major components including the engine, hydraulic pump, transmission, and main structural chassis.'
    },
    {
      id: 'warranty-2',
      question: 'How do I file a warranty claim?',
      answer: 'You can submit a claim online via our Support page or email support@cwqv.com with your machine serial number, operating hours, a description of the issue, and photos/videos.'
    },
    {
      id: 'warranty-3',
      question: 'Can I extend my warranty?',
      answer: 'Yes, we offer extended protection plans (up to 3 years or 3000 hours) that can be purchased at the time of order or before your standard 1-year warranty expires.'
    },
    {
      id: 'warranty-4',
      question: 'Does the warranty cover wear items?',
      answer: 'The standard warranty does not cover normal wear-and-tear items such as filters, fluids, seals, tracks, teeth, or hoses, unless they fail due to a verified manufacturing defect.'
    }
  ],
  'Service & parts': [
    {
      id: 'service-1',
      question: 'How do I order replacement parts?',
      answer: 'We maintain a fully stocked parts inventory. You can order replacement parts directly from our online support portal or email our parts specialists at support@cwqv.com.'
    },
    {
      id: 'service-2',
      question: 'Who performs maintenance on my machine?',
      answer: 'KONSTRUCTZ machines are designed with standard mechanical and hydraulic layouts that any certified diesel technician can service. We also partner with local service hubs to assist with repairs.'
    },
    {
      id: 'service-3',
      question: 'Where can I find user manuals and service schedules?',
      answer: 'Operation and maintenance manuals, wiring diagrams, and parts books are shipped with each machine. PDF versions are also available for download in our digital Support portal.'
    },
    {
      id: 'service-4',
      question: 'What is the recommended service interval?',
      answer: 'We recommend performing a break-in service after the first 50 hours of operation, followed by regular scheduled maintenance every 250 hours (engine oil, filters, hydraulic checks, and lubrication).'
    }
  ],
  'Financing': [
    {
      id: 'financing-1',
      question: 'Do you offer in-house financing or leasing?',
      answer: 'Yes. We work with leading equipment finance partners to offer flexible leasing, lease-to-own, and standard commercial financing plans tailored to your business needs.'
    },
    {
      id: 'financing-2',
      question: 'What are the general criteria for financing approval?',
      answer: 'Commercial approval typically requires a minimum of 2 years in business, a good business credit history, and a completed commercial credit application form.'
    },
    {
      id: 'financing-3',
      question: 'Can attachments and delivery fees be financed?',
      answer: 'Yes, you can bundle attachments, bucket accessories, spare parts packages, and shipping costs directly into your equipment finance contract.'
    },
    {
      id: 'financing-4',
      question: 'Are there any tax advantages to financing?',
      answer: 'Under Section 179 of the IRS tax code, businesses may be eligible to write off the full purchase price of qualifying equipment in the tax year it is put into service. Consult your accountant for details.'
    }
  ]
};

const socialLinks = [
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@impossiblemachinery',
    className: 'tiktok',
    shortLabel: '♪'
  },
  {
    label: 'Pinterest',
    url: 'https://www.pinterest.com/ImpossibleMachinery',
    className: 'pin',
    shortLabel: 'P'
  },
  {
    label: 'Reddit',
    url: 'https://www.reddit.com/user/ImpossibleMachinery',
    className: 'reddit',
    shortLabel: 'r'
  },
  {
    label: 'Tumblr',
    url: 'https://www.tumblr.com/impossiblemachinery',
    className: 'tumblr',
    shortLabel: 't'
  },
  {
    label: 'X',
    url: 'https://x.com/impss_machinery',
    className: 'x',
    shortLabel: 'X'
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/ImpossibleMachinery',
    className: 'fb',
    shortLabel: 'f'
  },
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/impossiblemachinery',
    className: 'ig',
    shortLabel: 'I'
  }
];

const parseTextareaMedia = (text) => {
  if (!text) return [];
  const lines = text.split('\n');
  const mediaItems = [];
  
  const imageUrlRegex = /^(https?:\/\/[^\s]+(?:\.webp|\.png|\.jpg|\.jpeg|\.gif))$/i;
  const videoUrlRegex = /^(https?:\/\/[^\s]+(?:\.mp4|\.webm|\.ogg|\.mov))$/i;
  const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
  
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    
    if (trimmed.startsWith('data:image/') || imageUrlRegex.test(trimmed)) {
      mediaItems.push({
        type: 'image',
        src: trimmed,
        rawLine: line
      });
    }
    else if (trimmed.startsWith('data:video/') || videoUrlRegex.test(trimmed)) {
      mediaItems.push({
        type: 'video',
        src: trimmed,
        rawLine: line
      });
    }
    else if (youtubeRegex.test(trimmed)) {
      const match = trimmed.match(youtubeRegex);
      mediaItems.push({
        type: 'youtube',
        src: `https://www.youtube.com/embed/${match[1]}`,
        rawLine: line
      });
    }
    else if (trimmed.startsWith('<iframe') && trimmed.endsWith('</iframe>')) {
      const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
      if (srcMatch) {
        mediaItems.push({
          type: 'embed',
          src: srcMatch[1],
          rawLine: line
        });
      }
    }
  });
  
  return mediaItems;
};

const getVisibleBlogPosts = (posts) => {
  const today = new Date().toISOString().split('T')[0];
  return posts.filter(post => {
    const status = post.status || 'Published';
    if (status === 'Draft') return false;
    if (status === 'Scheduled') {
      return post.publishedDate && post.publishedDate <= today;
    }
    return true;
  });
};

const getBlogDisplayData = (post) => {
  let displayImage = post?.image || '';
  let displayDesc = post?.desc || '';
  const urlRegex = /(https?:\/\/[^\s]+(?:\.webp|\.png|\.jpg|\.jpeg|\.gif))/i;

  if (displayDesc) {
    const match = displayDesc.match(urlRegex);
    if (match) {
      if (!displayImage) {
        displayImage = match[0];
      }
      displayDesc = displayDesc.replace(urlRegex, '').trim();
    }
  }

  if (!displayImage && post?.slug) {
    displayImage = fallbackBlogImagesBySlug[post.slug] || heroLoader;
  }

  return {
    displayImage: displayImage || heroLoader,
    displayDesc
  };
};

const renderParagraphWithMedia = (text) => {
  if (!text) return null;
  const lines = text.split('\n');
  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    if (!trimmed) return <br key={lineIdx} />;
    
    const isBase64Image = trimmed.startsWith('data:image/');
    const imageUrlRegex = /^(https?:\/\/[^\s]+(?:\.webp|\.png|\.jpg|\.jpeg|\.gif))$/i;
    const isImageUrl = imageUrlRegex.test(trimmed);
    
    if (isBase64Image || isImageUrl) {
      return (
        <div key={lineIdx} className="blog-body-media-wrapper blog-body-image">
          <img src={trimmed} alt="Article media" className="blog-body-inserted-image" />
        </div>
      );
    }
    
    const isBase64Video = trimmed.startsWith('data:video/');
    const videoUrlRegex = /^(https?:\/\/[^\s]+(?:\.mp4|\.webm|\.ogg|\.mov))$/i;
    const isVideoUrl = videoUrlRegex.test(trimmed) || isBase64Video;
    if (isVideoUrl) {
      return (
        <div key={lineIdx} className="blog-body-media-wrapper blog-body-video">
          <video src={trimmed} controls className="blog-body-inserted-video" />
        </div>
      );
    }
    
    const youtubeRegex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})(?:\S+)?$/;
    const ytMatch = trimmed.match(youtubeRegex);
    if (ytMatch) {
      const videoId = ytMatch[1];
      return (
        <div key={lineIdx} className="blog-body-media-wrapper blog-body-youtube">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="blog-body-inserted-youtube"
          ></iframe>
        </div>
      );
    }
    
    if (trimmed.startsWith('<iframe') && trimmed.endsWith('</iframe>')) {
      const srcMatch = trimmed.match(/src=["']([^"']+)["']/);
      if (srcMatch) {
        return (
          <div key={lineIdx} className="blog-body-media-wrapper blog-body-iframe">
            <iframe
              src={srcMatch[1]}
              title="Embedded media"
              frameBorder="0"
              allowFullScreen
              className="blog-body-inserted-iframe"
            ></iframe>
          </div>
        );
      }
    }
    
    return (
      <p key={lineIdx} className="blog-body-text-line">
        {line}
      </p>
    );
  });
};

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
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);
  const [addedCartItem, setAddedCartItem] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [storedCsvName, setStoredCsvName] = useState('');
  const [storedCsvText, setStoredCsvText] = useState('');
  const [csvPreviewRows, setCsvPreviewRows] = useState([]);
  const [csvPreviewHeaders, setCsvPreviewHeaders] = useState([]);
  const [csvStatus, setCsvStatus] = useState('');
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [blogPosts, setBlogPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem(BLOG_POSTS_STORAGE_KEY);
      const { posts, changed } = getSavedBlogPostsWithDefaults(savedPosts);
      if (changed) {
        saveJsonBackup(BLOG_POSTS_STORAGE_KEY, posts);
        writePersistentContent(BLOG_POSTS_STORAGE_KEY, posts).catch(err => {
          console.error('Failed to save restored blog posts to IndexedDB:', err);
        });
      }
      return posts;
    } catch {
      return defaultBlogPosts;
    }
  });
  const blogPostsRef = useRef(blogPosts);
  const [blogAdminForm, setBlogAdminForm] = useState(emptyBlogForm);

  const [comments, setComments] = useState(() => {
    try {
      const savedComments = localStorage.getItem(BLOG_COMMENTS_STORAGE_KEY);
      return savedComments ? JSON.parse(savedComments) : defaultComments;
    } catch {
      return defaultComments;
    }
  });
  const commentsRef = useRef(comments);

  const [inquiries, setInquiries] = useState(() => {
    try {
      const savedInquiries = localStorage.getItem('konstructzInquiries');
      return savedInquiries ? JSON.parse(savedInquiries) : defaultInquiries;
    } catch {
      return defaultInquiries;
    }
  });

  const [productViews, setProductViews] = useState(() => {
    try {
      const savedViews = localStorage.getItem('konstructzProductViews');
      return savedViews ? JSON.parse(savedViews) : {};
    } catch {
      return {};
    }
  });

  const [blogPostViews, setBlogPostViews] = useState(() => {
    try {
      const savedViews = localStorage.getItem('konstructzBlogPostViews');
      return savedViews ? JSON.parse(savedViews) : {};
    } catch {
      return {};
    }
  });

  const [dashboardTab, setDashboardTab] = useState('overview');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('All');
  const [adminPostSearch, setAdminPostSearch] = useState('');
  const [adminPostStatusFilter, setAdminPostStatusFilter] = useState('All');
  const [adminCommentStatusFilter, setAdminCommentStatusFilter] = useState('All');
  
  const [commentForm, setCommentForm] = useState({
    authorName: '',
    authorEmail: '',
    content: ''
  });
  const [editingBlogSlug, setEditingBlogSlug] = useState(null);
  const [isBlogEditing, setIsBlogEditing] = useState(false);
  const [blogAdminStatus, setBlogAdminStatus] = useState('');
  const [blogSearchQuery, setBlogSearchQuery] = useState('');
  const [activeBlogCategory, setActiveBlogCategory] = useState('All');
  const [activeBlogTag, setActiveBlogTag] = useState('All');

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatInput, setAiChatInput] = useState('');
  const [aiChatMessages, setAiChatMessages] = useState(() => [
    createAiMessage("Hello! I'm your AI Machinery Assistant. How can I help you today?"),
    createUserMessage('What is the price of SKOOP II Wheel Loader and how much is delivery to California?'),
    createAiMessage('', { variant: 'skoop-card' })
  ]);

  const carouselGridRef = useRef(null);

  useEffect(() => {
    blogPostsRef.current = blogPosts;
  }, [blogPosts]);

  useEffect(() => {
    commentsRef.current = comments;
  }, [comments]);

  useEffect(() => {
    let cancelled = false;

    const loadSavedContent = async () => {
      try {
        const [apiPosts, savedPosts, savedComments] = await Promise.all([
          readBlogPostsFromApi().catch(() => null),
          readPersistentContent(BLOG_POSTS_STORAGE_KEY).catch(() => null),
          readPersistentContent(BLOG_COMMENTS_STORAGE_KEY).catch(() => null)
        ]);

        if (cancelled) return;

        if (Array.isArray(apiPosts)) {
          setBlogPosts(apiPosts);
          saveJsonBackup(BLOG_POSTS_STORAGE_KEY, apiPosts);
          writePersistentContent(BLOG_POSTS_STORAGE_KEY, apiPosts).catch(err => {
            console.error('Failed to cache API blog posts to IndexedDB:', err);
          });
        } else if (Array.isArray(savedPosts)) {
          const { posts: restoredPosts, changed } = mergeMissingDefaultBlogPosts(savedPosts);
          const currentPosts = blogPostsRef.current;
          const isOlderBackup = restoredPosts.length < currentPosts.length;
          if (!isOlderBackup && JSON.stringify(restoredPosts) !== JSON.stringify(currentPosts)) {
            setBlogPosts(restoredPosts);
            saveJsonBackup(BLOG_POSTS_STORAGE_KEY, restoredPosts);
          }
          if (changed) {
            writePersistentContent(BLOG_POSTS_STORAGE_KEY, restoredPosts).catch(err => {
              console.error('Failed to save restored blog posts to IndexedDB:', err);
            });
          }
        }

        if (Array.isArray(savedComments)) {
          setComments(savedComments);
          saveJsonBackup(BLOG_COMMENTS_STORAGE_KEY, savedComments);
        }
      } catch (err) {
        console.error('Failed to load saved blog content:', err);
      }
    };

    loadSavedContent();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === BLOG_POSTS_STORAGE_KEY) {
        try {
          const { posts: nextPosts } = getSavedBlogPostsWithDefaults(e.newValue);
          setBlogPosts(nextPosts);
        } catch (err) {
          console.error('Failed to parse blog posts from storage event:', err);
        }
      }
      if (e.key === BLOG_COMMENTS_STORAGE_KEY) {
        try {
          const nextComments = e.newValue ? JSON.parse(e.newValue) : defaultComments;
          setComments(nextComments);
        } catch (err) {
          console.error('Failed to parse comments from storage event:', err);
        }
      }
      if (e.key === 'konstructzInquiries') {
        try {
          const nextInquiries = e.newValue ? JSON.parse(e.newValue) : defaultInquiries;
          setInquiries(nextInquiries);
        } catch (err) {
          console.error('Failed to parse inquiries from storage event:', err);
        }
      }
      if (e.key === 'konstructzProductViews') {
        try {
          const nextViews = e.newValue ? JSON.parse(e.newValue) : {};
          setProductViews(nextViews);
        } catch (err) {
          console.error('Failed to parse product views from storage event:', err);
        }
      }
      if (e.key === 'konstructzBlogPostViews') {
        try {
          const nextViews = e.newValue ? JSON.parse(e.newValue) : {};
          setBlogPostViews(nextViews);
        } catch (err) {
          console.error('Failed to parse blog post views from storage event:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

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
    try {
      const savedInquiries = localStorage.getItem('konstructzInquiries');
      const inquiriesList = savedInquiries ? JSON.parse(savedInquiries) : defaultInquiries;
      const newInquiry = {
        id: `inq-${Date.now()}`,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        phone: formValues.phone,
        inquiryType: formValues.inquiryType || 'Product inquiry',
        message: formValues.message,
        date: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Pending'
      };
      const nextInquiries = [newInquiry, ...inquiriesList];
      setInquiries(nextInquiries);
      localStorage.setItem('konstructzInquiries', JSON.stringify(nextInquiries));
    } catch (err) {
      console.error('Failed to save inquiry:', err);
    }
  };

  const syncFramesRef = useRef([]);

  const broadcastToAllPorts = (data) => {
    if (typeof window === 'undefined') return;
    if (!isLocalhostName(window.location.hostname) || !BLOG_SYNC_PORTS.includes(window.location.port)) {
      return;
    }
    
    let currentInquiries = [];
    try {
      const savedInquiries = localStorage.getItem('konstructzInquiries');
      currentInquiries = savedInquiries ? JSON.parse(savedInquiries) : inquiries;
    } catch {}

    let currentProductViews = {};
    try {
      const savedProductViews = localStorage.getItem('konstructzProductViews');
      currentProductViews = savedProductViews ? JSON.parse(savedProductViews) : productViews;
    } catch {}

    let currentBlogPostViews = {};
    try {
      const savedBlogPostViews = localStorage.getItem('konstructzBlogPostViews');
      currentBlogPostViews = savedBlogPostViews ? JSON.parse(savedBlogPostViews) : blogPostViews;
    } catch {}

    const payload = {
      type: 'konstructz:sync-all-data',
      posts: data.posts || blogPosts,
      comments: data.comments || comments,
      inquiries: data.inquiries || currentInquiries,
      productViews: data.productViews || currentProductViews,
      blogPostViews: data.blogPostViews || currentBlogPostViews,
      savedAt: Date.now()
    };

    syncFramesRef.current.forEach(frame => {
      try {
        const port = frame.dataset.port;
        if (!port) return;
        const targetOrigin = `${window.location.protocol}//${window.location.hostname}:${port}`;
        frame.contentWindow?.postMessage(payload, targetOrigin);
      } catch (err) {
        console.warn('Failed to postMessage to frame:', err);
      }
    });
  };

  const saveBlogPosts = (nextPosts) => {
    try {
      localStorage.setItem(BLOG_USER_HAS_MANAGED_POSTS_KEY, 'true');
    } catch {
      // This flag only prevents default demo content from being re-added after admin edits.
    }
    setBlogPosts(nextPosts);
    saveJsonBackup(BLOG_POSTS_STORAGE_KEY, nextPosts);
    try {
      localStorage.setItem(BLOG_POSTS_UPDATED_STORAGE_KEY, String(Date.now()));
    } catch {
      // Timestamp is helpful but not required when IndexedDB is available.
    }
    writePersistentContent(BLOG_POSTS_STORAGE_KEY, nextPosts).catch(err => {
      console.error('Failed to save blog posts to IndexedDB:', err);
      setBlogAdminStatus('Post saved for this session, but browser storage failed. Try removing large pasted images.');
    });
    writeBlogPostsToApi(nextPosts)
      .then(() => {
        setBlogAdminStatus('Blog changes saved to the site.');
      })
      .catch(err => {
        console.error('Failed to save blog posts to API:', err);
        setBlogAdminStatus('Saved in this browser, but not to the site file. Restart the dev server if /api/blog-posts is not available.');
      });
    broadcastToAllPorts({ posts: nextPosts });
  };

  const saveComments = (nextComments) => {
    setComments(nextComments);
    saveJsonBackup(BLOG_COMMENTS_STORAGE_KEY, nextComments);
    writePersistentContent(BLOG_COMMENTS_STORAGE_KEY, nextComments).catch(err => {
      console.error('Failed to save comments to IndexedDB:', err);
    });
    broadcastToAllPorts({ comments: nextComments });
  };

  const syncBlogPostsToPreview = (nextPosts) => {
    if (typeof window === 'undefined') return false;

    const previewUrl = getLocalBlogPreviewUrl(nextPosts);
    const previewOrigin = new URL(previewUrl).origin;
    const previewWindow = window.open(previewUrl, '_blank');

    if (!previewWindow) {
      return false;
    }

    const payload = {
      type: 'konstructz:sync-blog-posts',
      posts: nextPosts,
      savedAt: Date.now()
    };
    let attempts = 0;
    const timer = window.setInterval(() => {
      previewWindow.postMessage(payload, previewOrigin);
      attempts += 1;
      if (attempts >= 16) {
        window.clearInterval(timer);
      }
    }, 250);

    return true;
  };

  useEffect(() => {
    const getCurrentBlogPostsUpdatedAt = () => Number(localStorage.getItem(BLOG_POSTS_UPDATED_STORAGE_KEY) || 0);
    const getCurrentBlogPosts = () => {
      try {
        const savedPosts = localStorage.getItem(BLOG_POSTS_STORAGE_KEY);
        return savedPosts ? getSavedBlogPostsWithDefaults(savedPosts).posts : blogPostsRef.current;
      } catch {
        return blogPostsRef.current;
      }
    };
    const shouldImportBlogPosts = (incomingPosts, incomingSavedAt = 0) => {
      const currentPosts = getCurrentBlogPosts();
      const currentSavedAt = getCurrentBlogPostsUpdatedAt();
      return (
        incomingSavedAt > currentSavedAt ||
        incomingPosts.length > currentPosts.length ||
        JSON.stringify(currentPosts) === JSON.stringify(defaultBlogPosts)
      );
    };
    const saveSyncedBlogPosts = (posts, status = 'Blog preview synced.', savedAt = Date.now()) => {
      try {
        localStorage.setItem(BLOG_USER_HAS_MANAGED_POSTS_KEY, 'true');
      } catch {}
      saveJsonBackup(BLOG_POSTS_STORAGE_KEY, posts);
      try {
        localStorage.setItem(BLOG_POSTS_UPDATED_STORAGE_KEY, String(savedAt || Date.now()));
      } catch {
        // Timestamp is optional when the content itself is persisted elsewhere.
      }
      writePersistentContent(BLOG_POSTS_STORAGE_KEY, posts).catch(err => {
        console.error('Failed to save synced blog posts to IndexedDB:', err);
      });
      setBlogPosts(posts);
      setBlogAdminStatus(status);
    };

    const importBlogPostsFromHash = () => {
      const hashValue = window.location.hash.startsWith('#')
        ? window.location.hash.slice(1)
        : window.location.hash;
      const hashParams = new URLSearchParams(hashValue);
      const encodedPosts = hashParams.get(BLOG_SYNC_HASH_KEY);

      if (!encodedPosts) {
        return;
      }

      const importedPosts = decodeBlogPostsFromUrl(encodedPosts);
      if (!Array.isArray(importedPosts)) {
        return;
      }

      try {
        saveSyncedBlogPosts(importedPosts, 'Blog preview imported.');
        window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
      } catch (err) {
        console.error('Failed to save imported blog posts:', err);
      }
    };

    const handleBlogSyncMessage = (event) => {
      if (!isAllowedLocalBlogSyncOrigin(event.origin)) {
        return;
      }

      if (event.data?.type === 'konstructz:request-blog-posts') {
        try {
          localStorage.setItem(BLOG_PREVIEW_ORIGIN_STORAGE_KEY, event.origin);
          event.source?.postMessage(
            {
              type: 'konstructz:blog-posts-response',
              posts: getCurrentBlogPosts(),
              savedAt: getCurrentBlogPostsUpdatedAt()
            },
            event.origin
          );
        } catch (err) {
          console.error('Failed to answer blog sync request:', err);
        }
        return;
      }

      if (
        !['konstructz:sync-blog-posts', 'konstructz:blog-posts-response', 'konstructz:sync-all-data'].includes(event.data?.type) ||
        (!Array.isArray(event.data.posts) && !Array.isArray(event.data.comments) && !Array.isArray(event.data.inquiries))
      ) {
        return;
      }

      try {
        if (
          Array.isArray(event.data.posts) &&
          (event.data.type === 'konstructz:sync-blog-posts' || shouldImportBlogPosts(event.data.posts, event.data.savedAt))
        ) {
          saveSyncedBlogPosts(event.data.posts, 'Blog preview synced.', event.data.savedAt);
        }
        if (Array.isArray(event.data.comments)) {
          setComments(event.data.comments);
          saveJsonBackup(BLOG_COMMENTS_STORAGE_KEY, event.data.comments);
          writePersistentContent(BLOG_COMMENTS_STORAGE_KEY, event.data.comments).catch(err => {
            console.error('Failed to save synced comments to IndexedDB:', err);
          });
        }
        if (Array.isArray(event.data.inquiries)) {
          setInquiries(event.data.inquiries);
          saveJsonBackup('konstructzInquiries', event.data.inquiries);
        }
        if (event.data.productViews) {
          setProductViews(event.data.productViews);
          saveJsonBackup('konstructzProductViews', event.data.productViews);
        }
        if (event.data.blogPostViews) {
          setBlogPostViews(event.data.blogPostViews);
          saveJsonBackup('konstructzBlogPostViews', event.data.blogPostViews);
        }
      } catch (err) {
        console.error('Failed to sync blog posts:', err);
      }
    };

    const setupLocalSyncFrames = () => {
      if (!isLocalhostName(window.location.hostname) || !BLOG_SYNC_PORTS.includes(window.location.port)) {
        return undefined;
      }

      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') || 'home';
      if (page === 'blog-sync-source') {
        return undefined;
      }

      const frames = BLOG_SYNC_PORTS
        .filter(port => port !== window.location.port)
        .map((port) => {
          const sourceOrigin = `${window.location.protocol}//${window.location.hostname}:${port}`;
          const frame = document.createElement('iframe');
          frame.src = `${sourceOrigin}/?page=blog-sync-source`;
          frame.title = `Blog sync source ${port}`;
          frame.dataset.port = port;
          frame.style.display = 'none';
          frame.addEventListener('load', () => {
            let attempts = 0;
            const requestTimer = window.setInterval(() => {
              frame.contentWindow?.postMessage({ type: 'konstructz:request-blog-posts' }, sourceOrigin);
              attempts += 1;
              if (attempts >= 8) {
                window.clearInterval(requestTimer);
              }
            }, 250);
          });
          document.body.appendChild(frame);
          return frame;
        });

      syncFramesRef.current = frames;

      return () => {
        syncFramesRef.current = [];
        frames.forEach(frame => frame.remove());
      };
    };

    importBlogPostsFromHash();
    window.addEventListener('message', handleBlogSyncMessage);
    const cleanupLocalSyncFrames = setupLocalSyncFrames();
    return () => {
      cleanupLocalSyncFrames?.();
      window.removeEventListener('message', handleBlogSyncMessage);
    };
  }, []);

  const handleBlogAdminInput = (e) => {
    const { name, value } = e.target;
    setBlogAdminForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !editingBlogSlug ? { slug: createSlug(value) } : {})
    }));
  };

  const handleBodyPaste = (e, fieldName) => {
    const files = e.clipboardData?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        e.preventDefault();
        if (file.size > 1.5 * 1024 * 1024) {
          setBlogAdminStatus('Pasted image exceeds 1.5MB. Please paste a smaller image or use an image URL to conserve storage.');
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const base64Url = reader.result;
          const textarea = e.target;
          const startPos = textarea.selectionStart;
          const endPos = textarea.selectionEnd;
          const text = textarea.value;
          const newText = text.substring(0, startPos) + `\n${base64Url}\n` + text.substring(endPos);
          
          setBlogAdminForm(prev => ({
            ...prev,
            [fieldName]: newText
          }));
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        e.preventDefault();
        if (file.size > 3.0 * 1024 * 1024) {
          setBlogAdminStatus('Pasted video exceeds 3.0MB. Please use a video URL or compress the file to avoid browser storage limits.');
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          const base64Url = reader.result;
          const textarea = e.target;
          const startPos = textarea.selectionStart;
          const endPos = textarea.selectionEnd;
          const text = textarea.value;
          const newText = text.substring(0, startPos) + `\n${base64Url}\n` + text.substring(endPos);
          
          setBlogAdminForm(prev => ({
            ...prev,
            [fieldName]: newText
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const insertMediaIntoTextarea = (fieldName, base64Url) => {
    const textarea = document.querySelector(`textarea[name="${fieldName}"]`);
    if (textarea) {
      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const text = textarea.value;
      const newText = text.substring(0, startPos) + `\n${base64Url}\n` + text.substring(endPos);
      
      setBlogAdminForm(prev => ({
        ...prev,
        [fieldName]: newText
      }));
      
      setTimeout(() => {
        textarea.focus();
        const newCursorPos = startPos + base64Url.length + 2;
        textarea.setSelectionRange(newCursorPos, newCursorPos);
      }, 50);
    } else {
      setBlogAdminForm(prev => ({
        ...prev,
        [fieldName]: (prev[fieldName] || '') + `\n${base64Url}\n`
      }));
    }
  };

  const handleMediaFileSelect = (e, fieldName, type) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        setBlogAdminStatus('Selected file is not an image.');
        return;
      }
      if (file.size > 1.5 * 1024 * 1024) {
        setBlogAdminStatus('Selected image exceeds 1.5MB. Please choose a smaller image.');
        return;
      }
    } else if (type === 'video') {
      if (!file.type.startsWith('video/')) {
        setBlogAdminStatus('Selected file is not a video.');
        return;
      }
      if (file.size > 3.0 * 1024 * 1024) {
        setBlogAdminStatus('Selected video exceeds 3.0MB. Please use a compressed file.');
        return;
      }
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Url = reader.result;
      insertMediaIntoTextarea(fieldName, base64Url);
      setBlogAdminStatus(`${type === 'image' ? 'Image' : 'Video'} inserted into block.`);
      e.target.value = '';
    };
    reader.onerror = () => {
      setBlogAdminStatus('Failed to read file.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveMedia = (fieldName, rawLine) => {
    setBlogAdminForm(prev => {
      const text = prev[fieldName] || '';
      const lines = text.split('\n');
      const filteredLines = lines.filter(line => line.trim() !== rawLine.trim());
      
      const cleaned = [];
      let lastWasEmpty = false;
      filteredLines.forEach(line => {
        const isCurrentEmpty = !line.trim();
        if (isCurrentEmpty) {
          if (!lastWasEmpty) {
            cleaned.push(line);
          }
          lastWasEmpty = true;
        } else {
          cleaned.push(line);
          lastWasEmpty = false;
        }
      });
      
      return {
        ...prev,
        [fieldName]: cleaned.join('\n').trim()
      };
    });
    setBlogAdminStatus('Media element removed from block content.');
  };

  const renderTextareaMediaTools = (fieldName) => {
    const mediaItems = parseTextareaMedia(blogAdminForm[fieldName] || '');
    
    return (
      <div className="gutenberg-media-tools-wrapper">
        <div className="gutenberg-textarea-toolbar">
          <button 
            type="button" 
            className="gutenberg-toolbar-btn"
            onClick={() => document.getElementById(`media-file-input-${fieldName}-image`).click()}
          >
            🖼️ Insert Image File
          </button>
          <button 
            type="button" 
            className="gutenberg-toolbar-btn"
            onClick={() => document.getElementById(`media-file-input-${fieldName}-video`).click()}
          >
            🎥 Insert Video File
          </button>
          
          <input 
            type="file" 
            id={`media-file-input-${fieldName}-image`} 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={(e) => handleMediaFileSelect(e, fieldName, 'image')} 
          />
          <input 
            type="file" 
            id={`media-file-input-${fieldName}-video`} 
            accept="video/*" 
            style={{ display: 'none' }} 
            onChange={(e) => handleMediaFileSelect(e, fieldName, 'video')} 
          />
        </div>

        {mediaItems.length > 0 && (
          <div className="gutenberg-media-preview-list">
            {mediaItems.map((item, idx) => (
              <div key={idx} className="gutenberg-media-preview-card">
                <div className="gutenberg-preview-media-container">
                  {item.type === 'image' && (
                    <img src={item.src} alt="Preview" className="gutenberg-preview-thumb" />
                  )}
                  {item.type === 'video' && (
                    <video src={item.src} className="gutenberg-preview-thumb" muted playsInline />
                  )}
                  {(item.type === 'youtube' || item.type === 'embed') && (
                    <div className="gutenberg-preview-thumb embed-thumb">
                      <span className="embed-icon">🌐</span>
                    </div>
                  )}
                </div>
                <div className="gutenberg-preview-details">
                  <span className={`gutenberg-preview-badge ${item.type}`}>
                    {item.type.toUpperCase()}
                  </span>
                  <span className="gutenberg-preview-filename" title={item.src}>
                    {item.src.startsWith('data:') 
                      ? `${item.type === 'image' ? 'Image File' : 'Video File'} (${Math.round(item.src.length / 1024)} KB)`
                      : item.src.length > 30 ? item.src.substring(0, 30) + '...' : item.src
                    }
                  </span>
                </div>
                <button
                  type="button"
                  className="gutenberg-media-remove-btn"
                  onClick={() => handleRemoveMedia(fieldName, item.rawLine)}
                  title="Remove this media from content"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const handleBlogImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setBlogAdminStatus('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setBlogAdminForm(prev => ({
        ...prev,
        image: String(reader.result || '')
      }));
      setBlogAdminStatus('Image uploaded successfully.');
    };
    reader.onerror = () => {
      setBlogAdminStatus('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const resetBlogAdminForm = () => {
    setBlogAdminForm(emptyBlogForm);
    setEditingBlogSlug(null);
    setIsBlogEditing(false);
  };

  const handleEditBlogPost = (post) => {
    setBlogAdminForm(postToForm(post));
    setEditingBlogSlug(post.slug);
    setIsBlogEditing(true);
    setBlogAdminStatus(`Editing "${post.title}"`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteBlogPost = (slug) => {
    const post = blogPosts.find(item => item.slug === slug);
    if (!window.confirm(`Delete "${post?.title || slug}"? This removes it from the public blog in this browser.`)) {
      return;
    }
    const nextPosts = blogPosts.filter(post => post.slug !== slug);
    saveBlogPosts(nextPosts);
    if (editingBlogSlug === slug) {
      resetBlogAdminForm();
    }
    setBlogAdminStatus('Blog post deleted.');
  };

  const handleResetBlogPosts = () => {
    if (!window.confirm('Reset blog posts to the default demo articles? This will replace current blog content in this browser.')) {
      return;
    }
    saveBlogPosts(defaultBlogPosts);
    resetBlogAdminForm();
    setBlogAdminStatus('Blog posts reset to default content.');
  };

  const handleExportBlogData = () => {
    const data = {
      version: 1,
      exportedAt: new Date().toISOString(),
      posts: blogPosts,
      comments
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `konstructz-blog-data-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setBlogAdminStatus('Blog data exported. Import this file into the build/preview site to match content.');
  };

  const handleImportBlogData = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const importedPosts = Array.isArray(data.posts) ? data.posts : null;
        const importedComments = Array.isArray(data.comments) ? data.comments : [];

        if (!importedPosts) {
          setBlogAdminStatus('Import failed. Please choose a KONSTRUCTZ blog data JSON file.');
          return;
        }

        saveBlogPosts(importedPosts);
        saveComments(importedComments);
        setBlogAdminStatus(`Imported ${importedPosts.length} posts and ${importedComments.length} comments.`);
      } catch (err) {
        console.error('Failed to import blog data:', err);
        setBlogAdminStatus('Import failed. The selected file is not valid JSON.');
      } finally {
        e.target.value = '';
      }
    };
    reader.onerror = () => {
      setBlogAdminStatus('Import failed. Could not read the selected file.');
      e.target.value = '';
    };
    reader.readAsText(file);
  };

  const handleDeleteComment = (commentId) => {
    const nextComments = comments.filter(c => c.id !== commentId);
    saveComments(nextComments);
  };

  const handleToggleCommentStatus = (commentId) => {
    const nextComments = comments.map(c => {
      if (c.id === commentId) {
        const newStatus = c.status === 'Approved' ? 'Pending' : 'Approved';
        return { ...c, status: newStatus };
      }
      return c;
    });
    saveComments(nextComments);
  };

  const handleApprovePendingComments = () => {
    const nextComments = comments.map(c => (
      c.status === 'Approved' ? c : { ...c, status: 'Approved' }
    ));
    saveComments(nextComments);
    setBlogAdminStatus('All pending comments approved.');
  };

  const handleDeleteInquiry = (inquiryId) => {
    const nextInquiries = inquiries.filter(inq => inq.id !== inquiryId);
    setInquiries(nextInquiries);
    localStorage.setItem('konstructzInquiries', JSON.stringify(nextInquiries));
  };

  const handleUpdateInquiryStatus = (inquiryId, newStatus) => {
    const nextInquiries = inquiries.map(inq => {
      if (inq.id === inquiryId) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    setInquiries(nextInquiries);
    localStorage.setItem('konstructzInquiries', JSON.stringify(nextInquiries));
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentForm.authorName || !commentForm.authorEmail || !commentForm.content) {
      return;
    }
    const newComment = {
      id: `c-${Date.now()}`,
      blogSlug: selectedBlogPost.slug,
      authorName: commentForm.authorName,
      authorEmail: commentForm.authorEmail,
      content: commentForm.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Approved'
    };
    
    const nextComments = [newComment, ...comments];
    saveComments(nextComments);
    setCommentForm({ authorName: '', authorEmail: '', content: '' });
  };

  const handleBlogAdminSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    const slug = createSlug(blogAdminForm.slug || blogAdminForm.title);
    const publishedDate = blogAdminForm.publishedDate || today;
    const updatedDate = blogAdminForm.updatedDate || today;
    const submitterStatus = e.nativeEvent?.submitter?.value;
    const submitStatus = submitterStatus || blogAdminForm.status || 'Published';
    const category = normalizeBlogCategory(blogAdminForm.category || 'Guide');
    const sections = [
      { h2: blogAdminForm.sectionOneTitle, body: blogAdminForm.sectionOneBody },
      { h2: blogAdminForm.sectionTwoTitle, body: blogAdminForm.sectionTwoBody },
      { h2: blogAdminForm.sectionThreeTitle, body: blogAdminForm.sectionThreeBody }
    ].filter(section => section.h2 && section.body);

    if (!slug || !blogAdminForm.title || !blogAdminForm.desc || sections.length === 0) {
      setBlogAdminStatus('Please add a title, short description, and at least one section.');
      return;
    }

    const tagsArray = blogAdminForm.tags
      ? blogAdminForm.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      : [];

    const nextPost = {
      slug,
      title: blogAdminForm.title,
      seoTitle: blogAdminForm.seoTitle || `${blogAdminForm.title} | KONSTRUCTZ Blog`,
      seoDescription: blogAdminForm.seoDescription || blogAdminForm.desc,
      category,
      image: blogAdminForm.image,
      date: blogAdminForm.date || formatDisplayDate(publishedDate),
      publishedDate,
      updatedDate,
      desc: blogAdminForm.desc,
      status: submitStatus,
      tags: tagsArray,
      sections
    };

    const existingPost = blogPosts.find(post => post.slug === editingBlogSlug);
    const nextPosts = existingPost
      ? blogPosts.map(post => (post.slug === editingBlogSlug ? nextPost : post))
      : [nextPost, ...blogPosts.filter(post => post.slug !== slug)];

    saveBlogPosts(nextPosts);
    resetBlogAdminForm();
    const actionLabel = submitStatus === 'Draft'
      ? 'saved as draft'
      : submitStatus === 'Scheduled'
        ? 'scheduled'
        : existingPost
          ? 'updated and published'
          : 'published';
    setBlogAdminStatus(
      `Blog post ${actionLabel}. Public blog updates automatically in this browser.`
    );
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.nav-item-dropdown') && !e.target.closest('.mobile-menu-drawer')) {
        setDropdownOpen(false);
        setAttachmentsDropdownOpen(false);
        setTopicDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (currentView === 'product-detail' && selectedProduct) {
      try {
        const savedViews = localStorage.getItem('konstructzProductViews');
        const views = savedViews ? JSON.parse(savedViews) : {};
        const itemId = selectedProduct.id;
        views[itemId] = (views[itemId] || 0) + 1;
        setProductViews(views);
        localStorage.setItem('konstructzProductViews', JSON.stringify(views));
      } catch (err) {
        console.error('Failed to update product views:', err);
      }
    }
  }, [currentView, selectedProduct]);

  useEffect(() => {
    if (currentView === 'blog-post' && selectedBlogPost) {
      try {
        const savedViews = localStorage.getItem('konstructzBlogPostViews');
        const views = savedViews ? JSON.parse(savedViews) : {};
        const slug = selectedBlogPost.slug;
        views[slug] = (views[slug] || 0) + 1;
        setBlogPostViews(views);
        localStorage.setItem('konstructzBlogPostViews', JSON.stringify(views));
      } catch (err) {
        console.error('Failed to update blog post views:', err);
      }
    }
  }, [currentView, selectedBlogPost]);

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
  const [heroVideoError, setHeroVideoError] = useState(false);
  const [crusherImageError, setCrusherImageError] = useState(false);
  const [activeSystemAttachment, setActiveSystemAttachment] = useState(0);
  const [systemSlideDirection, setSystemSlideDirection] = useState('next');

  // FAQ Expand state
  const [openFaqId, setOpenFaqId] = useState(null);
  const [activeTopicCategory, setActiveTopicCategory] = useState('Hub');

  // Custom Topic Subpage Interactive States
  const [costVal, setCostVal] = useState(25000);
  const [termVal, setTermVal] = useState(36);
  const [trackingNum, setTrackingNum] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [activeWarrantyComponent, setActiveWarrantyComponent] = useState('Engine');
  const [activeServiceInterval, setActiveServiceInterval] = useState('50 Hours');
  const [activeMachineTab, setActiveMachineTab] = useState('All');

  const handleTrackShipment = (e) => {
    e.preventDefault();
    if (!trackingNum.trim()) return;
    const num = trackingNum.trim().toUpperCase();
    if (num.includes('KON')) {
      setTrackingResult({
        status: 'In Transit',
        origin: 'KONSTRUCTZ Assembly Plant',
        destination: 'Client Delivery Yard',
        progress: 65,
        steps: [
          { name: 'Order Processed', date: 'June 10, 2026', done: true },
          { name: 'Ocean Liner Loaded', date: 'June 15, 2026', done: true },
          { name: 'Customs Clearance', date: 'Estimated June 28, 2026', current: true },
          { name: 'Final Flatbed Delivery', date: 'Estimated July 02, 2026', pending: true }
        ]
      });
    } else {
      setTrackingResult({
        error: 'Tracking number not found. Try entering a code like "KON-9831" or "KON-8422".'
      });
    }
  };

  const handleTagClick = (tag) => {
    let mapped = 'Machines';
    if (tag === 'Warranty') mapped = 'Warranty';
    else if (tag === 'Delivery') mapped = 'Delivery';
    else if (tag === 'Spare parts' || tag === 'Maintenance') mapped = 'Service & parts';
    else if (tag === 'Payment') mapped = 'Buying & pricing';
    else if (tag === 'Request a demo') mapped = 'Machines';
    
    navigate('topic', { 'topic-category': mapped });
    setOpenFaqId(null);
  };

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

    try {
      const savedInquiries = localStorage.getItem('konstructzInquiries');
      const inquiriesList = savedInquiries ? JSON.parse(savedInquiries) : defaultInquiries;
      const newInquiry = {
        id: `inq-${Date.now()}`,
        firstName: 'Cart',
        lastName: 'User',
        email: 'customer@cwqv.com',
        phone: 'N/A',
        inquiryType: 'Get a quote',
        message: productList ? `Cart Quote Request: ${productList}` : 'Requested quote for items.',
        date: new Date().toLocaleString('en-US', { hour12: true, month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
        status: 'Pending'
      };
      const nextInquiries = [newInquiry, ...inquiriesList];
      setInquiries(nextInquiries);
      localStorage.setItem('konstructzInquiries', JSON.stringify(nextInquiries));
    } catch (err) {
      console.error(err);
    }

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

  const getCartCheckoutItem = () => cartItems.find(item => getStoreHash(item));

  const openCheckoutPage = (item) => {
    const itemId = item?.slug || item?.id || '';
    const checkoutUrl = `${window.location.pathname}?page=checkout&id=${encodeURIComponent(itemId)}#!/~/cart`;

    window.history.pushState({}, '', checkoutUrl);
    setCheckoutItem(item);
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const openCartCheckoutPage = () => {
    const checkoutUrl = `${window.location.pathname}?page=checkout&type=cart#!/~/cart`;

    window.history.pushState({}, '', checkoutUrl);
    setCheckoutItem({ isCartCheckout: true });
    setCurrentView('checkout');
    window.scrollTo(0, 0);
  };

  const hasCheckoutableItems = useMemo(() => {
    return cartItems.some(item => {
      const storeUrl = item?.checkoutUrl || item?.externalUrl || item?.hash || '';
      return /(?:-p|\/p\/)\d+/.test(storeUrl);
    });
  }, [cartItems]);


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
  const productSearchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    const terms = query.split(/\s+/).filter(Boolean);
    return allInventory
      .filter((item) => {
        const searchableText = [
          item.name,
          item.category,
          categoryLabels[item.category],
          item.subcategory,
          item.fitmentCategory,
          item.engine,
          item.cap,
          item.weight,
          item.type
        ].filter(Boolean).join(' ').toLowerCase();

        return terms.every(term => searchableText.includes(term));
      })
      .slice(0, 8);
  }, [allInventory, categoryLabels, searchQuery]);
  const getProductSearchMeta = (item) => (
    [
      item.type === 'Attachment' ? 'Attachment' : 'Equipment',
      item.subcategory || item.fitmentCategory || categoryLabels[item.category] || item.category
    ].filter(Boolean).join(', ')
  );
  const handleProductSearchSubmit = () => {
    const query = searchQuery.trim();
    if (!query) return;
    setInventorySearchQuery(query);
    setActiveCategory('All');
    setActiveKonstructzSubcategory('All');
    navigate('all-products', { search: query });
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };
  const handleProductSearchSelect = (item) => {
    handleProductDetail(item);
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchQuery('');
  };
  const renderProductSearchResults = (variant = 'desktop') => {
    const query = searchQuery.trim();
    if (query.length < 2) return null;

    return (
      <div className={`product-search-results ${variant === 'mobile' ? 'mobile' : ''}`}>
        {productSearchResults.length > 0 ? (
          productSearchResults.map(item => (
            <button
              type="button"
              key={`${item.type}-${item.id}`}
              className="product-search-result"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleProductSearchSelect(item)}
            >
              <span className="product-search-thumb">
                {item.image ? (
                  <BlogImage src={item.image} alt={item.name} />
                ) : (
                  <span className="product-search-thumb-fallback">{(item.category || item.type || 'P').slice(0, 1)}</span>
                )}
              </span>
              <span className="product-search-copy">
                <span className="product-search-meta">{getProductSearchMeta(item)}</span>
                <strong>{item.name}</strong>
              </span>
            </button>
          ))
        ) : (
          <div className="product-search-empty">
            <strong>No matching products</strong>
            <span>Press Enter to search the full inventory for “{query}”.</span>
          </div>
        )}
        <button type="button" className="product-search-view-all" onMouseDown={(e) => e.preventDefault()} onClick={handleProductSearchSubmit}>
          Search all products for “{query}”
        </button>
      </div>
    );
  };

  const carouselProducts = homeProducts;
  const visibleBlogPosts = useMemo(() => getVisibleBlogPosts(blogPosts), [blogPosts]);
  const blogCategories = useMemo(() => (
    ['All', ...Array.from(new Set(visibleBlogPosts.map(post => post.category).filter(Boolean)))]
  ), [visibleBlogPosts]);
  const blogTags = useMemo(() => {
    const tags = visibleBlogPosts.flatMap(post => Array.isArray(post.tags) ? post.tags : []);
    return ['All', ...Array.from(new Set(tags.filter(Boolean)))];
  }, [visibleBlogPosts]);
  const filteredBlogPosts = useMemo(() => {
    const query = blogSearchQuery.trim().toLowerCase();

    return visibleBlogPosts.filter((post) => {
      const matchesCategory = activeBlogCategory === 'All' || post.category === activeBlogCategory;
      const postTags = Array.isArray(post.tags) ? post.tags : [];
      const matchesTag = activeBlogTag === 'All' || postTags.includes(activeBlogTag);
      const searchableText = [
        post.title,
        post.desc,
        post.category,
        ...(Array.isArray(post.tags) ? post.tags : []),
        ...(Array.isArray(post.sections) ? post.sections.flatMap(section => [section.h2, section.body]) : [])
      ].filter(Boolean).join(' ').toLowerCase();

      return matchesCategory && matchesTag && (!query || searchableText.includes(query));
    });
  }, [activeBlogCategory, activeBlogTag, blogSearchQuery, visibleBlogPosts]);
  const adminPostCategories = useMemo(() => (
    ['All', ...Array.from(new Set(blogPosts.map(post => post.category).filter(Boolean)))]
  ), [blogPosts]);
  const adminPostCounts = useMemo(() => ({
    published: blogPosts.filter(post => (post.status || 'Published') === 'Published').length,
    draft: blogPosts.filter(post => post.status === 'Draft').length,
    scheduled: blogPosts.filter(post => post.status === 'Scheduled').length
  }), [blogPosts]);
  const filteredAdminBlogPosts = useMemo(() => {
    const query = adminPostSearch.trim().toLowerCase();

    return blogPosts.filter((post) => {
      const postStatus = post.status || 'Published';
      const matchesStatus = adminPostStatusFilter === 'All' || postStatus === adminPostStatusFilter;
      const searchableText = [
        post.title,
        post.desc,
        post.slug,
        post.category,
        postStatus,
        ...(Array.isArray(post.tags) ? post.tags : [])
      ].filter(Boolean).join(' ').toLowerCase();

      return matchesStatus && (!query || searchableText.includes(query));
    });
  }, [adminPostSearch, adminPostStatusFilter, blogPosts]);
  const commentCounts = useMemo(() => ({
    approved: comments.filter(comment => comment.status === 'Approved').length,
    pending: comments.filter(comment => (comment.status || 'Pending') !== 'Approved').length
  }), [comments]);
  const filteredAdminComments = useMemo(() => (
    comments.filter(comment => (
      adminCommentStatusFilter === 'All' ||
      (adminCommentStatusFilter === 'Approved' && comment.status === 'Approved') ||
      (adminCommentStatusFilter === 'Pending' && (comment.status || 'Pending') !== 'Approved')
    ))
  ), [adminCommentStatusFilter, comments]);
  const resetBlogFilters = () => {
    setBlogSearchQuery('');
    setActiveBlogCategory('All');
    setActiveBlogTag('All');
  };

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
    setCurrentView(view === 'store-data' ? 'admin-blog' : view);
    if (view === 'store-data') {
      setDashboardTab('inventory');
    }
    if (view === 'admin-blog' && additionalParams.tab) {
      setDashboardTab(additionalParams.tab);
    }
    if (view === 'contact' && additionalParams.inquiry) {
      setFormValues(prev => ({ ...prev, inquiryType: additionalParams.inquiry }));
    }
    if (view === 'topic') {
      setActiveTopicCategory(additionalParams['topic-category'] || 'Hub');
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

  const getAiAssistantReply = (question) => {
    const normalized = question.toLowerCase();
    const matchedProduct = aiProductKnowledge.find(product => (
      product.aliases.some(alias => normalized.includes(alias))
    ));
    const asksPrice = /\b(price|pricing|cost|quote|how much|payment|finance|financing)\b/.test(normalized);
    const asksDelivery = /\b(delivery|deliver|shipping|ship|freight|logistics|transport|california|texas|florida|new york|warehouse)\b/.test(normalized);
    const asksStock = /\b(stock|available|availability|inventory|in stock|warehouse|pickup)\b/.test(normalized);
    const asksSupport = /\b(support|warranty|service|after-sales|parts|manual|repair|maintenance)\b/.test(normalized);
    const asksAttachments = /\b(attachment|attachments|bucket|auger|breaker|hammer|rake|fork|trencher|coupler)\b/.test(normalized);
    const asksCompare = /\b(compare|versus| vs |difference|better|which one|choose)\b/.test(` ${normalized} `);
    const asksRecommendation = /\b(recommend|find|best machine|which machine|what machine|need machine|looking for)\b/.test(normalized);
    const asksContact = /\b(phone|number|call|contact|email|whatsapp|whats app|talk to sales|sales team)\b/.test(normalized);
    const asksCompany = /\b(company|who are you|who is konstructz|about konstructz|about your website|where are you|address|location)\b/.test(normalized);
    const asksProducts = /\b(product|products|catalog|what do you sell|machines|equipment|range|list)\b/.test(normalized);
    const asksProductInfo = /\b(about|info|information|details|tell me|can i ask|what is|what are|explain)\b/.test(normalized);
    const asksPayment = /\b(payment|pay|financing|finance|lease|loan|credit card|bank|wire)\b/.test(normalized);
    const asksReturn = /\b(return|refund|cancel|cancellation|exchange)\b/.test(normalized);
    const slopeUse = /\b(slope|hillside|hill|orchard|vineyard|wetland|riverbank|soft ground|forest|forestry)\b/.test(normalized);
    const loadingUse = /\b(load|loader|material|gravel|soil|mulch|pallet|warehouse|yard)\b/.test(normalized);
    const diggingUse = /\b(dig|digging|trench|trenching|drainage|foundation|excavat|utility)\b/.test(normalized);
    const generalGuide = normalized.includes('mini excavator') || normalized.includes('excavator')
      ? aiGeneralEquipmentGuide.miniExcavator
      : normalized.includes('wheel loader') || normalized.includes('loader')
        ? aiGeneralEquipmentGuide.wheelLoader
        : normalized.includes('skid steer') || normalized.includes('track loader')
          ? aiGeneralEquipmentGuide.trackLoader
          : asksAttachments
            ? aiGeneralEquipmentGuide.attachments
            : null;

    if (asksContact) {
      return {
        content: [
          `You can contact ${konstructzAssistantFacts.company} here:`,
          `Phone: ${konstructzAssistantFacts.phone}`,
          `WhatsApp: ${konstructzAssistantFacts.whatsapp}`,
          `Email: ${konstructzAssistantFacts.email}`,
          `Address: ${konstructzAssistantFacts.address}`,
          konstructzAssistantFacts.quoteTip
        ].join('\n')
      };
    }

    if (/\b(hi|hello|hey|good morning|good afternoon)\b/.test(normalized)) {
      return {
        content: [
          `Hello. I can help with ${konstructzAssistantFacts.company} product selection, quotes, shipping, warranty, parts, and support.`,
          'You can ask me about mini excavators, SKOOP II wheel loaders, skid steer loaders, walking excavators, attachments, delivery, stock, warranty, parts, and quotes.',
          'Tell me your job, ground condition, delivery state, and machine size you prefer.'
        ].join('\n')
      };
    }

    if (matchedProduct && (asksProductInfo || asksProducts || asksRecommendation)) {
      return {
        content: [
          `${matchedProduct.name}`,
          `Type: ${matchedProduct.type}`,
          `Best for: ${matchedProduct.bestFor}.`,
          `Typical terrain: ${matchedProduct.terrain}.`,
          `Price: ${matchedProduct.price}`,
          `Delivery: ${matchedProduct.delivery}`,
          `Support: ${matchedProduct.support}`,
          'Tell me your delivery state and main job, and I can help prepare a quote request.'
        ].join('\n'),
        cta: 'Request Quote'
      };
    }

    if (generalGuide && asksProductInfo) {
      return {
        content: [
          `${generalGuide.label}`,
          `Best for: ${generalGuide.bestFor}.`,
          `Buyer tip: ${generalGuide.buyerTip}`,
          generalGuide.questions
        ].join('\n')
      };
    }

    if (asksCompany) {
      return {
        content: [
          `${konstructzAssistantFacts.company} helps customers choose compact construction equipment, request quotes, confirm delivery, and get warranty, parts, and after-sales support.`,
          `Website: ${konstructzAssistantFacts.site}`,
          `Address: ${konstructzAssistantFacts.address}`,
          `Phone: ${konstructzAssistantFacts.phone}`,
          `Email: ${konstructzAssistantFacts.email}`
        ].join('\n')
      };
    }

    if (asksProducts) {
      return {
        content: [
          `${konstructzAssistantFacts.company} product areas include:`,
          'Mini excavators and compact excavator diggers',
          'Wheel loaders and compact loaders',
          'Skid steer / compact track loaders',
          'Towable and walking excavators',
          'Trenchers, dumpers, stone crushers, and jobsite attachments',
          'Tell me your job type and terrain, and I can suggest a machine.'
        ].join('\n')
      };
    }

    if (asksPayment) {
      return {
        content: [
          'Payment and financing details should be confirmed with the sales team because terms can depend on machine, inventory, destination, and order size.',
          `Phone: ${konstructzAssistantFacts.phone}`,
          `Email: ${konstructzAssistantFacts.email}`,
          konstructzAssistantFacts.quoteTip
        ].join('\n'),
        cta: 'Request Quote'
      };
    }

    if (asksReturn) {
      return {
        content: [
          'For returns, cancellations, exchanges, or refund questions, contact KONSTRUCTZ before shipping or modifying an order.',
          `Phone: ${konstructzAssistantFacts.phone}`,
          `Email: ${konstructzAssistantFacts.email}`,
          'Include your order number, machine name, purchase date, and reason for the request.'
        ].join('\n'),
        cta: 'Contact Support'
      };
    }

    if (asksCompare) {
      return {
        content: [
          'Here is the practical comparison:',
          'KUVUO 2.7 Mini Excavator: best for digging, trenching, drainage, utility work, and residential construction.',
          'SKOOP II Wheel Loader: best for loading, moving gravel/soil/mulch, pallets, and daily material handling.',
          'Spider One Walking Excavator: best for slopes, orchards, vineyards, soft ground, and places a normal tracked excavator cannot reach.',
          'Tell me your terrain and main task, and I can narrow it to one machine.'
        ].join('\n')
      };
    }

    if (asksRecommendation || slopeUse || loadingUse || diggingUse) {
      const recommendation = slopeUse
        ? aiProductKnowledge[2]
        : loadingUse
          ? aiProductKnowledge[1]
          : diggingUse
            ? aiProductKnowledge[0]
            : null;

      if (recommendation) {
        return {
          content: [
            `Best match: ${recommendation.name}`,
            `Machine type: ${recommendation.type}`,
            `Best for: ${recommendation.bestFor}.`,
            `Terrain: ${recommendation.terrain}.`,
            'For an accurate quote, I would need your delivery state, preferred attachments, and how soon you need the machine.'
          ].join('\n'),
          cta: 'Request Quote'
        };
      }
    }

    if (matchedProduct && (asksPrice || asksDelivery || asksStock || asksSupport || asksAttachments)) {
      const lines = [
        `${matchedProduct.name}`,
        `Type: ${matchedProduct.type}`,
        `Starting price: ${matchedProduct.price}`,
        `Delivery: ${matchedProduct.delivery}`,
        `Estimated timing: ${matchedProduct.leadTime}`,
        `Support: ${matchedProduct.support}`
      ];

      if (asksStock) {
        lines.push('Stock changes quickly, so the team should confirm live availability before you promise a customer or schedule a crew.');
      }

      if (asksAttachments) {
        lines.push('Attachment fitment depends on coupler type, hydraulic flow, machine size, and the job you plan to do.');
      }

      return {
        content: lines.join('\n'),
        cta: asksPrice || asksDelivery || asksStock ? 'Request Quote' : 'Contact Support'
      };
    }

    if (matchedProduct) {
      return {
        content: [
          `${matchedProduct.name} is a ${matchedProduct.type}.`,
          `Best for: ${matchedProduct.bestFor}.`,
          `Typical terrain: ${matchedProduct.terrain}.`,
          'Ask me about price, delivery, stock, attachments, warranty, or whether it fits your job.'
        ].join('\n')
      };
    }

    if (asksDelivery) {
      return {
        content: [
          'Shipping and delivery depend on the machine, live stock, freight route, and destination.',
          'Some product listings may include free shipping, but the sales team should confirm the current delivery schedule before purchase.',
          `Warehouse/contact location: ${konstructzAssistantFacts.address}`,
          konstructzAssistantFacts.quoteTip
        ].join('\n'),
        cta: 'Request Quote'
      };
    }

    if (asksPrice) {
      return {
        content: [
          'Prices can vary by model, attachment package, inventory, freight, and destination.',
          'Example: SKOOP II Wheel Loader is listed at $15,499.00.',
          'For other machines, send the model name and delivery location so the team can confirm current pricing.'
        ].join('\n'),
        cta: 'Request Quote'
      };
    }

    if (asksSupport) {
      return {
        content: [
          'Support is available for warranty, parts, maintenance, service questions, manuals, and after-sales help.',
          `Phone: ${konstructzAssistantFacts.phone}`,
          `Email: ${konstructzAssistantFacts.email}`,
          'Please include the machine model, serial number if available, hours of use, photos/video, and a short description of the issue.'
        ].join('\n'),
        cta: 'Contact Support'
      };
    }

    if (asksAttachments) {
      return {
        content: 'I can help match attachments such as buckets, augers, breakers, forks, rakes, trenching tools, and couplers. The right choice depends on the machine model, hydraulic flow, coupler size, and job type.'
      };
    }

    if (asksStock) {
      return {
        content: 'Live stock and warehouse availability should be confirmed by the sales team because inventory can change quickly. Tell me the machine and delivery state, and I can help prepare the request.',
        cta: 'Request Quote'
      };
    }

    return {
      content: 'I can help with machine recommendations, product comparison, quote questions, delivery, warehouse stock, logistics, warranty, after-sales service, attachments, and support. Tell me what job you need the machine for and where it will be delivered.'
    };
  };

  const handleAiAssistantSubmit = (messageText = aiChatInput) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage) return;

    const aiReply = getAiAssistantReply(trimmedMessage);
    setAiChatMessages(prev => [
      ...prev,
      createUserMessage(trimmedMessage),
      createAiMessage(aiReply.content, aiReply)
    ]);
    setAiChatInput('');
  };

  const openAiQuoteForm = () => {
    setFormValues(prev => ({
      ...prev,
      inquiryType: 'Get a quote',
      message: prev.message || 'I would like a detailed machinery quote with delivery, stock availability, warranty, parts, and after-sales service information.'
    }));
    setAiChatOpen(false);
    navigate('contact', { inquiry: 'Get a quote' });
  };

  const openAiSupportForm = () => {
    setFormValues(prev => ({
      ...prev,
      inquiryType: 'Technical Support',
      message: prev.message || 'I need support for warranty, parts, service, manuals, or after-sales help.'
    }));
    setAiChatOpen(false);
    navigate('support');
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
      const topicCategory = params.get('topic-category');

      if (view !== 'store' && view !== 'checkout' && window.location.hash.startsWith('#!')) {
        window.history.replaceState({}, '', `${window.location.pathname}${window.location.search}`);
      }

      if (requestedView === 'store') {
        window.history.replaceState({}, '', `${window.location.pathname}?page=home`);
      }

      if (view === 'store-data') {
        setCurrentView('admin-blog');
        setDashboardTab('inventory');
      } else if ((view === 'product-detail' || view === 'checkout') && productId) {
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
        if (view === 'topic') {
          setActiveTopicCategory(topicCategory || 'Hub');
        }
        if (view === 'admin-blog' && params.get('tab')) {
          setDashboardTab(params.get('tab'));
        }
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
  }, [allInventory, blogPosts]);

  // Dynamic Page Title, Meta Description, and JSON-LD Structured Data
  useEffect(() => {
    const siteUrl = 'https://cwqv.com';
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
    
    if (currentView === 'home') {
      title = 'KONSTRUCTZ | Mini Excavators, Walking Excavators & Compact Machinery';
      description = 'Compare KUVUO 2.7 mini excavators, Spider One walking excavators, compact loaders, attachments, and construction equipment built for contractors, farms, landscaping, trenching, slopes, and tough jobsites.';
      canonicalPath = '/';
      image = `${siteUrl}${kuvuoProduct}`;
    } else if (currentView === 'all-products') {
      title = 'Heavy Machinery Inventory | KONSTRUCTZ';
      description = 'Browse our complete inventory of heavy construction machinery. Premium mini excavators, loaders, rollers, and stone crushers available for sale.';
      canonicalPath = activeCategory && activeCategory !== 'All'
        ? `/?page=all-products&category=${encodeURIComponent(activeCategory)}`
        : '/?page=all-products';
    } else if (currentView === 'blog') {
      title = 'KONSTRUCTZ Blog | Machinery Guides, News & Field Tips';
      description = 'Read KONSTRUCTZ machinery guides, industry news, equipment tips, safety advice, and maintenance articles for construction crews.';
      canonicalPath = '/?page=blog';
    } else if (currentView === 'admin-blog') {
      title = 'Blog Admin Dashboard | KONSTRUCTZ';
      description = 'Create, edit, and manage KONSTRUCTZ blog posts.';
      canonicalPath = '/?page=admin-blog';
    } else if (currentView === 'topic') {
      if (activeTopicCategory === 'Machines') {
        title = 'Mini Skid Steer Safety & Technical Performance | KONSTRUCTZ';
        description = 'Technical specifications, engine options, maintenance schedule, and operational safety protocols for compact jobsite loaders.';
        canonicalPath = '/?page=topic&topic-category=Machines';
      } else if (activeTopicCategory === 'Buying & pricing') {
        title = 'Commercial Machinery Purchase Guide & Cost Calculator | KONSTRUCTZ';
        description = 'Estimate monthly financing payments with our interactive calculator, view our transparent fleet order discounts, and browse the ordering fulfillment timeline.';
        canonicalPath = '/?page=topic&topic-category=Buying%20%26%20pricing';
      } else if (activeTopicCategory === 'Delivery') {
        title = 'Global Freight Logistics & Shipping Status Tracker | KONSTRUCTZ';
        description = 'Track your heavy machinery dispatch status with our real-time booking code tracker and learn about ocean containerized vs. RoRo shipping methods.';
        canonicalPath = '/?page=topic&topic-category=Delivery';
      } else if (activeTopicCategory === 'Warranty') {
        title = 'Official 12-Month Factory Warranty & Component Coverage | KONSTRUCTZ';
        description = 'Review the official KONSTRUCTZ limited warranty coverage details for engines, hydraulics, crawler tracks, structural chassis, and wear items.';
        canonicalPath = '/?page=topic&topic-category=Warranty';
      } else if (activeTopicCategory === 'Service & parts') {
        title = 'Preventative Maintenance Log & OEM Spare Parts Price List | KONSTRUCTZ';
        description = 'Scheduled service checklists for 50h break-in, 250h, 500h, and 1000h operating intervals, plus pricing for filters, drive belts, and bucket teeth.';
        canonicalPath = '/?page=topic&topic-category=Service%20%26%20parts';
      } else if (activeTopicCategory === 'Financing') {
        title = 'Commercial Equipment Leasing & Loan Options Matrix | KONSTRUCTZ';
        description = 'Compare FMV lease structures, $1 buyout leasing terms, and commercial bank loans for financing capital construction equipment. Check credit criteria.';
        canonicalPath = '/?page=topic&topic-category=Financing';
      } else {
        title = 'Help Center & Topics | KONSTRUCTZ';
        description = 'Find answers about KONSTRUCTZ machinery warranties, delivery, payment, maintenance, spare parts, and support topics.';
        canonicalPath = '/?page=topic';
      }
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
    } else if (currentView === 'checkout' && checkoutItem) {
      title = `Checkout ${checkoutItem.name} | KONSTRUCTZ`;
      description = `Complete checkout for ${checkoutItem.name}.`;
      canonicalPath = `/?page=checkout&id=${encodeURIComponent(checkoutItem.slug || checkoutItem.id)}`;
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
        'image': 'https://cwqv.com/favicon.svg',
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
            'url': 'https://cwqv.com/favicon.svg'
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
        'image': 'https://cwqv.com/favicon.svg',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '1200 Industrial Parkway, Suite A',
          'addressLocality': 'Detroit',
          'addressRegion': 'MI',
          'postalCode': '48201',
          'addressCountry': 'US'
        },
        'telephone': '+1-555-234-9800',
        'email': 'sales@cwqv.com',
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

    if (currentView === 'home') {
      baseSchemaGraph.push(
        {
          '@type': 'ItemList',
          '@id': `${siteUrl}/#skoop-ii-skoopydig-comparison`,
          'name': 'Skoop II Loader vs SkoopyDig',
          'description': 'A practical comparison of compact wheel loader material handling and SkoopyDig dig-and-load capability for construction, landscaping, farms, trenching, and tight-access jobsites.',
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'item': {
                '@type': 'Product',
                'name': 'Skoop II Loader',
                'image': `${siteUrl}${skoopIiLoaderShowcase}`,
                'description': 'Compact wheel loader for loading, moving soil, gravel, mulch, pallets, jobsite supplies, farm materials, and landscape materials.',
                'brand': {
                  '@type': 'Brand',
                  'name': 'KONSTRUCTZ'
                },
                'category': 'Compact Wheel Loader'
              }
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'item': {
                '@type': 'Product',
                'name': 'SkoopyDig',
                'image': `${siteUrl}${skoopyDigProduct}`,
                'description': 'Compact dig-and-load machine for trenching, drainage, small excavation, landscaping, utility work, and mixed material handling.',
                'brand': {
                  '@type': 'Brand',
                  'name': 'KONSTRUCTZ'
                },
                'category': 'Loader Backhoe'
              }
            }
          ]
        },
        {
          '@type': 'FAQPage',
          '@id': `${siteUrl}/#machine-comparison-faq`,
          'mainEntity': machineComparisonFaqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer
            }
          }))
        }
      );
    }

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
  }, [currentView, selectedProduct, selectedBlogPost, checkoutItem, activeCategory, activeTopicCategory]);


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
          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          <nav className="nav-links nav-links-left">
            <a 
              href="?page=home" 
              className={currentView === 'home' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigate('home'); }}
            >
              Home
            </a>
            <div className="nav-item-dropdown">
              <button 
                className={`nav-dropdown-trigger-btn ${currentView === 'all-products' || currentView === 'product-detail' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!dropdownOpen);
                  setAttachmentsDropdownOpen(false);
                  setTopicDropdownOpen(false);
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
                className={`nav-dropdown-trigger-btn ${currentView === 'attachments' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  setAttachmentsDropdownOpen(!attachmentsDropdownOpen);
                  setDropdownOpen(false);
                  setTopicDropdownOpen(false);
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
            <a 
              href="?page=blog" 
              className={currentView === 'blog' || currentView === 'blog-post' || currentView === 'admin-blog' ? 'active' : ''} 
              onClick={(e) => { e.preventDefault(); navigate('blog'); }}
            >
              Blog
            </a>
          </nav>

          <a href="?page=home" className="logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
            <img src={konstructzLogo} alt="KONSTRUCTZ" className="logo-img" />
          </a>

          <div className="header-right-col">
            <nav className="nav-links nav-links-right">
              <div className="nav-item-dropdown">
                <button
                  className={`nav-dropdown-trigger-btn ${currentView === 'topic' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setTopicDropdownOpen(!topicDropdownOpen);
                    setDropdownOpen(false);
                    setAttachmentsDropdownOpen(false);
                  }}
                >
                  Topic ▾
                </button>
                <div className={`dropdown-menu topic-dropdown glass-panel ${topicDropdownOpen ? 'show' : ''}`}>
                  {[
                    'Machines',
                    'Buying & pricing',
                    'Delivery',
                    'Warranty',
                    'Service & parts',
                    'Financing'
                  ].map(category => (
                    <a
                      key={category}
                      href={`?page=topic&topic-category=${encodeURIComponent(category)}`}
                      className="equipment-menu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('topic', { 'topic-category': category });
                        setTopicDropdownOpen(false);
                      }}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              </div>
              <a 
                href="?page=support" 
                className={currentView === 'support' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigate('support'); }}
              >
                Support
              </a>
              <a 
                href="?page=about" 
                className={currentView === 'about' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigate('about'); }}
              >
                About
              </a>
              <a 
                href="?page=contact" 
                className={currentView === 'contact' ? 'active' : ''} 
                onClick={(e) => { e.preventDefault(); navigate('contact'); }}
              >
                Contact
              </a>
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
                  <>
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleProductSearchSubmit();
                        }
                        if (e.key === 'Escape') {
                          setSearchOpen(false);
                        }
                      }}
                      className="search-input"
                      autoFocus
                    />
                    {renderProductSearchResults('desktop')}
                  </>
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

      {/* MOBILE NAVIGATION DRAWER */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'show' : ''}`}>
        <div className="mobile-menu-header">
          <a href="?page=home" className="logo" onClick={(e) => { e.preventDefault(); navigate('home'); setMobileMenuOpen(false); }}>
            <img src={konstructzLogo} alt="KONSTRUCTZ" className="logo-img" />
          </a>
          <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>×</button>
        </div>
        <nav className="mobile-nav-links">
          <a 
            href="?page=home" 
            className={currentView === 'home' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigate('home'); setMobileMenuOpen(false); }}
          >
            Home
          </a>
          
          {/* Equipment Accordion */}
          <div className="mobile-accordion">
            <button 
              type="button"
              className={`mobile-accordion-trigger ${currentView === 'all-products' || currentView === 'product-detail' ? 'active' : ''}`} 
              aria-expanded={dropdownOpen}
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen(prev => !prev);
                setAttachmentsDropdownOpen(false);
                setTopicDropdownOpen(false);
              }}
            >
              <span>Equipment</span>
              <span className={`arrow ${dropdownOpen ? 'open' : ''}`}>▾</span>
            </button>
            <div className={`mobile-accordion-content ${dropdownOpen ? 'show' : ''}`}>
              <a
                href="?page=all-products&category=Konstructz"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('all-products', { category: 'Konstructz', subcategory: 'All' });
                  setMobileMenuOpen(false);
                  setDropdownOpen(false);
                }}
              >
                View All KONSTRUCTZ
              </a>
              {konstructzSubcategories.map(sub => (
                <a
                  key={sub}
                  href={`?page=all-products&category=Konstructz&subcategory=${encodeURIComponent(sub)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('all-products', { category: 'Konstructz', subcategory: sub });
                    setMobileMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  {sub}
                </a>
              ))}
              {equipmentMenuItems.map(item => (
                <a
                  key={item.id}
                  href={`?page=all-products&category=${encodeURIComponent(item.id)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('all-products', { category: item.id });
                    setMobileMenuOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Attachments Accordion */}
          <div className="mobile-accordion">
            <button 
              type="button"
              className={`mobile-accordion-trigger ${currentView === 'attachments' ? 'active' : ''}`} 
              aria-expanded={attachmentsDropdownOpen}
              onClick={(e) => {
                e.stopPropagation();
                setAttachmentsDropdownOpen(prev => !prev);
                setDropdownOpen(false);
                setTopicDropdownOpen(false);
              }}
            >
              <span>Attachments</span>
              <span className={`arrow ${attachmentsDropdownOpen ? 'open' : ''}`}>▾</span>
            </button>
            <div className={`mobile-accordion-content ${attachmentsDropdownOpen ? 'show' : ''}`}>
              <a 
                href="?page=attachments" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setActiveAttachmentFilter('All Attachments'); 
                  setActiveAttachmentSubcategory('All'); 
                  navigate('attachments'); 
                  setMobileMenuOpen(false); 
                  setAttachmentsDropdownOpen(false); 
                }}
              >
                View All Attachments
              </a>
              {attachmentMenus.map(menu => (
                <a 
                  key={menu.id}
                  href="?page=attachments"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveAttachmentMenu(menu.id);
                    setActiveAttachmentFilter(menu.id);
                    setActiveAttachmentSubcategory('All');
                    navigate('attachments');
                    setMobileMenuOpen(false);
                    setAttachmentsDropdownOpen(false);
                  }}
                >
                  {menu.label}
                </a>
              ))}
            </div>
          </div>

          <a 
            href="?page=blog" 
            className={currentView === 'blog' || currentView === 'blog-post' || currentView === 'admin-blog' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigate('blog'); setMobileMenuOpen(false); }}
          >
            Blog
          </a>
          {/* Topic Accordion */}
          <div className="mobile-accordion">
            <button 
              type="button"
              className={`mobile-accordion-trigger ${currentView === 'topic' ? 'active' : ''}`} 
              aria-expanded={topicDropdownOpen}
              onClick={(e) => {
                e.stopPropagation();
                setTopicDropdownOpen(prev => !prev);
                setDropdownOpen(false);
                setAttachmentsDropdownOpen(false);
              }}
            >
              <span>Topic</span>
              <span className={`arrow ${topicDropdownOpen ? 'open' : ''}`}>▾</span>
            </button>
            <div className={`mobile-accordion-content ${topicDropdownOpen ? 'show' : ''}`}>
              <a 
                href="?page=topic" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  navigate('topic'); 
                  setMobileMenuOpen(false); 
                  setTopicDropdownOpen(false); 
                }}
              >
                View Help Center
              </a>
              {[
                'Machines',
                'Buying & pricing',
                'Delivery',
                'Warranty',
                'Service & parts',
                'Financing'
              ].map(category => (
                <a 
                  key={category}
                  href={`?page=topic&topic-category=${encodeURIComponent(category)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('topic', { 'topic-category': category });
                    setMobileMenuOpen(false);
                    setTopicDropdownOpen(false);
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
          </div>
          <a 
            href="?page=support" 
            className={currentView === 'support' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigate('support'); setMobileMenuOpen(false); }}
          >
            Support
          </a>
          <a 
            href="?page=about" 
            className={currentView === 'about' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigate('about'); setMobileMenuOpen(false); }}
          >
            About
          </a>
          <a 
            href="?page=contact" 
            className={currentView === 'contact' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); navigate('contact'); setMobileMenuOpen(false); }}
          >
            Contact
          </a>
        </nav>

        <div className="mobile-menu-footer">
          <div className="mobile-menu-actions">
            {/* Search Input on Mobile */}
            <div className="mobile-search-box">
              <input 
                type="text" 
                placeholder="Search inventory..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleProductSearchSubmit();
                  }
                }}
              />
              {renderProductSearchResults('mobile')}
            </div>
            {/* Cart Link on Mobile */}
            <button 
              className="mobile-cart-btn" 
              onClick={() => {
                navigate('cart');
                setMobileMenuOpen(false);
              }}
            >
              <span>Shopping Cart ({cartCount})</span>
            </button>
            {/* Get Quote button */}
            <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); setMobileMenuOpen(false); }} className="nav-cta">Get Quote</a>
          </div>
        </div>
      </div>

      {currentView === 'home' ? (
        <>
          {/* HERO SECTION */}
          <section id="home" className="hero-section dark-bg">
            <img src={heroLoader} alt="KONSTRUCTZ SKOOP II compact wheel loader" className="hero-background-image" />
            {!heroVideoError && (
              <video
                className="hero-background-video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroLoader}
                aria-label="KONSTRUCTZ SKOOP II compact wheel loader in motion"
                onError={() => setHeroVideoError(true)}
              >
                <source src={heroVideo} type="video/mp4" />
              </video>
            )}
            <div className="hero-overlay"></div>
            <div className="section-content hero-full-content">
              <div className="hero-copy">
                <p className="hero-kicker">KONSTRUCTZ Compact Wheel Loader</p>
                <h1 className="hero-display-title">SKOOP II</h1>
                <p className="hero-body">
                  A compact wheel loader for construction crews, landscaping teams, farms, and material-handling jobs that need dependable power in a smaller footprint.
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
          <div className="section-header products-section-header">
            <h2 className="section-title text-black">Fresh Release.</h2>
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

      {/* MACHINE COMPARISON SECTION */}
      <section id="skoop-ii-vs-skoopydig" className="machine-comparison-section white-bg">
        <div className="section-content machine-comparison-content">
          <div className="machine-comparison-heading">
            <h2>
              <span>Skoop II Loader</span>
              <strong>VS</strong>
              <span>SkoopyDig</span>
            </h2>
            <p>
              Compare compact loader material handling with dig-and-load versatility for construction,
              landscaping, farms, trenching, cleanup, and tight-access jobsites.
            </p>
          </div>

          <div className="machine-comparison-panel">
            <div className="machine-comparison-visuals">
              <div className="machine-comparison-machine">
                <img
                  src={skoopIiLoaderShowcase}
                  alt="Skoop II compact wheel loader for loading soil, gravel, mulch, and jobsite materials"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="machine-comparison-vs">VS</div>
              <div className="machine-comparison-machine">
                <img
                  src={skoopyDigProduct}
                  alt="SkoopyDig compact dig and load machine for trenching, landscaping, and utility work"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="machine-comparison-table">
              {[
                {
                  label: 'Best For',
                  left: 'Loading, carrying, dumping, pallet handling, cleanup, and daily material movement.',
                  right: 'Digging, trenching, drainage, small excavation, loading, and mixed landscaping jobs.'
                },
                {
                  label: 'Terrain',
                  left: 'Construction yards, farms, landscape sites, warehouses, nurseries, and compact job areas.',
                  right: 'Residential lots, utility runs, farm lanes, garden projects, and tight work zones.'
                },
                {
                  label: 'Performance',
                  left: 'Fast bucket cycles, strong pushing power, stable travel, and efficient load-and-carry work.',
                  right: 'Loader utility with backhoe-style digging reach for jobs that need excavation and material movement.'
                },
                {
                  label: 'Selling Points',
                  left: ['Compact wheel loader footprint', 'Front bucket productivity', 'Comfortable operator station', 'Great for repeated loading cycles', 'Useful with loader attachments'],
                  right: ['Front loader plus rear digging arm', 'Handles trenching and loading in one machine', 'Good for tight-access excavation', 'Practical for farms and landscaping', 'Reduces machine swaps on small jobs']
                },
                {
                  label: 'Applications',
                  left: ['Material handling', 'Landscape supply', 'Farm work', 'Jobsite cleanup'],
                  right: ['Trenching', 'Drainage', 'Light excavation', 'Backfill and grading']
                },
                {
                  label: 'Ideal Customer',
                  left: ['Contractors', 'Landscapers', 'Farm owners', 'Rental companies'],
                  right: ['Small contractors', 'Utility crews', 'Property owners', 'Landscape and farm crews']
                }
              ].map((row) => (
                <div className="machine-comparison-row" key={row.label}>
                  <div className="machine-comparison-label">
                    <span>{row.label}</span>
                  </div>
                  <div className="machine-comparison-cell">
                    {Array.isArray(row.left) ? (
                      <ul>
                        {row.left.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    ) : (
                      <p>{row.left}</p>
                    )}
                  </div>
                  <div className="machine-comparison-cell">
                    {Array.isArray(row.right) ? (
                      <ul>
                        {row.right.map(item => <li key={item}>{item}</li>)}
                      </ul>
                    ) : (
                      <p>{row.right}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="machine-comparison-choice-grid">
            <div className="machine-comparison-choice">
              <span>Choose Skoop II Loader</span>
              <p>When your main work is loading, carrying, dumping, moving pallets, and keeping materials flowing.</p>
            </div>
            <div className="machine-comparison-choice featured">
              <span>Choose the right machine</span>
              <p>Match your machine to how much you load, how much you dig, and how often the job needs both.</p>
            </div>
            <div className="machine-comparison-choice">
              <span>Choose SkoopyDig</span>
              <p>When you need one compact machine that can dig trenches, load material, backfill, and clean up.</p>
            </div>
          </div>

          <div className="machine-comparison-seo">
            <div>
              <span className="machine-comparison-kicker">Machine buying guide</span>
              <h3>Loader vs dig-and-load machine: choose by the work cycle.</h3>
              <p>
                For repeated loading, stockpile work, pallet movement, farm chores, and jobsite cleanup,
                Skoop II Loader keeps material moving quickly. For trenching, drainage, light excavation,
                backfilling, and jobs that shift between digging and loading, SkoopyDig gives crews a more
                versatile dig-and-load setup.
              </p>
            </div>
            <button className="machine-comparison-quote" onClick={() => navigate('contact', { inquiry: 'Quote Request' })}>
              Request Machine Match
            </button>
          </div>

          <div className="machine-comparison-faq-grid" aria-label="Skoop II Loader and SkoopyDig questions">
            {machineComparisonFaqs.map((faq) => (
              <article className="machine-comparison-faq" key={faq.question}>
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            ))}
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
                alt="KONSTRUCTZ SKOOP II compact wheel loader on a construction site" 
                className="about-image"
              />
              <div className="image-border-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED: SKOOP II WHEEL LOADER */}
      <section id="featured" className="featured-section white-bg border-top">
        <div className="section-content">
          <div className="featured-grid">
            <div className="featured-text-area">
              <span className="black-pill-tag">New Product</span>
              <h2 className="featured-title text-black">New Konstructz <span className="highlight-olive">SKOOP II Loader</span></h2>
              <p className="featured-desc">
                Compact power for daily jobsite work. Move soil, gravel, pallets, and materials with a nimble wheel loader built for contractors who need reliable performance in tight spaces.
              </p>

              <div className="features-pill-list">
                <div className="feature-pill">✓ Compact Jobsite Power</div>
                <div className="feature-pill">✓ Smooth Material Handling</div>
                <div className="feature-pill">✓ Easy Operator Visibility</div>
                <div className="feature-pill">✓ Built for Tight Spaces</div>
              </div>

              <div className="featured-buttons">
                <a href="?page=product-detail&id=featured-3" onClick={(e) => { e.preventDefault(); navigate('product-detail', { id: 'featured-3' }); }} className="cta-button white-pill-dark-border">View SKOOP II</a>
                 <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="cta-button white-pill-dark-border">Contact Sales</a>
              </div>
            </div>

            <div className="featured-image-wrapper-with-specs">
              <div className="featured-image-wrapper">
                {!crusherImageError ? (
                  <img 
                    src={stoneCrusher} 
                    alt="KONSTRUCTZ SKOOP II wheel loader working on a construction site" 
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
                  <p>Operating Weight</p>
                  <strong>1.8 Ton</strong>
                </div>
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">🛞</span>
                  <p>Machine Type</p>
                  <strong>Wheel Loader</strong>
                </div>
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">⚡</span>
                  <p>Engine</p>
                  <strong>Diesel Engine</strong>
                </div>
                <div className="spec-grid-card">
                  <span className="spec-grid-icon">🪣</span>
                  <p>Use Case</p>
                  <strong>Load & Carry</strong>
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
          <div className="faq-layout">
            <div className="faq-heading">
              <span className="black-pill-tag">Support FAQ</span>
              <h2 className="section-title text-black">Frequently <span className="highlight-olive">Asked Questions</span></h2>
              <p>Quick answers for warranty, delivery, financing, and purchase support.</p>
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
            {getVisibleBlogPosts(blogPosts).slice(0, 3).map((post) => {
              const { displayImage, displayDesc } = getBlogDisplayData(post);

              return (
                <article key={post.slug} className="blog-card-white">
                  <div className="blog-img-placeholder">
                    <BlogImage 
                      src={displayImage} 
                      alt={post.title} 
                      className="blog-card-img"
                    />
                  </div>
                  <div className="blog-card-info">
                    <span className="blog-card-cat">{post.category}</span>
                    <h3 className="blog-card-name text-black">{post.title}</h3>
                    <span className="blog-card-date">Published {post.date} · Updated {post.updatedDate}</span>
                    <p className="blog-card-desc">{displayDesc}</p>
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
            );
          })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section white-bg">
        <div className="section-content">
          <div className="section-header testimonials-home-header">
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
      ) : currentView === 'admin-blog' ? (
        <main className="admin-blog-page">
          <div className="dashboard-container">
            {/* Dashboard Sidebar */}
            <aside className="dashboard-sidebar">
              <div className="sidebar-header">
                <span className="admin-eyebrow">Console</span>
                <h2>KONSTRUCTZ</h2>
              </div>
              <nav className="sidebar-nav">
                <button 
                  className={`sidebar-nav-btn ${dashboardTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('overview')}
                >
                  <span className="nav-icon">📊</span> Overview
                </button>
                <button 
                  className={`sidebar-nav-btn ${dashboardTab === 'blog' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('blog')}
                >
                  <span className="nav-icon">📝</span> Blog Posts
                </button>
                <button 
                  className={`sidebar-nav-btn ${dashboardTab === 'inquiries' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('inquiries')}
                >
                  <span className="nav-icon">📥</span> Inquiries ({inquiries.length})
                </button>
                <button 
                  className={`sidebar-nav-btn ${dashboardTab === 'comments' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('comments')}
                >
                  <span className="nav-icon">💬</span> Comments ({comments.length})
                </button>
                <button 
                  className={`sidebar-nav-btn ${dashboardTab === 'inventory' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('inventory')}
                >
                  <span className="nav-icon">📂</span> Inventory CSV
                </button>
                <button 
                  className={`sidebar-nav-btn ${dashboardTab === 'tools' ? 'active' : ''}`}
                  onClick={() => setDashboardTab('tools')}
                >
                  <span className="nav-icon">🧰</span> Admin Tools
                </button>
              </nav>
              <div className="sidebar-footer">
                <button className="sidebar-nav-btn back-home-btn" onClick={() => navigate('home')}>
                  ← Back to Site
                </button>
              </div>
            </aside>

            {/* Dashboard Main Content */}
            <section className="dashboard-main">
              {dashboardTab === 'overview' && (
                <div className="dashboard-overview-tab">
                  <div className="tab-title-block">
                    <span className="admin-eyebrow">Performance Metrics</span>
                    <h2>Dashboard Overview</h2>
                    <p>Real-time site stats, recent inquiries, product views, and comments moderation.</p>
                  </div>

                  {/* KPI Grid */}
                  <div className="kpi-grid">
                    <div className="kpi-card">
                      <div className="kpi-icon-wrap">📥</div>
                      <div className="kpi-info">
                        <span>Total Inquiries</span>
                        <strong>{inquiries.length}</strong>
                        <span className="kpi-trend up">↑ 12% this week</span>
                      </div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-icon-wrap">💬</div>
                      <div className="kpi-info">
                        <span>Active Comments</span>
                        <strong>{comments.length}</strong>
                        <span className="kpi-trend up">↑ 4% this week</span>
                      </div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-icon-wrap">📝</div>
                      <div className="kpi-info">
                        <span>Blog Articles</span>
                        <strong>{blogPosts.length}</strong>
                        <span className="kpi-trend">Published posts</span>
                      </div>
                    </div>
                    <div className="kpi-card">
                      <div className="kpi-icon-wrap">🛞</div>
                      <div className="kpi-info">
                        <span>Catalog Items</span>
                        <strong>{allInventory.length}</strong>
                        <span className="kpi-trend">Machines & attachments</span>
                      </div>
                    </div>
                  </div>

                  <div className="admin-quick-actions">
                    <button type="button" className="admin-quick-card" onClick={() => {
                      resetBlogAdminForm();
                      setDashboardTab('blog');
                      setIsBlogEditing(true);
                    }}>
                      <span>Write</span>
                      <strong>Post a new blog</strong>
                      <small>Create articles with image, category, tags, SEO, and sections.</small>
                    </button>
                    <button type="button" className="admin-quick-card" onClick={() => setDashboardTab('comments')}>
                      <span>Moderate</span>
                      <strong>{commentCounts.pending} pending comments</strong>
                      <small>Approve useful comments or remove spam from blog posts.</small>
                    </button>
                    <button type="button" className="admin-quick-card" onClick={() => setDashboardTab('inquiries')}>
                      <span>Sales</span>
                      <strong>{inquiries.length} customer inquiries</strong>
                      <small>Track quote requests and update lead status.</small>
                    </button>
                    <button type="button" className="admin-quick-card" onClick={() => setDashboardTab('tools')}>
                      <span>Backup</span>
                      <strong>Export or import data</strong>
                      <small>Move posts and comments between dev, preview, and live builds.</small>
                    </button>
                  </div>

                  {/* Charts & Breakdown Grid */}
                  <div className="charts-grid-container">
                    {/* Top Viewed Products (pure HTML/CSS chart) */}
                    <div className="analytics-card">
                      <h3>Top Viewed Equipment (Analytics)</h3>
                      <p className="card-subtitle">Page views count per product</p>
                      
                      <div className="analytics-bar-chart">
                        {allInventory.slice(0, 5).map(item => {
                          const viewsCount = productViews[item.id] || 0;
                          const maxViews = Math.max(...allInventory.map(i => productViews[i.id] || 0), 1);
                          const percentage = Math.min((viewsCount / maxViews) * 100, 100);
                          
                          return (
                            <div className="chart-bar-row" key={item.id}>
                              <span className="chart-item-label">{item.name}</span>
                              <div className="chart-bar-outer">
                                <div 
                                  className="chart-bar-fill" 
                                  style={{ width: `${viewsCount > 0 ? percentage : 5}%` }}
                                ></div>
                              </div>
                              <span className="chart-item-value">{viewsCount} views</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Top Viewed Blog Posts (pure HTML/CSS chart) */}
                    <div className="analytics-card">
                      <h3>Top Viewed Blog Posts (Analytics)</h3>
                      <p className="card-subtitle">Page views count per article</p>
                      
                      <div className="analytics-bar-chart">
                        {(() => {
                          const sortedBlogPosts = [...blogPosts].sort((a, b) => {
                            const viewsA = blogPostViews[a.slug] || 0;
                            const viewsB = blogPostViews[b.slug] || 0;
                            return viewsB - viewsA;
                          }).slice(0, 5);
                          
                          const maxBlogViews = Math.max(...blogPosts.map(p => blogPostViews[p.slug] || 0), 1);
                          
                          return sortedBlogPosts.map(post => {
                            const viewsCount = blogPostViews[post.slug] || 0;
                            const percentage = Math.min((viewsCount / maxBlogViews) * 100, 100);
                            
                            return (
                              <div className="blog-chart-bar-row" key={post.slug}>
                                <span className="chart-item-label" title={post.title}>{post.title}</span>
                                <div className="chart-bar-outer">
                                  <div 
                                    className="chart-bar-fill" 
                                    style={{ width: `${viewsCount > 0 ? percentage : 5}%` }}
                                  ></div>
                                </div>
                                <span className="chart-item-value">{viewsCount} views</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Sales Inquiry Pipeline */}
                    <div className="analytics-card">
                      <h3>Inquiry Status Breakdown</h3>
                      <p className="card-subtitle">Pipeline distribution for active leads</p>
                      
                      <div className="pipeline-bars">
                        {(() => {
                          const total = inquiries.length || 1;
                          const pendingCount = inquiries.filter(i => i.status === 'Pending').length;
                          const contactedCount = inquiries.filter(i => i.status === 'Contacted').length;
                          const closedCount = inquiries.filter(i => i.status === 'Closed').length;

                          return (
                            <>
                              <div className="pipeline-row">
                                <div className="pipeline-info">
                                  <span>Pending Review</span>
                                  <strong>{pendingCount} ({Math.round(pendingCount / total * 100)}%)</strong>
                                </div>
                                <div className="pipeline-bar-outer">
                                  <div className="pipeline-bar-fill pending" style={{ width: `${pendingCount / total * 100}%` }}></div>
                                </div>
                              </div>
                              <div className="pipeline-row">
                                <div className="pipeline-info">
                                  <span>Contacted / In Progress</span>
                                  <strong>{contactedCount} ({Math.round(contactedCount / total * 100)}%)</strong>
                                </div>
                                <div className="pipeline-bar-outer">
                                  <div className="pipeline-bar-fill contacted" style={{ width: `${contactedCount / total * 100}%` }}></div>
                                </div>
                              </div>
                              <div className="pipeline-row">
                                <div className="pipeline-info">
                                  <span>Closed / Completed</span>
                                  <strong>{closedCount} ({Math.round(closedCount / total * 100)}%)</strong>
                                </div>
                                <div className="pipeline-bar-outer">
                                  <div className="pipeline-bar-fill closed" style={{ width: `${closedCount / total * 100}%` }}></div>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Recent Inquiries Panel */}
                  <div className="recent-activity-panel">
                    <div className="activity-header">
                      <h3>Recent Sales Enquiries</h3>
                      <button className="view-all-btn" onClick={() => setDashboardTab('inquiries')}>View All Inquiries</button>
                    </div>
                    
                    <div className="dashboard-table-wrapper">
                      <table className="dashboard-table">
                        <thead>
                          <tr>
                            <th>Customer</th>
                            <th>Inquiry Type</th>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inquiries.length === 0 ? (
                            <tr>
                              <td colSpan="5" className="empty-table-cell">No inquiries received yet.</td>
                            </tr>
                          ) : (
                            inquiries.slice(0, 3).map(inq => (
                              <tr key={inq.id}>
                                <td>
                                  <strong>{inq.firstName} {inq.lastName}</strong>
                                  <small>{inq.email}</small>
                                </td>
                                <td><span className="type-badge">{inq.inquiryType}</span></td>
                                <td className="message-cell" title={inq.message}>{inq.message}</td>
                                <td>{inq.date}</td>
                                <td>
                                  <span className={`status-pill ${inq.status?.toLowerCase() || 'pending'}`}>
                                    {inq.status || 'Pending'}
                                  </span>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {dashboardTab === 'blog' && (
                <div className="dashboard-blog-tab">
                  {!isBlogEditing ? (
                    <div className="admin-blog-list-view">
                      <div className="admin-blog-list-view-header">
                        <div>
                          <span className="admin-eyebrow">Content list</span>
                          <h2>{blogPosts.length} Articles</h2>
                          <p className="admin-list-summary">
                            {adminPostCounts.published} published · {adminPostCounts.draft} drafts · {adminPostCounts.scheduled} scheduled
                          </p>
                        </div>
                        <div className="admin-blog-header-actions">
                          <button 
                            type="button" 
                            className="admin-primary-btn green-pill-btn"
                            onClick={() => {
                              resetBlogAdminForm();
                              setIsBlogEditing(true);
                            }}
                          >
                            + Write New Article
                          </button>
                          <button type="button" className="admin-ghost-btn" onClick={handleResetBlogPosts} style={{ marginLeft: '12px' }}>
                            Reset Default Posts
                          </button>
                          <button type="button" className="admin-ghost-btn" onClick={handleExportBlogData}>
                            Export Blog Data
                          </button>
                          <label className="admin-ghost-btn admin-import-btn">
                            Import Blog Data
                            <input type="file" accept="application/json,.json" onChange={handleImportBlogData} />
                          </label>
                        </div>
                      </div>

                      <div className="admin-filter-rail">
                        <div className="admin-filter-search">
                          <input
                            type="text"
                            value={adminPostSearch}
                            onChange={(e) => setAdminPostSearch(e.target.value)}
                            placeholder="Search title, slug, category, or tag..."
                          />
                        </div>
                        <div className="filter-tabs">
                          {['All', 'Published', 'Draft', 'Scheduled'].map(status => (
                            <button
                              type="button"
                              key={status}
                              className={`filter-tab-btn ${adminPostStatusFilter === status ? 'active' : ''}`}
                              onClick={() => setAdminPostStatusFilter(status)}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="admin-post-grid-cards">
                        {filteredAdminBlogPosts.length === 0 ? (
                          <div className="admin-empty-state">
                            <strong>No articles found</strong>
                            <span>Try a different search term or status filter.</span>
                          </div>
                        ) : filteredAdminBlogPosts.map((post) => (
                          <article className="admin-post-list-item-card" key={post.slug}>
                            <div className="admin-post-list-item-media">
                              <BlogImage src={getBlogDisplayData(post).displayImage} alt={post.title} className="admin-post-list-item-img" />
                            </div>
                            <div className="admin-post-list-item-content">
                              <div className="admin-post-list-item-meta">
                                <span className="admin-post-list-item-cat">{post.category}</span>
                                <span className={`status-badge ${(post.status || 'Published').toLowerCase()}`}>{post.status || 'Published'}</span>
                              </div>
                              <h3>{post.title}</h3>
                              <p>{post.desc}</p>
                              <div className="admin-post-list-item-footer">
                                <small>Slug: <code>{post.slug}</code> · Updated: {post.updatedDate || post.publishedDate}</small>
                                {post.tags && post.tags.length > 0 && (
                                  <div className="admin-post-tags">
                                    {post.tags.map(tag => (
                                      <span key={tag} className="admin-tag-pill">#{tag}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="admin-post-list-item-actions">
                              <button type="button" className="edit-btn" onClick={() => handleEditBlogPost(post)}>Edit</button>
                              <button type="button" className="delete-btn" onClick={() => handleDeleteBlogPost(post.slug)}>Delete</button>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <form className="gutenberg-editor-form" onSubmit={handleBlogAdminSubmit}>
                      {/* Editor Header */}
                      <div className="gutenberg-header">
                        <div className="gutenberg-header-left">
                          <span className="gutenberg-breadcrumb" onClick={resetBlogAdminForm} style={{ cursor: 'pointer' }}>
                            ← Back to Articles
                          </span>
                          <span className="gutenberg-post-title-badge">{blogAdminForm.title || 'Untitled Post'}</span>
                        </div>
                        <div className="gutenberg-header-actions">
                          <button 
                            type="submit" 
                            className="gutenberg-action-link" 
                            name="submitStatus"
                            value="Draft"
                          >
                            Save draft
                          </button>
                          <button type="submit" className="gutenberg-publish-btn" name="submitStatus" value="Published">
                            {editingBlogSlug ? 'Update' : 'Publish'}
                          </button>
                          <button type="button" className="gutenberg-cancel-btn" onClick={resetBlogAdminForm}>
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div className="gutenberg-main-layout">
                        {/* Canvas Area (Left) */}
                        <div className="gutenberg-canvas">
                          <div className="gutenberg-title-wrap">
                            <input
                              name="title"
                              value={blogAdminForm.title}
                              onChange={handleBlogAdminInput}
                              placeholder="Add title"
                              className="gutenberg-title-input"
                            />
                          </div>

                          <div className="gutenberg-desc-wrap">
                            <textarea
                              name="desc"
                              value={blogAdminForm.desc}
                              onChange={handleBlogAdminInput}
                              onPaste={(e) => handleBodyPaste(e, 'desc')}
                              placeholder="Type short summary of the article..."
                              className="gutenberg-desc-input"
                              rows="2"
                            />
                            {renderTextareaMediaTools('desc')}
                          </div>

                          <div className="gutenberg-blocks-container">
                            {[
                              ['sectionOneTitle', 'sectionOneBody', 'Section 1'],
                              ['sectionTwoTitle', 'sectionTwoBody', 'Section 2'],
                              ['sectionThreeTitle', 'sectionThreeBody', 'Section 3']
                            ].map(([titleName, bodyName, label], index) => (
                              <div className="gutenberg-block-card" key={titleName}>
                                <div className="gutenberg-block-header">
                                  <span className="gutenberg-block-badge">Block {index + 1} ({label})</span>
                                </div>
                                <input
                                  name={titleName}
                                  value={blogAdminForm[titleName]}
                                  onChange={handleBlogAdminInput}
                                  placeholder="Block heading..."
                                  className="gutenberg-block-heading-input"
                                />
                                <textarea
                                  name={bodyName}
                                  value={blogAdminForm[bodyName]}
                                  onChange={handleBlogAdminInput}
                                  onPaste={(e) => handleBodyPaste(e, bodyName)}
                                  placeholder="Type section paragraph content. Copy and paste images or video links directly here..."
                                  className="gutenberg-block-body-input"
                                  rows="6"
                                />
                                {renderTextareaMediaTools(bodyName)}
                              </div>
                            ))}
                          </div>
                          
                          {blogAdminStatus && <p className="gutenberg-status-msg">{blogAdminStatus}</p>}
                        </div>

                        {/* Sidebar Area (Right) */}
                        <aside className="gutenberg-sidebar">
                          <div className="gutenberg-sidebar-tabs">
                            <button type="button" className="gutenberg-sidebar-tab active">Post</button>
                            <button type="button" className="gutenberg-sidebar-tab">Block</button>
                          </div>

                          <div className="gutenberg-sidebar-content">
                            {/* Featured Image Block */}
                            <div className="gutenberg-sidebar-section">
                              <h4>Featured Image</h4>
                              <div className="gutenberg-image-uploader">
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="gutenberg-image-upload"
                                  onChange={handleBlogImageUpload}
                                  style={{ display: 'none' }}
                                />
                                <label htmlFor="gutenberg-image-upload" className="gutenberg-image-dropzone">
                                  {blogAdminForm.image ? (
                                    <div className="gutenberg-image-preview">
                                      <img src={blogAdminForm.image} alt="Preview" />
                                      <span className="gutenberg-change-img-badge">Replace Image</span>
                                    </div>
                                  ) : (
                                    <div className="gutenberg-upload-placeholder">
                                      <span className="gutenberg-upload-icon">🖼️</span>
                                      <span>Set featured image</span>
                                    </div>
                                  )}
                                </label>
                                <div className="gutenberg-image-url-row" style={{ marginTop: '10px' }}>
                                  <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>Or paste image URL:</span>
                                  <input
                                    name="image"
                                    value={blogAdminForm.image}
                                    onChange={handleBlogAdminInput}
                                    placeholder="https://example.com/image.jpg"
                                    className="gutenberg-sidebar-input"
                                    style={{ marginTop: '4px' }}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Post Settings Block */}
                            <div className="gutenberg-sidebar-section">
                              <h4>Summary</h4>
                              <div className="gutenberg-settings-list">
                                <div className="gutenberg-setting-row">
                                  <span className="gutenberg-setting-label">Status</span>
                                  <select name="status" value={blogAdminForm.status} onChange={handleBlogAdminInput} className="gutenberg-select">
                                    <option value="Published">Published</option>
                                    <option value="Draft">Draft</option>
                                    <option value="Scheduled">Scheduled</option>
                                  </select>
                                </div>
                                
                                <div className="gutenberg-setting-row">
                                  <span className="gutenberg-setting-label">Slug</span>
                                  <input
                                    name="slug"
                                    value={blogAdminForm.slug}
                                    onChange={handleBlogAdminInput}
                                    placeholder="slug-url"
                                    className="gutenberg-sidebar-input"
                                  />
                                </div>

                                <div className="gutenberg-setting-row">
                                  <span className="gutenberg-setting-label">Publish Date</span>
                                  <input
                                    type="date"
                                    name="publishedDate"
                                    value={blogAdminForm.publishedDate}
                                    onChange={handleBlogAdminInput}
                                    className="gutenberg-sidebar-input"
                                  />
                                </div>

                                <div className="gutenberg-setting-row">
                                  <span className="gutenberg-setting-label">Update Date</span>
                                  <input
                                    type="date"
                                    name="updatedDate"
                                    value={blogAdminForm.updatedDate}
                                    onChange={handleBlogAdminInput}
                                    className="gutenberg-sidebar-input"
                                  />
                                </div>

                                <div className="gutenberg-setting-row">
                                  <span className="gutenberg-setting-label">Author</span>
                                  <span className="gutenberg-setting-value" style={{ fontSize: '12px', fontWeight: '700', color: '#1e293b' }}>
                                    KONSTRUCTZ Team
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Categories Block */}
                            <div className="gutenberg-sidebar-section">
                              <h4>Category</h4>
                              <input
                                name="category"
                                value={blogAdminForm.category}
                                onChange={handleBlogAdminInput}
                                placeholder="e.g. Buyer Guide"
                                className="gutenberg-sidebar-input"
                                list="blog-category-options"
                              />
                              <datalist id="blog-category-options">
                                {blogCategories.filter(category => category !== 'All').map(category => (
                                  <option key={category} value={category} />
                                ))}
                              </datalist>
                              <div className="gutenberg-category-pills">
                                {blogCategories.filter(category => category !== 'All').map(category => (
                                  <button
                                    type="button"
                                    key={category}
                                    className={normalizeBlogCategory(blogAdminForm.category || '') === category ? 'active' : ''}
                                    onClick={() => setBlogAdminForm(prev => ({ ...prev, category }))}
                                  >
                                    {category}
                                  </button>
                                ))}
                                {blogAdminForm.category && !blogCategories.includes(normalizeBlogCategory(blogAdminForm.category)) && (
                                  <span className="gutenberg-new-category-note">
                                    New category: {normalizeBlogCategory(blogAdminForm.category)}
                                  </span>
                                )}
                              </div>
                              <small className="gutenberg-sidebar-help" style={{ display: 'block', marginTop: '8px', fontSize: '10px', color: '#64748b' }}>
                                Type a new category name, then publish to create it.
                              </small>
                            </div>

                            {/* Tags Block */}
                            <div className="gutenberg-sidebar-section">
                              <h4>Tags</h4>
                              <input
                                name="tags"
                                value={blogAdminForm.tags}
                                onChange={handleBlogAdminInput}
                                placeholder="e.g. safety, maintenance"
                                className="gutenberg-sidebar-input"
                              />
                              <small className="gutenberg-sidebar-help" style={{ display: 'block', marginTop: '4px', fontSize: '10px', color: '#64748b' }}>
                                Separate with commas
                              </small>
                            </div>

                            {/* SEO Metadata Block */}
                            <div className="gutenberg-sidebar-section">
                              <h4>SEO Optimization</h4>
                              <div className="gutenberg-settings-list" style={{ gap: '12px' }}>
                                <div className="gutenberg-setting-row-vertical" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <span className="gutenberg-setting-label" style={{ fontSize: '11px', color: '#64748b' }}>SEO Title</span>
                                  <input
                                    name="seoTitle"
                                    value={blogAdminForm.seoTitle}
                                    onChange={handleBlogAdminInput}
                                    placeholder="Custom browser title..."
                                    className="gutenberg-sidebar-input"
                                  />
                                </div>
                                <div className="gutenberg-setting-row-vertical" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <span className="gutenberg-setting-label" style={{ fontSize: '11px', color: '#64748b' }}>SEO Description</span>
                                  <textarea
                                    name="seoDescription"
                                    value={blogAdminForm.seoDescription}
                                    onChange={handleBlogAdminInput}
                                    placeholder="Meta description for search engines..."
                                    className="gutenberg-sidebar-textarea"
                                    rows="3"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </aside>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {dashboardTab === 'inquiries' && (
                <div className="dashboard-inquiries-tab">
                  <div className="tab-title-block">
                    <span className="admin-eyebrow">Customer Buying Data</span>
                    <h2>Sales Inquiries & Quote Requests</h2>
                    <p>Track direct website purchases, product configuration inquiries, and sales leads.</p>
                  </div>

                  {/* Filter & Search Rail */}
                  <div className="table-controls-rail">
                    <div className="search-bar">
                      <input 
                        type="text" 
                        placeholder="Search leads name, email or messages..." 
                        value={inquirySearch} 
                        onChange={(e) => setInquirySearch(e.target.value)}
                      />
                    </div>
                    <div className="filter-tabs">
                      {['All', 'Pending', 'Contacted', 'Closed'].map(status => (
                        <button 
                          key={status} 
                          className={`filter-tab-btn ${inquiryStatusFilter === status ? 'active' : ''}`}
                          onClick={() => setInquiryStatusFilter(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="dashboard-table-wrapper">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Customer Info</th>
                          <th>Inquiry Type</th>
                          <th style={{ width: '40%' }}>Message Details</th>
                          <th>Date Received</th>
                          <th>Status Pipeline</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          const filtered = inquiries.filter(inq => {
                            const matchesStatus = inquiryStatusFilter === 'All' || inq.status === inquiryStatusFilter;
                            const term = inquirySearch.toLowerCase();
                            const matchesSearch = 
                              inq.firstName?.toLowerCase().includes(term) ||
                              inq.lastName?.toLowerCase().includes(term) ||
                              inq.email?.toLowerCase().includes(term) ||
                              inq.message?.toLowerCase().includes(term) ||
                              inq.inquiryType?.toLowerCase().includes(term);
                            return matchesStatus && matchesSearch;
                          });

                          if (filtered.length === 0) {
                            return (
                              <tr>
                                <td colSpan="6" className="empty-table-cell">No matching inquiries found.</td>
                              </tr>
                            );
                          }

                          return filtered.map(inq => (
                            <tr key={inq.id}>
                              <td>
                                <div className="customer-info-cell">
                                  <strong>{inq.firstName} {inq.lastName}</strong>
                                  <span>📧 {inq.email}</span>
                                  {inq.phone && inq.phone !== 'N/A' && <span>📞 {inq.phone}</span>}
                                </div>
                              </td>
                              <td>
                                <span className="type-badge">{inq.inquiryType}</span>
                              </td>
                              <td>
                                <p className="inquiry-message-para">{inq.message}</p>
                              </td>
                              <td>{inq.date}</td>
                              <td>
                                <select 
                                  value={inq.status || 'Pending'} 
                                  onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value)}
                                  className={`status-select-dropdown ${inq.status?.toLowerCase() || 'pending'}`}
                                >
                                  <option value="Pending">Pending</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Closed">Closed</option>
                                </select>
                              </td>
                              <td>
                                <button 
                                  type="button" 
                                  className="action-delete-btn" 
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  title="Delete inquiry"
                                >
                                  🗑 Delete
                                </button>
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dashboardTab === 'comments' && (
                <div className="dashboard-comments-tab">
                  <div className="tab-title-block">
                    <span className="admin-eyebrow">Community Moderation</span>
                    <h2>Blog Comments Moderator</h2>
                    <p>Review, approve, reject, or delete visitor comments left on blog posts.</p>
                  </div>

                  <div className="admin-moderation-strip">
                    <div className="admin-mini-stat">
                      <span>Pending</span>
                      <strong>{commentCounts.pending}</strong>
                    </div>
                    <div className="admin-mini-stat">
                      <span>Approved</span>
                      <strong>{commentCounts.approved}</strong>
                    </div>
                    <div className="filter-tabs">
                      {['All', 'Pending', 'Approved'].map(status => (
                        <button
                          type="button"
                          key={status}
                          className={`filter-tab-btn ${adminCommentStatusFilter === status ? 'active' : ''}`}
                          onClick={() => setAdminCommentStatusFilter(status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="admin-primary-btn"
                      onClick={handleApprovePendingComments}
                      disabled={commentCounts.pending === 0}
                    >
                      Approve Pending
                    </button>
                  </div>

                  <div className="dashboard-table-wrapper">
                    <table className="dashboard-table">
                      <thead>
                        <tr>
                          <th>Author</th>
                          <th>Related Blog Post</th>
                          <th style={{ width: '45%' }}>Comment Text</th>
                          <th>Date Posted</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredAdminComments.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="empty-table-cell">No matching comments found.</td>
                          </tr>
                        ) : (
                          filteredAdminComments.map(c => {
                            const post = blogPosts.find(p => p.slug === c.blogSlug);
                            return (
                              <tr key={c.id}>
                                <td>
                                  <strong>{c.authorName}</strong>
                                  <small>{c.authorEmail}</small>
                                </td>
                                <td>
                                  <span className="post-link-span" onClick={() => navigate('blog-post', { id: c.blogSlug })} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'var(--accent)' }}>
                                    {post ? post.title : c.blogSlug}
                                  </span>
                                </td>
                                <td>
                                  <p className="comment-text-body">{c.content}</p>
                                </td>
                                <td>{c.date}</td>
                                <td>
                                  <span className={`status-pill ${c.status?.toLowerCase() === 'approved' ? 'closed' : 'pending'}`}>
                                    {c.status || 'Pending'}
                                  </span>
                                </td>
                                <td>
                                  <div className="comment-actions-cell">
                                    <button 
                                      type="button" 
                                      className="action-approve-btn" 
                                      onClick={() => handleToggleCommentStatus(c.id)}
                                    >
                                      {c.status === 'Approved' ? 'Reject' : 'Approve'}
                                    </button>
                                    <button 
                                      type="button" 
                                      className="action-delete-btn" 
                                      onClick={() => handleDeleteComment(c.id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {dashboardTab === 'tools' && (
                <div className="dashboard-tools-tab">
                  <div className="tab-title-block">
                    <span className="admin-eyebrow">Site Operations</span>
                    <h2>Admin Tools & Content Backup</h2>
                    <p>Keep blog posts, comments, and catalog data organized across local preview, build preview, and deployment.</p>
                  </div>

                  <div className="admin-tools-grid">
                    <div className="admin-tool-card">
                      <span className="admin-tool-label">Blog Data</span>
                      <h3>Posts & comments backup</h3>
                      <p>Export a JSON backup from one browser/port, then import it into another preview or deployed build.</p>
                      <div className="admin-tool-actions">
                        <button type="button" className="admin-primary-btn" onClick={handleExportBlogData}>
                          Export Blog Data
                        </button>
                        <label className="admin-ghost-btn admin-import-btn">
                          Import Blog Data
                          <input type="file" accept="application/json,.json" onChange={handleImportBlogData} />
                        </label>
                      </div>
                    </div>

                    <div className="admin-tool-card">
                      <span className="admin-tool-label">Publishing</span>
                      <h3>Content health</h3>
                      <div className="admin-health-list">
                        <span><strong>{blogPosts.length}</strong> total blog posts</span>
                        <span><strong>{adminPostCategories.length - 1}</strong> categories</span>
                        <span><strong>{commentCounts.pending}</strong> comments need review</span>
                        <span><strong>{inquiries.length}</strong> sales inquiries stored</span>
                      </div>
                    </div>

                    <div className="admin-tool-card">
                      <span className="admin-tool-label">Shortcuts</span>
                      <h3>Common admin work</h3>
                      <div className="admin-tool-actions vertical">
                        <button type="button" className="admin-ghost-btn" onClick={() => {
                          resetBlogAdminForm();
                          setDashboardTab('blog');
                          setIsBlogEditing(true);
                        }}>
                          Write New Blog Post
                        </button>
                        <button type="button" className="admin-ghost-btn" onClick={() => setDashboardTab('comments')}>
                          Review Comments
                        </button>
                        <button type="button" className="admin-ghost-btn" onClick={() => setDashboardTab('inquiries')}>
                          Check Quote Requests
                        </button>
                        <button type="button" className="admin-ghost-btn" onClick={() => setDashboardTab('inventory')}>
                          Upload Inventory CSV
                        </button>
                      </div>
                    </div>
                  </div>

                  {blogAdminStatus && <p className="admin-status">{blogAdminStatus}</p>}
                </div>
              )}

              {dashboardTab === 'inventory' && (
                <div className="dashboard-inventory-tab">
                  <div className="tab-title-block">
                    <span className="admin-eyebrow">Data Store Mapping</span>
                    <h2>Store Product CSV Uploader</h2>
                    <p>Upload a product catalog CSV here to save it locally in the browser and preview mapping rules.</p>
                  </div>

                  <div className="csv-store-layout">
                    <div className="csv-uploader-panel">
                      <div>
                        <h2 className="csv-panel-title text-black">CSV File Upload</h2>
                        <p className="csv-panel-copy">
                          Select a comma-separated inventory sheet. The system saves it in browser memory and displays the top 10 preview rows.
                        </p>
                      </div>

                      <label className="csv-dropzone" htmlFor="product-csv-file">
                        <span className="csv-dropzone-title">Choose CSV File</span>
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
                          Download CSV
                        </button>
                        <button className="cta-button white-pill-dark-border" onClick={handleClearCsv}>
                          Clear Stored CSV
                        </button>
                      </div>

                      {csvStatus && <p className="csv-status">{csvStatus}</p>}
                    </div>

                    <div className="csv-summary-panel">
                      <h2 className="csv-panel-title text-black">Stored Metadata</h2>
                      <div className="csv-summary-grid">
                        <div className="csv-summary-item">
                          <span>File Name</span>
                          <strong>{storedCsvName || 'No file uploaded'}</strong>
                        </div>
                        <div className="csv-summary-item">
                          <span>Headers</span>
                          <strong>{csvPreviewHeaders.length}</strong>
                        </div>
                        <div className="csv-summary-item">
                          <span>Stored Rows</span>
                          <strong>{csvPreviewRows.length}</strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="csv-preview-wrap" style={{ marginTop: '28px' }}>
                    <div className="csv-preview-header">
                      <h2 className="csv-panel-title text-black">CSV Data Grid Preview</h2>
                      <p>Visualizing the top 10 items in the active CSV.</p>
                    </div>

                    {csvPreviewHeaders.length > 0 ? (
                      <div className="csv-table-scroll">
                        <table className="csv-preview-table">
                          <thead>
                            <tr>
                              {csvPreviewHeaders.map((header, index) => (
                                <th key={`${header}-${index}`}>{header || `Col ${index + 1}`}</th>
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
                        <h3>No sheet data parsed</h3>
                        <p>Upload a product CSV to inspect the data records.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>
      ) : currentView === 'blog' ? (
        <main className="blog-page">
          <section className="blog-page-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.42), rgba(0, 0, 0, 0.5)), url(${stoneCrusher})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="blog-page-hero-overlay"></div>
            <div className="section-content blog-page-hero-content">
              <h1>KONSTRUCTZ Blog</h1>
              <p>Industry news, machine guides, and expert tips straight from the field.</p>
            </div>
          </section>

          <section className="blog-page-list white-bg">
            <div className="section-content blog-page-layout">
              <div className="blog-page-main">
                <div className="blog-page-heading-row">
                  <div>
                    <span className="blog-page-eyebrow">Field Notes</span>
                    <h2 className="blog-page-kicker text-black">Choose the categories you like</h2>
                  </div>
                  <span className="blog-page-count">{filteredBlogPosts.length} of {visibleBlogPosts.length} posts</span>
                </div>
                {(activeBlogCategory !== 'All' || activeBlogTag !== 'All' || blogSearchQuery) && (
                  <div className="blog-page-active-filters">
                    {activeBlogCategory !== 'All' && <span>Category: {activeBlogCategory}</span>}
                    {activeBlogTag !== 'All' && <span>Tag: {activeBlogTag}</span>}
                    {blogSearchQuery && <span>Search: {blogSearchQuery}</span>}
                    <button type="button" onClick={resetBlogFilters}>Clear filters</button>
                  </div>
                )}
                <div className="blog-page-grid">
                  {filteredBlogPosts.map((post) => {
                    const { displayImage, displayDesc } = getBlogDisplayData(post);

                    return (
                      <article key={post.slug} className="blog-page-card">
                        <a
                          href={`?page=blog-post&id=${post.slug}`}
                          className={`blog-page-card-media ${displayImage ? 'has-image' : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedBlogPost(post);
                            navigate('blog-post', { id: post.slug });
                          }}
                        >
                          <BlogImage
                            src={displayImage}
                            alt={post.title}
                            className={displayImage ? 'blog-page-custom-image' : 'blog-page-fallback-image'}
                          />
                          <span
                            role="button"
                            tabIndex={0}
                            className="blog-page-card-category"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setActiveBlogCategory(post.category || 'All');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                e.stopPropagation();
                                setActiveBlogCategory(post.category || 'All');
                              }
                            }}
                          >
                            {post.category}
                          </span>
                        </a>
                        <div className="blog-page-card-body">
                          <div className="blog-page-card-meta">
                            <button
                              type="button"
                              onClick={() => setActiveBlogCategory(post.category || 'All')}
                            >
                              {post.category}
                            </button>
                            <time dateTime={post.updatedDate}>{post.updatedDate}</time>
                            <span>KONSTRUCTZ</span>
                          </div>
                          <h3>{post.title}</h3>
                          <p>{displayDesc}</p>
                          {Array.isArray(post.tags) && post.tags.length > 0 && (
                            <div className="blog-page-card-tags">
                              {post.tags.slice(0, 4).map(tag => (
                                <button
                                  type="button"
                                  key={`${post.slug}-${tag}`}
                                  onClick={() => setActiveBlogTag(tag)}
                                >
                                  #{tag}
                                </button>
                              ))}
                            </div>
                          )}
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
                  );
                })}
                  {filteredBlogPosts.length === 0 && (
                    <div className="blog-page-empty">
                      <h3>No posts match those filters.</h3>
                      <p>Try another category, tag, or search word.</p>
                      <button type="button" onClick={resetBlogFilters}>Show all posts</button>
                    </div>
                  )}
                </div>
              </div>

              <aside className="blog-page-sidebar">
                <div className="blog-page-search">
                  <input
                    type="search"
                    placeholder="search..."
                    aria-label="Search blog posts"
                    value={blogSearchQuery}
                    onChange={(e) => setBlogSearchQuery(e.target.value)}
                  />
                  <span>⌕</span>
                </div>

                <div className="blog-page-filter">
                  <h3>Popular Categories</h3>
                  {blogCategories.map(category => (
                    <button
                      key={category}
                      type="button"
                      className={`blog-page-filter-btn ${activeBlogCategory === category ? 'active' : ''}`}
                      onClick={() => setActiveBlogCategory(category)}
                    >
                      <span className="blog-page-filter-box"></span>
                      <span>{category}</span>
                    </button>
                  ))}
                </div>

                <div className="blog-page-filter">
                  <h3>Tags</h3>
                  <div className="blog-page-tags">
                    {blogTags.map(tag => (
                      <button
                        type="button"
                        key={tag}
                        className={activeBlogTag === tag ? 'active' : ''}
                        onClick={() => setActiveBlogTag(tag)}
                      >
                        {tag === 'All' ? 'all tags' : tag}
                      </button>
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
                href="?page=blog"
                className="blog-post-back-link"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('blog');
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
                {(() => {
                  const { displayImage } = getBlogDisplayData(selectedBlogPost);
                  return (
                    <BlogImage
                      src={displayImage}
                      alt={selectedBlogPost.title}
                      className={displayImage ? 'blog-post-custom-image' : 'blog-post-fallback-image'}
                    />
                  );
                })()}
              </div>

              <div className="blog-post-shell">
                <div className="blog-post-main-column">
                  <div className="blog-post-summary-card">
                    <span>Field guide</span>
                    <h2>Article overview</h2>
                    <p>{(() => {
                      let displayDesc = selectedBlogPost.seoDescription || selectedBlogPost.desc || '';
                      const urlRegex = /(https?:\/\/[^\s]+(?:\.webp|\.png|\.jpg|\.jpeg|\.gif))/i;
                      return displayDesc.replace(urlRegex, '').trim();
                    })()}</p>
                  </div>

                  <div className="blog-post-body">
                    {selectedBlogPost.sections.map((section, index) => (
                      <section key={section.h2} id={`article-section-${index + 1}`}>
                        <span className="blog-post-section-label">Step {String(index + 1).padStart(2, '0')}</span>
                        <h2>{section.h2}</h2>
                        <div className="blog-section-body-text">
                          {renderParagraphWithMedia(section.body)}
                        </div>
                        {section.h3 && (
                          <>
                            <h3>{section.h3}</h3>
                            <div className="blog-section-body-text">
                              {renderParagraphWithMedia(section.h3Body)}
                            </div>
                          </>
                        )}
                      </section>
                    ))}

                    <div className="blog-post-cta-panel">
                      <span>Need the right machine?</span>
                      <h3>Talk with KONSTRUCTZ before you buy.</h3>
                      <p>Send us your jobsite, material, and budget details. We can help match the equipment to the work instead of guessing.</p>
                      <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }}>Request guidance</a>
                    </div>
                  </div>
                </div>

                <aside className="blog-post-sidebar">
                  <div className="blog-post-side-card">
                    <span className="blog-post-side-kicker">Article details</span>
                    <dl>
                      <div>
                        <dt>Category</dt>
                        <dd>{selectedBlogPost.category}</dd>
                      </div>
                      <div>
                        <dt>Published</dt>
                        <dd>{selectedBlogPost.date}</dd>
                      </div>
                      <div>
                        <dt>Updated</dt>
                        <dd>{selectedBlogPost.updatedDate}</dd>
                      </div>
                      <div>
                        <dt>Author</dt>
                        <dd>KONSTRUCTZ Team</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="blog-post-side-card">
                    <span className="blog-post-side-kicker">In this guide</span>
                    <nav className="blog-post-toc">
                      {selectedBlogPost.sections.map((section, index) => (
                        <a href={`#article-section-${index + 1}`} key={section.h2}>
                          {String(index + 1).padStart(2, '0')} {section.h2}
                        </a>
                      ))}
                    </nav>
                  </div>

                  <div className="blog-post-side-card newsletter-signup-card">
                    <span className="blog-post-side-kicker">Newsletter</span>
                    <h4>Get Field Reports</h4>
                    <p>Subscribe to receive official machine guides, operator training logs, and factory updates.</p>
                    <form className="sidebar-newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Subscription saved successfully!"); e.target.reset(); }}>
                      <input type="email" placeholder="Your email address" required />
                      <button type="submit" className="sidebar-submit-btn">Subscribe</button>
                    </form>
                  </div>
                </aside>
              </div>

              <div className="blog-related-posts">
                <div className="blog-related-header">
                  <span>Keep reading</span>
                  <h2>More KONSTRUCTZ guides</h2>
                </div>
                <div className="blog-related-grid">
                  {getVisibleBlogPosts(blogPosts)
                    .filter((post) => post.slug !== selectedBlogPost.slug)
                    .slice(0, 3)
                    .map((post) => (
                      <a
                        key={post.slug}
                        href={`?page=blog-post&id=${post.slug}`}
                        className="blog-related-card"
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedBlogPost(post);
                          navigate('blog-post', { id: post.slug });
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        <span>{post.category}</span>
                        <h3>{post.title}</h3>
                        <p>{post.desc}</p>
                      </a>
                    ))}
                </div>
              </div>

              {/* Blog Comments Section */}
              <div className="blog-comments-container">
                  <hr className="comments-divider" />
                  <h3 className="comments-heading">
                    Comments ({comments.filter(c => c.blogSlug === selectedBlogPost.slug && c.status === 'Approved').length})
                  </h3>
                  
                  <div className="comments-stack">
                    {comments.filter(c => c.blogSlug === selectedBlogPost.slug && c.status === 'Approved').length === 0 ? (
                      <p className="no-comments-placeholder">No comments yet. Be the first to share your thoughts!</p>
                    ) : (
                      comments
                        .filter(c => c.blogSlug === selectedBlogPost.slug && c.status === 'Approved')
                        .map(comment => (
                          <div key={comment.id} className="user-comment-card">
                            <div className="comment-header-row">
                              <strong className="commenter-name text-black">{comment.authorName}</strong>
                              <span className="comment-timestamp">{comment.date}</span>
                            </div>
                            <p className="comment-body-text">{comment.content}</p>
                          </div>
                        ))
                    )}
                  </div>

                  <form className="comment-reply-form" onSubmit={handleCommentSubmit}>
                    <h3>Leave a Comment</h3>
                    <p className="comment-form-note">Your email address will not be published. Required fields are marked *</p>
                    
                    <div className="comment-input-row">
                      <label>
                        Name *
                        <input 
                          type="text" 
                          required 
                          placeholder="John Doe" 
                          value={commentForm.authorName} 
                          onChange={(e) => setCommentForm(prev => ({ ...prev, authorName: e.target.value }))}
                        />
                      </label>
                      <label>
                        Email *
                        <input 
                          type="email" 
                          required 
                          placeholder="john@example.com" 
                          value={commentForm.authorEmail} 
                          onChange={(e) => setCommentForm(prev => ({ ...prev, authorEmail: e.target.value }))}
                        />
                      </label>
                    </div>
                    
                    <label className="comment-textarea-label">
                      Comment *
                      <textarea 
                        required 
                        rows="5" 
                        placeholder="Share your thoughts or questions about this machine/guide..." 
                        value={commentForm.content} 
                        onChange={(e) => setCommentForm(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </label>
                    
                    <button type="submit" className="cta-button accent-pill-btn comment-submit-btn">
                      Post Comment
                    </button>
                  </form>
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
        <main className={`topic-page ${activeTopicCategory === 'Hub' ? 'hub-view' : 'category-view'}`}>
          {activeTopicCategory === 'Hub' ? (
            /* HUB LANDING VIEW */
            <>
              <section className="topic-hero" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.38), rgba(0, 0, 0, 0.54)), url(${constructionBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="topic-hero-overlay"></div>
                <div className="section-content topic-hero-content">
                  <h1 className="hero-display-title" style={{ fontFamily: "'PT Serif', Georgia, serif" }}>Help Center & Documentation</h1>
                  <p>
                    Find technical performance parameters, safety guidelines, buying guides, shipping tracking, warranty information, and financing matrices.
                  </p>
                </div>
              </section>

              <section className="topic-help white-bg">
                <div className="section-content topic-help-content">
                  <div className="topic-title-block" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="topic-section-line" style={{ margin: '0 auto 12px auto', display: 'block' }}></span>
                    <span className="topic-section-label" style={{ display: 'block', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Support Center</span>
                    <h2 style={{ fontSize: '32px', marginTop: '10px' }}>How can we help you today?</h2>
                    <p style={{ fontSize: '16px', color: '#64748b' }}>Select a category below or try popular search tags:</p>
                  </div>

                  <div className="topic-search-tags" style={{ justifyContent: 'center', marginBottom: '40px' }} aria-label="Popular searches">
                    {['Warranty', 'Delivery', 'Request a demo', 'Payment', 'Maintenance', 'Spare parts'].map(tag => (
                      <button 
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className=""
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Hub Grid */}
                  <div className="topic-hub-grid">
                    {[
                      { id: 'Machines', title: 'Machines & Safety', icon: '⚙️', desc: 'Technical specifications, engine options, operational safety rules and break-in protocols for heavy loaders and excavators.' },
                      { id: 'Buying & pricing', title: 'Buying & Pricing', icon: '🏷️', desc: 'Transparent purchase process, step-by-step acquisition flow, and our interactive commercial payment calculator.' },
                      { id: 'Delivery', title: 'Delivery & Logistics', icon: '🚢', desc: 'Ocean freight vs. RoRo shipping methods, custom clearance checkpoints, and live delivery code tracker.' },
                      { id: 'Warranty', title: 'Warranty & Claims', icon: '🛡️', desc: 'Our official 12-Month factory warranty certificate and detailed component coverage inspector.' },
                      { id: 'Service & parts', title: 'Service & Parts', icon: '🔧', desc: 'Scheduled preventative maintenance checklists, operating hour schedules, and OEM spare parts pricing.' },
                      { id: 'Financing', title: 'Commercial Financing', icon: '🏦', desc: 'Compare equipment loans, FMV leases, and $1 buyout options, and check business approval criteria.' }
                    ].map(card => (
                      <div key={card.id} className="topic-hub-card glass-panel" onClick={() => navigate('topic', { 'topic-category': card.id })}>
                        <div className="hub-card-icon">{card.icon}</div>
                        <h3>{card.title}</h3>
                        <p>{card.desc}</p>
                        <span className="hub-card-link">Explore Details →</span>
                      </div>
                    ))}
                  </div>

                  {/* General Hub FAQs */}
                  <div className="topic-hub-faq-box" style={{ marginTop: '60px', borderTop: '1px solid #e2e8f0', paddingTop: '40px' }}>
                    <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', textAlign: 'center' }}>Help Center General FAQs</h3>
                    <div className="topic-subpage-faq-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                      {[
                        { id: 'gen-1', question: 'How do I contact customer support directly?', answer: 'You can email us directly at sales@cwqv.com, call our hotline, or submit a form through our Contact page. We respond to all inquiries within 24 hours.' },
                        { id: 'gen-2', question: 'Can I purchase spare parts directly from the site?', answer: 'Yes, select the parts under our "Service & Parts" section and click "Request Parts Quote". A sales representative will confirm availability and draft a secure invoice for your order.' }
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
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            /* BREADCRUMB & BESPOKE PAGE VIEWS */
            <div className="category-subpage-container">
              <div className="category-subpage-nav-header">
                <div className="section-content">
                  <a href="?page=topic" onClick={(e) => { e.preventDefault(); navigate('topic'); }} className="back-hub-link">
                    ← Back to Help Center Hub
                  </a>
                  <span className="breadcrumb-separator">/</span>
                  <span className="breadcrumb-current">{activeTopicCategory}</span>
                </div>
              </div>

              {/* A. MACHINES & SAFETY (skidsteers.org layout) */}
              {activeTopicCategory === 'Machines' && (
                <div className="topic-subpage-content machines-safety-subpage theme-white-doc">
                  <div className="section-content doc-narrow-wrap">
                    <span className="doc-kicker-tag">TECHNICAL DOCUMENTATION & SAFETY</span>
                    <h1 className="doc-main-title">Compact Mini Skid Steer</h1>
                    <p className="doc-subtitle">
                      A heavy-duty, track-sole mini loader engineered for compact construction and precision earth-moving.
                    </p>

                    {/* Technical Performance Table */}
                    <div className="doc-section-block">
                      <h2 className="doc-section-header">Technical Performance</h2>
                      <div className="doc-table-wrapper">
                        <table className="doc-spec-table">
                          <thead>
                            <tr>
                              <th>Parameter</th>
                              <th>Specification</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Model</td>
                              <td>LH180S</td>
                            </tr>
                            <tr>
                              <td>Operating Load</td>
                              <td>200 kg</td>
                            </tr>
                            <tr>
                              <td>Max Lifting Force</td>
                              <td>375 kg</td>
                            </tr>
                            <tr>
                              <td>Bucket Capacity</td>
                              <td>0.15 m³</td>
                            </tr>
                            <tr>
                              <td>Travel Speed</td>
                              <td>0 ~ 5 km/h</td>
                            </tr>
                            <tr>
                              <td>Hydraulic System Pressure</td>
                              <td>17 Mpa</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* 2-Column Grid */}
                    <div className="doc-grid-2">
                      <div className="doc-card card-yellow-accent">
                        <h3>Engine Options</h3>
                        <ul>
                          <li><strong>Gasoline:</strong> Briggs & Stratton 13.5hp, 17.5kW (23HP) @ 3600rpm.</li>
                          <li><strong>Diesel:</strong> KOOP KD2V80, Water-cooled, 14kW (20HP) @ 3000rpm.</li>
                          <li><strong>Safety:</strong> Compatible with Honda GX series featuring the Oil Alert™ automatic shutdown system.</li>
                        </ul>
                      </div>

                      <div className="doc-card card-yellow-accent">
                        <h3>Maintenance Schedule</h3>
                        <ul>
                          <li><strong>Daily:</strong> Check all fluid levels and grease lubricating points.</li>
                          <li><strong>50 Hours:</strong> Clean oil cooler and inspect battery/air filters.</li>
                          <li><strong>100 Hours:</strong> First engine oil change.</li>
                          <li><strong>250 Hours:</strong> Replace hydraulic fluid and return filters.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Operational Safety */}
                    <div className="doc-section-block">
                      <h2 className="doc-section-header">Operational Safety</h2>
                      <ul className="doc-bullet-list">
                        <li><strong>Slope Stability:</strong> Maintain a low bucket position; do not exceed 12° fuel tank angle or 20° driving slope.</li>
                        <li><strong>Precision Steering:</strong> Independent dual-handle controls for tracks and lift arm mechanics.</li>
                        <li><strong>Hydraulic Connection:</strong> Features a quick-attach mount plate for rapid, secure attachment swaps.</li>
                      </ul>
                    </div>

                    {/* 3-Column Grid */}
                    <div className="doc-grid-3">
                      <div className="doc-card">
                        <h4>Strategic Job-Site Planning</h4>
                        <ul className="card-bullet-list">
                          <li><strong>Utility Locating:</strong> Always notify "One-Call" or local utility services to mark existing lines before any ground-penetrating work.</li>
                          <li><strong>Overhead Awareness:</strong> Note the location and height of all overhead lines to ensure a fully lifted arm will not make contact.</li>
                          <li><strong>Site Classification:</strong> Classify zones as "Electric" or "Natural Gas" if working within 10 feet (3m) of buried lines.</li>
                          <li><strong>Terrain Assessment:</strong> Inspect for changes in elevation, railroad crossings, and soil conditions prior to transport.</li>
                        </ul>
                      </div>

                      <div className="doc-card">
                        <h4>Dual-Handle Maneuverability</h4>
                        <ul className="card-bullet-list">
                          <li><strong>Drive System:</strong> Independent track controls allow for 360-degree zero-turn capability.</li>
                          <li><strong>Multi-Function Left Joystick:</strong> Manages the left tracks while moving the handle right/left raises or lowers the lift arm.</li>
                          <li><strong>Multi-Function Right Joystick:</strong> Manages the right tracks while side movement controls the bucket tilt (dump and curl).</li>
                          <li><strong>Variable Throttle:</strong> Toggle engine speeds from low (Turtle) for delicate work to high (Rabbit) for maximum load moving.</li>
                        </ul>
                      </div>

                      <div className="doc-card">
                        <h4>Optimal Capacity Protocol</h4>
                        <p className="card-intro-text">
                          To maximize the long-term efficiency of your engine and hydraulic systems, follow this 100-hour break-in schedule:
                        </p>
                        <table className="card-inner-table">
                          <thead>
                            <tr>
                              <th>Operational Hours</th>
                              <th>Max Load Capacity</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Within 10 Hours</td>
                              <td>50% Capacity</td>
                            </tr>
                            <tr>
                              <td>10 to 100 Hours</td>
                              <td>80% Capacity</td>
                            </tr>
                            <tr>
                              <td>After 100 Hours</td>
                              <td>100% Capacity</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Advanced Operational Safety Highlight Panel */}
                    <div className="doc-highlight-panel yellow-alert-panel">
                      <h3>Advanced Operational Safety</h3>
                      <p>Operating a mini skid steer requires strict adherence to terrain safety to prevent rollovers and mechanical failure.</p>
                      <ul>
                        <li><strong>Slope Weight Management:</strong> Always operate with the "heavy end" of the unit uphill; remember that a full bucket makes the front heavy, while an empty bucket makes the rear heavy.</li>
                        <li><strong>Critical Tilt Limits:</strong> Do not exceed a roll angle of 12° on slopes to prevent spillage.</li>
                        <li><strong>Engine Safety:</strong> Honda-equipped models feature an Oil Alert™ system that prevents engine damage by stopping the motor if crankcase oil falls below safe limits.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* B. BUYING & PRICING */}
              {activeTopicCategory === 'Buying & pricing' && (
                <div className="topic-subpage-content buying-subpage theme-slate-calculator">
                  <div className="section-content doc-narrow-wrap">
                    <span className="subpage-kicker">COMMERCIAL ACQUISITION & CALCULATORS</span>
                    <h1 className="subpage-main-title">Acquisition & Pricing</h1>
                    <p className="subpage-lead">
                      Review our transparent commercial purchasing steps or use our real-time estimated payment estimator to plan your capital investment.
                    </p>

                    <div className="calculator-layout-split">
                      {/* Calculator Panel */}
                      <div className="financing-calc-box glass-panel themed-calc-panel">
                        <h3>Estimated Finance Payment Estimator</h3>
                        <div className="calc-sliders">
                          <div className="slider-group">
                            <label>Equipment / Package Cost: <strong>${costVal.toLocaleString()}</strong></label>
                            <input 
                              type="range" 
                              min="15000" 
                              max="60000" 
                              step="2500" 
                              value={costVal} 
                              onChange={(e) => setCostVal(Number(e.target.value))}
                            />
                            <div className="slider-ticks">
                              <span>$15k</span>
                              <span>$30k</span>
                              <span>$45k</span>
                              <span>$60k</span>
                            </div>
                          </div>
                          <div className="slider-group">
                            <label>Term (Months): <strong>{termVal} Months</strong></label>
                            <input 
                              type="range" 
                              min="24" 
                              max="60" 
                              step="12" 
                              value={termVal} 
                              onChange={(e) => setTermVal(Number(e.target.value))}
                            />
                            <div className="slider-ticks">
                              <span>24m</span>
                              <span>36m</span>
                              <span>48m</span>
                              <span>60m</span>
                            </div>
                          </div>
                        </div>
                        <div className="calc-result-area">
                          <span>Estimated Monthly Payment:</span>
                          <span className="calc-result-price">${Math.round((costVal * 1.06) / termVal)}/mo</span>
                          <p>*Estimates assume 6% commercial financing APR and approved business credit profile.</p>
                        </div>
                      </div>

                      {/* Side Details */}
                      <div className="buying-details-side glass-panel">
                        <h3>Volume Fleet Ordering</h3>
                        <p>
                          KONSTRUCTZ offers bespoke package options and volume discounts for contractors requiring 3+ units. Get in touch with our commercial sales desk to draft a custom contract plan.
                        </p>
                        <div className="fleet-pricing-card">
                          <h5>Fleet Discount Tiers:</h5>
                          <ul>
                            <li>3 - 5 Units: <strong>5% Package Discount</strong></li>
                            <li>6 - 10 Units: <strong>10% Package Discount</strong></li>
                            <li>11+ Units: <strong>Contact for custom pricing matrix</strong></li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Steps Ribbon */}
                    <div className="acquisition-flow-wrapper">
                      <h3>Order Fulfillment Timeline</h3>
                      <div className="buying-steps-flow">
                        {[
                          { num: '1', title: 'Cart Request', body: 'Select machinery/attachments and submit quote list.' },
                          { num: '2', title: 'Formal Quote', body: 'Get a binding invoice detailing shipping & customs.' },
                          { num: '3', title: 'Wire Payment', body: 'Finalize order via T/T bank wire or commercial L/C.' },
                          { num: '4', title: 'Site Delivery', body: 'The machine is delivered to your active yard.' }
                        ].map(step => (
                          <div key={step.num} className="buying-step-card">
                            <span className="step-circle">{step.num}</span>
                            <h4>{step.title}</h4>
                            <p>{step.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="topic-subpage-faq-section">
                      <h3 className="topic-faq-category-title">{activeTopicCategory} FAQs</h3>
                      {(topicFaqs[activeTopicCategory] || []).map(item => (
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
                    </div>
                  </div>
                </div>
              )}

              {/* C. DELIVERY */}
              {activeTopicCategory === 'Delivery' && (
                <div className="topic-subpage-content delivery-subpage theme-navy-dashboard">
                  <div className="section-content doc-narrow-wrap">
                    <span className="delivery-kicker">GLOBAL SHIPPINGS & REAL-TIME DISPATCH</span>
                    <h1 className="delivery-title">Global Freight & Dispatch Logistics</h1>
                    <p className="delivery-subtitle">
                      From shipping containers to local flatbed trucks, enter your dispatch code to track your machinery in real-time.
                    </p>

                    {/* Tracker Card */}
                    <div className="shipment-tracker-box glass-panel tracking-console-panel">
                      <h3>Machinery Delivery Status Tracker</h3>
                      <p>Enter your 7-character booking reference (e.g. <strong>KON-9831</strong> or <strong>KON-8422</strong>) to retrieve live tracking data:</p>
                      
                      <form onSubmit={handleTrackShipment} className="tracker-form">
                        <input 
                          type="text" 
                          placeholder="KON-XXXX" 
                          value={trackingNum}
                          onChange={(e) => setTrackingNum(e.target.value)}
                          maxLength="8"
                          className="tracker-input-box"
                        />
                        <button type="submit" className="cta-button tracker-btn">Track Order</button>
                      </form>

                      {trackingResult && trackingResult.error && (
                        <div className="tracker-error-msg">{trackingResult.error}</div>
                      )}

                      {trackingResult && !trackingResult.error && (
                        <div className="tracker-success-panel">
                          <div className="tracker-meta-row">
                            <span>Status: <strong className="status-highlight">{trackingResult.status}</strong></span>
                            <span>Progress: <strong>{trackingResult.progress}%</strong></span>
                          </div>
                          <div className="tracker-bar-bg">
                            <div className="tracker-bar-fill" style={{ width: `${trackingResult.progress}%` }}></div>
                          </div>
                          <div className="tracker-timeline-flow">
                            {trackingResult.steps.map(step => (
                              <div key={step.name} className={`tracker-timeline-point ${step.done ? 'done' : step.current ? 'current' : 'pending'}`}>
                                <span className="point-dot"></span>
                                <div className="point-info">
                                  <h5>{step.name}</h5>
                                  <p>{step.date}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Logistics Info cards */}
                    <div className="logistics-grid">
                      <div className="logistics-card glass-panel">
                        <h4>Containerized Ocean Freight</h4>
                        <p>Machines are double-wrapped, loaded into ocean containers, and locked down to prevent port movement.</p>
                      </div>
                      <div className="logistics-card glass-panel">
                        <h4>RoRo Ports Dispatch</h4>
                        <p>Larger fleet bundles are driven directly onto Roll-on/Roll-off vessels for simple coastal logistics.</p>
                      </div>
                    </div>

                    <div className="topic-subpage-faq-section">
                      <h3 className="topic-faq-category-title">{activeTopicCategory} FAQs</h3>
                      {(topicFaqs[activeTopicCategory] || []).map(item => (
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
                    </div>
                  </div>
                </div>
              )}

              {/* D. WARRANTY */}
              {activeTopicCategory === 'Warranty' && (
                <div className="topic-subpage-content warranty-subpage theme-certificate-gold">
                  <div className="section-content doc-narrow-wrap">
                    <span className="warranty-kicker">WARRANTY DEED & COVERAGE GUIDES</span>
                    <h1 className="warranty-title">Warranty Coverage & Extended Protection</h1>
                    <p className="warranty-lead">
                      Every KONSTRUCTZ machine is backed by our robust manufacturing guarantee. Select a component category below to check specific warranty boundaries and claims terms.
                    </p>

                    {/* Official Certificate Layout */}
                    <div className="warranty-certificate-mock-frame">
                      <div className="mock-cert-border">
                        <div className="cert-header">
                          <h4>KONSTRUCTZ CORPORATE REGISTRY</h4>
                          <h5>Official 12-Month Factory Warranty Certificate</h5>
                        </div>
                        <p className="cert-body">
                          This certifies that all new machinery purchased from authorized distributors is covered under our 1-Year/1000-Hour limited parts warranty program from the date of register activation.
                        </p>
                        <div className="cert-signatures">
                          <div className="sig-block">
                            <span className="sig-line"></span>
                            <span>QA Lead Officer</span>
                          </div>
                          <div className="sig-badge">
                            <span className="badge-seal">★ SECURE ★</span>
                          </div>
                          <div className="sig-block">
                            <span className="sig-line"></span>
                            <span>Operations Director</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Component Warranty Selector */}
                    <div className="warranty-checker-box glass-panel certificate-tabs-panel">
                      <h3>Coverage Breakdown Inspector</h3>
                      <div className="warranty-type-buttons">
                        {['Engine', 'Hydraulics', 'Chassis', 'Wear Items'].map(comp => (
                          <button 
                            key={comp}
                            className={`comp-btn ${activeWarrantyComponent === comp ? 'active' : ''}`}
                            onClick={() => setActiveWarrantyComponent(comp)}
                          >
                            {comp}
                          </button>
                        ))}
                      </div>

                      <div className="warranty-comp-detail-panel">
                        {activeWarrantyComponent === 'Engine' && (
                          <div className="comp-coverage-info">
                            <span className="status-label covered">● Fully Covered Component (12 Months / 1000 Hrs)</span>
                            <p>Covers structural engine blocks, pistons, intake valves, fuel pump injectors, alternator, oil pump assemblies, and radiator cores against material defects.</p>
                          </div>
                        )}
                        {activeWarrantyComponent === 'Hydraulics' && (
                          <div className="comp-coverage-info">
                            <span className="status-label covered">● Fully Covered Component (12 Months / 1000 Hrs)</span>
                            <p>Covers main hydraulic pump pistons, control valve manifolds, rotary swing manifold hubs, boom/arm cylinders, and gear motors.</p>
                          </div>
                        )}
                        {activeWarrantyComponent === 'Chassis' && (
                          <div className="comp-coverage-info">
                            <span className="status-label covered">● Fully Covered Component (12 Months / 1000 Hrs)</span>
                            <p>Covers welds on Boom arm, structural steel frame, crawler track mounting links, cabin canopy roll-bars, and stabilizer linkage points.</p>
                          </div>
                        )}
                        {activeWarrantyComponent === 'Wear Items' && (
                          <div className="comp-coverage-info">
                            <span className="status-label excluded">✕ Excluded wear-and-tear items</span>
                            <p>Normal wear-and-tear items like rubber tracks, teeth, cutting edges, oil filters, gaskets, rubber seals, batteries, spark plugs, and hydraulic fluid hoses are excluded unless a factory assembly defect is documented within the first 30 days.</p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="topic-subpage-faq-section">
                      <h3 className="topic-faq-category-title">{activeTopicCategory} FAQs</h3>
                      {(topicFaqs[activeTopicCategory] || []).map(item => (
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
                    </div>
                  </div>
                </div>
              )}

              {/* E. SERVICE & PARTS */}
              {activeTopicCategory === 'Service & parts' && (
                <div className="topic-subpage-content service-subpage theme-workshop-slate">
                  <div className="section-content doc-narrow-wrap">
                    <span className="service-kicker">MAINTENANCE WORKSHOP LOG & PARTS</span>
                    <h1 className="service-title">Service, Maintenance & Spare Parts</h1>
                    <p className="service-lead">
                      Proper maintenance ensures maximum machine life and prevents unexpected downtime. Toggle the service interval tracker below to view recommended checklists or check standard maintenance replacement packages.
                    </p>

                    {/* Clipboard Panel */}
                    <div className="service-interval-box glass-panel clipboard-card-panel">
                      <div className="clipboard-header">
                        <h3>🔧 Maintenance Job-Card Log</h3>
                      </div>
                      <div className="service-type-tabs">
                        {['50 Hours', '250 Hours', '500 Hours', '1000 Hours'].map(tab => (
                          <button 
                            key={tab}
                            className={`service-tab-btn ${activeServiceInterval === tab ? 'active' : ''}`}
                            onClick={() => setActiveServiceInterval(tab)}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>

                      <div className="service-checklist-details">
                        {activeServiceInterval === '50 Hours' && (
                          <ul>
                            <li><input type="checkbox" defaultChecked readOnly /> Drain and replace break-in engine oil</li>
                            <li><input type="checkbox" defaultChecked readOnly /> Replace spin-on engine oil filter</li>
                            <li><input type="checkbox" readOnly /> Inspect pilot hydraulics valve line seals</li>
                            <li><input type="checkbox" readOnly /> Verify crawler rubber track tension parameters</li>
                          </ul>
                        )}
                        {activeServiceInterval === '250 Hours' && (
                          <ul>
                            <li><input type="checkbox" readOnly /> Inspect and clean primary engine air filter</li>
                            <li><input type="checkbox" readOnly /> Grease all main boom arm pivot pin bushings</li>
                            <li><input type="checkbox" readOnly /> Check transmission gear oil indicator levels</li>
                            <li><input type="checkbox" readOnly /> Inspect fuel-water separator bowls</li>
                          </ul>
                        )}
                        {activeServiceInterval === '500 Hours' && (
                          <ul>
                            <li><input type="checkbox" readOnly /> Replace fuel filter elements</li>
                            <li><input type="checkbox" readOnly /> Change engine alternator drive belt</li>
                            <li><input type="checkbox" readOnly /> Verify battery charge output & clean terminals</li>
                            <li><input type="checkbox" readOnly /> Grease loader articulation steering hinges</li>
                          </ul>
                        )}
                        {activeServiceInterval === '1000 Hours' && (
                          <ul>
                            <li><input type="checkbox" readOnly /> Flush and change hydraulic fluid reservoir</li>
                            <li><input type="checkbox" readOnly /> Replace secondary heavy duty air intake filters</li>
                            <li><input type="checkbox" readOnly /> Clean diesel radiator fins and flush coolant</li>
                            <li><input type="checkbox" readOnly /> Adjust engine valve lash clearances</li>
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Spare Parts Grid */}
                    <div className="spare-parts-section">
                      <h3>OEM Replacement Packages</h3>
                      <div className="spare-parts-grid">
                        {[
                          { name: 'Full Filter Kit', price: '$145', code: 'P-FLT-K2' },
                          { name: 'Auxiliary Hydraulic Hose Kit', price: '$220', code: 'P-HSE-ATT' },
                          { name: 'Excavator Bucket Tooth', price: '$35', code: 'P-TTH-STD' },
                          { name: 'OEM Drive Belt', price: '$48', code: 'P-BLT-YAN' }
                        ].map(part => (
                          <div key={part.code} className="part-card glass-panel">
                            <h5>{part.name}</h5>
                            <span>Code: <strong>{part.code}</strong></span>
                            <span className="part-price">{part.price}</span>
                            <a href="?page=contact&inquiry=Order%20Spare%20Parts" onClick={(e) => { e.preventDefault(); navigate('contact', { inquiry: 'Order Spare Parts' }); }} className="part-quote-link">Request Parts Quote</a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="topic-subpage-faq-section">
                      <h3 className="topic-faq-category-title">{activeTopicCategory} FAQs</h3>
                      {(topicFaqs[activeTopicCategory] || []).map(item => (
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
                    </div>
                  </div>
                </div>
              )}

              {/* F. FINANCING */}
              {activeTopicCategory === 'Financing' && (
                <div className="topic-subpage-content financing-subpage theme-finance-emerald">
                  <div className="section-content doc-narrow-wrap">
                    <span className="finance-kicker">EQUIPMENT FINANCING & LEASES</span>
                    <h1 className="finance-title">Commercial Equipment Financing</h1>
                    <p className="finance-lead">
                      Grow your fleet while preserving cash flow. Compare options and check requirements for quick approval with our commercial lending partners.
                    </p>

                    {/* Comparison Matrix */}
                    <div className="financing-matrix-grid">
                      <div className="matrix-card glass-panel">
                        <h4>Equipment Loan</h4>
                        <ul>
                          <li><strong>Ownership:</strong> Handover on final payment</li>
                          <li><strong>Tax Benefit:</strong> Sect 179 depreciation eligible</li>
                          <li><strong>Terms:</strong> Fixed rate 24-72 months</li>
                          <li><strong>Best For:</strong> High utilization machines</li>
                        </ul>
                      </div>
                      <div className="matrix-card glass-panel">
                        <h4>Fair Market Value Lease</h4>
                        <ul>
                          <li><strong>Ownership:</strong> Buy, return, or upgrade</li>
                          <li><strong>Tax Benefit:</strong> Off-balance sheet treatment</li>
                          <li><strong>Terms:</strong> Lowest monthly costs</li>
                          <li><strong>Best For:</strong> Regular fleet updates</li>
                        </ul>
                      </div>
                      <div className="matrix-card glass-panel font-highlight highlighted-finance-card">
                        <span className="best-value-badge">Popular Value</span>
                        <h4>$1 Buyout Lease</h4>
                        <ul>
                          <li><strong>Ownership:</strong> Purchase for $1 at end</li>
                          <li><strong>Tax Benefit:</strong> Write off lease payments</li>
                          <li><strong>Terms:</strong> Fixed terms 36-60 months</li>
                          <li><strong>Best For:</strong> Long term ownership</li>
                        </ul>
                      </div>
                    </div>

                    {/* Checklist */}
                    <div className="finance-app-checklist">
                      <h3>Approval Criteria & Requirements:</h3>
                      <div className="checklist-flow">
                        <div>✓ 2+ Years in business</div>
                        <div>✓ Good business credit score</div>
                        <div>✓ 3 Months bank logs</div>
                        <div>✓ Completed credit form</div>
                      </div>
                      <div className="checklist-cta" style={{ textAlign: 'center', marginTop: '24px' }}>
                        <a href="?page=contact&inquiry=Financing%20Application" onClick={(e) => { e.preventDefault(); navigate('contact', { inquiry: 'Financing Application' }); }} className="cta-button green-pill-btn">
                          Apply For Finance Pre-Approval
                        </a>
                      </div>
                    </div>

                    <div className="topic-subpage-faq-section">
                      <h3 className="topic-faq-category-title">{activeTopicCategory} FAQs</h3>
                      {(topicFaqs[activeTopicCategory] || []).map(item => (
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
                    </div>
                  </div>
                </div>
              )}

              {/* General Bottom Support Footer */}
              <div className="section-content doc-narrow-wrap" style={{ marginTop: '40px', borderTop: '1px solid var(--border-light-bg)', paddingTop: '40px', paddingBottom: '80px' }}>
                <div className="topic-contact-box" style={{ margin: '0 auto', maxWidth: '600px', textAlign: 'center', background: '#f4f6f4', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-light-bg)' }}>
                  <strong style={{ fontSize: '18px', display: 'block', marginBottom: '8px', color: 'var(--text-light-bg)' }}>Still have a question?</strong>
                  <p style={{ color: 'var(--text-light-bg-secondary)', fontSize: '14px', marginBottom: '20px' }}>Our technical support and sales team are ready to help. Reach out and we will get back to you within 24 hours.</p>
                  <a href="?page=contact" onClick={(e) => { e.preventDefault(); navigate('contact'); }} className="cta-button accent-pill-btn" style={{ display: 'inline-block', padding: '10px 24px' }}>
                    Contact Us ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </main>
      ) : currentView === 'store-data' ? (
        <main className="store-data-page white-bg">
          <div className="section-content" style={{ padding: '80px 24px', textAlign: 'center' }}>
            <h2>Redirecting to Admin Console...</h2>
            <p>Product inventory management has been integrated into the unified dashboard.</p>
            <button className="cta-button accent-pill-btn" onClick={() => navigate('admin-blog', { tab: 'inventory' })} style={{ marginTop: '20px' }}>
              Go to Inventory Console
            </button>
          </div>
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
            const isCart = !!productForCheckout.isCartCheckout;
            return (
              <>
                <section className="checkout-hero dark-bg">
                  <div className="section-content checkout-hero-content">
                    <span className="black-pill-tag">Secure checkout</span>
                    <h1 className="checkout-title">Complete Your Purchase</h1>
                    <p className="checkout-subtitle">
                      {isCart ? (
                        "You are checking out your cart items. The store loads only on this checkout page after Proceed to Checkout is selected."
                      ) : (
                        `You are checking out ${productForCheckout.name}. The store loads only on this checkout page after Buy Now is selected.`
                      )}
                    </p>
                    <button
                      className="checkout-back-link"
                      onClick={() => {
                        if (isCart) {
                          navigate('cart');
                        } else {
                          handleProductDetail(productForCheckout);
                        }
                      }}
                    >
                      {isCart ? 'Back to cart' : 'Back to product'}
                    </button>
                  </div>
                </section>

                <section className="checkout-body white-bg">
                  <div className="section-content">
                    <div className="checkout-shell">
                      {isCart ? (
                        <div className="checkout-summary-card" style={{ display: 'block', padding: '24px' }}>
                          <h2 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px', textTransform: 'uppercase' }}>Selected Items</h2>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {cartItems.map(item => (
                              <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '6px', background: '#f8fafc', border: '1px solid #eee', display: 'grid', placeItems: 'center', overflow: 'hidden' }}>
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                                  ) : (
                                    <span style={{ fontSize: '9px', fontWeight: '800' }}>ITEM</span>
                                  )}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <h3 style={{ fontSize: '14px', fontWeight: '700', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h3>
                                  <p style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>Qty: {item.quantity} · {item.price || 'Quote on request'}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '16px' }}>
                            <span>Total Estimated:</span>
                            <span>{cartSubtotal > 0 ? `$${cartSubtotal.toLocaleString()}` : 'Quote needed'}</span>
                          </div>
                        </div>
                      ) : (
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
                      )}

                      <div className="hidden-checkout-panel checkout-store-panel">
                        <div className="hidden-checkout-header">
                          <div>
                            <span className="hidden-checkout-kicker">Store checkout</span>
                            <h2>{isCart ? 'Checkout for Cart Items' : `Checkout for ${productForCheckout.name}`}</h2>
                          </div>
                        </div>
                        <StoreEmbed
                          key={isCart ? 'cart-checkout' : `${productForCheckout.id}-${getStoreHash(productForCheckout)}`}
                          cartItems={isCart ? cartItems : [{ ...productForCheckout, quantity: productForCheckout.quantity || 1 }]}
                        />
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
                    {hasCheckoutableItems ? (
                      <>
                        <button
                          className="cta-button black-pill-btn cart-checkout-btn"
                          onClick={openCartCheckoutPage}
                        >
                          Proceed to Checkout
                        </button>
                      </>
                    ) : (
                      <button
                        className="cta-button black-pill-btn cart-checkout-btn"
                        onClick={requestCartQuote}
                      >
                        Request Quote
                      </button>
                    )}
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
              <h1 className="about-hero-title">ABOUT</h1>
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
                  <img src={typhonFactoryEngineer} alt="KONSTRUCTZ machinery assembly plant and professional engineer" className="factory-img" />
                </div>
              </div>
              <div className="who-we-are-right">
                <span className="who-kicker">KONSTRUCTZ NETWORK</span>
                <h2 className="who-title text-white">Who We Are</h2>
                <p className="who-desc">
                  We are a leading distributor of high-performance heavy machinery and compact attachments. Working closely with trusted manufacturing partners, we bring heavy-duty engineering to your local jobsite.
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
                    "We've been running our KONSTRUCTZ compact excavator for over 600 hours now without a single issue. The support team is fast, and getting attachments is simple and transparent."
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
                  <p className="email-text">Email: support@cwqv.com</p>
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
                    <p className="highlight-text">sales@cwqv.com</p>
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
                    <p className="highlight-text">support@cwqv.com</p>
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
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Product inquiry">Product inquiry</option>
                            <option value="Request a demo">Request a demo</option>
                            <option value="Get a quote">Get a quote</option>
                            <option value="Business Support">Business Support</option>
                            <option value="Financing & Leases">Financing & Leases</option>
                            <option value="Financing Application">Financing Application</option>
                            <option value="Technical Service">Technical Service</option>
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
                    {socialLinks.map(social => (
                      <a
                        key={social.label}
                        href={social.url}
                        className={`social-icon ${social.className}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                      >
                        {social.label}
                      </a>
                    ))}
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
                    <a href="mailto:sales@cwqv.com">sales@cwqv.com</a>
                  </div>
                </div>

                <div className="department-card border-card">
                  <div className="dep-icon">⚙️</div>
                  <div className="dep-info">
                    <h5>Technical support</h5>
                    <a href="mailto:support@cwqv.com">support@cwqv.com</a>
                  </div>
                </div>

                <div className="department-card border-card">
                  <div className="dep-icon">📰</div>
                  <div className="dep-info">
                    <h5>Media & press</h5>
                    <a href="mailto:media@cwqv.com">media@cwqv.com</a>
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

      <div className={`ai-assistant-widget ${aiChatOpen ? 'is-open' : ''}`}>
        {aiChatOpen && (
          <section className="ai-chat-panel" aria-label="AI Machinery Assistant">
            <div className="ai-chat-header">
              <div className="ai-chat-identity">
                <div className="ai-chat-avatar" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v3" />
                    <path d="M7 4.5 8.5 7" />
                    <path d="M17 4.5 15.5 7" />
                    <rect x="4" y="7" width="16" height="12" rx="4" />
                    <path d="M8 12h.01" />
                    <path d="M16 12h.01" />
                    <path d="M9 15h6" />
                  </svg>
                </div>
                <div>
                  <span>AI Machinery Assistant</span>
                  <small>Online - product, quote, delivery, and support help</small>
                </div>
              </div>
              <button className="ai-chat-close" onClick={() => setAiChatOpen(false)} aria-label="Close AI chat">
                ×
              </button>
            </div>

            <div className="ai-chat-body">
              {aiChatMessages.map((message) => (
                <div className={`ai-message-row ${message.sender === 'user' ? 'from-user' : 'from-ai'}`} key={message.id}>
                  {message.sender === 'ai' && (
                    <div className="ai-message-avatar" aria-hidden="true">AI</div>
                  )}
                  <div className={`ai-message ${message.variant === 'skoop-card' ? 'has-card' : ''}`}>
                    {message.variant === 'skoop-card' ? (
                      <div className="ai-reply-card">
                        <span className="ai-card-kicker">Recommended answer</span>
                        <h3>SKOOP II Wheel Loader</h3>
                        <ul>
                          <li><strong>Price:</strong> $15,499.00</li>
                          <li><strong>Shipping:</strong> Free shipping listed; confirm current terms with sales</li>
                          <li><strong>Delivery to California:</strong> Available - call to confirm schedule</li>
                          <li><strong>Support:</strong> 1-year warranty, parts, manuals, and after-sales service</li>
                        </ul>
                        <p>Would you like a detailed SKOOP II quote based on your delivery location and material-handling needs?</p>
                        <button onClick={openAiQuoteForm}>Request Detailed Quote</button>
                      </div>
                    ) : (
                      <>
                        <p>{message.content}</p>
                        {message.cta && (
                          <button
                            className="ai-message-cta"
                            onClick={message.cta === 'Contact Support' ? openAiSupportForm : openAiQuoteForm}
                          >
                            {message.cta}
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <form className="ai-chat-input-bar" onSubmit={(e) => {
              e.preventDefault();
              handleAiAssistantSubmit();
            }}>
              <input
                value={aiChatInput}
                onChange={(e) => setAiChatInput(e.target.value)}
                placeholder="Type your question here..."
                aria-label="Type your question here"
              />
              <button type="submit" aria-label="Send AI chat message">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="m22 2-7 20-4-9-9-4 20-7Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </section>
        )}

        <button className="ai-floating-button" onClick={() => setAiChatOpen(prev => !prev)} aria-expanded={aiChatOpen} aria-label="Open AI Machinery Assistant">
          <span className="ai-floating-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3v3" />
              <rect x="4" y="7" width="16" height="12" rx="4" />
              <path d="M8 12h.01" />
              <path d="M16 12h.01" />
              <path d="M9 15h6" />
            </svg>
          </span>
          <span>Click me</span>
        </button>
      </div>

      {/* FOOTER */}
      <footer className="main-footer-dark">
        <div className="footer-top">
          <div className="footer-brand-col">
            <a href="?page=home" className="logo" onClick={(e) => { e.preventDefault(); navigate('home'); }}>
              <img src={konstructzLogo} alt="KONSTRUCTZ" className="logo-img" />
            </a>
            <p className="footer-address">
              <span>2522 S Malt Ave.</span>
              <span>Commerce, CA 90040 United States</span>
            </p>
            <p className="footer-phone">
              <svg className="footer-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +1 213-214-2203
            </p>
            <p className="footer-email">
              <svg className="footer-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px', marginRight: '8px', verticalAlign: 'middle' }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              sales@cwqv.com
            </p>
          </div>
          
          <div className="footer-links-col">
            <h4>Get in touch</h4>
            {[
              'Machines',
              'Buying & pricing',
              'Delivery',
              'Warranty',
              'Service & parts',
              'Financing'
            ].map(category => (
              <a
                key={category}
                href={`?page=topic&topic-category=${encodeURIComponent(category)}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate('topic', { 'topic-category': category });
                }}
              >
                {category}
              </a>
            ))}
          </div>

          <div className="footer-links-col">
            <h4>Information</h4>
            <a href="?page=about" onClick={(e) => { e.preventDefault(); navigate('about'); }}>About</a>
            <a href="?page=home#products" onClick={(e) => { e.preventDefault(); navigate('home'); window.location.hash = '#products'; }}>Products</a>
            <a href="?page=support" onClick={(e) => { e.preventDefault(); navigate('support'); }}>Support</a>
            <a href="?page=home#faq" onClick={(e) => { e.preventDefault(); navigate('home'); window.location.hash = '#faq'; }}>FAQ</a>
          </div>

          <div className="footer-links-col">
            <h4>Connect</h4>
            <div className="social-links-grid">
              {socialLinks.map(social => (
                <a
                  key={social.label}
                  href={social.url}
                  className="social-link-item"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={`social-link-mark ${social.className}`} aria-hidden="true">
                    {social.shortLabel}
                  </span>
                  {social.label}
                </a>
              ))}
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
