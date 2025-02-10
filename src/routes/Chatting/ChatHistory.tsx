import React, { useState } from 'react';
import { Search, Plus, MessageSquare, Trash2, Clock } from 'lucide-react';

interface Conversation {
  id: string;
  title: string;
  date: string;
}

const ChatHistory: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: '1', title: 'Frontend Developer Interview', date: '2024-01-20' },
    { id: '2', title: 'Backend Developer Position', date: '2024-01-19' },
    // Add more sample conversations as needed
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteConversation = (id: string) => {
    setConversations(conversations.filter(conv => conv.id !== id));
  };

  return (
    <div className="w-[280px] h-screen bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      {/* New Chat Button */}
      <button className="m-3 p-3 flex items-center gap-2 rounded-lg border border-gray-700 hover:bg-gray-800 transition-colors">
        <Plus size={16} />
        <span>New Interview</span>
      </button>

      {/* Search Box */}
      <div className="px-3 mb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-700"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.map((conversation) => (
          <div
            key={conversation.id}
            className="px-3 py-3 mx-2 rounded-lg hover:bg-gray-800 cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <MessageSquare size={16} className="mt-1 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{conversation.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                  <Clock size={12} />
                  <span>{new Date(conversation.date).toLocaleDateString()}</span>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conversation.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700 rounded transition-opacity"
              >
                <Trash2 size={14} className="text-gray-400 hover:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatHistory;
