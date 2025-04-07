import React from 'react';
import { useI18n } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ResponsiveContainer, ResponsiveFlex } from './ResponsiveComponents';
import { cn } from '@/lib/utils';
import { Menu, X, Globe, Map, Compass, Search, User } from 'lucide-react';

export default function Navbar() {
  const { t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 dark:bg-gray-900">
      <ResponsiveContainer>
        <nav className="py-4">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="flex items-center space-x-2">
                <Compass className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900 dark:text-white">Compass Navigator</span>
              </a>
              <div className="hidden lg:flex items-center space-x-6 ml-10">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                  {t('nav.home')}
                </a>
                <a href="/routes" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                  {t('nav.routes')}
                </a>
                <a href="/map" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                  {t('nav.map')}
                </a>
                <a href="/explore" className="text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                  {t('nav.explore')}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <LanguageSwitcher />
              
              <a href="/profile" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                <User className="h-5 w-5" />
                <span>{t('nav.profile')}</span>
              </a>
              
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200">
                {t('nav.getStarted')}
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <Compass className="h-7 w-7 text-blue-600" />
              <span className="text-lg font-bold text-gray-900 dark:text-white">Compass</span>
            </a>
            
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              
              <button 
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </ResponsiveContainer>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
          <ResponsiveContainer>
            <div className="py-4 space-y-4">
              <a href="/" className="block py-2 text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.home')}
              </a>
              <a href="/routes" className="block py-2 text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.routes')}
              </a>
              <a href="/map" className="block py-2 text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.map')}
              </a>
              <a href="/explore" className="block py-2 text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.explore')}
              </a>
              <a href="/profile" className="block py-2 text-gray-700 hover:text-blue-600 font-medium dark:text-gray-300 dark:hover:text-blue-400">
                {t('nav.profile')}
              </a>
              
              <div className="relative mt-4">
                <input
                  type="text"
                  placeholder={t('nav.search')}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md font-medium transition-colors duration-200 mt-4">
                {t('nav.getStarted')}
              </button>
            </div>
          </ResponsiveContainer>
        </div>
      )}
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-800 z-50">
        <ResponsiveFlex className="py-2" justify="around" items="center">
          <a href="/" className="flex flex-col items-center p-2 text-blue-600 dark:text-blue-400">
            <Globe className="h-6 w-6" />
            <span className="text-xs mt-1">{t('nav.home')}</span>
          </a>
          <a href="/routes" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <Compass className="h-6 w-6" />
            <span className="text-xs mt-1">{t('nav.routes')}</span>
          </a>
          <a href="/map" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <Map className="h-6 w-6" />
            <span className="text-xs mt-1">{t('nav.map')}</span>
          </a>
          <a href="/profile" className="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">{t('nav.profile')}</span>
          </a>
        </ResponsiveFlex>
      </div>
    </header>
  );
}
