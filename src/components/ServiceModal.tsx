import React from 'react';
import { X, Star, Clock, CheckCircle2 } from 'lucide-react';
import { Service } from '../types';

interface ServiceModalProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
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

const ServiceModal: React.FC<ServiceModalProps> = ({ service, isOpen, onClose, onAddToCart }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">{service.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{formatCurrency(service.price)}</span>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAddToCart(service);
                    onClose();
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Descripción del Servicio</h3>
                {service.longDescription?.map((paragraph, index) => (
                  <p key={index} className="text-gray-600 mb-4">{paragraph}</p>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Información del Proveedor</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium">{service.provider.name}</span>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="ml-1">
                        {service.provider.rating} ({service.provider.reviews} reseñas)
                      </span>
                    </div>
                  </div>
                  
                  {service.provider.experience && (
                    <p className="text-gray-600 mb-3">{service.provider.experience}</p>
                  )}

                  {service.provider.specialties && (
                    <div>
                      <h4 className="font-medium mb-2">Especialidades:</h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {service.provider.specialties.map((specialty, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;