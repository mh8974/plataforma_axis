import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Brain, Shield, Star, Users, CheckCircle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();
  
  
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substring(1));
        if (element) {
          
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }
      }
    };

    
    handleHashChange();

    
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const benefits = [
    {
      icon: Brain,
      title: 'Matching Inteligente',
      description: 'Nossa IA analisa seu perfil e conecta você com terapeutas altamente compatíveis'
    },
    {
      icon: Shield,
      title: 'Seguro e Confidencial',
      description: 'Seus dados estão protegidos e suas sessões são totalmente confidenciais'
    },
    {
      icon: Users,
      title: 'Terapeutas Verificados',
      description: 'Todos os profissionais são certificados e passam por nossa triagem'
    },
    {
      icon: Star,
      title: 'Qualidade Garantida',
      description: 'Avaliações reais de pacientes ajudam a manter a excelência do atendimento'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Conte-nos sobre você',
      description: 'Responda algumas perguntas sobre suas necessidades e preferências',
    },
    {
      number: '02',
      title: 'Receba recomendações',
      description: 'Nossa IA encontra os terapeutas mais compatíveis com seu perfil',
    },
    {
      number: '03',
      title: 'Conecte-se com seu terapeuta',
      description: 'Escolha e agende sua primeira sessão com total segurança',
    }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      location: 'São Paulo, SP',
      text: 'O ÁXIS me conectou com uma terapeuta perfeita para minhas necessidades. Em apenas 3 sessões já sinto uma diferença enorme.',
      rating: 5
    },
    {
      name: 'João Santos',
      location: 'Rio de Janeiro, RJ',
      text: 'A praticidade de encontrar um psicólogo qualificado online me surpreendeu. Recomendo para todos que buscam ajuda.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      location: 'Belo Horizonte, MG',
      text: 'Como mãe, é difícil encontrar tempo. O ÁXIS me permitiu fazer terapia no conforto da minha casa. Vida mudada!',
      rating: 5
    }
  ];

  return (
    <Layout
      title="Encontre seu psicólogo ideal"
      description="ÁXIS conecta você com os melhores psicólogos do Brasil através de matching inteligente baseado em IA. Comece sua jornada de bem-estar mental hoje."
    >
      {}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              Encontre seu{' '}
              <span className="text-gradient">psicoterapeuta ideal</span>{' '}
              com inteligência artificial
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-3xl mx-auto">
              Conectamos você com os melhores profissionais de saúde mental através de matching inteligente 
              baseado em suas necessidades, preferências e perfil único!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/paciente/cadastro">
                <Button size="xl" className="w-full sm:w-auto">
                  Começar Agora
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="#como-funciona">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  Ver como funciona
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary-600" />
                <span>100% Gratuito para buscar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary-600" />
                <span>Terapeutas certificados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-secondary-600" />
                <span>Matching por IA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Por que escolher o ÁXIS?
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Nossa plataforma foi desenvolvida pensando em conectar pessoas com 
              os terapeutas mais adequados para suas necessidades específicas.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="text-center h-full">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {}
      <section id="como-funciona" className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Como funciona
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Em apenas 3 passos simples, você encontra o terapeuta ideal para sua jornada.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-2xl text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-600">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-8 h-0.5 bg-neutral-200 transform -translate-y-1/2" 
                       style={{ position: 'relative', marginTop: '-4rem', marginLeft: '2rem' }}>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              O que nossos usuários dizem
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Milhares de pessoas já encontraram o apoio que precisavam através do ÁXIS.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="h-full">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-neutral-700 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {testimonial.location}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="section-padding bg-primary-600">
        <div className="container-custom">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pronto para começar sua jornada?
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Não deixe para depois. Sua saúde mental é prioridade e 
              estamos aqui para ajudar você a dar o primeiro passo!
            </p>
            
            <Link href="/paciente/cadastro">
              <Button size="xl" variant="secondary">
                Encontrar meu terapeuta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
