import React from 'react';
import { useI18n } from '@/lib/i18n';
import { ResponsiveContainer, ResponsiveFlex, ResponsiveGrid } from './ResponsiveComponents';
import { Compass, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useI18n();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 md:pt-16 md:pb-8">
      {/* Main Footer Content */}
      <ResponsiveContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Compass className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Compass Navigator</span>
            </div>
            <p className="text-gray-400 mb-6">
              {t('footer.tagline')}
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <span className="text-gray-300">{t('footer.address')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{t('footer.phone')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">{t('footer.email')}</span>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="/features" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.features')}
                </a>
              </li>
              <li>
                <a href="/pricing" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.pricing')}
                </a>
              </li>
              <li>
                <a href="/blog" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.blog')}
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.privacy')}
                </a>
              </li>
              <li>
                <a href="/cookies" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.cookies')}
                </a>
              </li>
              <li>
                <a href="/licenses" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  {t('footer.licenses')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.newsletter')}</h3>
            <p className="text-gray-400 mb-4">
              {t('footer.newsletterDesc')}
            </p>
            <form className="space-y-3">
              <div>
                <input 
                  type="email" 
                  placeholder={t('footer.emailPlaceholder')} 
                  className="w-full px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label={t('footer.emailPlaceholder')}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
              >
                {t('footer.subscribe')}
              </button>
            </form>
          </div>
        </div>
        
        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="https://facebook.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-200" aria-label="YouTube">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
            
            <div className="text-gray-500 text-sm">
              {t('footer.copyright', { year: new Date().getFullYear() })}
            </div>
          </div>
        </div>
        
        {/* Made with love */}
        <div className="text-center text-gray-500 text-sm mt-6 flex items-center justify-center">
          <span>{t('footer.madeWith')}</span>
          <Heart className="h-4 w-4 text-red-500 mx-1" />
          <span>{t('footer.inTurkey')}</span>
        </div>
      </ResponsiveContainer>
      
      {/* Mobile Bottom Navigation Spacer */}
      <div className="h-16 md:hidden"></div>
    </footer>
  );
}
