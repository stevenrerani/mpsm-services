export const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { 
    name: 'Services', 
    href: '#',
    children: [
      { name: 'IT Consulting & Infrastructure', href: '/it-consulting' },
      { name: 'Water & Beverage Supply', href: '/water' },
      { name: 'Procurement (PaaS)', href: '/procurement' },
      { name: 'Energy Solutions', href: '/energy' }
    ]
  },
  { name: 'Contact', href: '/contact' }
];
