import React from 'react';
import { ArrowRight, Sparkles, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onOpenRecipe: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenRecipe }) => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1606914501449-5a9664563537?q=80&w=2000&auto=format&fit=crop"
          alt="Traditional Indian Spices and Food"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-orange-400 border border-orange-400/30 bg-orange-900/20 rounded-full uppercase backdrop-blur-sm">
              Authentic Homemade Taste
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight mb-6">
              Bring the Flavor of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
                Tradition Home
              </span>
            </h1>
            <p className="text-lg text-gray-200 mb-8 leading-relaxed max-w-lg">
              Handcrafted pickles and chutneys made from generations-old family recipes. 
              No preservatives, just pure love and authentic Indian spices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
              >
                Shop Collection <ArrowRight className="w-5 h-5" />
              </button>
              
              <button 
                onClick={onOpenRecipe}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 rounded-full font-bold transition-all flex items-center justify-center gap-2 group"
              >
                <ChefHat className="w-5 h-5 group-hover:text-orange-300 transition-colors" />
                <span>AI Recipe Finder</span>
                <Sparkles className="w-4 h-4 text-orange-400 animate-pulse" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-12 flex gap-8 border-t border-white/10 pt-8"
          >
            <div>
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-gray-400">Natural Ingredients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">5k+</div>
              <div className="text-sm text-gray-400">Jars Sold</div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;