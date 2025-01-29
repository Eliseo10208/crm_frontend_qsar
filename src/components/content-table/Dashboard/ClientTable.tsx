interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    lastContact: Date;
    status: 'active' | 'pending' | 'inactive';
  }
  
  interface ClientContactsProps {
    clients: Client[];
    onSendNotification: (clientId: number) => void;
  }
  
  const ClientContacts: React.FC<ClientContactsProps> = ({
    clients,
    onSendNotification
  }) => {
    const getDaysSinceContact = (date: Date): number => {
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };
  
    const getStatusColor = (days: number): string => {
      if (days <= 7) return 'text-green-600 bg-green-50';
      if (days <= 14) return 'text-yellow-600 bg-yellow-50';
      if (days <= 30) return 'text-orange-600 bg-orange-50';
      return 'text-red-600 bg-red-50';
    };
  
    const formatDate = (date: Date): string => {
      return new Intl.DateTimeFormat('es-MX', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Seguimiento de Clientes</h2>
            <p className="text-gray-500">Últimos contactos y notificaciones</p>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Cliente</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Contacto</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Último contacto</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">Tiempo sin contacto</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                const daysSinceContact = getDaysSinceContact(client.lastContact);
                const statusColor = getStatusColor(daysSinceContact);
  
                return (
                  <tr key={client.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-gray-800">{client.name}</p>
                          <p className="text-sm text-gray-500">{client.status}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-gray-600">
                          {/* Email icon */}
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          {client.email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          {/* Phone icon */}
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {client.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center text-sm text-gray-600">
                        {/* Calendar icon */}
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(client.lastContact)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
                          {daysSinceContact} días
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => onSendNotification(client.id)}
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                          title="Enviar notificación"
                        >
                          {/* Bell icon */}
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </button>
                        <button 
                          className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                          title="Más opciones"
                        >
                          {/* More icon */}
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default ClientContacts;