import React, { useState } from 'react';
import { Star, Clock } from 'lucide-react';
import { Service } from '../types';
import ServiceModal from './ServiceModal';

interface ServiceListProps {
  onAddToCart: (service: Service) => void;
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const services: Service[] = [
  {
    id: 1,
    name: "Asesoría Jurídica Empresarial",
    price: 350000,
    description: "Consultoría legal especializada para empresas colombianas",
    longDescription: [
      "Nuestro servicio de asesoría jurídica empresarial ofrece un acompañamiento integral en todas las áreas del derecho corporativo. Contamos con un equipo de abogados especializados que brindarán soluciones efectivas a las necesidades legales de su empresa.",
      "El servicio incluye consultoría en derecho comercial, laboral, tributario y contractual, así como asesoramiento en procesos de constitución, fusión y adquisición de empresas.",
    ],
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    category: "Legal",
    duration: "1 hora",
    provider: {
      name: "Consultores Legales Bogotá",
      rating: 4.8,
      reviews: 127,
      experience: "Más de 15 años de experiencia en derecho empresarial",
      specialties: ["Derecho Comercial", "Derecho Laboral", "Derecho Tributario", "Contratos"]
    }
  },
  {
    id: 2,
    name: "Desarrollo Web Corporativo",
    price: 2800000,
    description: "Diseño y desarrollo de sitios web empresariales con tecnología de punta",
    longDescription: [
      "Desarrollamos sitios web corporativos a medida, utilizando las últimas tecnologías y mejores prácticas del mercado. Nuestro enfoque se centra en crear una presencia digital que refleje la profesionalidad y valores de su empresa.",
      "El servicio incluye diseño UX/UI, desarrollo frontend y backend, optimización SEO, e integración con sistemas empresariales existentes."
    ],
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
    category: "Tecnología",
    duration: "2 semanas",
    provider: {
      name: "Digital Colombia",
      rating: 4.9,
      reviews: 89,
      experience: "Más de 200 proyectos web exitosos entregados",
      specialties: ["React", "Node.js", "UI/UX", "E-commerce", "SEO"]
    }
  },
  {
    id: 3,
    name: "Consultoría en Innovación",
    price: 450000,
    description: "Asesoramiento estratégico para la transformación digital de tu empresa",
    longDescription: [
      "Ofrecemos un servicio integral de consultoría en innovación y transformación digital, ayudando a las empresas a adaptarse y prosperar en la era digital.",
      "Nuestro enfoque incluye análisis de procesos actuales, identificación de oportunidades de mejora, y desarrollo de estrategias de implementación tecnológica."
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    category: "Consultoría",
    duration: "2 horas",
    provider: {
      name: "Innova ANDI",
      rating: 4.7,
      reviews: 156,
      experience: "Líderes en transformación digital empresarial",
      specialties: ["Transformación Digital", "Gestión del Cambio", "Innovación Empresarial"]
    }
  },
  {
    id: 4,
    name: "Marketing Digital Estratégico",
    price: 1500000,
    description: "Estrategias de marketing digital personalizadas para aumentar tu presencia online",
    longDescription: [
      "Desarrollamos estrategias de marketing digital completas y personalizadas para maximizar la presencia online de su empresa y generar resultados medibles.",
      "Incluye análisis de mercado, estrategia de contenidos, gestión de redes sociales y campañas publicitarias."
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    category: "Marketing",
    duration: "1 mes",
    provider: {
      name: "Marketing Pro Colombia",
      rating: 4.8,
      reviews: 98,
      experience: "8 años de experiencia en marketing digital",
      specialties: ["SEO", "SEM", "Social Media", "Content Marketing"]
    }
  },
  {
    id: 5,
    name: "Consultoría Financiera",
    price: 600000,
    description: "Asesoramiento financiero integral para optimizar sus recursos empresariales",
    longDescription: [
      "Brindamos asesoramiento financiero especializado para ayudar a su empresa a tomar decisiones informadas y optimizar sus recursos económicos.",
      "El servicio incluye análisis financiero, planificación estratégica, gestión de riesgos y recomendaciones de inversión."
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    category: "Finanzas",
    duration: "3 horas",
    provider: {
      name: "Finanzas Empresariales SAS",
      rating: 4.9,
      reviews: 145,
      experience: "Expertos en finanzas corporativas",
      specialties: ["Análisis Financiero", "Gestión de Riesgos", "Planificación Fiscal"]
    }
  },
  {
    id: 6,
    name: "Gestión de Recursos Humanos",
    price: 800000,
    description: "Servicios integrales de RRHH para optimizar su capital humano",
    longDescription: [
      "Ofrecemos servicios completos de gestión de recursos humanos, desde la selección hasta el desarrollo del talento.",
      "Incluye procesos de reclutamiento, evaluación de desempeño, planes de capacitación y desarrollo organizacional."
    ],
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
    category: "RRHH",
    duration: "1 semana",
    provider: {
      name: "Talento & Gestión",
      rating: 4.7,
      reviews: 112,
      experience: "12 años gestionando talento humano",
      specialties: ["Reclutamiento", "Capacitación", "Desarrollo Organizacional"]
    }
  },
  {
    id: 7,
    name: "Consultoría en Comercio Internacional",
    price: 950000,
    description: "Asesoramiento en procesos de importación y exportación",
    longDescription: [
      "Brindamos asesoría especializada en comercio internacional, facilitando los procesos de importación y exportación para su empresa.",
      "Incluye análisis de mercados internacionales, gestión de documentación y trámites aduaneros."
    ],
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec",
    category: "Comercio",
    duration: "4 horas",
    provider: {
      name: "Global Trade Consultants",
      rating: 4.8,
      reviews: 89,
      experience: "Expertos en comercio internacional",
      specialties: ["Importación", "Exportación", "Logística Internacional"]
    }
  },
  {
    id: 8,
    name: "Diseño de Marca Corporativa",
    price: 1800000,
    description: "Desarrollo de identidad visual y branding empresarial",
    longDescription: [
      "Creamos identidades de marca memorables y efectivas que comunican los valores y la esencia de su empresa.",
      "El servicio incluye diseño de logo, manual de marca, papelería corporativa y guidelines de comunicación."
    ],
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f",
    category: "Diseño",
    duration: "10 días",
    provider: {
      name: "Diseño Creativo CO",
      rating: 4.9,
      reviews: 167,
      experience: "Más de 300 proyectos de branding exitosos",
      specialties: ["Branding", "Diseño Gráfico", "Identidad Corporativa"]
    }
  },
  {
    id: 9,
    name: "Auditoría Contable",
    price: 1200000,
    description: "Revisión exhaustiva de estados financieros y procesos contables",
    longDescription: [
      "Realizamos auditorías contables completas para asegurar la precisión y cumplimiento de sus registros financieros.",
      "Incluye revisión de estados financieros, procesos contables y recomendaciones de mejora."
    ],
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c",
    category: "Contabilidad",
    duration: "1 semana",
    provider: {
      name: "Auditores & Asociados",
      rating: 4.8,
      reviews: 134,
      experience: "20 años de experiencia en auditoría",
      specialties: ["Auditoría Financiera", "Consultoría Contable", "Cumplimiento Fiscal"]
    }
  },
  {
    id: 10,
    name: "Implementación de CRM",
    price: 2500000,
    description: "Instalación y configuración de sistemas CRM empresariales",
    longDescription: [
      "Implementamos soluciones CRM personalizadas para optimizar la gestión de relaciones con sus clientes.",
      "El servicio incluye análisis de necesidades, configuración del sistema, migración de datos y capacitación."
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978",
    category: "Tecnología",
    duration: "3 semanas",
    provider: {
      name: "Tech Solutions Colombia",
      rating: 4.7,
      reviews: 92,
      experience: "Especialistas en implementación de CRM",
      specialties: ["Salesforce", "HubSpot", "Microsoft Dynamics"]
    }
  },
  {
    id: 11,
    name: "Consultoría en Sostenibilidad",
    price: 750000,
    description: "Asesoramiento en prácticas empresariales sostenibles",
    longDescription: [
      "Ayudamos a las empresas a desarrollar estrategias de sostenibilidad efectivas y medibles.",
      "Incluye evaluación de impacto ambiental, desarrollo de políticas sostenibles y certificaciones ambientales."
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
    category: "Sostenibilidad",
    duration: "2 semanas",
    provider: {
      name: "Eco Consultores",
      rating: 4.8,
      reviews: 76,
      experience: "Líderes en consultoría ambiental",
      specialties: ["Gestión Ambiental", "Economía Circular", "Certificaciones Verdes"]
    }
  },
  {
    id: 12,
    name: "Ciberseguridad Empresarial",
    price: 1800000,
    description: "Protección integral de sistemas y datos empresariales",
    longDescription: [
      "Ofrecemos servicios completos de ciberseguridad para proteger los activos digitales de su empresa.",
      "Incluye evaluación de vulnerabilidades, implementación de soluciones de seguridad y capacitación del personal."
    ],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    category: "Seguridad",
    duration: "2 semanas",
    provider: {
      name: "Cyber Security Pro",
      rating: 4.9,
      reviews: 108,
      experience: "10 años en seguridad informática",
      specialties: ["Ethical Hacking", "Seguridad en la Nube", "Prevención de Fraudes"]
    }
  },
  {
    id: 13,
    name: "Gestión de Proyectos",
    price: 2200000,
    description: "Servicios profesionales de gestión de proyectos empresariales",
    longDescription: [
      "Proporcionamos servicios especializados en gestión de proyectos para asegurar el éxito de sus iniciativas empresariales.",
      "Incluye planificación estratégica, gestión de recursos, seguimiento y control de proyectos."
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    category: "Proyectos",
    duration: "1 mes",
    provider: {
      name: "Project Masters",
      rating: 4.7,
      reviews: 95,
      experience: "Certificación PMP y metodologías ágiles",
      specialties: ["Gestión Ágil", "PMO", "Gestión de Riesgos"]
    }
  },
  {
    id: 14,
    name: "Capacitación en Liderazgo",
    price: 900000,
    description: "Programas de desarrollo de habilidades de liderazgo",
    longDescription: [
      "Desarrollamos programas de capacitación en liderazgo adaptados a las necesidades de su empresa.",
      "Incluye talleres prácticos, coaching ejecutivo y herramientas de desarrollo personal."
    ],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    category: "Capacitación",
    duration: "3 días",
    provider: {
      name: "Leadership Academy",
      rating: 4.8,
      reviews: 143,
      experience: "Expertos en desarrollo de líderes",
      specialties: ["Liderazgo Ejecutivo", "Gestión de Equipos", "Comunicación Efectiva"]
    }
  },
  {
    id: 15,
    name: "Optimización de Procesos",
    price: 1600000,
    description: "Mejora y automatización de procesos empresariales",
    longDescription: [
      "Analizamos y optimizamos los procesos de su empresa para mejorar la eficiencia y reducir costos.",
      "El servicio incluye mapeo de procesos, identificación de mejoras y implementación de automatizaciones."
    ],
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
    category: "Procesos",
    duration: "2 semanas",
    provider: {
      name: "Process Solutions",
      rating: 4.7,
      reviews: 87,
      experience: "Especialistas en mejora continua",
      specialties: ["Lean Six Sigma", "Automatización", "Gestión de Calidad"]
    }
  }
];

const ServiceList: React.FC<ServiceListProps> = ({ onAddToCart }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <img
              src={service.image}
              alt={service.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {service.category}
                </span>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.duration}
                </div>
              </div>
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600 mt-1 text-sm">{service.description}</p>
              
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{service.provider.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {service.provider.rating} ({service.provider.reviews} reseñas)
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">{formatCurrency(service.price)}</span>
                  <button
                    onClick={() => {
                      setSelectedService(service);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Contratar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={onAddToCart}
        />
      )}
    </>
  );
};

export default ServiceList;