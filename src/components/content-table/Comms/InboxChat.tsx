import React, { useState } from 'react';
import { ArrowLeft, Send, UserPlus, Star, MoreVertical, Paperclip, Image } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: number;
    from: string;
    subject: string;
    preview: string;
    content: string;
    date: string;
    unread: boolean;
    starred: boolean;
}

interface MessageViewProps {
    message: Message;
    onBack: () => void;
    onReply: (content: string) => void;
}

const MessageView: React.FC<MessageViewProps> = ({ message, onBack, onReply }) => {
    const [replyContent, setReplyContent] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (replyContent.trim()) {
            onReply(replyContent);
            setReplyContent('');
        }
    };

    const handleCreateLead = () => {
        navigate('/leads/new');
    };

    return (
        <div className="flex flex-col h-full bg-white">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onBack}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <div>
                            <h2 className="text-xl font-semibold">{message.subject}</h2>
                            <div className="flex items-center text-gray-500 text-sm">
                                <span className="font-medium text-gray-900">{message.from}</span>
                                <span className="mx-2">•</span>
                                <span>{message.date}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() => window.confirm('¿Deseas crear un lead con esta información?')}
                            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center space-x-2"
                        >
                            <UserPlus className="w-4 h-4" />
                            <span onClick={handleCreateLead}>Crear Lead</span>
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <Star className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreVertical className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido del mensaje */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                                    {message.from.charAt(0)}
                                </div>
                                <span className="font-medium">{message.from}</span>
                            </div>
                            <span className="text-sm text-gray-500">{message.date}</span>
                        </div>
                        <div className="whitespace-pre-line text-gray-800">
                            {message.content}
                        </div>
                    </div>

                    {/* Aquí podrías agregar los mensajes de la conversación */}
                    <div className="space-y-4">
                        {/* Ejemplo de mensaje de respuesta
                        <div className="bg-blue-50 rounded-lg p-4 ml-8">
                            <div className="text-sm text-gray-500 mb-1">Tú - Hace 2 horas</div>
                            <div>Contenido de la respuesta...</div>
                        </div>
                        */}
                    </div>
                </div>
            </div>

            {/* Área de respuesta */}
            <div className="border-t border-gray-200 p-4">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                    <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                            <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Paperclip className="w-5 h-5 text-gray-600" />
                            </button>
                            <button type="button" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <Image className="w-5 h-5 text-gray-600" />
                            </button>
                        </div>
                        <div className="flex items-end space-x-2">
                            <textarea
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                placeholder="Escribe tu mensaje..."
                                className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
                                rows={3}
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MessageView;