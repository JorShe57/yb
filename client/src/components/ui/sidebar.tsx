import React, { createContext, useContext, useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
type SidebarContextType = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  openSidebar: () => void;
  closeSidebar: () => void;
};

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarProps = {
  children: ReactNode;
  side?: 'left' | 'right';
  className?: string;
  width?: string;
  backdrop?: boolean;
};

type SidebarToggleProps = {
  className?: string;
  icon?: ReactNode;
  label?: string;
  showLabel?: boolean;
  side?: 'left' | 'right';
};

// Create context
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Provider component
export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  const value = { isSidebarOpen, toggleSidebar, openSidebar, closeSidebar };
  
  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook to use the sidebar context
export function useSidebar() {
  const context = useContext(SidebarContext);
  
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  
  return context;
}

// Sidebar component
export function Sidebar({ 
  children,
  side = 'right',
  className,
  width = '320px',
  backdrop = true
}: SidebarProps) {
  const { isSidebarOpen, closeSidebar } = useSidebar();

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          {backdrop && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              onClick={closeSidebar}
              aria-hidden="true"
            />
          )}
          
          {/* Sidebar panel */}
          <motion.div
            className={cn(
              "fixed top-0 bottom-0 z-50 flex flex-col bg-background shadow-xl",
              side === 'right' ? 'right-0' : 'left-0',
              className
            )}
            style={{ width }}
            initial={{ 
              x: side === 'right' ? '100%' : '-100%', 
              opacity: 0 
            }}
            animate={{
              x: 0,
              opacity: 1
            }}
            exit={{ 
              x: side === 'right' ? '100%' : '-100%', 
              opacity: 0 
            }}
            transition={{ 
              type: 'spring', 
              stiffness: 300, 
              damping: 30 
            }}
          >
            <div className="flex-1 overflow-auto p-4">
              <button
                onClick={closeSidebar}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-background/80 text-foreground/80 hover:bg-muted/80 hover:text-foreground transition-colors"
                aria-label="Close sidebar"
              >
                <X size={16} />
              </button>
              
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Toggle button component
export function SidebarToggle({ 
  className,
  icon = <MessageCircle />,
  label = "Open Sidebar",
  showLabel = true,
  side = 'right'
}: SidebarToggleProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <div className={cn(
      "fixed bottom-6 z-40 flex items-center gap-2",
      side === 'right' ? 'right-6' : 'left-6',
      className
    )}>
      {showLabel && side === 'left' && (
        <div className="bg-primary/80 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
          {label}
        </div>
      )}
      
      <button
        onClick={toggleSidebar}
        className="w-12 h-12 flex items-center justify-center bg-primary text-white rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label={label}
      >
        {icon}
      </button>
      
      {showLabel && side === 'right' && (
        <div className="bg-primary/80 text-white px-3 py-1.5 rounded-lg text-sm font-medium shadow-lg">
          {label}
        </div>
      )}
    </div>
  );
}