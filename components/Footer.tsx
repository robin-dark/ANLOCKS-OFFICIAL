import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-3xl font-serif font-bold mb-6 tracking-tight">ANLOCKS<span className="text-orange-500">.</span></h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Reviving the lost art of traditional pickle making. Every jar tells a story of heritage, patience, and authentic flavor.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300 text-gray-400">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b-2 border-orange-600 inline-block pb-1">Shop</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-orange-500 transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Gift Hampers</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Corporate Orders</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b-2 border-orange-600 inline-block pb-1">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#about" className="hover:text-orange-500 transition-colors">Our Story</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Returns & Refunds</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-white border-b-2 border-orange-600 inline-block pb-1">Contact Us</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span>support@anlocks.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>Anlocks Foods Pvt Ltd.<br/>Jaipur, Rajasthan, India</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Anlocks. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;