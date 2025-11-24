import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Footer from './components/Footer';
import RecipeModal from './components/RecipeModal';
import { ChefHat, Leaf, Heart, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFab, setShowFab] = useState(false);

  // Show the FAB after scrolling past hero or after a timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFab(true);
    }, 4000);

    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 font-sans selection:bg-orange-200">
      <Navbar />
      <Hero onOpenRecipe={() => setIsModalOpen(true)} />
      
      <main>
        {/* About / Story Section */}
        <section id="about" className="py-24 bg-white overflow-hidden relative">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-100 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-orange-200 rounded-full z-0"></div>
                <img 
                  src="https://images.unsplash.com/photo-1621850939762-c70e30127524?q=80&w=1200&auto=format&fit=crop" 
                  alt="Traditional Indian Spices" 
                  className="rounded-2xl shadow-2xl relative z-10 w-full object-cover h-[500px] hover:scale-[1.02] transition-transform duration-500"
                />
                
                <div className="absolute bottom-10 -right-10 bg-white p-6 rounded-xl shadow-xl max-w-xs z-20 hidden md:block animate-fade-in-up">
                   <p className="font-serif italic text-lg text-gray-800">"The secret ingredient is always patience."</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-orange-600 font-bold tracking-wider text-sm uppercase mb-2 block">Our Story</span>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                  Preserving the Art of <br/>
                  <span className="text-orange-600">Traditional Pickling</span>
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                  Welcome to <strong>Anlocks</strong>. We started with a simple mission: to bring the nostalgic taste of "Nani ke haath ka achar" (Grandma's pickle) to your modern dining table.
                </p>
                <p className="text-gray-600 mb-10 leading-relaxed text-lg">
                  In a world of mass-produced food, we take the slow road. Our pickles are sun-dried, hand-mixed, and matured in ceramic jars for weeks to develop that complex, authentic flavor profile that machines simply cannot replicate.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4 bg-stone-50 rounded-xl hover:bg-orange-50 transition-colors">
                    <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                      <Leaf className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">100% Natural</h4>
                    <p className="text-xs text-gray-500 mt-1">No artificial preservatives</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-stone-50 rounded-xl hover:bg-orange-50 transition-colors">
                    <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Made with Love</h4>
                    <p className="text-xs text-gray-500 mt-1">Handcrafted in small batches</p>
                  </div>
                  <div className="flex flex-col items-center text-center p-4 bg-stone-50 rounded-xl hover:bg-orange-50 transition-colors">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Premium Quality</h4>
                    <p className="text-xs text-gray-500 mt-1">Finest oils & spices used</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Products />
      </main>

      <Footer />

      {/* Floating Action Button for Recipe Generator */}
      <AnimatePresence>
        {showFab && !isModalOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-30 flex flex-col items-end gap-2"
          >
             {/* Tooltip bubble */}
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 }}
               className="bg-white px-4 py-2 rounded-xl shadow-lg border border-orange-100 text-gray-800 text-sm font-semibold mb-1 relative mr-2"
             >
               Need cooking ideas? 🍛
               <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-orange-100"></div>
             </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 rounded-full shadow-xl hover:shadow-orange-600/40 transition-all flex items-center gap-3 group pr-6"
            >
              <div className="bg-white/20 p-2 rounded-full">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="font-bold text-lg">AI Chef</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <RecipeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;