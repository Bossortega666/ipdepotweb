import React from "react";
import { motion } from "framer-motion";

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

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center mb-10 rounded-2xl">
      <h1 className="text-2xl font-bold text-indigo-700">IP DEPOT</h1>
      <ul className="flex gap-6 text-gray-600 font-medium">
        <li className="hover:text-indigo-600 cursor-pointer">Inicio</li>
        <li className="hover:text-indigo-600 cursor-pointer">Servicios</li>
        <li className="hover:text-indigo-600 cursor-pointer">Contacto</li>
      </ul>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-20 text-center text-sm text-gray-500 py-6 border-t border-gray-200">
      © {new Date().getFullYear()} IP DEPOT. Todos los derechos reservados.
    </footer>
  );
}

export default function SoftwareCompanyHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 via-white to-gray-200 text-gray-800 p-6">
      <Navbar />

      <header className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-4 text-indigo-700"
        >
          IP DEPOT
        </motion.h1>
        <p className="text-xl text-gray-600">Innovación y Desarrollo de Software a la Medida</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <Card>
          <CardContent>
            <div className="text-indigo-500 text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-semibold mb-2">Desarrollo Web</h2>
            <p className="text-gray-600">Aplicaciones modernas, rápidas y escalables usando tecnologías como React, Node.js y AWS.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-green-500 text-4xl mb-4">💻</div>
            <h2 className="text-2xl font-semibold mb-2">Sistemas a la Medida</h2>
            <p className="text-gray-600">Soluciones de software personalizadas según las necesidades de tu empresa u organización.</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="text-yellow-500 text-4xl mb-4">📞</div>
            <h2 className="text-2xl font-semibold mb-2">Consultoría Técnica</h2>
            <p className="text-gray-600">Apoyo experto en arquitectura de software, seguridad, infraestructura y tecnologías emergentes.</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-6">¿Listo para transformar tu idea en software?</h2>
        <Button className="text-lg px-8 py-4">Contáctanos</Button>
      </section>

      <Footer />
    </div>
  );
}
