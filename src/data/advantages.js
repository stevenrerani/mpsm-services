import { Zap, Activity, PiggyBank, RefreshCw } from 'lucide-react';

export const advantages = [
  {
    id: 'agile',
    title: 'Agile Delivery',
    description: 'We adapt rapidly to your operational changes, ensuring our solutions always align with your current realities without bureaucratic delays.',
    icon: Zap
  },
  {
    id: 'process',
    title: 'Process Optimization',
    description: 'Our interventions are designed to streamline workflows, eliminate redundancies, and accelerate your core business functions.',
    icon: Activity
  },
  {
    id: 'cost',
    title: 'Cost Efficiency',
    description: 'By leveraging strategic partnerships and economies of scale, we deliver premium solutions that actively reduce your total cost of ownership.',
    icon: PiggyBank
  },
  {
    id: 'continuous',
    title: 'Continuous Improvement',
    description: 'We don\'t just deploy and depart. We continuously monitor, measure, and refine our solutions to compound value over time.',
    icon: RefreshCw
  }
];

export const stats = [
  { label: 'BBBEE', value: '1', prefix: 'Level ' },
  { label: 'Divisions', value: '4' },
  { label: 'Black Women Owned', value: '100', suffix: '%' },
  { label: 'Established', value: '2016' }
];
