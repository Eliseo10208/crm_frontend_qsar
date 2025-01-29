import React, { FC } from 'react';
import TopSellers from './table';
import ClientContacts from './ClientTable';
import { CustomBarChart } from '../../custom/Graphics/CustomBarChart';
import TopClients from './topClients';
import { data, clientsData, sampleData, PieData } from '../../../utils/dummi/data';
import CustomPieChart from '../../custom/Graphics/CustomPieChart';
import Calendar from '../../custom/Calendar/Caldendar';
interface FormsTableProps { }



const FormsTable: FC<FormsTableProps> = () => {
    const handleNotification = (clientId: number) => {
        console.log(`Enviando notificación al cliente ${clientId}`);
    };
    return (
        <>
            <section className='flex flex-col gap-4 border border-red-500'>
                <div className='flex gap-4'>
                    <ClientContacts
                        clients={clientsData}
                        onSendNotification={handleNotification}
                    />
                    <TopClients
                        clients={data}
                        title="Top Clientes"
                    />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Calendar />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <TopClients
                        clients={data}
                        title="Top Clientes"
                    />


                    </div>
                </div>

                <CustomBarChart
                    data={sampleData}
                    width={300} // Adjusted width for smaller size
                    height={200} // Adjusted height for smaller size
                    title="Ventas por Mes"
                />
            </section>
        </>

    );


};

export default FormsTable;