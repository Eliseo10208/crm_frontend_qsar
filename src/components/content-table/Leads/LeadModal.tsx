import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface Lead {
  id: number;
  name: string;
  email: string;
  source: string;
  stage: 'Captación' | 'Conversión' | 'Venta' | 'Fidelización';
  lastActivity: Date;
  status: 'active' | 'pending' | 'converted';
}

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  isOpen,
  onClose
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !lead) return null;

  const getStageColor = (stage: string): string => {
    switch (stage) {
      case 'Captación': return 'text-blue-600 bg-blue-50';
      case 'Conversión': return 'text-indigo-600 bg-indigo-50';
      case 'Venta': return 'text-green-600 bg-green-50';
      case 'Fidelización': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
          {/* Header */}
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-blue-600 text-xl font-bold">
                    {lead.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {lead.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{lead.email}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <span className="sr-only">Cerrar</span>
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pb-5 sm:p-6">
            {/* Estado actual */}
            <div className="border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Estado actual</p>
                  <span className={`mt-2 inline-flex rounded-full px-3 py-1 text-sm font-medium ${getStageColor(lead.stage)}`}>
                    {lead.stage}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-500">Origen</p>
                  <p className="mt-2 text-sm text-gray-900">{lead.source}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-4">
              <h4 className="text-base font-medium text-gray-900">Actividad reciente</h4>
              <div className="mt-3 flex gap-3">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg 
                      className="h-4 w-4 text-blue-600" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-900">
                    {formatDate(lead.lastActivity)}
                  </p>
                  <p className="text-sm text-gray-500">Última interacción registrada</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300"
              >
                Cerrar
              </button>
              <button
                className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Editar Lead
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default LeadDetailModal;