import React, { useState, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer } from './ResponsiveComponents';
import { Brain, MessageCircle, Sparkles, Bot, RefreshCw, Settings, Code, Database } from 'lucide-react';

interface AIIntegrationProps {
  className?: string;
}

export function AIIntegrationComponent({ className = '' }: AIIntegrationProps) {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState('assistant');
  const [loading, setLoading] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [conversation, setConversation] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    {role: 'assistant', content: t('ai.welcomeMessage')}
  ]);
  const [learningStatus, setLearningStatus] = useState<{
    userInteractions: number;
    modelVersion: string;
    lastUpdated: string;
    learningProgress: number;
  }>({
    userInteractions: 15243,
    modelVersion: '2.4.1',
    lastUpdated: new Date().toISOString(),
    learningProgress: 78
  });
  
  // Simulate AI response
  const handleSendMessage = () => {
    if (!userQuery.trim()) return;
    
    // Add user message to conversation
    setConversation(prev => [...prev, {role: 'user', content: userQuery}]);
    setLoading(true);
    
    // Simulate AI thinking
    setTimeout(() => {
      // Generate response based on query
      let response = '';
      
      if (userQuery.toLowerCase().includes('restaurant') || userQuery.toLowerCase().includes('food') || userQuery.toLowerCase().includes('eat')) {
        response = t('ai.foodRecommendation');
      } else if (userQuery.toLowerCase().includes('hotel') || userQuery.toLowerCase().includes('stay') || userQuery.toLowerCase().includes('accommodation')) {
        response = t('ai.hotelRecommendation');
      } else if (userQuery.toLowerCase().includes('weather') || userQuery.toLowerCase().includes('rain') || userQuery.toLowerCase().includes('temperature')) {
        response = t('ai.weatherInfo');
      } else if (userQuery.toLowerCase().includes('route') || userQuery.toLowerCase().includes('path') || userQuery.toLowerCase().includes('way')) {
        response = t('ai.routeOptimization');
      } else {
        response = t('ai.generalResponse');
      }
      
      // Add AI response to conversation
      setConversation(prev => [...prev, {role: 'assistant', content: response}]);
      setLoading(false);
      setUserQuery('');
      
      // Update learning status
      setLearningStatus(prev => ({
        ...prev,
        userInteractions: prev.userInteractions + 1,
        learningProgress: Math.min(100, prev.learningProgress + 0.5),
        lastUpdated: new Date().toISOString()
      }));
    }, 1500);
  };
  
  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="border-b border-gray-200">
        <div className="flex overflow-x-auto">
          <button 
            onClick={() => setActiveTab('assistant')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'assistant' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageCircle className="h-4 w-4 inline mr-1" />
            {t('ai.assistantTab')}
          </button>
          <button 
            onClick={() => setActiveTab('learning')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'learning' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Brain className="h-4 w-4 inline mr-1" />
            {t('ai.learningTab')}
          </button>
          <button 
            onClick={() => setActiveTab('integration')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'integration' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Code className="h-4 w-4 inline mr-1" />
            {t('ai.integrationTab')}
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'settings' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="h-4 w-4 inline mr-1" />
            {t('ai.settingsTab')}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        {/* Assistant Tab */}
        {activeTab === 'assistant' && (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Bot className="h-5 w-5 mr-2 text-blue-500" />
                {t('ai.assistantTitle')}
              </h3>
              <p className="text-gray-600">{t('ai.assistantDescription')}</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg mb-4">
              <div className="h-80 overflow-y-auto p-4">
                {conversation.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-4 ${
                      message.role === 'user' 
                        ? 'text-right' 
                        : 'text-left'
                    }`}
                  >
                    <div 
                      className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="text-left mb-4">
                    <div className="inline-block max-w-[80%] rounded-lg px-4 py-2 bg-gray-100">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <div className="flex">
                  <textarea
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={t('ai.messagePlaceholder')}
                    className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={2}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!userQuery.trim() || loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              {t('ai.privacyNotice')}
            </div>
          </div>
        )}
        
        {/* Learning Tab */}
        {activeTab === 'learning' && (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-500" />
                {t('ai.learningTitle')}
              </h3>
              <p className="text-gray-600">{t('ai.learningDescription')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <RefreshCw className="h-4 w-4 mr-2 text-green-500" />
                  {t('ai.learningProgress')}
                </h4>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{t('ai.modelLearning')}</span>
                    <span className="text-sm font-medium text-gray-900">{learningStatus.learningProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${learningStatus.learningProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between mb-2">
                    <span>{t('ai.userInteractions')}:</span>
                    <span className="font-medium text-gray-900">{learningStatus.userInteractions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>{t('ai.modelVersion')}:</span>
                    <span className="font-medium text-gray-900">{learningStatus.modelVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('ai.lastUpdated')}:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(learningStatus.lastUpdated).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Database className="h-4 w-4 mr-2 text-blue-500" />
                  {t('ai.dataCollection')}
                </h4>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-900 font-medium">{t('ai.anonymizedData')}</p>
                      <p className="text-gray-600">{t('ai.anonymizedDataDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-900 font-medium">{t('ai.federatedLearning')}</p>
                      <p className="text-gray-600">{t('ai.federatedLearningDesc')}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      </div>
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-900 font-medium">{t('ai.privacyFocused')}</p>
                      <p className="text-gray-600">{t('ai.privacyFocusedDesc')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{t('ai.recentImprovements')}</h4>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-green-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">{t('ai.improvement1Title')}</p>
                    <p className="text-gray-600 text-sm">{t('ai.improvement1Desc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">{t('ai.improvement2Title')}</p>
                    <p className="text-gray-600 text-sm">{t('ai.improvement2Desc')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <Brain className="h-4 w-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-900 font-medium">{t('ai.improvement3Title')}</p>
                    <p className="text-gray-600 text-sm">{t('ai.improvement3Desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Integration Tab */}
        {activeTab === 'integration' && (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Code className="h-5 w-5 mr-2 text-indigo-500" />
                {t('ai.integrationTitle')}
              </h3>
              <p className="text-gray-600">{t('ai.integrationDescription')}</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">{t('ai.apiIntegration')}</h4>
              
              <div className="bg-gray-800 text-gray-200 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
                <pre>{`// Example API call to integrate AI assistant
fetch('https://api.compass-navigator.com/ai/assistant', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: "Find me the best restaurants near Hagia Sophia",
    user_id: "user_123",
    preferences: {
      cuisine: ["Turkish", "Mediterranean"],
      price_range: "moderate"
    },
    location: {
      latitude: 41.0086,
      longitude: 28.9802
    }
  })
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`}</pre>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  {t('ai.copyCode')}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{t('ai.webhooks')}</h4>
                <p className="text-gray-600 text-sm mb-4">{t('ai.webhooksDescription')}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{t('ai.webhookStatus')}</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {t('ai.active')}
                  </span>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">{t('ai.sdkIntegration')}</h4>
                <p className="text-gray-600 text-sm mb-4">{t('ai.sdkDescription')}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{t('ai.sdkVersion')}</span>
                  <span className="text-sm font-medium text-gray-900">v1.2.0</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">{t('ai.customization')}</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('ai.modelBehavior')}
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="helpful">{t('ai.helpful')}</option>
                    <option value="creative">{t('ai.creative')}</option>
                    <option value="precise">{t('ai.precise')}</option>
                    <option value="balanced">{t('ai.balanced')}</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('ai.responseFormat')}
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        id="format-json"
                        name="format"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        defaultChecked
                      />
                      <label htmlFor="format-json" className="ml-3 block text-sm font-medium text-gray-700">
                        JSON
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="format-text"
                        name="format"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label htmlFor="format-text" className="ml-3 block text-sm font-medium text-gray-700">
                        {t('ai.plainText')}
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="format-markdown"
                        name="format"
                        type="radio"
                        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                      />
                      <label htmlFor="format-markdown" className="ml-3 block text-sm font-medium text-gray-700">
                        Markdown
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                <Settings className="h-5 w-5 mr-2 text-gray-500" />
                {t('ai.settingsTitle')}
              </h3>
              <p className="text-gray-600">{t('ai.settingsDescription')}</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">{t('ai.privacySettings')}</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{t('ai.dataCollection')}</h5>
                      <p className="text-xs text-gray-500">{t('ai.dataCollectionDesc')}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">{t('ai.useSettingLabel')}</span>
                        <span
                          aria-hidden="true"
                          className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{t('ai.personalizedLearning')}</h5>
                      <p className="text-xs text-gray-500">{t('ai.personalizedLearningDesc')}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <button
                        type="button"
                        className="bg-indigo-600 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="sr-only">{t('ai.useSettingLabel')}</span>
                        <span
                          aria-hidden="true"
                          className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        ></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">{t('ai.historyRetention')}</h5>
                      <p className="text-xs text-gray-500">{t('ai.historyRetentionDesc')}</p>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                        <option>30 {t('ai.days')}</option>
                        <option>90 {t('ai.days')}</option>
                        <option>180 {t('ai.days')}</option>
                        <option>{t('ai.forever')}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">{t('ai.aiSettings')}</h4>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('ai.responseLength')}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="3"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{t('ai.concise')}</span>
                      <span>{t('ai.detailed')}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('ai.creativity')}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      defaultValue="4"
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{t('ai.precise')}</span>
                      <span>{t('ai.creative')}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t('ai.language')}
                    </label>
                    <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                      <option value="auto">{t('ai.autoDetect')}</option>
                      <option value="en">English</option>
                      <option value="tr">Türkçe</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="it">Italiano</option>
                      <option value="ja">日本語</option>
                      <option value="ko">한국어</option>
                      <option value="zh">中文</option>
                      <option value="ar">العربية</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                  {t('ai.saveSettings')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
