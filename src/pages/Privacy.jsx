import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';

export default function Privacy() {
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
                <Shield className="w-8 h-8" />
                Privacy Policy
              </h1>
              <p className="text-blue-200 text-sm">GDPR Compliant • Last updated: January 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-4">
        <Card className="bg-white rounded-2xl shadow-xl">
          <CardContent className="p-8 prose prose-sm max-w-none">
            <h2>1. Data We Collect</h2>
            <p>StatusForge collects and processes the following personal data:</p>
            <ul>
              <li><strong>Account Information:</strong> Email, username, authentication tokens</li>
              <li><strong>Profile Data:</strong> Status scores, quest completion, duel results, streak data</li>
              <li><strong>Usage Data:</strong> Login times, feature interactions, app navigation patterns</li>
              <li><strong>Payment Data:</strong> Processed securely via Stripe (we do not store card details)</li>
            </ul>

            <h2>2. How We Use Your Data</h2>
            <p>Your data is used exclusively to:</p>
            <ul>
              <li>Provide and improve StatusForge services</li>
              <li>Calculate and display your status scores and progress</li>
              <li>Process premium subscriptions and payments</li>
              <li>Send essential service notifications (quest reminders, duel results)</li>
              <li>Analyze app performance and user experience</li>
            </ul>

            <h2>3. Data Storage & Security</h2>
            <p>We implement industry-standard security measures:</p>
            <ul>
              <li>All data encrypted at rest and in transit (TLS/SSL)</li>
              <li>Hosted on secure Base44 infrastructure with regular security audits</li>
              <li>Access restricted to authorized personnel only</li>
              <li>Regular backups and disaster recovery protocols</li>
            </ul>

            <h2>4. Your Rights (GDPR)</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your account and data</li>
              <li><strong>Portability:</strong> Export your data in machine-readable format</li>
              <li><strong>Objection:</strong> Opt-out of certain data processing activities</li>
            </ul>
            <p>To exercise these rights, contact us at: <strong>privacy@statusforge.app</strong></p>

            <h2>5. Data Sharing</h2>
            <p>We do NOT sell your data. Limited sharing occurs with:</p>
            <ul>
              <li><strong>Stripe:</strong> For payment processing (see Stripe Privacy Policy)</li>
              <li><strong>Base44 Platform:</strong> Infrastructure provider with strict data agreements</li>
              <li><strong>Analytics Tools:</strong> Anonymized usage data only (no personal identifiers)</li>
            </ul>

            <h2>6. Cookies & Tracking</h2>
            <p>We use essential cookies for:</p>
            <ul>
              <li>Authentication and session management</li>
              <li>Remembering user preferences</li>
              <li>Analytics (anonymized, opt-out available)</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>Personal data is retained while your account is active. Upon account deletion:</p>
            <ul>
              <li>Profile and quest data: deleted within 30 days</li>
              <li>Payment records: retained for 7 years (legal requirement)</li>
              <li>Anonymized analytics: retained indefinitely</li>
            </ul>

            <h2>8. Children's Privacy</h2>
            <p>StatusForge is intended for users 16+. We do not knowingly collect data from children under 16.</p>

            <h2>9. International Transfers</h2>
            <p>Data may be processed in the EU and other jurisdictions with adequate data protection standards.</p>

            <h2>10. Policy Changes</h2>
            <p>We will notify you of significant privacy policy changes via email or in-app notification.</p>

            <h2>11. Contact Us</h2>
            <p>For privacy concerns or data requests:</p>
            <ul>
              <li>Email: <strong>privacy@statusforge.app</strong></li>
              <li>Data Protection Officer: <strong>dpo@statusforge.app</strong></li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}