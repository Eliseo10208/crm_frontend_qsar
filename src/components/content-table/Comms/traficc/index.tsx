import { FC } from "react";
import { Card, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MessageSquare, Timer, TrendingUp, Users } from 'lucide-react';

interface TrafficDashboardProps {}

const data = [
  { name: 'Ene', mensajesEnviados: 400, mensajesContestados: 380, tiempoRespuesta: 25 },
  { name: 'Feb', mensajesEnviados: 300, mensajesContestados: 290, tiempoRespuesta: 20 },
  { name: 'Mar', mensajesEnviados: 600, mensajesContestados: 580, tiempoRespuesta: 15 },
  { name: 'Abr', mensajesEnviados: 800, mensajesContestados: 750, tiempoRespuesta: 18 },
  { name: 'May', mensajesEnviados: 500, mensajesContestados: 480, tiempoRespuesta: 22 },
  { name: 'Jun', mensajesEnviados: 700, mensajesContestados: 680, tiempoRespuesta: 16 }
];

const hoursData = [
  { hora: '9:00', mensajes: 45 },
  { hora: '10:00', mensajes: 75 },
  { hora: '11:00', mensajes: 90 },
  { hora: '12:00', mensajes: 85 },
  { hora: '13:00', mensajes: 65 },
  { hora: '14:00', mensajes: 70 },
  { hora: '15:00', mensajes: 80 },
  { hora: '16:00', mensajes: 60 },
  { hora: '17:00', mensajes: 40 }
];

const TrafficDashboard: FC<TrafficDashboardProps> = () => {
  // Calcular KPIs
  const ultimoMes = data[data.length - 1];
  const tasaRespuesta = ((ultimoMes.mensajesContestados / ultimoMes.mensajesEnviados) * 100).toFixed(1);
  const promedioTiempoRespuesta = (data.reduce((acc, curr) => acc + curr.tiempoRespuesta, 0) / data.length).toFixed(1);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Typography variant="h4" className="mb-6">Análisis de Tráfico de Mensajes</Typography>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <MessageSquare className="text-blue-500" size={24} />
            <div>
              <Typography variant="body2" color="textSecondary">Mensajes Enviados</Typography>
              <Typography variant="h6">{ultimoMes.mensajesEnviados}</Typography>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="text-green-500" size={24} />
            <div>
              <Typography variant="body2" color="textSecondary">Tasa de Respuesta</Typography>
              <Typography variant="h6">{tasaRespuesta}%</Typography>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Timer className="text-orange-500" size={24} />
            <div>
              <Typography variant="body2" color="textSecondary">Tiempo Promedio de Respuesta</Typography>
              <Typography variant="h6">{promedioTiempoRespuesta} min</Typography>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <Users className="text-purple-500" size={24} />
            <div>
              <Typography variant="body2" color="textSecondary">Clientes Activos</Typography>
              <Typography variant="h6">{ultimoMes.mensajesContestados}</Typography>
            </div>
          </div>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Tendencias */}
        <Card className="p-4">
          <Typography variant="h6" className="mb-4">Tendencia de Mensajes</Typography>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="mensajesEnviados" 
                  name="Mensajes Enviados"
                  stroke="#2196f3" 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="mensajesContestados" 
                  name="Mensajes Contestados"
                  stroke="#4caf50" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Gráfico de Distribución por Hora */}
        <Card className="p-4">
          <Typography variant="h6" className="mb-4">Distribución por Hora</Typography>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hora" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="mensajes" name="Mensajes" fill="#1976d2" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TrafficDashboard;