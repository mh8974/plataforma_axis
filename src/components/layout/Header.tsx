import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, User, LogOut, Settings, Activity } from 'lucide-react';
import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  const navigation = [
    { name: 'Como Funciona', href: '/', section: 'como-funciona' },
    { name: 'Buscar Terapeuta', href: '/paciente/cadastro' },
    { name: 'Cadastrar Terapeuta', href: '/profissional/cadastro' },
    { name: 'Sobre', href: '#' },
  ];

  const isActivePath = (path: string) => {
    return router.pathname === path;
  };

  const handleLogout = async () => {
    setIsUserMenuOpen(false);
    await logout();
  };

  const getUserInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          {}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src="/logo-axis.png" 
              alt="AXIS Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
              style={{ background: 'transparent' }}
            />
          </Link>

          {}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary-600',
                  isActivePath(item.href)
                    ? 'text-primary-600'
                    : 'text-neutral-700'
                )}
                onClick={(e) => {
                  
                  if (item.section) {
                    e.preventDefault();
                    
                    if (router.pathname === '/') {
                      const element = document.getElementById(item.section);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    } else {
                      
                      router.push(`/#${item.section}`);
                    }
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center space-x-3 p-2 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {getUserInitials(user.nome)}
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-neutral-900">
                          {user.nome.split(' ')[0]}
                        </div>
                        <div className="text-xs text-neutral-500 capitalize">
                          {user.tipo.toLowerCase()}
                        </div>
                      </div>
                    </button>

                    {}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 z-50">
                        <Link
                          href={
                            user.tipo === 'PACIENTE' ? '/pacientes/dashboard' :
                            user.tipo === 'TERAPEUTA' ? '/terapeutas/dashboard' :
                            user.tipo === 'ADMINISTRADOR' ? '/admin/dashboard' : '/dashboard'
                          }
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Activity className="w-4 h-4 mr-3" />
                          Dashboard
                        </Link>
                        
                        <Link
                          href="/configuracoes"
                          className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Configurações
                        </Link>
                        
                        <div className="border-t border-neutral-200 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Sair
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
                        <User className="w-4 h-4 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                )}
              </>
            )}
          </div>

          {}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-neutral-700 hover:text-primary-600 hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {}
        {isMenuOpen && (
          <div className="md:hidden border-t border-neutral-200 bg-white">
            <div className="py-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'block px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    isActivePath(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                  )}
                  onClick={(e) => {
                    
                    setIsMenuOpen(false);
                    
                    
                    if (item.section) {
                      e.preventDefault();
                      
                      if (router.pathname === '/') {
                        const element = document.getElementById(item.section);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      } else {
                        
                        router.push(`/#${item.section}`);
                      }
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              {!isLoading && (
                <div className="px-4 pt-4 space-y-2">
                  {isAuthenticated && user ? (
                    <>
                      {}
                      <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg mb-4">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                          {getUserInitials(user.nome)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-neutral-900">
                            {user.nome}
                          </div>
                          <div className="text-xs text-neutral-500 capitalize">
                            {user.tipo.toLowerCase()}
                          </div>
                        </div>
                      </div>

                      {}
                      <Link
                        href={
                          user.tipo === 'PACIENTE' ? '/pacientes/dashboard' :
                          user.tipo === 'TERAPEUTA' ? '/terapeutas/dashboard' :
                          user.tipo === 'ADMINISTRADOR' ? '/admin/dashboard' : '/dashboard'
                        }
                        className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Activity className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>

                      {}
                      <Link
                        href="/configuracoes"
                        className="flex items-center w-full px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-50 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Configurações
                      </Link>

                      {}
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                          <User className="w-4 h-4 mr-2" />
                          Entrar
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
