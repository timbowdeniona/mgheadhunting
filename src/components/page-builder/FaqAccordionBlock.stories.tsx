import type { Meta, StoryObj } from '@storybook/react';
import { FaqAccordionBlock } from './FaqAccordionBlock';

const meta: Meta<typeof FaqAccordionBlock> = {
  title: 'Page Builder Blocks/FaqAccordionBlock',
  component: FaqAccordionBlock,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FaqAccordionBlock>;

export const Default: Story = {
  args: {
    data: {
      type: 'faqAccordion',
      sectionLabel: 'ENGAGEMENT FAQS',
      title: 'Frequently Asked Questions About Our Retained Process',
      description: 'Clear answers on confidentiality, fee structures, candidate assessment, and replacement warranties.',
      items: [
        {
          category: 'Engagement & Terms',
          question: 'How does your retained search methodology differ from contingent recruitment?',
          answer: 'Contingent agencies rely on inbound CV databases and non-exclusive outreach. We conduct exhaustive headhunting campaigns, approaching passive top-performers who are not actively in the job market, backed by rigorous psychometric evaluation and a 12-month replacement warranty.',
        },
        {
          category: 'Confidentiality',
          question: 'How do you handle sensitive or replacement mandates without market disruption?',
          answer: 'All executive searches are managed under strict Non-Disclosure Agreements (NDAs). Target candidates are approached discreetly using blind briefs until mutual interest and confidentiality parameters are signed.',
        },
        {
          category: 'Timelines',
          question: 'What is the standard timeline from mandate kickoff to shortlist delivery?',
          answer: 'Our milestone-driven framework presents a fully vetted shortlist of 3–5 benchmarked candidates within 4 to 6 weeks from mandate inception.',
        },
      ],
    },
  },
};
