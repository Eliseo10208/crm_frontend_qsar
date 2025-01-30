import { FC } from 'react';
import ClientContacts from './ClientTable';
import { CustomBarChart } from '../../custom/Graphics/CustomBarChart';
import TopClients from './topClients';
import { clientsData, sampleData } from '../../../utils/dummi/data';
import Calendar from '../../custom/Calendar/Caldendar';

interface FormsTableProps {}

const FormsTable: FC<FormsTableProps> = () => {
    const handleNotification = (clientId: number) => {
        console.log(`Enviando notificación al cliente ${clientId}`);
    };

    return (
        <div className="container mx-auto p-6">
            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                    {/* Client Contacts Section */}
                    <div className="bg-white rounded-lg shadow">
                        <ClientContacts
                            clients={clientsData}
                            onSendNotification={handleNotification}
                        />
                    </div>

                    {/* Calendar Section */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <Calendar />
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Top Clients Section */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <TopClients
                            title="Top Clientes"
                        />
                    </div>

                    {/* Sales Chart Section */}
                    <div className="bg-white rounded-lg shadow p-4">
                        <CustomBarChart
                            data={sampleData}
                            width={600}
                            height={300}
                            title="Ventas por Mes"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormsTable;