import React, { FC, useState } from 'react';
import LeadFunnel from './LeadFunnel';
import LeadDetails from './LeadDetail';

interface FormsTableProps { }

const FormsTable: FC<FormsTableProps> = () => {
    const [selectedLead, setSelectedLead] = useState<number | null>(null);
    const [showNewLead, setShowNewLead] = useState(false);
    
    const leads = [
        {
          id: 1,
          name: "Juan Pérez",
          email: "juan@ejemplo.com",
          source: "Landing Page",
          stage: 'Captación' as 'Captación' | 'Conversión' | 'Venta' | 'Fidelización',
          lastActivity: new Date(),
          status: 'active' as 'active' | 'pending' | 'converted'
        },
        {
          id: 2,
          name: "María García",
          email: "maria@ejemplo.com",
          source: "Redes Sociales",
          stage: 'Conversión' as 'Captación' | 'Conversión' | 'Venta' | 'Fidelización',
          lastActivity: new Date(),
          status: 'pending' as 'active' | 'pending' | 'converted'
        },
        {
          id: 3,
          name: "Carlos López",
          email: "carlos@ejemplo.com",
          source: "Email Marketing",
          stage: 'Venta' as 'Captación' | 'Conversión' | 'Venta' | 'Fidelización',
          lastActivity: new Date(),
          status: 'converted' as 'active' | 'pending' | 'converted'
        }
      ];
    
      // Manejador de acciones
      const handleLeadAction = (leadId: number, action: string) => {
        switch (action) {
          case 'edit':
            setSelectedLead(leadId);
            break;
          case 'advance':
            console.log(`Avanzando etapa del lead ${leadId}`);
            break;
          default:
            console.log(`Acción ${action} no implementada`);
        }
      };

      const handleNewLead = () => {
        setShowNewLead(true);
      };

      if (showNewLead) {
        return <LeadDetails isNew />;
      }

      if (selectedLead) {
        const lead = leads.find(l => l.id === selectedLead);
        return <LeadDetails lead={lead} />;
      }

    return (
        <>
            <LeadFunnel
                leads={leads}
                onLeadAction={handleLeadAction}
                onNewLead={handleNewLead}
            />
        </>
    );
};


export default FormsTable;
