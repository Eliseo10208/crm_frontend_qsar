import React, { useState } from 'react';
import {
  Star,
  StarOff,
  MoreVertical,
  Reply,
  Forward,
  Trash2,
  Filter,
} from 'lucide-react';

// Tipos e interface
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

interface MessageThreadProps {
  messages: Message[];
  onToggleStar: (messageId: number) => void;
  onDelete: (messageId: number) => void;
  onReply: (messageId: number) => void;
  onForward: (messageId: number) => void;
}

interface MessageItemProps {
  message: Message;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onToggleStar: () => void;
  onDelete: () => void;
  onReply: () => void;
  onForward: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({
  message,
  isExpanded,
  onToggleExpand,
  onToggleStar,
  onDelete,
  onReply,
  onForward
}) => {
  const getSourceColor = (source: MessageSource) => {
    switch (source) {
      case 'whatsapp':
        return 'bg-green-500';
      case 'email':
        return 'bg-yellow-500';
      case 'facebook':
        return 'bg-blue-600';
      case 'instagram':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className={`border-b border-gray-200 hover:shadow-md transition-shadow ${message.unread ? 'bg-blue-50' : ''}`}>
      <div 
        className="flex items-center p-4 cursor-pointer w-full"
        onClick={onToggleExpand}
      >
        <div className="flex-shrink-0 w-10 h-10 mr-4 relative">
          <div className="w-full h-full rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">
            {message.from[0].toUpperCase()}
          </div>
          <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${getSourceColor(message.source)} flex items-center justify-center text-white text-xs border-2 border-white`}>
            {message.source[0].toUpperCase()}
          </div>
        </div>
        <div className="flex-grow min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium truncate">
              {message.from}
            </h3>
            <span className="text-sm text-gray-500 ml-4">
              {message.date}
            </span>
          </div>
          <div className="flex items-center">
            <p className="text-gray-600 truncate flex-grow">
              <span className="font-medium mr-2">{message.subject}</span>
              <span className="text-gray-500">{message.preview}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center ml-4 space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleStar();
            }}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            {message.starred ? (
              <Star className="w-5 h-5 text-yellow-400" />
            ) : (
              <StarOff className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <button
              onClick={onReply}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Reply className="w-4 h-4" />
              <span>Responder</span>
            </button>
            <button
              onClick={onForward}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Forward className="w-4 h-4" />
              <span>Reenviar</span>
            </button>
            <button
              onClick={onDelete}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
            >
              <Trash2 className="w-4 h-4" />
              <span>Eliminar</span>
            </button>
          </div>

          <div className="prose max-w-none text-gray-800 whitespace-pre-line">
            {message.content}
          </div>
        </div>
      )}
    </div>
  );
};

const MessageThread: React.FC<MessageThreadProps> = ({
  messages,
  onToggleStar,
  onDelete,
  onReply,
  onForward
}) => {
  const [expandedMessageIds, setExpandedMessageIds] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStarred, setFilterStarred] = useState(false);
  const [filterUnread, setFilterUnread] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleMessageExpansion = (messageId: number) => {
    setExpandedMessageIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStarredChange = () => {
    setFilterStarred((prev) => !prev);
  };

  const handleFilterUnreadChange = () => {
    setFilterUnread((prev) => !prev);
  };

  const filteredMessages = messages.filter((message) => {
    const matchesSearchTerm = message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStarredFilter = !filterStarred || message.starred;
    const matchesUnreadFilter = !filterUnread || message.unread;

    return matchesSearchTerm && matchesStarredFilter && matchesUnreadFilter;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilterStarred(false);
    setFilterUnread(false);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4 p-4">
        <div className="flex-grow">
          <input
            type="search"
            className="w-full pl-4 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Buscar mensajes..."
            onChange={handleSearchChange}
            value={searchTerm}
          />
        </div>
        <div className="relative ml-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg flex items-center space-x-2"
          >
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10 p-4">
              <div className="space-y-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filterStarred}
                    onChange={handleFilterStarredChange}
                  />
                  <span>Mostrar solo destacados</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={filterUnread}
                    onChange={handleFilterUnreadChange}
                  />
                  <span>Mostrar solo no leídos</span>
                </label>
                <button
                  onClick={clearFilters}
                  className="w-full px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-sm"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {filteredMessages.map((message) => (
        <MessageItem
          key={message.id}
          message={message}
          isExpanded={expandedMessageIds.has(message.id)}
          onToggleExpand={() => toggleMessageExpansion(message.id)}
          onToggleStar={() => onToggleStar(message.id)}
          onDelete={() => onDelete(message.id)}
          onReply={() => onReply(message.id)}
          onForward={() => onForward(message.id)}
        />
      ))}
    </div>
  );
};

export default MessageThread;