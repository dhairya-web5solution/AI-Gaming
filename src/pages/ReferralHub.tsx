import React, { useState, useEffect } from 'react';
import { Users, Gift, Star, Trophy, Copy, Share2, TrendingUp, Award, Target } from 'lucide-react';

export default function ReferralHub() {
  const [referralCode, setReferralCode] = useState('AIGAMING-USER123');
  const [userLevel, setUserLevel] = useState(3);
  const [xpPoints, setXpPoints] = useState(2450);
  const [nextLevelXP, setNextLevelXP] = useState(3000);
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 245.50,
    thisMonthEarnings: 89.25
  });

  const levels = [
    { level: 1, name: 'Rookie', xpRequired: 0, benefits: ['5% referral bonus', 'Basic rewards'] },
    { level: 2, name: 'Player', xpRequired: 500, benefits: ['7% referral bonus', 'Weekly bonuses'] },
    { level: 3, name: 'Veteran', xpRequired: 1500, benefits: ['10% referral bonus', 'Monthly NFT drops'] },
    { level: 4, name: 'Elite', xpRequired: 3000, benefits: ['12% referral bonus', 'Exclusive tournaments'] },
    { level: 5, name: 'Legend', xpRequired: 5000, benefits: ['15% referral bonus', 'VIP support', 'Beta access'] }
  ];

  const achievements = [
    { id: 1, name: 'First Referral', description: 'Refer your first friend', completed: true, xp: 100 },
    { id: 2, name: 'Social Butterfly', description: 'Refer 5 friends', completed: true, xp: 250 },
    { id: 3, name: 'Community Builder', description: 'Refer 10 friends', completed: true, xp: 500 },
    { id: 4, name: 'Influencer', description: 'Refer 25 friends', completed: false, xp: 1000 },
    { id: 5, name: 'Ambassador', description: 'Refer 50 friends', completed: false, xp: 2000 }
  ];

  const referralHistory = [
    { name: 'Alex Chen', joinDate: '2024-01-15', status: 'active', earnings: 25.50 },
    { name: 'Sarah Johnson', joinDate: '2024-01-12', status: 'active', earnings: 32.75 },
    { name: 'Mike Rodriguez', joinDate: '2024-01-08', status: 'inactive', earnings: 18.25 },
    { name: 'Emma Wilson', joinDate: '2024-01-05', status: 'active', earnings: 41.00 },
    { name: 'David Kim', joinDate: '2024-01-02', status: 'active', earnings: 28.50 }
  ];

  const copyReferralCode = () => {
    navigator.clipboard.writeText(`https://aigaming.com/ref/${referralCode}`);
    console.log('Referral link copied to clipboard!');
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join AI Gaming',
        text: 'Join me on AI Gaming and earn real rewards playing games!',
        url: `https://aigaming.com/ref/${referralCode}`
      });
    } else {
      copyReferralCode();
    }
  };

  const currentLevel = levels.find(l => l.level === userLevel);
  const nextLevel = levels.find(l => l.level === userLevel + 1);
  const progressPercentage = nextLevel ? ((xpPoints - currentLevel!.xpRequired) / (nextLevel.xpRequired - currentLevel!.xpRequired)) * 100 : 100;

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/50 to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Referral & Loyalty Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Earn rewards by inviting friends and level up through our gamified loyalty system. 
            The more you engage, the more you earn!
          </p>
        </div>
      </section>

      {/* User Level & Progress */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{currentLevel?.name} Level {userLevel}</h2>
                    <p className="text-gray-400">{xpPoints} XP Points</p>
                  </div>
                </div>
                
                {nextLevel && (
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-400">Progress to {nextLevel.name}</span>
                      <span className="text-gray-400">{nextLevel.xpRequired - xpPoints} XP needed</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Current Benefits</h3>
                  <ul className="space-y-2">
                    {currentLevel?.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{referralStats.totalReferrals}</div>
                  <div className="text-gray-400 text-sm">Total Referrals</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{referralStats.activeReferrals}</div>
                  <div className="text-gray-400 text-sm">Active Referrals</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <Gift className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${referralStats.totalEarnings}</div>
                  <div className="text-gray-400 text-sm">Total Earnings</div>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 text-center">
                  <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">${referralStats.thisMonthEarnings}</div>
                  <div className="text-gray-400 text-sm">This Month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Section */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Invite Friends & Earn</h2>
            <p className="text-gray-400">Share your referral link and earn rewards when friends join and play</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Your Referral Link</h3>
              <div className="flex items-center space-x-3 mb-4">
                <input
                  type="text"
                  value={`https://aigaming.com/ref/${referralCode}`}
                  readOnly
                  className="flex-1 bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700"
                />
                <button
                  onClick={copyReferralCode}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy</span>
                </button>
                <button
                  onClick={shareReferral}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-lg font-bold text-green-400">$5</div>
                  <div className="text-gray-400 text-sm">Friend joins</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-lg font-bold text-blue-400">10%</div>
                  <div className="text-gray-400 text-sm">Of their earnings</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-lg font-bold text-purple-400">Bonus XP</div>
                  <div className="text-gray-400 text-sm">Level up faster</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 ${
                  achievement.completed
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700 hover:border-purple-500'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    achievement.completed ? 'bg-green-500' : 'bg-gray-700'
                  }`}>
                    {achievement.completed ? (
                      <Trophy className="w-6 h-6 text-white" />
                    ) : (
                      <Target className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <span className={`text-sm font-semibold ${
                    achievement.completed ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    +{achievement.xp} XP
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.name}</h3>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
                {achievement.completed && (
                  <div className="mt-3 text-green-400 text-sm font-semibold">✓ Completed</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Referral History */}
      <section className="py-12 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Referral History</h2>
          
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left text-gray-400 py-4 px-6">Friend</th>
                    <th className="text-left text-gray-400 py-4 px-6">Join Date</th>
                    <th className="text-left text-gray-400 py-4 px-6">Status</th>
                    <th className="text-right text-gray-400 py-4 px-6">Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {referralHistory.map((referral, index) => (
                    <tr key={index} className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="text-white font-medium">{referral.name}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-gray-400">{new Date(referral.joinDate).toLocaleDateString()}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          referral.status === 'active'
                            ? 'bg-green-400/20 text-green-400'
                            : 'bg-gray-400/20 text-gray-400'
                        }`}>
                          {referral.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className="text-green-400 font-semibold">${referral.earnings}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Level Progression */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Level Progression</h2>
          
          <div className="space-y-4">
            {levels.map(level => (
              <div
                key={level.level}
                className={`bg-gray-800 rounded-xl p-6 border transition-all duration-300 ${
                  level.level === userLevel
                    ? 'border-purple-500 bg-purple-500/10'
                    : level.level < userLevel
                    ? 'border-green-500 bg-green-500/10'
                    : 'border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      level.level === userLevel
                        ? 'bg-purple-500'
                        : level.level < userLevel
                        ? 'bg-green-500'
                        : 'bg-gray-700'
                    }`}>
                      <span className="text-white font-bold">{level.level}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{level.name}</h3>
                      <p className="text-gray-400">{level.xpRequired} XP required</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex flex-wrap gap-2">
                      {level.benefits.map((benefit, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}