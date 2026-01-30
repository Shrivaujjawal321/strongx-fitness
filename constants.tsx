import React from 'react';
import { Service, Trainer, Transformation } from './types';

export const SERVICES: Service[] = [
  {
    id: 'gym',
    name: 'GYM',
    image: 'https://framerusercontent.com/images/QCoTSMtHpimr9lp2CmaQOtriXU.png',
    description: 'State-of-the-art equipment for all levels.'
  },
  {
    id: 'yoga',
    name: 'YOGA',
    image: 'https://framerusercontent.com/images/LqURARtPkDasnz8xNZRw6V7LVc.png',
    description: 'Find your inner balance and flexibility.'
  },
  {
    id: 'kickfit',
    name: 'KICKFIT',
    image: 'https://framerusercontent.com/images/ZiSz1ONCwWlZSSTVgpW4sZm1hI.png',
    description: 'Intense martial arts based conditioning.'
  },
  {
    id: 'group-x',
    name: 'GROUP-X',
    image: 'https://framerusercontent.com/images/H2mFADPlDeJZEZVhsqozg6Yc0.jpg',
    description: 'Dynamic group workouts led by experts.'
  },
  {
    id: 'swimming',
    name: 'SWIMMING',
    image: 'https://framerusercontent.com/images/JrDw3jtgKjcQOYfgKW5tggM5U.jpg',
    description: 'Full body low-impact training.'
  }
];

export const TRANSFORMATIONS: Transformation[] = [
  {
    id: '1',
    name: 'David',
    age: 32,
    duration: '9 weeks',
    weight: { before: '84kg', after: '75kg' },
    bodyFat: { before: '27%', after: '15%' },
    images: {
      before: 'https://framerusercontent.com/images/7iP2zPdbVOguf0rv0B7NaCIxw.jpg',
      after: 'https://framerusercontent.com/images/7iP2zPdbVOguf0rv0B7NaCIxw.jpg'
    }
  },
  {
    id: '2',
    name: 'Jimmy',
    age: 28,
    duration: '24 weeks',
    weight: { before: '80kg', after: '78kg' },
    bodyFat: { before: '25%', after: '12%' },
    images: {
      before: 'https://framerusercontent.com/images/tsaBMg9KZgULPVL6lcOo6ZXBHg.png',
      after: 'https://framerusercontent.com/images/tsaBMg9KZgULPVL6lcOo6ZXBHg.png'
    }
  },
  {
    id: '3',
    name: 'Jonathan',
    age: 25,
    duration: '36 weeks',
    weight: { before: '85kg', after: '74kg' },
    bodyFat: { before: '35%', after: '15%' },
    images: {
      before: 'https://framerusercontent.com/images/DfZVAWUharKP1TLVdrdGLWV1Y.png',
      after: 'https://framerusercontent.com/images/DfZVAWUharKP1TLVdrdGLWV1Y.png'
    }
  }
];

export const TRAINERS: Trainer[] = [
  { id: '1', name: 'Alex Johnson', role: 'Strength Specialist', image: 'https://framerusercontent.com/images/DfZVAWUharKP1TLVdrdGLWV1Y.png' },
  { id: '2', name: 'Maria Santos', role: 'Yoga Master', image: 'https://framerusercontent.com/images/w7mvBMur7SwicQrVQAWzF5enAl8.png' },
  { id: '3', name: 'James Wilson', role: 'Kickfit Coach', image: 'https://framerusercontent.com/images/NFPoBmn9tbELZrJPpQLLq5YefY.png' },
  { id: '4', name: 'Sophie Lee', role: 'Swimming Coach', image: 'https://framerusercontent.com/images/EL4yThdzsxP7vQqRvu9qxol0bjA.png' },
  { id: '5', name: 'Marcus Brown', role: 'Group-X Lead', image: 'https://framerusercontent.com/images/AdkEtTpyfJGpDu86xwjZ1qUEFs.png' }
];

// Service page data
export const SERVICE_PAGE_DATA = {
  gym: {
    title: 'Gym',
    subtitle: 'What is the Gym?',
    heroDescription: 'Experience the ultimate workout environment with state-of-the-art equipment, expert guidance, and a motivating atmosphere designed to help you achieve your fitness goals.',
    heroImage: 'https://framerusercontent.com/images/QCoTSMtHpimr9lp2CmaQOtriXU.png',
    features: [
      {
        title: 'Premium Equipment',
        description: 'Access to the latest fitness machines from top brands like Technogym, Life Fitness, and Hammer Strength.'
      },
      {
        title: 'Personal Training',
        description: 'Work with certified trainers who create customized programs tailored to your specific goals.'
      },
      {
        title: 'Free Weights Zone',
        description: 'Comprehensive free weights area with dumbbells up to 50kg, barbells, and Olympic platforms.'
      },
      {
        title: 'Cardio Theater',
        description: 'State-of-the-art cardio equipment with personal entertainment screens and heart rate monitoring.'
      }
    ],
    featuresSectionTitle: 'We Provide the Best Gym Services for You',
    featuresSectionSubtitle: 'Our Facilities',
    featuresImage: 'https://framerusercontent.com/images/HMTwzPqouk51Ut8on7XFa2caXg.jpg',
    benefitsTitle: 'Enhance Fitness, Unleash Energy',
    benefitsSubtitle: 'Benefits'
  },
  yoga: {
    title: 'Yoga',
    subtitle: 'What is Yoga?',
    heroDescription: 'Discover inner peace and physical balance through our comprehensive yoga programs led by certified instructors in serene, purpose-built studios.',
    heroImage: 'https://framerusercontent.com/images/LqURARtPkDasnz8xNZRw6V7LVc.png',
    features: [
      {
        title: 'Multiple Styles',
        description: 'From gentle Hatha to dynamic Vinyasa, power yoga to restorative sessions - find your perfect practice.'
      },
      {
        title: 'Expert Instructors',
        description: 'Learn from internationally certified yoga teachers with years of dedicated practice and teaching experience.'
      },
      {
        title: 'Peaceful Studios',
        description: 'Purpose-built studios with natural lighting, heated floors, and premium yoga equipment provided.'
      },
      {
        title: 'Mind-Body Wellness',
        description: 'Integrate breathing techniques, meditation, and mindfulness into your practice for complete wellness.'
      }
    ],
    featuresSectionTitle: 'We Provide the Best Yoga Services for You',
    featuresSectionSubtitle: 'Yoga Classes',
    featuresImage: 'https://framerusercontent.com/images/LqURARtPkDasnz8xNZRw6V7LVc.png',
    benefitsTitle: 'Unleash Your Inner Power',
    benefitsSubtitle: 'Benefits'
  },
  kickfit: {
    title: 'Kickfit',
    subtitle: 'What is Kickfit?',
    heroDescription: 'Combine martial arts techniques with high-intensity training for a full-body workout that builds strength, agility, and confidence.',
    heroImage: 'https://framerusercontent.com/images/ZiSz1ONCwWlZSSTVgpW4sZm1hI.png',
    features: [
      {
        title: 'Combat Techniques',
        description: 'Learn authentic boxing, kickboxing, and MMA techniques from experienced martial arts instructors.'
      },
      {
        title: 'High-Intensity Training',
        description: 'Burn up to 800 calories per session with our heart-pumping, full-body workout routines.'
      },
      {
        title: 'Stress Relief',
        description: 'Channel your energy into powerful combinations while releasing tension and building mental focus.'
      },
      {
        title: 'Self-Defense Skills',
        description: 'Develop practical self-defense abilities while improving your overall fitness and coordination.'
      }
    ],
    featuresSectionTitle: 'We Provide the Best Kickfit Service for You',
    featuresSectionSubtitle: 'Training Programs',
    featuresImage: 'https://framerusercontent.com/images/ZiSz1ONCwWlZSSTVgpW4sZm1hI.png',
    benefitsTitle: 'Discover Your Hidden Strength',
    benefitsSubtitle: 'Benefits'
  },
  'group-x': {
    title: 'Group-X',
    subtitle: 'What is Group-X?',
    heroDescription: 'Experience the energy of group fitness with our diverse range of classes designed to motivate, challenge, and transform.',
    heroImage: 'https://framerusercontent.com/images/H2mFADPlDeJZEZVhsqozg6Yc0.jpg',
    features: [
      {
        title: 'Variety of Classes',
        description: 'From spinning to dance fitness, HIIT to body pump - over 50 classes weekly to match every interest.'
      },
      {
        title: 'Community Atmosphere',
        description: 'Work out alongside like-minded individuals in a supportive, high-energy environment.'
      },
      {
        title: 'Certified Instructors',
        description: 'All classes led by certified group fitness instructors who keep you motivated and safe.'
      },
      {
        title: 'Music-Driven Workouts',
        description: 'Premium sound systems and curated playlists make every class an immersive fitness experience.'
      }
    ],
    featuresSectionTitle: 'We Provide the Best Group-X Services for You',
    featuresSectionSubtitle: 'Group Classes',
    featuresImage: 'https://framerusercontent.com/images/H2mFADPlDeJZEZVhsqozg6Yc0.jpg',
    benefitsTitle: 'Get in Shape, Have a Blast',
    benefitsSubtitle: 'Benefits'
  },
  swimming: {
    title: 'Swimming',
    subtitle: 'Beat the Weather, Love Swimming All Year',
    heroDescription: 'Dive into fitness with our Olympic-standard pool facilities, professional coaching, and year-round swimming programs for all skill levels.',
    heroImage: 'https://framerusercontent.com/images/JrDw3jtgKjcQOYfgKW5tggM5U.jpg',
    features: [
      {
        title: 'Olympic Pool',
        description: '50-meter heated pool maintained at perfect temperature with crystal-clear water quality.'
      },
      {
        title: 'Swim Coaching',
        description: 'From beginners to competitive swimmers, our coaches help you perfect your technique.'
      },
      {
        title: 'Aqua Fitness',
        description: 'Low-impact water aerobics classes perfect for rehabilitation and joint-friendly exercise.'
      },
      {
        title: 'Lap Swimming',
        description: 'Dedicated lap lanes available throughout the day for uninterrupted swimming sessions.'
      }
    ],
    featuresSectionTitle: 'We Provide the Best Swimming Service for You',
    featuresSectionSubtitle: 'Swimming Classes',
    featuresImage: 'https://framerusercontent.com/images/LCCMMGLq0ltGKumFa9u0MHb5o.jpg',
    benefitsTitle: 'Dive Into a Healthier Life',
    benefitsSubtitle: 'Benefits'
  }
};

// Blog posts data
export const BLOG_POSTS = [
  {
    id: '1',
    title: 'The Best Post-Workout Recovery Routines',
    category: 'Fitness Tips',
    excerpt: 'Learn how top athletes manage their recovery to maintain peak performance and prevent injuries.',
    image: 'https://framerusercontent.com/images/HMTwzPqouk51Ut8on7XFa2caXg.jpg',
    date: '2026-01-25',
    author: 'Alex Johnson'
  },
  {
    id: '2',
    title: '5 Yoga Poses for Better Sleep',
    category: 'Yoga & Wellness',
    excerpt: 'Discover the restorative yoga poses that can help you unwind and get better quality sleep.',
    image: 'https://framerusercontent.com/images/LqURARtPkDasnz8xNZRw6V7LVc.png',
    date: '2026-01-22',
    author: 'Maria Santos'
  },
  {
    id: '3',
    title: 'Nutrition Guide: Pre-Workout Meals',
    category: 'Nutrition',
    excerpt: 'What you eat before training matters. Here\'s the science behind optimal pre-workout nutrition.',
    image: 'https://framerusercontent.com/images/QCoTSMtHpimr9lp2CmaQOtriXU.png',
    date: '2026-01-20',
    author: 'Dr. Sarah Chen'
  },
  {
    id: '4',
    title: 'Building Muscle After 40',
    category: 'Strength Training',
    excerpt: 'Age is just a number. Learn the strategies for effective muscle building at any age.',
    image: 'https://framerusercontent.com/images/DfZVAWUharKP1TLVdrdGLWV1Y.png',
    date: '2026-01-18',
    author: 'Alex Johnson'
  },
  {
    id: '5',
    title: 'Swimming Techniques for Beginners',
    category: 'Swimming',
    excerpt: 'Master the basics of swimming with these fundamental techniques and tips from our coaches.',
    image: 'https://framerusercontent.com/images/JrDw3jtgKjcQOYfgKW5tggM5U.jpg',
    date: '2026-01-15',
    author: 'Sophie Lee'
  },
  {
    id: '6',
    title: 'HIIT vs Steady-State Cardio',
    category: 'Cardio',
    excerpt: 'Which cardio method is best for your goals? We break down the science behind both approaches.',
    image: 'https://framerusercontent.com/images/H2mFADPlDeJZEZVhsqozg6Yc0.jpg',
    date: '2026-01-12',
    author: 'Marcus Brown'
  }
];
