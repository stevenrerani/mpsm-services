export const contactInfo = {
  company: 'MPSM Services',
  regNo: '2016/202535/07',
  address: {
    line1: 'Unit B15 Innovation Worx',
    line2: 'Cnr 16th Road and Scale End',
    suburb: 'Halfway House Estate',
    city: 'Midrand',
    postalCode: '1685',
  },
  serviceAreas: ['Pretoria', 'Johannesburg'],
  phones: [
    { number: '076 017 5393', href: 'tel:+27760175393' },
    { number: '064 944 4905', href: 'tel:+27649444905' },
  ],
  emails: [
    { address: 'info@mpsmservices.co.za', href: 'mailto:info@mpsmservices.co.za', label: 'General Enquiries' },
    { address: 'admin@mpsmservices.co.za', href: 'mailto:admin@mpsmservices.co.za', label: 'Administration' },
    { address: 'mmakomam@mpsmservices.co.za', href: 'mailto:mmakomam@mpsmservices.co.za', label: 'Management' },
  ],
  websites: [
    { url: 'www.mpsmservices.co.za', href: 'https://www.mpsmservices.co.za', label: 'Main Website' },
    { url: 'www.mpsmwater.co.za', href: 'https://www.mpsmwater.co.za', label: 'Water Division' },
  ],
  divisionOptions: [
    { value: 'it', label: 'IT Consulting & Infrastructure' },
    { value: 'water', label: 'Water Purification & Beverage Supply' },
    { value: 'procurement', label: 'Procurement — PaaS' },
    { value: 'energy', label: 'Energy Solutions' },
    { value: 'general', label: 'General Enquiry' },
  ],
}

export default contactInfo
