import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  noindex?: boolean;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description = 'ÁXIS - Conectamos você com os melhores psicólogos do Brasil através de matching inteligente baseado em IA.',
  keywords = 'psicólogo, terapia, saúde mental, psicologia, brasil, matching, ia, inteligência artificial',
  noindex = false,
  className = ''
}) => {
  const pageTitle = title ? `${title} | ÁXIS` : 'ÁXIS - Encontre seu psicólogo ideal';

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        
        {}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:site_name" content="AXIS" />
        
        {}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={description} />
        
        {}
        {noindex && <meta name="robots" content="noindex, nofollow" />}
        
        <link rel="icon" href="/logo-axis.png" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
      </Head>
      
      <div className={`min-h-screen flex flex-col ${className}`}>
        <Header />
        
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Layout;