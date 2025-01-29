import { FC, useState } from 'react';
import MessageView from '../Comms/InboxChat';

interface Lead {
    id: number;
    name: string;
    email: string;
    source: string;
    stage: 'Captación' | 'Conversión' | 'Venta' | 'Fidelización';
    lastActivity: Date;
    status: 'active' | 'pending' | 'converted';
}

interface LeadDetailsProps {
    lead?: Lead;
    isNew?: boolean;
}

const LeadDetails: FC<LeadDetailsProps> = ({ lead, isNew = false }) => {
    const [leadData, setLeadData] = useState<Lead>(lead || {
        id: Date.now(),
        name: '',
        email: '',
        source: '',
        stage: 'Captación',
        lastActivity: new Date(),
        status: 'active'
    });

    // Mock mensaje para el chat
    const mockMessage = {
        id: 1,
        from: leadData.name || 'Cliente Potencial',
        subject: 'Consulta inicial',
        preview: 'Mensaje de consulta',
        content: 'Contenido del mensaje inicial...',
        date: new Date().toLocaleDateString(),
        unread: false,
        starred: false
    };

    const handleReply = (content: string) => {
        console.log('Enviando respuesta:', content);
        // Aquí implementarías la lógica para enviar mensajes
    };

    return (
        <div className="flex h-screen">
            {/* Panel de información del lead */}
            <div className="w-1/3 border-r border-gray-200 p-4">
                <h2 className="text-xl font-bold mb-4">
                    {isNew ? 'Nuevo Lead' : 'Detalles del Lead'}
                </h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            value={leadData.name}
                            onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={leadData.email}
                            onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Fuente</label>
                        <input
                            type="text"
                            value={leadData.source}
                            onChange={(e) => setLeadData({...leadData, source: e.target.value})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Etapa</label>
                        <select
                            value={leadData.stage}
                            onChange={(e) => setLeadData({...leadData, stage: e.target.value as Lead['stage']})}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                        >
                            <option value="Captación">Captación</option>
                            <option value="Conversión">Conversión</option>
                            <option value="Venta">Venta</option>
                            <option value="Fidelización">Fidelización</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        {isNew ? 'Crear Lead' : 'Actualizar Lead'}
                    </button>
                </form>
            </div>

            {/* Panel del chat */}
            <div className="flex-1">
                <MessageView
                    message={mockMessage}
                    onBack={() => console.log('Volver')}
                    onReply={handleReply}
                    
                />
            </div>
        </div>
    );
};

export default LeadDetails;
