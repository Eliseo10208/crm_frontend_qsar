import React, { useState } from 'react';

// Definir la interfaz para el tipo de mensaje
interface Message {
  id: number;
  from: string;
  subject: string;
  preview: string;
  date: string;
  unread: boolean;
  starred: boolean;
}

const Mailbox = () => {
  // Estado para los mensajes
  const [messages] = useState<Message[]>([
    {
      id: 1,
      from: 'Juan Pérez',
      subject: 'Actualización del proyecto',
      preview: 'Hola, te envío las últimas actualizaciones del proyecto...',
      date: '10:30 AM',
      unread: true,
      starred: false,
    },
    {
      id: 2,
      from: 'María García',
      subject: 'Reunión de equipo',
      preview: 'Buenos días, recordatorio de nuestra reunión semanal...',
      date: 'Ayer',
      unread: false,
      starred: true,
    },
    {
      id: 3,
      from: 'Carlos Rodríguez',
      subject: 'Documentación pendiente',
      preview: 'Necesitamos revisar los siguientes documentos...',
      date: '23 Mar',
      unread: true,
      starred: false,
    },
  ]);

  // Estado para el mensaje seleccionado
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  return (
    <div className="h-screen flex">
      {/* Barra lateral */}
      <div className="w-64 bg-gray-100 border-r">
        <div className="p-4">
          <button className="w-full bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition-colors">
            Nuevo Mensaje
          </button>
        </div>
        
        <nav className="p-2">
          <ul className="space-y-1">
            {['Bandeja de entrada', 'Destacados', 'Enviados', 'Borradores', 'Papelera'].map((folder) => (
              <li key={folder}>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                  {folder}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Lista de mensajes */}
      <div className="flex-1 flex flex-col">
        {/* Barra de búsqueda */}
        <div className="p-4 border-b">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar mensajes..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
            />
            <svg
              className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Lista de mensajes */}
        <div className="flex-1 overflow-auto">
          {messages.map((message) => (
            <button
              key={message.id}
              onClick={() => setSelectedMessage(message)}
              className={`w-full p-4 border-b hover:bg-gray-50 transition-colors flex items-center gap-4 ${
                message.unread ? 'bg-blue-50' : ''
              } ${selectedMessage?.id === message.id ? 'bg-blue-100' : ''}`}
            >
              {/* Checkbox y estrella */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Aquí iría la lógica para marcar como destacado
                  }}
                  className={`h-5 w-5 ${message.starred ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                  <svg
                    fill={message.starred ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </button>
              </div>

              {/* Información del mensaje */}
              <div className="flex-1 min-w-0 text-left">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${message.unread ? 'text-black' : 'text-gray-700'}`}>
                    {message.from}
                  </span>
                  <span className="text-sm text-gray-500">{message.date}</span>
                </div>
                <div className="text-sm">
                  <span className={message.unread ? 'font-medium' : ''}>
                    {message.subject}
                  </span>
                  <span className="text-gray-500"> - {message.preview}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Panel de visualización del mensaje */}
      <div className="w-1/2 bg-white border-l">
        {selectedMessage ? (
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">{selectedMessage.subject}</h2>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-medium">{selectedMessage.from}</p>
                <p className="text-sm text-gray-500">para mí</p>
              </div>
              <span className="text-sm text-gray-500">{selectedMessage.date}</span>
            </div>
            <p className="text-gray-700">{selectedMessage.preview}</p>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Selecciona un mensaje para ver su contenido
          </div>
        )}
      </div>
    </div>
  );
};

export default Mailbox;