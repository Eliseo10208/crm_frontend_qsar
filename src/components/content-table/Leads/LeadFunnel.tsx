interface Lead {
    id: number;
    name: string;
    email: string;
    source: string;
    stage: 'Captación' | 'Conversión' | 'Venta' | 'Fidelización';
    lastActivity: Date;
    status: 'active' | 'pending' | 'converted';
  }
  
  interface LeadsTableProps {
    leads: Lead[];
    onLeadAction: (leadId: number, action: string) => void;
  }
  
  const LeadsTable: React.FC<LeadsTableProps> = ({
    leads,
    onLeadAction
  }) => {
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
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Gestión de Leads</h2>
            <p className="text-gray-500">Seguimiento y conversión de leads</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
              Exportar
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium">
              Nuevo Lead
            </button>
          </div>
        </div>
  
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Lead</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Origen</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Etapa</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Última actividad</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">Estado</th>
                <th className="text-center py-3 px-4 text-gray-600 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {lead.name.charAt(0)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="font-medium text-gray-800">{lead.name}</p>
                        <p className="text-sm text-gray-500">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {lead.source}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStageColor(lead.stage)}`}>
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formatDate(lead.lastActivity)}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        lead.status === 'active' ? 'text-green-600 bg-green-50' :
                        lead.status === 'converted' ? 'text-purple-600 bg-purple-50' :
                        'text-yellow-600 bg-yellow-50'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex justify-center space-x-2">
                      <button 
                        onClick={() => onLeadAction(lead.id, 'edit')}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Editar"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => onLeadAction(lead.id, 'advance')}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                        title="Avanzar etapa"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  // Ejemplo de uso:
  
  
  export default LeadsTable;