import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heroImage1 from "../assets/banner-ai.png";
import heroImage2 from "../assets/banner-ai2.png";
import heroImage3 from "../assets/banner-ai3.png";

function Navbar({ activeSection, setActiveSection }) {
  const [scrolled, setScrolled] = useState(false);

  const menuItems = [
    "INICIO",
    "QUIÉNES SOMOS",
    "SOLUCIONES",
    "VACANTES",
    "PROYECTOS / CASOS DE ÉXITO",
    "CONTACTO"
  ];

  useEffect(() => {
    let lastScroll = 0;
    const onScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
      const nav = document.getElementById("navbar");
      if (nav) {
        if (currentScroll > lastScroll && currentScroll > 100) {
          nav.style.transform = "translateY(-100%)";
        } else {
          nav.style.transform = "translateY(0)";
        }
      }
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 px-8 flex justify-between items-center transition-all duration-300 transform ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md text-gray-800"
          : "bg-transparent text-white"
      }`}
    >
      <h1 className="text-xl font-bold drop-shadow-md">IP DEPOT</h1>
      <ul className="flex gap-6 items-center font-semibold text-xs drop-shadow-md">
        {menuItems.map((item) => (
          <li
            key={item}
            onClick={() => {
              const el = document.getElementById(item);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className={`cursor-pointer hover:text-indigo-300 transition-colors duration-200 ${
              activeSection === item ? "underline underline-offset-4" : ""
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

function Button({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
      className={`bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition duration-300 ${className}`}
    >
      {children}
    </motion.button>
  );
}

function Card({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Footer() {
  return (
    <footer className="mt-20 text-center text-sm text-gray-500 py-6 border-t border-gray-200">
      © {new Date().getFullYear()} IP DEPOT. Todos los derechos reservados.
    </footer>
  );
}

export default function SoftwareCompanyHome() {
  const [activeSection, setActiveSection] = useState("INICIO");

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "INICIO",
        "QUIÉNES SOMOS",
        "SOLUCIONES",
        "VACANTES",
        "PROYECTOS / CASOS DE ÉXITO",
        "CONTACTO"
      ];
      const offsets = sections
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean);

      const scrollY = window.scrollY + 80;
      const current = offsets.reverse().find((s) => scrollY >= s.top);
      if (current && current.id !== activeSection) {
        setActiveSection(current.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200 text-gray-800 relative">
      {/* 1) Colocamos el Navbar aquí, como elemento fijo (fixed) con z-50 */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* 2) Slider responsivo: 60vh en móvil, 70vh en sm, 80vh en lg */}
      <header
        id="INICIO"
        className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden"
      >
        {/* Le damos z-0 al slider para que quede detrás del navbar */}
        <div className="relative z-0 h-full">
          <Slider {...sliderSettings}>
            {[heroImage1, heroImage2, heroImage3].map((img, index) => (
              <div key={index} className="relative w-full h-full">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4 bg-black/40">
                  <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl font-extrabold mb-4 drop-shadow-lg"
                  >
                    IP DEPOT VERSION FINAL 2
                  </motion.h1>
                  <p className="text-xl text-gray-100 max-w-xl drop-shadow-sm">
                    Innovación y Desarrollo de Software a la Medida
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </header>

      <motion.section
        id="QUIÉNES SOMOS"
        className="pt-24 pb-20 px-6 bg-white text-gray-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-indigo-700 mb-8">¿Quiénes Somos?</h2>
          <p className="text-lg leading-relaxed mb-6">
            En <span className="font-semibold text-indigo-600">IP DEPOT</span>, somos una empresa de desarrollo de software especializada en soluciones tecnológicas de alto impacto.
            Desde nuestra fundación, nos hemos dedicado a transformar procesos complejos en plataformas digitales ágiles, seguras y escalables.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Nuestro equipo está compuesto por ingenieros, diseñadores y consultores con amplia experiencia en desarrollo web, aplicaciones móviles, inteligencia artificial,
            ciberseguridad y servicios en la nube. Nos enorgullece ser aliados tecnológicos de organizaciones que buscan innovación, eficiencia y crecimiento sostenible.
          </p>
          <p className="text-lg leading-relaxed mb-6">
            Nos diferenciamos por nuestro enfoque integral: desde el análisis estratégico y diseño UX/UI, hasta la implementación, pruebas y mantenimiento continuo.
            Cada proyecto que desarrollamos se alinea con los objetivos del cliente, garantizando resultados medibles y soluciones adaptadas a su realidad operativa.
          </p>
          <div className="mt-10 text-left space-y-4">
            <p className="text-lg">
              <strong className="text-indigo-700">Nuestra misión:</strong> Desarrollar tecnología que potencie el crecimiento de nuestros clientes.
            </p>
            <p className="text-lg">
              <strong className="text-indigo-700">Nuestra visión:</strong> Ser líderes en innovación tecnológica en América Latina, marcando tendencia en el desarrollo de software seguro y ético.
            </p>
            <p className="text-lg">
              <strong className="text-indigo-700">Nuestros valores:</strong> Innovación · Transparencia · Compromiso · Excelencia Técnica
            </p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}


