import React, { FC } from 'react';
import TopSellers from './table';
import ClientContacts from './ClientTable';
import { CustomBarChart } from '../../custom/Graphics/CustomBarChart';
import TopClients from './topClients';
import { data, clientsData, sampleData, PieData } from '../../../../utils/dummi/data';
import CustomPieChart from '../../custom/Graphics/CustomPieChart';
interface FormsTableProps { }



const FormsTable: FC<FormsTableProps> = () => {
    const handleNotification = (clientId: number) => {
        console.log(`Enviando notificación al cliente ${clientId}`);
    };
    return (
        <>
            <section className='flex flex-col gap-4'>
                <TopClients
                    clients={data}
                    title="Top Clientes"
                />
            <ClientContacts
                clients={clientsData}
                onSendNotification={handleNotification}
            />

            <CustomBarChart
                data={sampleData}
                title="Ventas por Mes"
            />
            <CustomPieChart
                data={PieData}
                size={400}
                showLabels={true}
            />
            </section>
        </>

    );


};

export default FormsTable;