export type Testimonial = {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  platform: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Mitchell",
    role: "Founder",
    company: "Growlytics",
    content:
      "Delivered our SaaS dashboard in record time without cutting corners on quality. The architecture is clean, the code is maintainable, and they were communicative throughout. Exactly what a fast-moving startup needs.",
    rating: 5,
    platform: "Upwork",
  },
  {
    name: "James Okonkwo",
    role: "CTO",
    company: "Shopline Africa",
    content:
      "We had a complex e-commerce requirement with custom business logic that Shopify couldn't handle. They designed and built the entire platform in 6 weeks. The quality was outstanding — exceeded our expectations.",
    rating: 5,
    platform: "Direct",
  },
  {
    name: "Priya Sharma",
    role: "Product Manager",
    company: "EduBridge",
    content:
      "They took our LMS from concept to launch in just 8 weeks. The course builder, payment integration, and video platform all worked flawlessly on day one. Our students love it. Highly recommend.",
    rating: 5,
    platform: "Fiverr",
  },
  {
    name: "Marcus Chen",
    role: "CEO",
    company: "FleetRoute",
    content:
      "The logistics tracking app transformed our operations. Real-time location updates, proof of delivery, route optimization — everything we asked for, and more. The team truly understood our business problem.",
    rating: 5,
    platform: "Upwork",
  },
  {
    name: "Emma Larsson",
    role: "Head of Marketing",
    company: "Brandspace Agency",
    content:
      "The AI content platform they built for us is now one of our core revenue streams. The streaming AI responses, brand voice system, and team collaboration features are exactly what we needed. Exceptional work.",
    rating: 5,
    platform: "Direct",
  },
  {
    name: "David Osei",
    role: "Operations Director",
    company: "TasteLink Restaurants",
    content:
      "We replaced a decade-old POS system with their restaurant management platform. Deployment across 4 locations was smooth, staff adapted quickly, and order errors have essentially dropped to zero. Game-changing.",
    rating: 5,
    platform: "Fiverr",
  },
];
