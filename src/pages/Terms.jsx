import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';

export default function Terms() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pb-24">
      <div className="gradient-primary text-white pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => navigate(createPageUrl('Dashboard'))}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <FileText className="w-8 h-8" />
                Terms of Service
              </h1>
              <p className="text-blue-200 text-sm">Legal Agreement • Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        <Card className="bg-white rounded-2xl shadow-xl">
          <CardContent className="p-8 prose prose-sm max-w-none">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using StatusForge, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>

            <h2>2. Service Description</h2>
            <p>StatusForge is a gamified life tracking platform that allows users to:</p>
            <ul>
              <li>Track personal metrics (Wealth, Power, Fame, Charm, Gear)</li>
              <li>Complete daily quests and earn status points</li>
              <li>Compete with friends in duels</li>
              <li>Upgrade to premium features via subscription</li>
            </ul>

            <h2>3. User Accounts</h2>
            <ul>
              <li>You must be 16+ to create an account</li>
              <li>You are responsible for maintaining account security</li>
              <li>One account per person (no shared or multiple accounts)</li>
              <li>Provide accurate and up-to-date information</li>
              <li>Do not impersonate others or use offensive usernames</li>
            </ul>

            <h2>4. Acceptable Use</h2>
            <p>You agree NOT to:</p>
            <ul>
              <li>Use the service for illegal activities</li>
              <li>Harass, bully, or threaten other users</li>
              <li>Attempt to hack, reverse-engineer, or exploit the platform</li>
              <li>Submit false data or manipulate scores unfairly</li>
              <li>Spam, advertise, or promote third-party services without permission</li>
            </ul>

            <h2>5. Premium Subscriptions</h2>
            <ul>
              <li><strong>Payment:</strong> Processed securely via Stripe</li>
              <li><strong>Pricing:</strong> €9.99/month (subject to change with notice)</li>
              <li><strong>Billing:</strong> Automatic monthly renewal unless cancelled</li>
              <li><strong>Cancellation:</strong> Cancel anytime; access continues until period end</li>
              <li><strong>Refunds:</strong> No refunds for partial months (EU consumer rights apply)</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <ul>
              <li>StatusForge owns all app content, features, and design</li>
              <li>You retain ownership of data you submit (quests, profile info)</li>
              <li>By sharing content publicly, you grant us a license to display it within the app</li>
            </ul>

            <h2>7. Data & Privacy</h2>
            <p>See our <a href={createPageUrl('Privacy')} className="text-blue-600 underline">Privacy Policy</a> for details on data collection and use.</p>

            <h2>8. Service Availability</h2>
            <ul>
              <li>We strive for 99% uptime but do not guarantee uninterrupted service</li>
              <li>Maintenance windows may occur with advance notice</li>
              <li>We are not liable for data loss due to technical failures</li>
            </ul>

            <h2>9. Termination</h2>
            <p>We may suspend or terminate your account if you:</p>
            <ul>
              <li>Violate these Terms of Service</li>
              <li>Engage in fraudulent or harmful activities</li>
              <li>Request account deletion</li>
            </ul>
            <p>You may delete your account anytime via app settings.</p>

            <h2>10. Disclaimers</h2>
            <ul>
              <li>StatusForge is provided "as-is" without warranties</li>
              <li>We do not guarantee specific results or outcomes</li>
              <li>The app is for entertainment and self-improvement purposes only</li>
              <li>Not a substitute for professional financial, career, or mental health advice</li>
            </ul>

            <h2>11. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul>
              <li>We are not liable for indirect, incidental, or consequential damages</li>
              <li>Our liability is limited to the amount you paid in the last 12 months</li>
              <li>We are not responsible for third-party services (Stripe, Base44, etc.)</li>
            </ul>

            <h2>12. Governing Law</h2>
            <p>These terms are governed by EU law and the laws of [Your Country]. Disputes will be resolved in [Your Jurisdiction] courts.</p>

            <h2>13. Changes to Terms</h2>
            <p>We may update these terms with 30 days' notice. Continued use constitutes acceptance of new terms.</p>

            <h2>14. Contact</h2>
            <p>For legal inquiries: <strong>legal@statusforge.app</strong></p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}