import React, { useState, useEffect } from "react";
import "antd/dist/reset.css";

import { Menu, Dropdown, Button, Card } from "antd";
import {
  MenuOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { motion } from "framer-motion";

//import heroImage1 from "../assets/banner-ai.png";
import heroImage2 from "../assets/banner-ai2.png";
import heroImage3 from "../assets/banner-ai3.png";
import heroImage4 from "../assets/banner-ai4.png";
import heroImage5 from "../assets/banner-ai5.png";
import logo from "../assets/logo.png";


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
  className="h-10 object-contain"
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

      <main className="container mx-auto px-4 py-16">
        <section id="inicio" className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-800">
  Transformación Digital con Soluciones de Software e Inteligencia Artificial
</h2>


          {/* Slider con Swiper.js y animación */}
          <motion.div
            className="max-w-5xl mx-auto mb-10 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              loop={true}
              autoplay={{ delay: 3000 }}
              navigation
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow, Autoplay, Navigation]}
              className="mySwiper"
            >
              {[heroImage3,heroImage4,heroImage5].map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="w-72 md:w-96 flex items-center justify-center"
                >
                 <img
                src={img}
                alt={`slide-${index}`}
                className="rounded-2xl shadow-2xl w-full h-[400px] md:h-[500px] object-cover"
              />

                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>

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
              title: "Software a medida",
              desc: "Soluciones personalizadas para tus procesos empresariales.",
            },
            {
              title: "Integración de IA",
              desc: "Automatiza decisiones y mejora tus servicios con inteligencia artificial.",
            },
            {
              title: "Consultoría UX/UI",
              desc: "Diseño de interfaces intuitivas centradas en el usuario.",
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

    <form className="space-y-6 text-left">
      <input
        type="text"
        placeholder="Nombre / Name"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="email"
        placeholder="Correo electrónico / Email"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="tel"
        placeholder="Teléfono / Telephone"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Nombre de la empresa / Name of the company"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Giro de la empresa / Company line"
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Explícanos de tu proyecto / Tell us about your project"
        rows={4}
        className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      ></textarea>

      <Button type="primary" size="large" className="w-full mt-4">
        Enviar mensaje
      </Button>
    </form>
  </div>
</section>

      <footer className="bg-white border-t py-8 text-center text-sm text-gray-500">
        © 2025 DEPOT. Todos los derechos reservados.
      </footer>
    </div>
  );
}
