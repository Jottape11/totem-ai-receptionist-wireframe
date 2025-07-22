import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ArrowLeft, HelpCircle, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Bem-vindo à nossa empresa. Sou a assistente virtual da recepção. Como posso ajudá-lo hoje?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate();

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simular resposta da IA após delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Obrigada pela sua mensagem! Em breve um de nossos atendentes entrará em contato. Enquanto isso, posso coletar alguns dados para agilizar o atendimento. Qual o motivo da sua visita?",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-chat-bg-start to-chat-bg-end flex flex-col">
      {/* Header */}
      <div className="bg-chat-card/50 backdrop-blur-sm border-b border-chat-foreground/10 p-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/admin")}
          className="text-chat-foreground hover:bg-chat-foreground/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar ao Admin
        </Button>
        
        <div className="text-center">
          <h1 className="text-xl font-bold text-chat-foreground">TechCorp Solutions</h1>
          <p className="text-sm text-chat-foreground/70">Recepção Digital</p>
        </div>
        
        <div className="w-20"></div> {/* Spacer */}
      </div>

      {/* Avatar Central */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="mb-8 text-center">
          <div className="relative mx-auto w-32 h-32 mb-4">
            <Avatar className="w-full h-full bg-chat-card border-4 border-chat-foreground/20">
              <AvatarFallback className="bg-gradient-to-br from-secondary to-accent text-white text-4xl">
                <HelpCircle className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-chat-bg-start flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-chat-foreground mb-2">Assistente Virtual</h2>
          <p className="text-chat-foreground/70">Estou aqui para ajudar com sua visita</p>
        </div>

        {/* Mensagens */}
        <Card className="w-full max-w-2xl bg-chat-card/30 backdrop-blur-sm border-chat-foreground/20 shadow-2xl">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-chat-foreground/10 text-chat-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isUser ? 'text-secondary-foreground/70' : 'text-chat-foreground/50'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input de Mensagem */}
            <div className="border-t border-chat-foreground/10 p-4">
              <form onSubmit={sendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-chat-foreground/5 border-chat-foreground/20 text-chat-foreground placeholder:text-chat-foreground/50"
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-secondary hover:bg-secondary/90 shrink-0"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Ações Rápidas */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            className="bg-chat-foreground/10 border-chat-foreground/20 text-chat-foreground hover:bg-chat-foreground/20"
            onClick={() => setNewMessage("Gostaria de agendar uma reunião")}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Agendar reunião
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-chat-foreground/10 border-chat-foreground/20 text-chat-foreground hover:bg-chat-foreground/20"
            onClick={() => setNewMessage("Preciso de informações sobre produtos")}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Informações sobre produtos
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-chat-foreground/10 border-chat-foreground/20 text-chat-foreground hover:bg-chat-foreground/20"
            onClick={() => setNewMessage("Como posso entrar em contato?")}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Contato
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;