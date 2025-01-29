import React, { useState } from 'react';
interface CalendarProps {
  onDateSelect?: (date: Date) => void;
  selectedDate?: Date | null;
  className?: string;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, selectedDate: propSelectedDate, className = '' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(propSelectedDate || null);

  // Obtener el primer día del mes actual
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Obtener el último día del mes actual
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const totalDays = lastDayOfMonth.getDate();

  // Nombres de los meses en español
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // Nombres de los días en español
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Funciones para navegar entre meses
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Función para manejar la selección de fecha
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
    if (onDateSelect) {
      onDateSelect(newDate);
    }
  };

  // Generar días del calendario
  const generateCalendarDays = () => {
    const days = [];
    
    // Agregar días vacíos al inicio
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />);
    }

    // Agregar los días del mes
    for (let day = 1; day <= totalDays; day++) {
      const isSelected = selectedDate && 
        selectedDate.getDate() === day && 
        selectedDate.getMonth() === currentDate.getMonth() && 
        selectedDate.getFullYear() === currentDate.getFullYear();

      const isToday = 
        new Date().getDate() === day && 
        new Date().getMonth() === currentDate.getMonth() && 
        new Date().getFullYear() === currentDate.getFullYear();

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`
            w-full h-10 flex items-center justify-center rounded-full
            transition-colors duration-200
            ${isSelected 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : isToday
                ? 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
                : 'hover:bg-gray-100 text-gray-700'
            }
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  return (
    <div className={`w-full bg-white rounded-xl shadow-lg ${className}`}>
      {/* Header del calendario */}
      <div className="p-4 flex items-center justify-between border-b">
        <button 
          onClick={previousMonth}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Mes anterior"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button 
          onClick={nextMonth}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Mes siguiente"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 p-4 border-b">
        {dayNames.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-600">
            {day}
          </div>
        ))}
      </div>

      {/* Días del mes */}
      <div className="grid grid-cols-7 gap-1 p-4">
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;