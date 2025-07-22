import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, Building2, User, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Login = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Bem-vindo ao sistema de recepção digital. Sou a Helena, sua assistente virtual. Para começarmos, preciso que você se identifique. Qual é o nome da sua empresa?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [step, setStep] = useState(1); // 1: empresa, 2: cpf, 3: login
  const [companyName, setCompanyName] = useState("");
  const [cpf, setCpf] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

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
    
    // Process login steps
    if (step === 1) {
      setCompanyName(newMessage);
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: `Perfeito! ${newMessage} é uma excelente empresa. Agora, por favor, informe seu CPF para que eu possa autorizar seu acesso ao painel administrativo.`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
        setStep(2);
      }, 1000);
    } else if (step === 2) {
      setCpf(newMessage);
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 2).toString(),
          text: `Excelente! Encontrei seus dados no sistema. Seja bem-vindo, ${companyName}! Vou redirecioná-lo para o painel administrativo onde você poderá configurar seu totem de recepção digital.`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botResponse]);
        setStep(3);
        
        setTimeout(() => {
          toast({
            title: "Login realizado com sucesso",
            description: "Redirecionando para o painel administrativo...",
          });
          navigate("/admin");
        }, 2000);
      }, 1000);
    }

    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleQuickAction = (message: string) => {
    setNewMessage(message);
  };

  return (
    <div className="min-h-screen gradient-chat flex flex-col animate-fade-in">
      {/* Header */}
      <div className="glass-card p-4 flex items-center justify-center border-b border-white/10">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-chat-login-foreground flex items-center gap-2 justify-center">
            <Sparkles className="h-6 w-6 text-chat-login-accent animate-pulse-glow" />
            Recepção Digital Premium
            <Sparkles className="h-6 w-6 text-chat-login-accent animate-pulse-glow" />
          </h1>
          <p className="text-sm text-chat-login-foreground/70">Autenticação Inteligente</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        {/* AI Avatar */}
        <div className="mb-8 text-center animate-slide-up">
          <div className="relative mx-auto w-32 h-32 mb-6">
            <Avatar className="w-full h-full shadow-glow border-4 border-chat-login-accent/30 animate-float">
              <AvatarFallback className="bg-gradient-to-br from-chat-login-accent to-secondary text-white text-4xl">
                <Bot className="h-16 w-16" />
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-chat-login-bg-start flex items-center justify-center animate-pulse-glow">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h2 className="text-3xl font-display font-bold text-chat-login-foreground mb-2">Helena</h2>
          <p className="text-chat-login-foreground/70 text-lg">Assistente Virtual de Autenticação</p>
          <div className="flex items-center justify-center gap-2 mt-2 text-chat-login-accent">
            <div className="w-2 h-2 bg-chat-login-accent rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-chat-login-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-chat-login-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>

        {/* Chat Interface */}
        <Card className="w-full max-w-2xl glass-card border-white/20 shadow-elegant transition-smooth">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slide-up`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl transition-smooth ${
                      message.isUser
                        ? 'bg-chat-login-accent text-white shadow-glow'
                        : 'bg-chat-login-secondary/80 text-chat-login-foreground backdrop-blur-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.isUser ? 'text-white/70' : 'text-chat-login-foreground/50'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 p-6 bg-black/20">
              <form onSubmit={sendMessage} className="flex gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={
                    step === 1 ? "Digite o nome da empresa..." : 
                    step === 2 ? "Digite seu CPF..." : 
                    "Mensagem..."
                  }
                  className="flex-1 bg-chat-login-card/50 border-chat-login-accent/30 text-chat-login-foreground placeholder:text-chat-login-foreground/50 rounded-xl focus:border-chat-login-accent transition-smooth"
                  disabled={step === 3}
                />
                <Button 
                  type="submit" 
                  size="icon"
                  className="bg-chat-login-accent hover:bg-chat-login-accent/90 shadow-glow transition-spring hover-lift rounded-xl"
                  disabled={step === 3}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        {step === 1 && (
          <div className="mt-6 flex flex-wrap gap-3 justify-center animate-slide-up">
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-chat-login-accent/30 text-chat-login-foreground hover:bg-chat-login-accent/20 transition-smooth hover-lift"
              onClick={() => handleQuickAction("TechCorp Solutions")}
            >
              <Building2 className="h-3 w-3 mr-2" />
              TechCorp Solutions
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-chat-login-accent/30 text-chat-login-foreground hover:bg-chat-login-accent/20 transition-smooth hover-lift"
              onClick={() => handleQuickAction("Inovação Digital Ltda")}
            >
              <Building2 className="h-3 w-3 mr-2" />
              Inovação Digital
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-6 flex flex-wrap gap-3 justify-center animate-slide-up">
            <Button
              variant="outline"
              size="sm"
              className="glass-card border-chat-login-accent/30 text-chat-login-foreground hover:bg-chat-login-accent/20 transition-smooth hover-lift"
              onClick={() => handleQuickAction("123.456.789-00")}
            >
              <User className="h-3 w-3 mr-2" />
              CPF de exemplo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;