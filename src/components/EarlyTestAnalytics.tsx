import React, { useState, useEffect } from 'react';
import { Users, Activity, TrendingUp, Clock, BarChart3, PieChart, Target, Award, Zap, Brain } from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  avgSessionTime: number;
  totalSessions: number;
  retentionRate: number;
  avgDailySessions: number;
  topPerformers: number;
  aiAccuracy: number;
}

interface UserBehavior {
  riskProfile: string;
  count: number;
  percentage: number;
  avgYield: number;
}

interface SessionData {
  day: string;
  sessions: number;
  users: number;
  avgTime: number;
}

export default function EarlyTestAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalUsers: 32,
    activeUsers: 28,
    avgSessionTime: 6.2,
    totalSessions: 847,
    retentionRate: 85,
    avgDailySessions: 3.4,
    topPerformers: 8,
    aiAccuracy: 94.2
  });

  const [userBehaviors] = useState<UserBehavior[]>([
    { riskProfile: 'Conservative', count: 12, percentage: 37.5, avgYield: 8.2 },
    { riskProfile: 'Moderate', count: 15, percentage: 46.9, avgYield: 12.5 },
    { riskProfile: 'Aggressive', count: 5, percentage: 15.6, avgYield: 18.7 }
  ]);

  const [sessionData] = useState<SessionData[]>([
    { day: 'Mon', sessions: 98, users: 24, avgTime: 5.8 },
    { day: 'Tue', sessions: 112, users: 26, avgTime: 6.1 },
    { day: 'Wed', sessions: 125, users: 28, avgTime: 6.4 },
    { day: 'Thu', sessions: 134, users: 29, avgTime: 6.8 },
    { day: 'Fri', sessions: 145, users: 31, avgTime: 7.2 },
    { day: 'Sat', sessions: 156, users: 28, avgTime: 6.9 },
    { day: 'Sun', sessions: 142, users: 25, avgTime: 6.5 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalyticsData(prev => ({
        ...prev,
        activeUsers: Math.min(prev.totalUsers, prev.activeUsers + Math.floor(Math.random() * 3 - 1)),
        totalSessions: prev.totalSessions + Math.floor(Math.random() * 5),
        avgSessionTime: Math.max(4, prev.avgSessionTime + (Math.random() * 0.4 - 0.2)),
        aiAccuracy: Math.min(100, Math.max(90, prev.aiAccuracy + (Math.random() * 2 - 1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskProfileColor = (profile: string) => {
    switch (profile) {
      case 'Conservative': return 'text-green-400 bg-green-400/20';
      case 'Moderate': return 'text-yellow-400 bg-yellow-400/20';
      case 'Aggressive': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  return (
    <section className="py-20 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Early Test Users Analytics</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Real-time insights from our MVP testing phase showing strong product-market fit indicators
          </p>
          <div className="inline-flex items-center space-x-2 bg-green-500/20 rounded-full px-4 py-2 mt-4">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live Data</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 text-center">
            <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{analyticsData.totalUsers}</div>
            <div className="text-gray-400 text-sm">Total Test Users</div>
            <div className="text-green-400 text-xs mt-1">+{analyticsData.activeUsers} active</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 text-center">
            <Clock className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{analyticsData.avgSessionTime.toFixed(1)}m</div>
            <div className="text-gray-400 text-sm">Avg Session Time</div>
            <div className="text-green-400 text-xs mt-1">Above industry avg</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 text-center">
            <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{analyticsData.retentionRate}%</div>
            <div className="text-gray-400 text-sm">User Retention</div>
            <div className="text-green-400 text-xs mt-1">7-day retention</div>
          </div>

          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50 text-center">
            <Brain className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-white mb-1">{analyticsData.aiAccuracy.toFixed(1)}%</div>
            <div className="text-gray-400 text-sm">AI Accuracy</div>
            <div className="text-green-400 text-xs mt-1">Behavior prediction</div>
          </div>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* User Behavior Analysis */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">AI Risk Profile Classification</h3>
              <Brain className="w-6 h-6 text-purple-400" />
            </div>
            
            <div className="space-y-4">
              {userBehaviors.map((behavior, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getRiskProfileColor(behavior.riskProfile)}`}>
                        {behavior.riskProfile}
                      </span>
                      <span className="text-gray-300">{behavior.count} users</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">{behavior.percentage}%</div>
                      <div className="text-green-400 text-sm">{behavior.avgYield}% yield</div>
                    </div>
                  </div>
                  <div className="bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${behavior.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Session Activity */}
          <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 rounded-2xl p-6 border border-gray-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Weekly Session Activity</h3>
              <BarChart3 className="w-6 h-6 text-blue-400" />
            </div>
            
            <div className="space-y-3">
              {sessionData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm w-12">{data.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.sessions / Math.max(...sessionData.map(d => d.sessions))) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-semibold text-sm">{data.sessions}</div>
                    <div className="text-gray-400 text-xs">{data.users} users</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl p-6 border border-green-500/30">
            <Award className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">High Engagement</h3>
            <p className="text-gray-300 text-sm mb-3">
              Users average 3.4 daily sessions with 6+ minute session times, indicating strong product-market fit.
            </p>
            <div className="text-green-400 text-sm font-semibold">
              +40% above industry benchmark
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl p-6 border border-purple-500/30">
            <Zap className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">AI Performance</h3>
            <p className="text-gray-300 text-sm mb-3">
              AI behavior classification achieves 94%+ accuracy in predicting optimal yield strategies for users.
            </p>
            <div className="text-purple-400 text-sm font-semibold">
              Real-time optimization active
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl p-6 border border-blue-500/30">
            <Target className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">User Retention</h3>
            <p className="text-gray-300 text-sm mb-3">
              85% 7-day retention rate with gamified rewards keeping users consistently engaged.
            </p>
            <div className="text-blue-400 text-sm font-semibold">
              Exceeding growth targets
            </div>
          </div>
        </div>

        {/* Live Metrics Footer */}
        <div className="mt-12 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl p-6 border border-gray-600/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">Live Analytics</span>
              </div>
              <div className="text-gray-400 text-sm">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-white font-semibold">{analyticsData.totalSessions}</div>
                <div className="text-gray-400">Total Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{analyticsData.avgDailySessions}</div>
                <div className="text-gray-400">Avg Daily Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-white font-semibold">{analyticsData.topPerformers}</div>
                <div className="text-gray-400">Top Performers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}