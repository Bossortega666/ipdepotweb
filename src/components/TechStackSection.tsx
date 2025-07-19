import React from 'react';
import techStackImage from '../assets/tech-stack.png'; // asegúrate de que esta ruta sea correcta

const TechStackSection = () => {
  return (
  
  
  <div className="w-screen overflow-x-hidden">
    <img
      src={techStackImage}
      alt="Tecnologías"
      className="w-screen h-auto object-cover block"
    />
  </div>


  );
};

export default TechStackSection;
