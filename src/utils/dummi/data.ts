const data = [
    {
        id: 1,
        name: "Regina Utrara Martinez",
        totalSales: 150,
        totalSold: 30000
    },
    {
        id: 2,
        name: "Juan Pérez",
        totalSales: 130,
        totalSold: 25000
    },
];
const clientsData = [
    {
        id: 1,
        name: "María García",
        email: "maria@example.com",
        phone: "+52 555 123 4567",
        lastContact: new Date('2024-01-01'),
        status: 'active' as 'active' | 'pending' | 'inactive'
    },
    {
        id: 2,
        name: "Juan Pérez",
        email: "juan@example.com",
        phone: "+52 555 123 4567",
        lastContact: new Date('2024-02-12'),
        status: 'pending' as 'active' | 'pending' | 'inactive'
    },


];
const sampleData = [
    { label: 'Ene', value: 100 },
    { label: 'Feb', value: 150 },
    { label: 'Mar', value: 80 },
    { label: 'Abr', value: 200 },
    { label: 'May', value: 120 },
    { label: 'Jun', value: 180 },
];
const PieData = [
    { label: "Ventas", value: 350, color: "#3B82F6" },
    { label: "Marketing", value: 200, color: "#10B981" },
    { label: "Desarrollo", value: 150, color: "#F59E0B" },
    { label: "Soporte", value: 100, color: "#EF4444" }
];

export { data, clientsData, sampleData, PieData };