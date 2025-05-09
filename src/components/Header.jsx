
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, BarChart2, User, Settings, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: -300,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {isAuthenticated && (
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/981c1f7c-d49b-4a25-b84f-4712fb519dd3/6767e24e0e87af195e66f7aff138577e.png"
                alt="DSL Transport Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold tracking-tight">DSL Transport</span>
            </Link>
          </motion.div>
        </div>

        {isAuthenticated && (
          <motion.nav 
            className="hidden md:flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
            <Link to="/dispatching" className="text-sm font-medium hover:text-primary transition-colors">Dispatching</Link>
            <Link to="/logistics" className="text-sm font-medium hover:text-primary transition-colors">Logistics</Link>
            <Link to="/payroll" className="text-sm font-medium hover:text-primary transition-colors">Payroll</Link>
            <Link to="/reports" className="text-sm font-medium hover:text-primary transition-colors">Reports</Link>
          </motion.nav>
        )}

        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
                <span className="sr-only">Logout</span>
              </Button>
            </>
          ) : (
            <Button variant="default" asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </motion.div>
      </div>

      {/* Mobile menu */}
      {isAuthenticated && (
        <motion.div 
          className="md:hidden fixed inset-0 z-50 bg-background"
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={menuVariants}
          style={{ display: isMenuOpen ? "block" : "none" }}
        >
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <div className="flex items-center gap-2">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/981c1f7c-d49b-4a25-b84f-4712fb519dd3/6767e24e0e87af195e66f7aff138577e.png"
                alt="DSL Transport Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold tracking-tight">DSL Transport</span>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="px-4 py-6 space-y-6">
            <Link to="/" className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
              <BarChart2 className="h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/dispatching" className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
              <BarChart2 className="h-5 w-5" />
              Dispatching
            </Link>
            <Link to="/logistics" className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
              <BarChart2 className="h-5 w-5" />
              Logistics
            </Link>
            <Link to="/payroll" className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
              <BarChart2 className="h-5 w-5" />
              Payroll
            </Link>
            <Link to="/reports" className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
              <BarChart2 className="h-5 w-5" />
              Reports
            </Link>
            <div className="pt-6 border-t">
              <Link to="/settings" className="flex items-center gap-2 text-base font-medium hover:text-primary transition-colors" onClick={toggleMenu}>
                <Settings className="h-5 w-5" />
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className="flex items-center gap-2 mt-6 text-base font-medium hover:text-primary transition-colors w-full"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
