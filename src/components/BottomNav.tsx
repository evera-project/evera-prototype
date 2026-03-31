import React from 'react';
import { Home, MessageCircle, Store } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onScreenChange }: BottomNavProps) {
  const navItems = [
    { id: 'home', label: '首頁', icon: Home },
    { id: 'chat', label: '聊天', icon: MessageCircle },
    { id: 'shop', label: '商店', icon: Store },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-end px-8 pb-8 pt-2 bg-primary-container/20 backdrop-blur-2xl rounded-t-[3rem] shadow-[0_-8px_24px_0_rgba(29,27,28,0.04)]">
      {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => onScreenChange(item.id)}
            className={`flex flex-col items-center justify-center transition-all duration-300 ease-out p-4 rounded-full ${
              isActive
                ? 'bg-gradient-to-br from-primary to-primary-container text-white scale-110 -translate-y-2 shadow-lg'
                : 'text-primary opacity-60 hover:bg-secondary-container/30'
            }`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="font-headline text-[10px] font-semibold uppercase tracking-widest mt-1">
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
