import { useState } from 'react';
import { WrenchScrewdriverIcon, BoltIcon, KeyIcon, TruckIcon, Battery100Icon, ShoppingCartIcon, FireIcon } from '@heroicons/react/24/outline';

const services = [
  { id: 1, name: "Tyre Puncture", icon: WrenchScrewdriverIcon },
  { id: 2, name: "Fuel Delivery", icon: BoltIcon },
  { id: 3, name: "Towing Assistance", icon: TruckIcon },
  { id: 4, name: "Key Lockout", icon: KeyIcon },
  { id: 5, name: "Battery Jump Start", icon: Battery100Icon },
  { id: 6, name: "Instant Car Repair", icon: WrenchScrewdriverIcon },
  { id: 7, name: "Instant Car Sell", icon: ShoppingCartIcon },
  { id: 8, name: "Motor Insurance", icon: FireIcon },
  { id: 9, name: "RSA for Two Wheeler", icon: TruckIcon },
  { id: 10, name: "Emergency Roadside Inspections", icon: WrenchScrewdriverIcon },
  { id: 11, name: "On-Road Emergency Assistance Service", icon: BoltIcon },
  { id: 12, name: "Spares Parts Delivery", icon: ShoppingCartIcon },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Popular Services</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {services.map(service => (
          <button
            key={service.id}
            onClick={() => setSelectedService(service)}
            className="flex flex-col items-center bg-white p-4 rounded shadow hover:shadow-lg transition hover:scale-105"
          >
            <service.icon className="h-10 w-10 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-800">{service.name}</span>
          </button>
        ))}
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transform transition duration-300 animate-fade-in"
          >
            <h3 className="text-2xl font-bold mb-4">{selectedService.name}</h3>
            <p className="text-gray-600 mb-4">
              Detailed information about <strong>{selectedService.name}</strong> service goes here.
            </p>
            <button
              onClick={() => setSelectedService(null)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
