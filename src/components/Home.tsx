import React from 'react';
import { Menu, ShoppingBag, Stethoscope, Moon, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { EVERA_AVATAR, PRODUCTS } from '../constants';

import { Screen } from '../types';

interface HomeProps {
  onScreenChange: (screen: Screen) => void;
}

export default function Home({ onScreenChange }: HomeProps) {
  const recommendations = PRODUCTS.filter(p => p.category === 'sleep');

  return (
    <div className="min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-[#f8bbd0]/10 backdrop-blur-xl shadow-[0_8px_24px_0_rgba(29,27,28,0.06)]">
        <div className="flex items-center gap-3">
          <button className="p-2 text-primary hover:opacity-80 transition-opacity">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-headline font-bold tracking-tight text-primary">Evera 24/7</h1>
        </div>
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-container cursor-pointer">
          <img alt="Evera Avatar" className="w-full h-full object-cover" src={EVERA_AVATAR} referrerPolicy="no-referrer" />
        </div>
      </header>

      <main className="pt-24 px-6 max-w-2xl mx-auto space-y-8">
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <span className="text-primary font-bold tracking-widest text-xs uppercase">WELCOME TO EVERA</span>
            <h2 className="font-headline text-3xl font-extrabold leading-tight text-on-surface">
              歡迎來到 Evera<br />
              <span className="text-primary italic">你的專屬健康守護者</span>
            </h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-primary-container"
          >
            <img alt="Hero" className="w-full h-full object-cover object-center" src={EVERA_AVATAR} referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <p className="text-xl font-headline font-bold">Always here for you</p>
              <p className="text-sm opacity-90">Personalized support, 24/7</p>
            </div>
          </motion.div>
        </section>

        <section className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface text-lg px-2">快捷入口</h3>
          <div className="flex gap-4">
            <button 
              onClick={() => onScreenChange('chat')}
              className="flex-1 flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-outline-variant/30 hover:shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-primary-container/30 flex items-center justify-center text-primary">
                <Stethoscope size={24} />
              </div>
              <span className="text-sm font-bold text-on-surface">諮詢營養師</span>
            </button>
            <button className="flex-1 flex flex-col items-center gap-2 p-4 bg-white rounded-2xl shadow-sm border border-outline-variant/30 active:scale-95 transition-transform">
              <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-secondary">
                <ShoppingBag size={24} />
              </div>
              <span className="text-sm font-bold text-on-surface">我的訂單</span>
            </button>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-end px-2">
            <h3 className="font-headline font-bold text-on-surface text-lg">今日推薦</h3>
            <span className="text-xs font-bold text-primary">針對您的睡眠推薦</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
            {recommendations.map(product => (
              <div 
                key={product.id} 
                onClick={() => onScreenChange('shop')}
                className="min-w-[140px] bg-white p-3 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col gap-2 cursor-pointer hover:shadow-md transition-all active:scale-95"
              >
                <div className="w-full aspect-square rounded-xl bg-surface-container-low overflow-hidden">
                  <img alt={product.name} className="w-full h-full object-cover" src={product.image} referrerPolicy="no-referrer" />
                </div>
                <p className="text-xs font-bold line-clamp-1">{product.name}</p>
                <p className="text-primary font-bold text-sm">${product.price.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-headline font-bold text-on-surface text-lg px-2">限時優惠</h3>
          <div className="relative w-full h-32 rounded-3xl overflow-hidden bg-gradient-to-r from-[#FF7043] to-[#F4511E] shadow-xl group cursor-pointer active:scale-[0.98] transition-transform">
            <div className="absolute inset-0 flex items-center px-8">
              <div className="z-10 text-white space-y-1">
                <p className="text-xs font-bold tracking-widest opacity-80">LIMITED TIME</p>
                <h4 className="text-2xl font-black">本月益生菌 8 折</h4>
                <button className="mt-2 px-4 py-1.5 bg-white text-[#F4511E] rounded-full text-xs font-black">立即選購</button>
              </div>
              <div className="absolute right-[-20px] top-[-10px] w-48 h-48 opacity-90 rotate-12 transition-transform group-hover:rotate-0 duration-500">
                <img alt="Offer" className="w-full h-full object-contain" src={PRODUCTS[5].image} referrerPolicy="no-referrer" />
              </div>
            </div>
          </div>
        </section>

        <section>
          <button className="w-full py-6 rounded-full bg-secondary text-white font-headline text-xl font-bold shadow-xl shadow-secondary/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
            <span className="material-symbols-outlined">chat_bubble</span>
            半夜也陪你聊
          </button>
        </section>

        <section className="grid grid-cols-2 gap-4 pb-12">
          <div className="bg-surface-container-low p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-secondary">
              <Heart size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Pulse</span>
            </div>
            <div className="text-3xl font-bold">72 <span className="text-sm font-normal text-zinc-400">bpm</span></div>
          </div>
          <div className="bg-surface-container-low p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Moon size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Sleep</span>
            </div>
            <div className="text-3xl font-bold">7.4 <span className="text-sm font-normal text-zinc-400">hrs</span></div>
          </div>
        </section>
      </main>
    </div>
  );
}
