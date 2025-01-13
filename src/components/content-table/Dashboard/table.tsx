interface Seller {
    id: number;
    name: string;
    totalSales: number;
    totalSold: number;
  }
  
  interface TopSellersProps {
    sellers: Seller[];
    title?: string;
    period?: string;
  }
  
  const TopSellers: React.FC<TopSellersProps> = ({ 
    sellers,
    title = "Top Vendedores",
    period = "Este mes"
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
      const maxSales = Math.max(...sellers.map(s => s.totalSales));
      return (sales / maxSales) * 100;
    };
  
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <p className="text-gray-500">{period}</p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
            {sellers.length} vendedores
          </div>
        </div>
  
        <div className="space-y-6">
          {sellers.map((seller, index) => (
            <div key={seller.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{seller.name}</h3>
                    <p className="text-sm text-gray-500">{seller.totalSales} ventas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(seller.totalSold)}
                  </p>
                  <p className="text-sm text-gray-500">Total vendido</p>
                </div>
              </div>
  
              <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${calculateProgress(seller.totalSales)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TopSellers;