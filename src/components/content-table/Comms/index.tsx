import { FC, useState } from 'react';
import MessageThread from './HistoryTable';
import MessageView from './InboxChat';

type MessageSource = 'whatsapp' | 'email' | 'facebook' | 'instagram';

interface Message {
    id: number;
    from: string;
    subject: string;
    preview: string;
    content: string;
    date: string;
    unread: boolean;
    starred: boolean;
    source: MessageSource;
}

interface FormsTableProps { }

const FormsTable: FC<FormsTableProps> = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            from: 'Juan Pérez',
            subject: 'Actualización del proyecto',
            preview: 'Hola, te envío las últimas actualizaciones del proyecto...',
            content: 'Hola,\n\nTe envío las últimas actualizaciones del proyecto. Hemos completado la fase inicial y estamos listos para comenzar la siguiente etapa. Por favor, revisa los documentos adjuntos y comparte tus comentarios.\n\nSaludos,\nJuan',
            date: '10:30 AM',
            unread: true,
            starred: false,
            source: 'facebook',
        },
        {
            id: 2,
            from: 'María García',
            subject: 'Reunión de equipo',
            preview: 'Buenos días, recordatorio de nuestra reunión semanal...',
            content: 'Buenos días equipo,\n\nRecordatorio de nuestra reunión semanal programada para mañana a las 10:00 AM. Por favor, preparen sus actualizaciones de la semana.\n\nSaludos,\nMaría',
            date: 'Ayer',
            unread: false,
            starred: true,
            source: 'email',
        },
        {
            id: 3,
            from: 'Carlos Rodríguez',
            subject: 'Documentación pendiente',
            preview: 'Necesitamos revisar los siguientes documentos...',
            content: 'Hola,\n\nNecesitamos revisar los siguientes documentos antes de la fecha límite. Por favor, asegúrate de completar tu parte lo antes posible.\n\nSaludos,\nCarlos',
            date: '23 Mar',
            unread: true,
            starred: false,
            source: 'whatsapp',
        },
    ]);

    const [showMessageView, setShowMessageView] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const handleToggleStar = (messageId: number) => {
        setMessages(messages.map(msg =>
            msg.id === messageId ? { ...msg, starred: !msg.starred } : msg
        ));
    };

    const handleDelete = (messageId: number) => {
        setMessages(messages.filter(msg => msg.id !== messageId));
        if (selectedMessage?.id === messageId) {
            setSelectedMessage(null);
            setShowMessageView(false);
        }
    };

    const handleMessageSelect = (messageId: number) => {
        const message = messages.find(msg => msg.id === messageId);
        if (message) {
            // Marcar el mensaje como leído
            setMessages(messages.map(msg =>
                msg.id === messageId ? { ...msg, unread: false } : msg
            ));
            setSelectedMessage(message);
            setShowMessageView(true);
        }
    };

    const handleReply = (content: string) => {
        console.log('Respuesta:', content);
        // Aquí implementarías la lógica para enviar la respuesta
    };

    if (showMessageView && selectedMessage) {
        return (
            <MessageView
                message={selectedMessage}
                onBack={() => {
                    setShowMessageView(false);
                    setSelectedMessage(null);
                }}
                onReply={handleReply}
            />
        );
    }

    return (
        <MessageThread
            messages={messages}
            onToggleStar={handleToggleStar}
            onDelete={handleDelete}
            onReply={handleMessageSelect}  // Usamos onReply para la selección
            onForward={(id) => console.log('Reenviar:', id)}
        />
    );
};

export default FormsTable;