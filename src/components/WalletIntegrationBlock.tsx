// WalletIntegrationBlock.jsx
import React from 'react';
import walletIntegrationImg from '../assets/uno.jpg'; // 👉 Usa la ruta correcta de tu imagen

export default function WalletIntegrationBlock() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
      {/* Imagen */}
      <div className="w-full md:w-1/2">
        <img
          src={walletIntegrationImg}
          alt="Integración con Google Wallet y Apple Wallet"
          className="w-full rounded-2xl shadow-lg"
        />
      </div>

      {/* Texto */}
      <div className="w-full md:w-1/2">
        <h3 className="text-3xl font-bold mb-4 text-gray-800">
          Integraciones con Google Wallet y Apple Wallet
        </h3>
        <p className="text-gray-600 text-lg leading-relaxed">
          En nuestra empresa de desarrollo de software a la medida, potenciamos la innovación
          con soluciones digitales que se integran perfectamente con Google Wallet y Apple Wallet,
          ofreciendo a nuestros clientes experiencias digitales seguras, prácticas y alineadas con las tendencias globales.
        </p>
      </div>
    </div>
  );
}
