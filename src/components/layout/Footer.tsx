import React from 'react';
import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Plataforma',
      links: [
        { name: 'Como Funciona', href: '/', section: 'como-funciona' },
        { name: 'Buscar Terapeuta', href: '/paciente/cadastro' },
        { name: 'Preços', href: '#' },
        { name: 'Cadastrar Terapeuta', href: '/profissional/cadastro' },
      ]
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Central de Ajuda', href: '#' },
        { name: 'Contato', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Blog', href: '#' },
      ]
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nós', href: '#' },
        { name: 'Venha Conosco', href: '#' },
        { name: 'Redes Sociais', href: '#' },
        { name: 'Profissionais', href: '#' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Política de Privacidade', href: '#' },
        { name: 'Termos de Uso', href: '#' },
        { name: 'LGPD', href: '#' },
        { name: 'Cookies', href: '#' },
      ]
    }
  ];

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container-custom">
        {}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-3 mb-6">
                <img 
                  src="/logo-axis.png" 
                  alt="AXIS Logo" 
                  className="w-10 h-10 object-contain"
                  style={{ background: 'transparent' }}
                />
              </Link>
              
              <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
                Conectamos pessoas com os melhores profissionais do Brasil através de 
                tecnologia avançada e matching inteligente. Sua jornada de bem-estar 
                mental começa aqui.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-neutral-400">
                  <Mail className="w-4 h-4" />
                  <span>contato@portalaxis.com.br</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral-400">
                  <Phone className="w-4 h-4" />
                  <span>0800 123 4567</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-neutral-400">
                  <MapPin className="w-4 h-4" />
                  <span>Brasil, Brasil</span>
                </div>
              </div>
            </div>

            {}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold text-white mb-4">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="border-t border-neutral-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-neutral-400">
              © {currentYear} 2ME SISTEMAS. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
