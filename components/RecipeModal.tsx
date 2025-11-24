import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChefHat, Sparkles, Loader2, ArrowRight, Check, UtensilsCrossed } from 'lucide-react';
import { COMMON_INGREDIENTS, ANLOCKS_PRODUCTS } from '../constants';
import { generateRecipe } from '../services/geminiService';
import { RecipeResult } from '../types';

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({ isOpen, onClose }) => {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [customIngredient, setCustomIngredient] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecipeResult | null>(null);
  const [step, setStep] = useState<'select' | 'loading' | 'result'>('select');

  const toggleIngredient = (ing: string) => {
    if (selectedIngredients.includes(ing)) {
      setSelectedIngredients(prev => prev.filter(i => i !== ing));
    } else {
      setSelectedIngredients(prev => [...prev, ing]);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customIngredient.trim()) {
      toggleIngredient(customIngredient.trim());
      setCustomIngredient('');
    }
  };

  const handleGenerate = async () => {
    if (selectedIngredients.length === 0) return;
    setStep('loading');
    setLoading(true);
    const recipe = await generateRecipe(selectedIngredients);
    setResult(recipe);
    setLoading(false);
    setStep(recipe ? 'result' : 'select');
  };

  const reset = () => {
    setStep('select');
    setResult(null);
    setSelectedIngredients([]);
  };

  // Find the product image for the result
  const recommendedProductData = ANLOCKS_PRODUCTS.find(p => 
    result?.recommendedAnlocksProduct.toLowerCase().includes(p.name.toLowerCase()) ||
    p.name.toLowerCase().includes(result?.recommendedAnlocksProduct.toLowerCase() || '')
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="relative w-full max-w-3xl bg-[#FDF8F5] rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-orange-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 to-orange-700 p-6 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                   <ChefHat className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif tracking-wide">Anlocks Kitchen AI</h2>
                  <p className="text-xs text-orange-100 opacity-90 font-light">What are you cooking today?</p>
                </div>
              </div>
              <button onClick={onClose} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-grow overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-8">
              
                {/* Step 1: Selection */}
                {step === 'select' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                  >
                    <div className="text-center space-y-2">
                      <h3 className="text-3xl font-serif font-bold text-gray-800">Select Ingredients</h3>
                      <p className="text-gray-600">Select ingredients you have at home, and we'll suggest the perfect Anlocks pairing.</p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {COMMON_INGREDIENTS.map((ing) => (
                        <button
                          key={ing}
                          onClick={() => toggleIngredient(ing)}
                          className={`relative overflow-hidden px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 text-center border-2 ${
                            selectedIngredients.includes(ing)
                              ? 'bg-orange-50 border-orange-500 text-orange-700 shadow-md scale-105'
                              : 'bg-white border-transparent hover:border-orange-200 text-gray-600 shadow-sm hover:shadow-md'
                          }`}
                        >
                          {ing}
                          {selectedIngredients.includes(ing) && (
                            <motion.div 
                              layoutId="check"
                              className="absolute top-1 right-1"
                            >
                              <Check className="w-3 h-3 text-orange-600" />
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="relative max-w-md mx-auto">
                      <form onSubmit={handleAddCustom} className="flex gap-2">
                        <input
                          type="text"
                          value={customIngredient}
                          onChange={(e) => setCustomIngredient(e.target.value)}
                          placeholder="Add something else..."
                          className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 outline-none transition-colors shadow-sm"
                        />
                        <button type="submit" className="px-5 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 font-bold transition-colors shadow-lg">
                          +
                        </button>
                      </form>
                    </div>

                    <div className="flex justify-center pt-2">
                      <button
                        onClick={handleGenerate}
                        disabled={selectedIngredients.length < 1}
                        className="group relative overflow-hidden px-10 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold shadow-xl hover:shadow-orange-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none transform hover:-translate-y-1"
                      >
                        <span className="relative z-10 flex items-center gap-2 text-lg">
                          <Sparkles className="w-5 h-5" />
                          Find My Recipe
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Loading */}
                {step === 'loading' && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12 space-y-8 text-center min-h-[400px]"
                  >
                    <div className="relative">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="w-32 h-32 border-4 border-orange-100 rounded-full"
                      ></motion.div>
                      <motion.div 
                        animate={{ rotate: -360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-2 border-4 border-t-orange-600 border-r-transparent border-b-transparent border-l-transparent rounded-full"
                      ></motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <UtensilsCrossed className="w-10 h-10 text-orange-600 opacity-50" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-serif font-bold text-gray-800 animate-pulse">Thinking...</h3>
                      <p className="text-gray-500">Matching your {selectedIngredients.length} ingredients with Anlocks specials.</p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Result */}
                {step === 'result' && result && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                  >
                    {/* Recommendation Card */}
                    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-1 border border-orange-100 shadow-inner">
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                           <div className="relative shrink-0 group">
                              <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
                              <img 
                                src={recommendedProductData?.image || "https://placehold.co/200x200"} 
                                alt={recommendedProductData?.name} 
                                className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-white relative z-10" 
                              />
                              <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md">
                                Perfect Pair
                              </div>
                           </div>
                           <div className="text-center md:text-left flex-1">
                              <div className="text-orange-600 font-bold text-sm tracking-wider uppercase mb-1">Recommended Pairing</div>
                              <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{result.recommendedAnlocksProduct}</h3>
                              <p className="text-gray-600 italic text-sm leading-relaxed border-l-2 border-orange-200 pl-4">
                                "{result.reasonForRecommendation}"
                              </p>
                           </div>
                           <div className="shrink-0">
                             <a href="#products" onClick={onClose} className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
                               Buy Now <ArrowRight className="w-4 h-4 ml-2" />
                             </a>
                           </div>
                        </div>
                      </div>
                    </div>

                    {/* Recipe Details */}
                    <div>
                      <div className="flex justify-between items-baseline mb-6 border-b border-gray-100 pb-4">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">{result.recipeName}</h2>
                        <div className="flex gap-4 text-sm font-semibold text-gray-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> {result.cookingTime}</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> {result.difficulty}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-8">
                        {/* Ingredients Column */}
                        <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
                          <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">1</span>
                            Ingredients
                          </h4>
                          <ul className="space-y-3">
                            {result.ingredients.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-300 shrink-0" />
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Instructions Column */}
                        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                           <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs">2</span>
                            Instructions
                          </h4>
                          <div className="space-y-6">
                            {result.instructions.map((step, idx) => (
                              <div key={idx} className="group flex gap-4">
                                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-50 text-gray-400 font-bold flex items-center justify-center border border-gray-100 group-hover:border-orange-200 group-hover:text-orange-600 transition-colors">
                                  {idx + 1}
                                </span>
                                <p className="text-gray-700 text-sm leading-relaxed pt-1.5">{step}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center pt-4">
                       <button onClick={reset} className="text-gray-500 hover:text-orange-600 text-sm font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                         <Sparkles className="w-4 h-4" /> Generate Another Recipe
                       </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default RecipeModal;