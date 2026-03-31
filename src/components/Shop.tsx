import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';
import { EVERA_AVATAR, PRODUCTS } from '../constants';

export default function Shop() {
  return (
    <div className="min-h-screen pb-32 bg-background">
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-[0_8px_24px_rgba(29,27,28,0.06)] flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center overflow-hidden">
            <img alt="User Avatar" className="w-full h-full object-cover" src={EVERA_AVATAR} referrerPolicy="no-referrer" />
          </div>
          <span className="text-primary font-extrabold tracking-tighter font-headline text-2xl">健康精選</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="w-10 h-10 flex items-center justify-center text-primary hover:opacity-80 transition-opacity">
            <ShoppingCart size={24} />
          </button>
        </div>
      </header>

      <main className="pt-24 px-4 max-w-7xl mx-auto">
        <section className="mb-8 px-2">
          <h1 className="font-headline text-4xl font-extrabold text-primary tracking-tight mb-2">快速選購</h1>
          <p className="text-on-surface-variant max-w-md">為您的健康把關，嚴選最高品質的天然營養萃取。</p>
        </section>

        <div className="grid grid-cols-2 gap-4">
          {PRODUCTS.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden bg-primary-container/10">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={product.image} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="font-headline text-lg font-bold text-on-surface mb-1 truncate">{product.name}</h2>
                <p className="text-on-surface-variant text-xs line-clamp-2 mb-3 h-8">{product.description}</p>
                <div className="mt-auto">
                  <div className="text-primary font-bold text-base mb-2">NT$ {product.price.toLocaleString()}</div>
                  <button className="block w-full py-2 bg-primary-container text-primary text-center text-sm font-bold rounded-full hover:opacity-90 active:scale-95 transition-all">
                    立即購買
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
