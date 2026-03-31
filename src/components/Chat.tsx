import React, { useState, useRef, useEffect } from 'react';
import { Menu, Send, Plus, Bolt } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { EVERA_AVATAR, PRODUCTS } from '../constants';
import { Message, Product } from '../types';
import { getGeminiResponse } from '../services/gemini';

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'user',
      content: '你看過「凡人修仙傳」動畫嗎？',
      timestamp: '14:20 PM'
    },
    {
      id: '1',
      role: 'model',
      content: '天啊！你也看《凡人修仙傳》嗎？韓立那種「韓跑跑」凡事求穩、保命第一的精神，簡直是我的偶像！😂\n\n不過說真的，像我們這種「凡人」熬夜追番修仙，身體可是會抗議的。韓立有靈丹妙藥，我們有「甘甘好」！\n\n畢竟追劇也是很耗體力的，肝顧好了，才能跟著韓長老長生不老呀～ 要不要先帶一組「甘甘好」回去？讓你在修仙路上體力滿點，不會看著看著就斷線！✨💊',
      timestamp: 'JUST NOW',
      productRecommendation: PRODUCTS.find(p => p.name === '甘甘好')
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const responseText = await getGeminiResponse(input, history);
      
      // Look for product recommendations in the text
      const recommendation = PRODUCTS.find(p => responseText.includes(p.name));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: 'JUST NOW',
        productRecommendation: recommendation
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="fixed top-0 w-full px-6 py-4 flex justify-between items-center bg-surface-container-high/80 backdrop-blur-xl z-50 shadow-[0_8px_24px_rgba(29,27,28,0.06)]">
        <div className="flex items-center gap-4">
          <button className="text-primary hover:opacity-80 transition-opacity">
            <Menu size={24} />
          </button>
          <span className="text-2xl font-extrabold text-primary italic font-headline tracking-tight">Evera</span>
        </div>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary-container">
          <img className="w-full h-full object-cover" src={EVERA_AVATAR} referrerPolicy="no-referrer" />
        </div>
      </header>

      <main className="flex-grow pt-24 pb-48 px-4 md:px-8 max-w-4xl mx-auto w-full flex flex-col gap-8">
        <div className="relative mb-4">
          <div className="bg-surface-container-low rounded-lg p-6 flex items-center justify-between">
            <div>
              <h2 className="text-on-surface-variant text-sm font-medium uppercase tracking-wider mb-1">Current Focus</h2>
              <p className="text-xl font-bold text-on-surface">修仙補給中</p>
            </div>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-secondary-container shadow-lg flex items-center justify-center absolute -top-10 -right-2 rotate-12">
                <Bolt className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} gap-2`}>
              <div className="flex gap-4 items-start w-full">
                {msg.role === 'model' && (
                  <div className="flex-shrink-0 sticky top-28">
                    <div className="w-12 h-12 rounded-full ring-4 ring-primary-container overflow-hidden">
                      <img className="w-full h-full object-cover" src={EVERA_AVATAR} referrerPolicy="no-referrer" />
                    </div>
                  </div>
                )}
                
                <div className={`flex flex-col gap-4 flex-grow ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[95%] md:max-w-[85%] p-6 rounded-lg shadow-sm relative ${
                    msg.role === 'user' 
                      ? 'bg-surface-container-highest text-on-surface rounded-tr-none' 
                      : 'bg-surface-container-lowest text-on-surface rounded-tl-none shadow-[0_8px_24px_rgba(29,27,28,0.04)]'
                  }`}>
                    {msg.role === 'model' && (
                      <div className="absolute -left-2 top-0 w-0 h-0 border-t-[12px] border-t-surface-container-lowest border-l-[12px] border-l-transparent"></div>
                    )}
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>

                    {msg.productRecommendation && (
                      <div className="mt-6 bg-primary-container/30 border border-primary/10 rounded-xl p-4 flex flex-col md:flex-row items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-inner overflow-hidden">
                          <img className="w-full h-full object-cover" src={msg.productRecommendation.image} referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow text-center md:text-left">
                          <h3 className="font-bold text-primary">修仙必備：{msg.productRecommendation.name}</h3>
                          <p className="text-xs text-on-surface-variant">24H 活力支援，熬夜不間斷</p>
                        </div>
                        <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-full text-sm shadow-lg active:scale-95 transition-transform">
                          點去看看
                        </button>
                      </div>
                    )}
                  </div>
                  <span className={`text-[10px] text-on-surface-variant uppercase tracking-widest font-medium ${msg.role === 'user' ? 'pr-1' : ''}`}>
                    {msg.role === 'model' ? 'Evera 24/7 • ' : ''}{msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 items-center opacity-40">
              <div className="w-12 h-12"></div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <div className="fixed bottom-24 left-0 w-full px-4 md:px-8 z-40">
        <div className="max-w-4xl mx-auto bg-surface-container-high/90 backdrop-blur-md rounded-full p-2 flex items-center shadow-lg border border-white/20">
          <button className="w-10 h-10 flex items-center justify-center text-primary rounded-full hover:bg-white/50 transition-colors">
            <Plus size={24} />
          </button>
          <input 
            className="flex-grow bg-transparent border-none focus:ring-0 text-on-surface font-body px-4 text-sm" 
            placeholder="輸入訊息..." 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-full shadow-md active:scale-90 transition-transform disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
