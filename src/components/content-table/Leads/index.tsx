import React, { FC } from 'react';
import LeadFunnel from './LeadFunnel';

interface FormsTableProps { }

const FormsTable: FC<FormsTableProps> = () => {
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
            console.log(`Editando lead ${leadId}`);
            // Aquí irá tu lógica de edición
            break;
          case 'advance':
            console.log(`Avanzando etapa del lead ${leadId}`);
            // Aquí irá tu lógica para avanzar la etapa
            break;
          default:
            console.log(`Acción ${action} no implementada`);
        }
      };
    return (
        <>
            <LeadFunnel
                leads={leads}
                onLeadAction={handleLeadAction}
            />
        </>
    );
};


export default FormsTable;
