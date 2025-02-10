import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessagesSquare, Send, Upload, FileText, Briefcase, Menu } from 'lucide-react';
import ChatHistory from './ChatHistory';

const DIFY_API_KEY = import.meta.env.VITE_DIFY_API_KEY;
const UPLOAD_URL = "https://api.dify.ai/v1/files/upload"; 
const CHAT_URL = "https://api.dify.ai/v1/chat-messages"; 

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

const Chatting = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const uploadFiles = async () => {
    setLoading(true);
    const uploadFile = async (file: File, fileName: string) => {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch(UPLOAD_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${DIFY_API_KEY}`
          },
          body: formData
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(`${fileName} uploaded successfully`);
          return data.id; 
        } else {
          console.error(`Failed to upload ${fileName}`);
          return null;
        }
      } catch (error) {
        console.error(`Error uploading ${fileName}:`, error);
        return null;
      }
    };
  
    const file1Id = file1 ? await uploadFile(file1, 'file1') : null;
    console.log(file1Id);
    const file2Id = file2 ? await uploadFile(file2, 'file2') : null;
    console.log(file2Id);
  
    if (file1Id && file2Id) {
      await sendFirstMessage(file1Id, file2Id);
    }
  
    setLoading(false);
  };

  const sendFirstMessage = async (file1Id: string, file2Id: string) => {
    const requestBody = {
      inputs: {
        JD: {
          label: "JD",
          type: "document",
          transfer_method: "local_file",
          upload_file_id: file2Id
        },
        CV: {
          label: "CV",
          type: "document",
          transfer_method: "local_file",
          upload_file_id: file1Id
        }
      },
      query: "Bắt đầu phỏng vấn",
      response_mode: "blocking",
      conversation_id: "",
      user: "abc-123",
      files: [
        {
          label: "JD",
          type: "document",
          transfer_method: "local_file",
          upload_file_id: file2Id
        },
        {
          label: "CV",
          type: "document",
          transfer_method: "local_file",
          upload_file_id: file1Id
        }
      ]
    };
  
    try {
      const response = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${DIFY_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Message sent successfully:', data);
        setConversationId(data.conversation_id);
        const botResponse: Message = {
          id: Date.now(),
          text: data.answer,
          sender: 'bot',
        };
        setMessages(prev => [...prev, botResponse]);
  
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
    };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setLoading(true);
  
    const payload = {
      inputs: {},
      query: inputMessage,
      response_mode: "blocking",
      conversation_id: conversationId,
      user: "abc-123",
      files: [],
    };
  
    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log('Message sent successfully:', data);
      const botResponse: Message = {
        id: Date.now(),
        text: data.answer,
        sender: 'bot',
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - hide on mobile by default */}
      <div className={`${showSidebar ? 'block' : 'hidden'} md:block flex-shrink-0 h-screen`}>
        <ChatHistory />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen min-w-0">
        {/* Header */}
        <div className="flex-none bg-white shadow-md px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => setShowSidebar(!showSidebar)}
                className="mr-3 md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu size={20} />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center shadow-md">
                <MessagesSquare className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-800">AI Chat Assistant</h1>
              </div>
            </div>
            <button
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
              onClick={() => {/* Add your finish logic here */}}
            >
              Finish
            </button>
          </div>
        </div>

        {/* Messages Container */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto px-4">
          <div className="max-w-4xl mx-auto py-6">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-10">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Upload Your Documents</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="relative group">
                    <input
                      type="file"
                      id="cv-upload"
                      className="hidden"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, setFile1)}
                    />
                    <label
                      htmlFor="cv-upload"
                      className="flex flex-col items-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer group-hover:border-blue-500 transition-colors"
                    >
                      <div className="w-12 h-12 mb-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <FileText className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Upload CV</span>
                      <span className="text-xs text-gray-500 mt-1">PDF file up to 10MB</span>
                      {file1 && <span className="text-xs text-blue-600 mt-2">{file1.name}</span>}
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="file"
                      id="jd-upload"
                      className="hidden"
                      accept="application/pdf"
                      onChange={(e) => handleFileChange(e, setFile2)}
                    />
                    <label
                      htmlFor="jd-upload"
                      className="flex flex-col items-center p-6 bg-white border-2 border-dashed border-gray-300 rounded-lg cursor-pointer group-hover:border-blue-500 transition-colors"
                    >
                      <div className="w-12 h-12 mb-4 rounded-full bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                        <Briefcase className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">Upload Job Description</span>
                      <span className="text-xs text-gray-500 mt-1">PDF file up to 10MB</span>
                      {file2 && <span className="text-xs text-blue-600 mt-2">{file2.name}</span>}
                    </label>
                  </div>
                </div>

                <button
                  onClick={uploadFiles}
                  disabled={!file1 || !file2 || loading}
                  className={`mt-8 px-6 py-3 rounded-lg flex items-center gap-2 mx-auto transition-all
                    ${file1 && file2 && !loading 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  ) : (
                    <Upload className="w-5 h-5" />
                  )}
                  <span>{loading ? 'Uploading...' : 'Upload Documents'}</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}  
                  >
                    <div
                      className={`
                        relative p-3 rounded-2xl max-w-[85%] shadow-sm
                        ${message.sender === 'user' 
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-none' 
                          : 'bg-white rounded-bl-none'}
                      `}
                    >
                      <ReactMarkdown 
                        className={`prose ${message.sender === 'user' ? 'prose-invert' : ''} max-w-none text-[15px]`}
                      >
                        {message.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer - input area */}
        <div className="flex-none p-4 bg-white border-t">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={sendMessage} className="relative">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Gửi tin nhắn"
                className="w-full p-3 pr-28 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  } text-white focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  <span>{loading ? 'Đang gửi...' : 'Gửi'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatting;