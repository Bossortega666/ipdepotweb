import React, { useState, useEffect } from "react";
import { FaWhatsapp } from 'react-icons/fa';
import FadeInOnScroll from "../components/FadeInOnScroll";



//import type { FC } from "react";
import "antd/dist/reset.css";

import { Menu, Dropdown, Button, Card } from "antd";
import {
  MenuOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';
import Swal from 'sweetalert2';

import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import softwareImage from '../assets/uno.png';
import iaImage from "../assets/dos.png";
import rekog from "../assets/3.png";
import voz from "../assets/cuatro.png";
import thales from "../assets/thales.png"
import amplyfy from "../assets/amplify.png"





//import heroImage2 from "../assets/banner-ai2.png";
import heroImage3 from "../assets/banner-ai3.png";
import heroImage4 from "../assets/banner-ai4.png";
import heroImage5 from "../assets/banner-ai5.png";
import logo from "../assets/logo.png";
import TechStackSection from './TechStackSection'; // o '../components/TechStackSection' según tu estructura
import { Modal } from "antd";


import { FaRobot } from "react-icons/fa";
import type { FC } from 'react';
import { ElementType } from 'react';
import WalletIntegrationBlock from './WalletIntegrationBlock'; 
// ajusta la ruta según tu estructura de carpetas


import TextareaAutosize from 'react-textarea-autosize';

const images = [heroImage3, heroImage4, heroImage5];

const navItems = [
  { key: "inicio", label: "Inicio" },
  { key: "servicios", label: "Servicios" },
  { key: "proyectos", label: "Proyectos" },
  { key: "equipo", label: "Equipo" },
  { key: "contacto", label: "Contacto" },
];

// Primero declara tu array de proyectos, por ejemplo arriba del return:
const proyectos = [
  {
    id: 1,
    titulo: "Sistema de Emisión de Licencias Quintana Roo",
    descripcion:
      "En Quintana Roo transformamos la emisión de licencias de conducir con un sistema innovador, impulsado por Inteligencia Artificial (IA) y módulos de biometría multicanal que garantizan la autenticación del ciudadano de forma rápida, precisa y segura.",
  },
  {
    id: 2,
    titulo: "Automatización de Procesos Gubernamentales",
    descripcion:
      "Implementamos IA para analizar documentos y automatizar flujos administrativos en entidades públicas, mejorando la eficiencia.",
  },
  {
    id: 3,
    titulo: "Reconocimiento Facial para Licencias Digitales",
    descripcion:
      "Integramos reconocimiento facial con IA para autenticar identidades en tiempo real durante la emisión de licencias de conducir digitales.",
      
  },
   {
    id: 4,
    titulo: "Integraciones con Gooogle Wallet y Apple Wallet",
    descripcion:
      "En nuestra empresa de desarrollo de software a la medida, potenciamos la innovación con soluciones digitales que se integran perfectamente con Google Wallet y Apple Wallet, ofreciendo a nuestros clientes experiencias digitales seguras, prácticas y alineadas con las tendencias globales.",
      
  },
];
// LOGICA DEL BOTON DE WHATSAPP
const WhatsappButton: React.FC = () => {
  return (
    <a
      href="https://wa.me/5212227249643"
       target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-green-400 to-green-600 text-white p-4 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:shadow-green-500/50 animate-pulse"
    >
      {React.createElement(FaWhatsapp as unknown as React.ElementType, { size: 32 })}
    </a>
  );
};



// Mini Chat Claude
// 👇 Pega esto arriba de `export default function SoftwareCompanyHome() {`
const ClaudeChat = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [conversation, setConversation] = useState(""); // ✅ Nuevo: historial acumulado
  const [loading, setLoading] = useState(false);

  const handleClaudeSend = async () => {
    if (!prompt.trim()) {
      
        toast('⚠️ Por favor, ingresa un texto para enviar a la IA.', {
    icon: '🤖',
    style: {
      borderRadius: '8px',
      background: '#0f172a',
      color: '#fff',
    },
  });
  return;
  

    }

    setLoading(true);

    try {
      const res = await fetch(
        "https://0mg2ysk841.execute-api.us-east-1.amazonaws.com/prod/invoke-bedrock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: prompt,
            conversation: conversation // ✅ Se manda todo el historial
          }),
        }
      );

      const data = await res.json();
      const assistantReply = data.result?.trim() || "No hubo respuesta";

      // ✅ Actualiza historial
      const updatedConversation =
        `${conversation}\n\nHuman: ${prompt}\n\nAssistant: ${assistantReply}`;
      setConversation(updatedConversation);

      setResponse(assistantReply);
      setPrompt(""); // Limpia textarea
    } catch (err) {
      console.error(err);
      alert("❌ Error llamando a Claude");
    } finally {
      setLoading(false);
    }
  };

  return (
   <motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="relative my-16 w-full max-w-2xl mx-auto px-4"
>
  <div className="relative rounded-3xl p-8 bg-white/80 backdrop-blur-lg border border-blue-200/30 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.3)] overflow-hidden transition hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)]">
    
    {/* Sutil glow corporativo */}
    <div className="absolute -top-10 -right-10 w-60 h-60 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>

    <div className="relative z-10 flex flex-col gap-6">
      {/* Encabezado */}
      
      <div className="flex items-center gap-3">
        
        <motion.div
  animate={{
    y: [0, -5, 0],
    rotate: [0, -2, 2, -2, 0],
  }}
  transition={{
    repeat: Infinity,
    duration: 3,
    ease: "easeInOut",
  }}
>
<RobotIcon className="text-4xl text-cyan-600 drop-shadow" />
</motion.div>
        <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">
          IA IP DEPOT · Bedrock
        </h3>
      </div>

      {/* Textarea */}
      <TextareaAutosize
        minRows={4}
        maxRows={8}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Pregúntale algo a la IA..."
        className="w-full rounded-2xl border border-blue-100 px-5 py-4 bg-white/70 backdrop-blur-sm placeholder:text-gray-500 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-inner"
      />

      {/* Botón primario */}
      <button
        onClick={handleClaudeSend}
        disabled={loading}
        className="w-full rounded-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-semibold py-3 shadow-md transition hover:shadow-lg"
      >
        {loading ? "Generando respuesta..." : "Enviar pregunta"}
      </button>

      {/* Respuesta */}
      <div>
        <h4 className="text-base font-semibold text-gray-700 mb-2">Respuesta:</h4>
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-6">
              <div className="h-12 w-12 rounded-full border-t-4 border-b-4 border-cyan-500 animate-spin"></div>
              <p className="mt-4 text-gray-600 font-medium">Generando respuesta...</p>
            </div>
          ) : (
            <motion.pre
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white/60 border border-blue-100 rounded-xl p-4 text-gray-800 whitespace-pre-wrap break-words shadow-inner"
            >
              {response || ""}
            </motion.pre>
          )}
        </div>
      </div>
    </div>
  </div>
</motion.div>



  );
};


const RobotIcon = FaRobot as unknown as FC<{ className?: string }>;


export default function SoftwareCompanyHome() {
  const [activeSection, setActiveSection] = useState("inicio");
  
  // Estado del formulario de contacto
  
const [contactData, setContactData] = useState({
  name: '',
  email: '',
  phone: '',
  companyName: '',
  companyLine: '',
  message: ''
});

const [sending, setSending] = useState(false);

// Maneja cambios en cada input
const handleContactChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  setContactData({
    ...contactData,
    [e.target.name]: e.target.value,
  });
};

const [openModal, setOpenModal] = useState(false); // Modales , saber mas...
const [selectedService, setSelectedService] = useState<{ title: string; desc: string; image?: string } | null>(null);


const handleOpenModal = (service: { title: string; desc: string }) => {
  setSelectedService(service);
  setOpenModal(true);
};

const handleCloseModal = () => {
  setOpenModal(false);
  setSelectedService(null);
};




// Maneja el submit del formulario
const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setSending(true);
  try {
    const response = await fetch(
      'https://0mg2ysk841.execute-api.us-east-1.amazonaws.com/prod/SendEmail',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      }
    );
    const result = await response.json();
    if (response.ok) {
      alert('✅ Mensaje enviado: ' + result.message);
      setContactData({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        companyLine: '',
        message: ''
      });
    } else {
      alert('❌ Error: ' + result.message);
    }
  } catch (error) {
    console.error(error);
    alert('❌ Hubo un error al enviar el mensaje.');
  } finally {
    setSending(false);
  }
};


  
  useEffect(() => {
  const video = document.querySelector('video');
  if (video) {
    video.play().catch(err => {
      console.log('Autoplay bloqueado:', err);
    });
  }
}, []);


  useEffect(() => {
    const sections = navItems.map((item) => document.getElementById(item.key));

    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-ipdepot bg-cover bg-center bg-no-repeat">
      
      <header className="sticky top-0 z-50 backdrop-blur bg-blue-800/9 shadow-md border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <img
            src={logo}
            alt="IP DEPOT logo"
            className="h-[200px] md:h-[90px] lg:h-[80px] w-auto object-contain"

          />

          {/* Menú desktop */}
          <nav className="hidden md:flex space-x-6 relative">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={`#${item.key}`}
                className={`group relative text-sm font-semibold uppercase tracking-wide transition-all duration-300 ${
                  activeSection === item.key
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${
                    activeSection === item.key ? "scale-x-100" : ""
                  }`}
                />
              </a>
            ))}
          </nav>

          {/* Menú móvil */}
          <div className="md:hidden">
            <Dropdown
              menu={{
                items: navItems.map((item) => ({
                  key: item.key,
                  label: (
                    <a
                      href={`#${item.key}`}
                      className={`block px-4 py-2 text-sm font-medium ${
                        activeSection === item.key
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {item.label}
                    </a>
                  ),
                })),
              }}
              placement="bottomRight"
              arrow
              overlayClassName="bg-white/90 backdrop-blur shadow-xl rounded-xl"
            >
              <Button
                icon={<MenuOutlined />}
                className="border-none shadow-none text-gray-700 hover:text-blue-600 bg-white/80 backdrop-blur"
              />
            </Dropdown>
          </div>
        </div>
      </header>
       <div className="relative w-full h-screen overflow-hidden">
  {/* Video de fondo */}
  <video
  autoPlay
  loop
  muted
  playsInline
  controls
  className="absolute inset-0 w-full h-full object-cover"
>
  <source src="/videos/video.webm" type="video/webm" />
  <source src="/videos/video.mp4" type="video/mp4" />
  Tu navegador no soporta video HTML5.
</video>


  {/* Overlay para contraste */}
  <div className="absolute inset-0 bg-black/50 z-10"></div>

  {/* Contenido centrado */}
  <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow">
      Web Development & AI Solutions — Global Reach
    </h1>
    <p className="text-white text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
      Transformamos ideas en experiencias digitales.
    </p>
    <Button
      type="primary"
      size="large"
      href="#contacto"
      className="px-8 py-4"
    >
      ¡Habla con nosotros!
    </Button>
  </div>
</div>

      <main className="container mx-auto px-4 py-16">
        <section id="inicio" className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-800">
            Transformación Digital con Soluciones de Software e Inteligencia Artificial
          </h2>

            {}
          <ClaudeChat />
        
  
 



  {/* Contenido animado */}
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: 'easeOut' }}
  className="relative z-10 px-6 py-24 md:py-32 text-center max-w-7xl mx-auto"
>
  <div className="bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.15)] rounded-3xl p-10 md:p-20">
    
    <h1 className="text-4xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight drop-shadow-sm">
      Tu socio estratégico en la nube
    </h1>

    <p className="mt-6 text-xl md:text-2xl text-gray-800 font-medium drop-shadow-sm max-w-4xl mx-auto leading-relaxed">
      Expertos en diseño, implementación y gestión de soluciones cloud de última generación para organizaciones visionarias.
    </p>

    <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
      Impulsa tu negocio con <span className="text-indigo-600 font-semibold">inteligencia artificial</span>, automatización, y software de alto rendimiento,
      todo respaldado por arquitectura moderna y escalable.
    </p>
  </div>
</motion.div>

<p className="text-center text-gray-900 text-xl md:text-2xl font-semibold tracking-wide max-w-5xl mx-auto mt-20 px-8 py-8 bg-gradient-to-br from-white/80 to-gray-100/70 backdrop-blur-2xl border border-gray-300 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl">
  <span className="text-indigo-600 font-bold">Transformamos</span> ideas complejas en <span className="text-indigo-500 font-bold">soluciones digitales</span> elegantes, funcionales y preparadas para el futuro.
</p>


          
        </section>

        <h3 className="text-3xl font-bold text-center mb-10">
          <span className="bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
            Servicios
          </span>
        </h3>
        

        {/* Servicios animados */}
        
        <section id="servicios" className="grid md:grid-cols-3 gap-8 mb-24">
  {[
    {
      title: "Software a Medida",
      desc: "En IP DEPOT, entendemos que cada dependencia gubernamental enfrenta retos únicos en materia de gestión, transparencia y recaudación. Por ello, desarrollamos software a medida, diseñado específicamente para modernizar procesos, reducir tiempos operativos y fortalecer la eficiencia institucional.Nuestras soluciones tecnológicas permiten a los gobiernos automatizar trámites, digitalizar servicios y optimizar la captación de ingresos, generando un impacto directo en la mejora de la atención ciudadana y el cumplimiento de metas fiscales.Trabajamos de la mano con cada entidad para construir plataformas sólidas, seguras y escalables, que se adaptan a los marcos normativos y necesidades particulares de cada organismo. Desde sistemas de licenciamiento y control vehicular hasta plataformas de fiscalización inteligente, en IP DEPOT transformamos la tecnología en una herramienta estratégica para incrementar la recaudación con transparencia y eficiencia.Con IP DEPOT, la innovación se convierte en política pública.",
      image:softwareImage
    },
    {
      title: "Integración de IA",
      desc: "Transforma la forma en que operas con soluciones inteligentes y personalizadas, diseñadas para adaptarse a cada proceso de tu negocio. Hoy, la combinación de software a medida con Inteligencia Artificial (IA) abre un mundo de posibilidades: Automatiza tareas repetitivas. Optimiza recursos con análisis predictivo. Toma decisiones estratégicas basadas en datos reales.",
      image:iaImage
    },
    {
      title: "Reconocimiento Facial con IA",
      desc: "Integra la Inteligencia Artificial con Reconocimiento Facial y transforma la forma en que gestionas la seguridad, los accesos y la autenticación de usuarios.",
      image:rekog
    },
    {
      title: "Biometría de Voz: Seguridad y Autenticación",
      desc: "Impulsada por Inteligencia Artificial y servicios líderes como AWS Voice ID, la biometría de voz analiza patrones vocales, tonos, ritmos y frecuencias, creando una “huella vocal” única para cada usuario.",
    image:voz
    },
    {
      title: "Aplicaciones Serverless Offline",
      desc: "Combina la arquitectura serverless con capacidades offline y ofrece experiencias digitales sin interrupciones, incluso cuando no hay conexión a internet.",
    image:amplyfy
    },
    {
      title: "Integración de Dispositivos Multimarcas",
      desc: "Hoy, la diversidad de equipos y marcas no debe ser un obstáculo para tu empresa. Con soluciones de integración inteligente, conecta dispositivos multimarcas a tus sistemas, logrando una operación fluida, segura y centralizada.",
    image:thales
    },
    
  ].map((service, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true }}
    >
     <Card
  hoverable
  className="relative flex flex-col items-start overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg transition-transform duration-500 hover:shadow-xl hover:scale-105"
>
  {/* Imagen condicional */}
  {service.title === "Software a Medida" && (
    <img
      src={softwareImage}
      alt="Software a Medida"
      className="w-full object-cover h-40 md:h-52 rounded-t-2xl"
    />
  )}

  {service.title === "Integración de IA" && (
    <img
      src={iaImage}
      alt="Integración de IA"
      className="w-full object-cover h-40 md:h-52 rounded-t-2xl"
    />
  )}
   {service.title === "Reconocimiento Facial con IA" && (
    <img
      src={rekog}
      alt="Reconocimiento Facial con IA"
      className="w-full object-cover h-40 md:h-52 rounded-t-2xl"
    />
  )}
  {service.title === "Biometría de Voz: Seguridad y Autenticación" && (
    <img
      src={voz}
      alt="Biometría de Voz: Seguridad y Autenticación"
      className="w-full object-cover h-40 md:h-52 rounded-t-2xl"
    />
  )}
  {service.title === "Integración de Dispositivos Multimarcas" && (
    <img
      src={thales}
      alt="Integración de Dispositivos Multimarcasn"
      className="w-full object-cover h-40 md:h-52 rounded-t-2xl"
    />
  )}
  {service.title === "Aplicaciones Serverless Offline" && (
    <img
      src={amplyfy}
      alt="Aplicaciones Serverless Offline"
      className="w-full object-cover h-40 md:h-52 rounded-t-2xl"
    />
  )}

  {/* Contenido */}
  <div className="p-6 flex flex-col gap-4">
    <h4 className="text-xl font-bold text-gray-800">
      {service.title}
    </h4>
    <p className="text-gray-600 text-base leading-relaxed">
  {service.desc.length > 200
    ? service.desc.slice(0, 200) + "..."
    : service.desc}
</p>

    <button
  onClick={() => handleOpenModal(service)}
  className="mt-4 inline-flex items-center gap-2 self-start rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
>
  Saber más
  <ArrowRightOutlined />
</button>

  </div>
</Card>


      
    </motion.div>
  ))}
</section>


        {/* Proyectos animados */}
        <section id="proyectos" className="text-center mb-24">
  <h3 className="text-3xl font-bold mb-6">
    <span className="bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
      Proyectos Destacados
    </span>
  </h3>

  <p className="text-gray-600 max-w-xl mx-auto mb-10">
    Hemos colaborado con startups y grandes corporaciones para implementar soluciones tecnológicas innovadoras.
  </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {proyectos.map((proyecto, index) => (
      <motion.div
        key={proyecto.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        viewport={{ once: true }}
      >
        <Card
          title={proyecto.titulo}
          hoverable
          className="transition-transform shadow-md"
        >
          <p>{proyecto.descripcion}</p>
        </Card>
      </motion.div>
    ))}
  </div>
</section>


      </main>
    <section id="clientes" className="my-24 text-center">
  <FadeInOnScroll>
    <h3 className="text-3xl font-bold mb-10">
      <span className="bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
        Nuestros Clientes
      </span>
    </h3>
  </FadeInOnScroll>

  <FadeInOnScroll delay={0.2}>
    <div className="px-4">
      <Swiper
  modules={[Autoplay, Pagination]}
  spaceBetween={30}
  centeredSlides
  loop
  autoplay={{ delay: 2500, disableOnInteraction: false }}
  pagination={{ clickable: true }}
  breakpoints={{
    0: { slidesPerView: 1.2 },
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  className="flex items-center justify-center"
>

        {[{
          src: "/clientes/NuevoLeon.png",
          nombre: "Gobierno del Estado de Nuevo León"
        }, {
          src: "/clientes/QuintanaRoo.png",
          nombre: "Gobierno del Estado de Quintana Roo"
         } , {
          src: "/clientes/imoveqroo.png",
          nombre: "Instituto de movilidad de Estado de Quintana Roo"
          } , {
          src: "/clientes/transitobj.png",
          nombre: "Secretaria de Seguridad Ciudadana y Transito Benito Juarez"
        }].map(({ src, nombre }, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <FadeInOnScroll delay={index * 0.2}>
              <div className="group relative p-4 rounded-xl hover:scale-105 transition-transform duration-500 ease-out text-center">
                {/* Efecto glow */}
                <div className="absolute inset-0 rounded-xl bg-cyan-600/10 blur-lg opacity-0 group-hover:opacity-50 transition duration-700"></div>

                {/* Logo */}
                <img
                  src={src.trim()}
                  alt={`Cliente ${index + 1}`}
                  className="h-32 w-32 mx-auto object-contain grayscale group-hover:grayscale-0 transition duration-500 ease-in-out group-hover:rotate-1 drop-shadow-xl"

                />

                {/* Texto institucional */}
                <p className="mt-4 text-sm font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  {nombre}
                </p>
              </div>
            </FadeInOnScroll>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </FadeInOnScroll>
</section>





      <TechStackSection /> {/* Sección de tecnologías */}
     <Modal
  title={selectedService?.title}
  open={openModal}
  onCancel={handleCloseModal}
  footer={null}
  centered
>
  <div className="space-y-4 text-gray-800">
    {selectedService?.image && (
      <img
        src={selectedService.image}
        alt={selectedService.title}
        className="w-full h-48 object-cover rounded-xl shadow"
      />
    )}

    <p className="leading-relaxed text-base whitespace-pre-line">
      {selectedService?.desc}
    </p>

    <blockquote className="italic text-indigo-700 font-semibold border-l-4 pl-4 border-indigo-400 bg-indigo-50 p-3 rounded-md">
      “Transformamos tecnología en soluciones que generan resultados reales.”
    </blockquote>

    <ul className="list-disc list-inside text-sm text-gray-700">
      <li>✅ Aumento de eficiencia operativa</li>
      <li>🔐 Seguridad avanzada con IA</li>
      <li>📊 Decisiones estratégicas con datos en tiempo real</li>
    </ul>

    <div className="mt-6 text-center">
      <a
        href="#contacto"
        className="inline-block rounded-full bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition"
      >
        Solicita una demo gratuita
      </a>
    </div>
  </div>
</Modal>
      <section id="contacto" className="bg-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-800 to-cyan-700 bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h3>
          <p className="text-gray-600 mb-10">
            Envíenos un mensaje y un experto en Transformación Digital se comunicará con usted.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-6 text-left">

            <input
              type="text"
              name="name"
              placeholder="Nombre / Name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactData.name}
              onChange={handleContactChange}
            

            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico / Email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactData.email}
              onChange={handleContactChange}
           />
            <input
              type="tel"
              name="phone"
              placeholder="Teléfono / Telephone"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactData.phone}
              onChange={handleContactChange}            
            />
            <input
              type="text"
              name="companyName"
              placeholder="Nombre de la empresa / Name of the company"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactData.companyName}
              onChange={handleContactChange} 
            />
            <input
              type="text"
              name="companyLine"
              placeholder="Giro de la empresa / Company line"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactData.companyLine}
              onChange={handleContactChange} 
            />
            <textarea
              placeholder="Explícanos de tu proyecto / Tell us about your project"
              name="message"
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={contactData.message}
              onChange={handleContactChange}
            ></textarea>

           <Button
              htmlType="submit"
              type="default"
              size="large"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-600 focus:bg-blue-600 text-white border-none"
              disabled={sending}
            >
              {sending ? 'Enviando...' : 'Enviar mensaje'}
            </Button>

          </form>
        </div>
      </section>

      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        © 2025 DEPOT. Todos los derechos reservados. v 1.3
      </footer>
      
       <WhatsappButton />
       <Toaster position="top-center" />

    </div>
  );
}
