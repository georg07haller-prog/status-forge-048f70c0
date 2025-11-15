import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is StatusForge?',
      answer: 'StatusForge is a gamified life tracking app that transforms your daily activities into quests and challenges. Track 5 key metrics (Wealth, Power, Fame, Charm, Gear), complete missions, and compete with friends to build your status empire.'
    },
    {
      question: 'How does the scoring system work?',
      answer: 'Your total status score is calculated from 5 weighted metrics: Wealth (30%), Fame (25%), Power (20%), Charm (15%), and Gear (10%). Each quest you complete adds points to specific categories, boosting your overall score and avatar level.'
    },
    {
      question: 'What are duels and how do they work?',
      answer: 'Duels are 1v1 competitions where you challenge friends in specific categories (e.g., Wealth, Power). The winner steals 10% of the opponent\'s score in that category. It\'s high-risk, high-reward competition!'
    },
    {
      question: 'What happens if I skip quests or lose my streak?',
      answer: 'Missing daily quests breaks your streak, which reduces multipliers on future rewards. Maintaining a streak gives you bonus points! If any stat drops below 20, you\'ll lose 10% of your total score as a "Lone Wolf" penalty.'
    },
    {
      question: 'What do I get with Premium?',
      answer: 'Premium members get 2x point multipliers on all quests, access to exclusive missions, advanced analytics, priority support, custom avatar badges, and early access to new features. It costs €9.99/month and can be cancelled anytime.'
    },
    {
      question: 'How do I cancel my Premium subscription?',
      answer: 'Go to your Profile, tap the Premium badge, and select "Manage Subscription." You can cancel anytime and will retain Premium access until the end of your billing period.'
    },
    {
      question: 'Is my data secure and GDPR compliant?',
      answer: 'Yes! All data is encrypted, hosted securely, and fully GDPR compliant. You have the right to access, export, or delete your data anytime. We never sell your information. See our Privacy Policy for details.'
    },
    {
      question: 'Can I use StatusForge on multiple devices?',
      answer: 'Yes! Your account syncs across all devices. Just log in with your email and your progress, quests, and scores will be waiting for you.'
    },
    {
      question: 'How do levels and avatar progression work?',
      answer: 'You start as a "Startup Serf" (Level 1) and progress through 5 levels: Rising Merchant (500+ pts), Noble Influencer (1000+), Royal Magnate (1500+), and Elite Overlord (2000+). Each level unlocks new avatar designs.'
    },
    {
      question: 'What if I have a question not listed here?',
      answer: 'Contact us at support@statusforge.app or use the in-app feedback feature. Premium members get priority support with faster response times!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      <div className="gradient-primary text-white pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate(createPageUrl('Landing'))}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <HelpCircle className="w-8 h-8" />
                Frequently Asked Questions
              </h1>
              <p className="text-blue-200 text-sm">Everything you need to know about StatusForge</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        <Card className="bg-white rounded-2xl shadow-xl mb-6">
          <CardContent className="p-8">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-start justify-between gap-4 text-left hover:opacity-70 transition-opacity"
                  >
                    <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 mt-3 leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Contact Card */}
        <Card className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-2xl shadow-xl">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">Still Have Questions?</h2>
            <p className="text-blue-100 mb-6">We're here to help! Reach out anytime.</p>
            <Button 
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.location.href = 'mailto:support@statusforge.app'}
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}