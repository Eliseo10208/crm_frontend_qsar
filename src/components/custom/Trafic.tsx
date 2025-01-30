import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

interface DataPoint {
  name: string;
  mensajesEnviados: number;
  mensajesContestados: number;
}

const data: DataPoint[] = [
  { name: 'Ene', mensajesEnviados: 400, mensajesContestados: 380 },
  { name: 'Feb', mensajesEnviados: 300, mensajesContestados: 290 },
  { name: 'Mar', mensajesEnviados: 600, mensajesContestados: 580 },
  { name: 'Abr', mensajesEnviados: 800, mensajesContestados: 750 },
  { name: 'May', mensajesEnviados: 500, mensajesContestados: 480 },
  { name: 'Jun', mensajesEnviados: 700, mensajesContestados: 680 },
];

const GraficoMensajes: React.FC = () => {
  return (
    <Card className="w-full max-w-4xl p-4">
      <Typography variant="h6" className="mb-4 px-4">
        Análisis de Mensajes
      </Typography>
      <CardContent>
        <div className="h-96 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name"
                stroke="#94a3b8"
                fontSize={12}
              />
              <YAxis 
                stroke="#94a3b8"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  padding: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mensajesEnviados" 
                name="Mensajes Enviados"
                stroke="#1976d2" 
                strokeWidth={2}
                dot={{ fill: '#1976d2', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="mensajesContestados" 
                name="Mensajes Contestados"
                stroke="#2e7d32" 
                strokeWidth={2}
                dot={{ fill: '#2e7d32', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GraficoMensajes;