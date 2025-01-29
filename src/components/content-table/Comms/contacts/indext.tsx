import { FC } from "react"
import axios from "axios"
import { useState, useEffect } from "react"
import { Client } from "../../../../utils/interface/Clients"

interface FormsTableProps { }

const FormsTable: FC<FormsTableProps> = () => {
    const [data, setData] = useState<Client[]>([])
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

    useEffect(() => {
        axios.get('https://erpconnectivity.qasar.app/api/company-clients/', {
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjQwLCJlbWFpbCI6ImNybUBxYXNhci5hcHAiLCJwZXJtaXNzaW9ucyI6ImM0MDI3YTEwODFlMzIzYmUwN2VkMTNhMGM4N2E3M2ZmOTc4YjlmNjZhZmM0M2U2NjZlOTQ1ZDZmIiwiaWF0IjoxNzM4MTA5Nzc3LCJleHAiOjE3Mzg0NTUzNzd9.cSDZJLrfL5sSGdqQz2kNNBpY2UDCgfN_CeunkFUo4HI'
            }
        })
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error))
    }, [])

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredContacts = data.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const currentContacts = filteredContacts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Contactos</h2>
                    <p className="text-gray-500">Gestión de contactos y clientes</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative flex items-center rounded-lg">
                        <input
                            type="search"
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            placeholder="Buscar..."
                            onChange={handleSearchChange}
                            value={searchTerm}
                        />
                    </div>
                    <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium">
                        Exportar
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Nuevo Contacto
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">Contacto</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">Email</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">Teléfono</th>
                            <th className="text-left py-3 px-4 text-gray-600 font-medium">Empresa</th>
                            <th className="text-center py-3 px-4 text-gray-600 font-medium">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentContacts.map((contact) => (
                            <tr key={contact.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                            <span className="text-blue-600 font-medium">
                                                {contact.name.charAt(0)}
                                            </span>
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-gray-800">{contact.name}</p>
                                            <p className="text-sm text-gray-500">{contact.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-gray-600">{contact.email}</td>
                                <td className="py-4 px-4 text-gray-600">{contact.mainPhone}</td>
                                <td className="py-4 px-4 text-gray-600">{contact.webPage}</td>
                                <td className="py-4 px-4">
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                            title="Editar"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </button>
                                        <button
                                            className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
                                            title="Llamar"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium"
                >
                    Anterior
                </button>
                <span className="text-gray-600">Página {currentPage} de {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg text-sm font-medium"
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}

export default FormsTable;