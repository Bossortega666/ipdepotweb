import React, { useState, useEffect } from "react";
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

import { motion } from "framer-motion";

import heroImage2 from "../assets/banner-ai2.png";
import heroImage3 from "../assets/banner-ai3.png";
import heroImage4 from "../assets/banner-ai4.png";
import heroImage5 from "../assets/banner-ai5.png";
import logo from "../assets/logo.png";

const images = [heroImage3, heroImage4, heroImage5];

const navItems = [
  { key: "inicio", label: "Inicio" },
  { key: "servicios", label: "Servicios" },
  { key: "ia", label: "IA e Integraciones" },
  { key: "proyectos", label: "Proyectos" },
  { key: "equipo", label: "Equipo" },
  { key: "contacto", label: "Contacto" },
];

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
const handleContactChange = (e) => {
  setContactData({
    ...contactData,
    [e.target.name]: e.target.value
  });
};

// Maneja el submit del formulario
const handleContactSubmit = async (e) => {
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

         <div className="relative w-full h-screen overflow-hidden">
  
 



  {/* Contenido animado */}
  <motion.div
    className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <div className="mb-4">
      <span className="inline-block p-4 rounded-full bg-blue-600/70 backdrop-blur">
        <ArrowRightOutlined className="text-white text-xl" />
      </span>
    </div>
    <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow">
   "Tu socio estratégico en la nube: expertos en diseño, implementación y gestión de soluciones cloud de última generación."
    </h1>
    <p className="text-white text-lg md:text-xl mb-6 max-w-2xl drop-shadow">
      Impulsa tu negocio con IA y software a medida, respaldado por la última tecnología.
    </p>
    
  </motion.div>
</div>


          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transformamos tus ideas en soluciones digitales con inteligencia artificial
            de vanguardia y diseño de experiencia de usuario de clase mundial.
          </p>

          <a href="#contacto">
            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              className="px-6 py-3"
            >
              Contáctanos
            </Button>
          </a>
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
              desc: "Descubre el poder de las soluciones personalizadas, diseñadas específicamente para optimizar y transformar tus procesos empresariales.",
            },
            {
              title: "Integración de IA",
              desc: "Transforma la forma en que operas con soluciones inteligentes y personalizadas, diseñadas para adaptarse a cada proceso de tu negocio. Hoy, la combinación de software a medida con Inteligencia Artificial (IA) abre un mundo de posibilidades: Automatiza tareas repetitivas. Optimiza recursos con análisis predictivo. Toma decisiones estratégicas basadas en datos reales.",
            },
            {
              title: "Reconocimiento Facial con IA",
              desc: "ntegra la Inteligencia Artificial con Reconocimiento Facial y transforma la forma en que gestionas la seguridad, los accesos y la autenticación de usuarios.",
            },
            {
              title: "Biometría de Voz: Seguridad y Autenticación",
              desc: "Impulsada por Inteligencia Artificial y servicios líderes como AWS Voice ID, la biometría de voz analiza patrones vocales, tonos, ritmos y frecuencias, creando una “huella vocal” única para cada usuario.",
            },
            {
              title: "Aplicaciones Serverless Offline",
              desc: "Combina la arquitectura serverless con capacidades offline y ofrece experiencias digitales sin interrupciones, incluso cuando no hay conexión a internet.",
            },
            {
              title: "Integración de Dispositivos Multimarcas",
              desc: "Hoy, la diversidad de equipos y marcas no debe ser un obstáculo para tu empresa. Con soluciones de integración inteligente, conecta dispositivos multimarcas a tus sistemas, logrando una operación fluida, segura y centralizada.",
            },

          ].map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card title={service.title} hoverable className="shadow-md">
                <p>{service.desc}</p>
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
            {[1, 2, 3].map((project, index) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card
                  title={`Proyecto IA #${project}`}
                  hoverable
                  className="transition-transform"
                >
                  <p>Optimización operativa mediante modelos de predicción personalizados.</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
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
        © 2025 DEPOT. Todos los derechos reservados. v 1.0.1
      </footer>
    </div>
  );
}
