interface Client {
    id: number;
    name: string;
    totalSales: number;
    totalSold: number;
}

interface TopClientsProps {
    clients: Client[];
    title?: string;
    period?: string;
}

const TopClients: React.FC<TopClientsProps> = ({
    clients,
    title = "Top Clientes",
    period = "General"
}) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const calculateProgress = (sales: number) => {
        const maxSales = Math.max(...clients.map(c => c.totalSales));
        return (sales / maxSales) * 100;
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-500">{period}</p>
                </div>
                <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                    {clients.length} clientes
                </div>
            </div>

            <div className="space-y-6">
                {clients.map((client, index) => (
                    <div key={client.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="font-medium text-gray-800">{client.name}</h3>
                                    <p className="text-sm text-gray-500">{client.totalSales} ventas</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-gray-800">
                                    {formatCurrency(client.totalSold)}
                                </p>
                                <p className="text-sm text-gray-500">Total vendido</p>
                            </div>
                        </div>

                        <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500"
                                style={{ width: `${calculateProgress(client.totalSales)}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopClients;