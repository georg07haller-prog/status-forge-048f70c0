import { createClientFromRequest } from 'npm:@base44/sdk@0.8.4';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { userId, username, isPremium } = await req.json();

    const emailBody = isPremium ? `
      <h1>🏆 Welcome to StatusForge Premium!</h1>
      <p>Hey <strong>${username}</strong>,</p>
      <p>Your empire just leveled up! 🚀 Thank you for joining StatusForge Premium.</p>
      
      <h2>Your Premium Benefits:</h2>
      <ul>
        <li>✅ 2x Point Multiplier on ALL quests</li>
        <li>✅ Exclusive premium-only missions</li>
        <li>✅ Advanced analytics & insights</li>
        <li>✅ Priority support & beta features</li>
        <li>✅ Custom avatar badges</li>
      </ul>

      <h2>Quick Start Guide:</h2>
      <ol>
        <li><strong>Complete Your First Quest:</strong> Head to the Quests tab and turn a daily task into points!</li>
        <li><strong>Challenge a Friend:</strong> Go to Duels and show your dominance in a 1v1 battle.</li>
        <li><strong>Track Your Metrics:</strong> Check your Dashboard to see your Wealth, Power, Fame, Charm, and Gear scores.</li>
        <li><strong>Build Your Streak:</strong> Log in daily to maintain your multipliers and rise through the ranks!</li>
      </ol>

      <p>🎯 <strong>Pro Tip:</strong> Balance all 5 metrics to avoid the "Lone Wolf" penalty. If any stat drops below 20, you lose 10% of your total score!</p>

      <p>Need help? Check out the <a href="${req.headers.get('origin') || 'https://statusforge.app'}/Guide">Guide</a> or reply to this email.</p>

      <p>Let's build your empire! ⚔️<br>
      The StatusForge Team</p>
    ` : `
      <h1>🎯 Welcome to StatusForge!</h1>
      <p>Hey <strong>${username}</strong>,</p>
      <p>Welcome to your status-building journey! 🚀 We're excited to have you.</p>

      <h2>Getting Started:</h2>
      <ol>
        <li><strong>Complete Your First Quest:</strong> Head to the Quests tab and turn a daily task into points!</li>
        <li><strong>Track Your Metrics:</strong> Monitor Wealth, Power, Fame, Charm, and Gear on your Dashboard.</li>
        <li><strong>Challenge Friends:</strong> When ready, go to Duels and compete in 1v1 battles!</li>
        <li><strong>Level Up:</strong> Rise from Startup Serf to Elite Overlord by earning status points.</li>
      </ol>

      <h2>🎁 Want 2x Faster Progress?</h2>
      <p>Upgrade to <strong>Premium</strong> for €9.99/month and unlock:</p>
      <ul>
        <li>✅ 2x point multiplier on all quests</li>
        <li>✅ Exclusive premium missions</li>
        <li>✅ Advanced analytics</li>
        <li>✅ Priority support</li>
      </ul>
      <p><a href="${req.headers.get('origin') || 'https://statusforge.app'}/Premium">Upgrade to Premium →</a></p>

      <p>🎯 <strong>Pro Tip:</strong> Balance all 5 metrics! If any stat drops below 20, you'll lose 10% of your total score.</p>

      <p>Need help? Check out the <a href="${req.headers.get('origin') || 'https://statusforge.app'}/Guide">Guide</a> or reply to this email.</p>

      <p>Let's forge your status! ⚔️<br>
      The StatusForge Team</p>
    `;

    await base44.integrations.Core.SendEmail({
      to: user.email,
      subject: isPremium ? '🏆 Welcome to StatusForge Premium!' : '🎯 Welcome to StatusForge!',
      body: emailBody
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});