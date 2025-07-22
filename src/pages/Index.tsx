import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Settings, MessageSquare, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
            <Building2 className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            Sistema de Recepção Digital
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Plataforma completa para gerenciar a recepção digital da sua empresa via totem interativo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Login Card */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/login")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-login-bg/10 rounded-full w-fit">
                <Settings className="h-8 w-8 text-login-bg" />
              </div>
              <CardTitle>Área Administrativa</CardTitle>
              <CardDescription>
                Acesse o painel de controle para configurar sua recepção digital
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-login-bg hover:bg-login-bg/90 text-login-foreground"
                onClick={() => navigate("/login")}
              >
                Fazer Login
              </Button>
            </CardContent>
          </Card>

          {/* Admin Preview */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/admin")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-accent/10 rounded-full w-fit">
                <Settings className="h-8 w-8 text-accent" />
              </div>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Personalize cores, logo, descrição e outras configurações do totem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/admin")}
              >
                Ver Painel
              </Button>
            </CardContent>
          </Card>

          {/* Chat Preview */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate("/chat")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-secondary/10 rounded-full w-fit">
                <MessageSquare className="h-8 w-8 text-secondary" />
              </div>
              <CardTitle>Interface do Totem</CardTitle>
              <CardDescription>
                Visualize como os visitantes interagem com a assistente virtual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                onClick={() => navigate("/chat")}
              >
                Ver Demo
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Funcionalidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Smartphone className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Interface Responsiva</h3>
              <p className="text-sm text-muted-foreground">Adaptada para totems touch screen</p>
            </div>
            <div className="text-center">
              <Building2 className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Personalização</h3>
              <p className="text-sm text-muted-foreground">Logo e cores da sua empresa</p>
            </div>
            <div className="text-center">
              <MessageSquare className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">IA Conversacional</h3>
              <p className="text-sm text-muted-foreground">Assistente virtual inteligente</p>
            </div>
            <div className="text-center">
              <Settings className="h-8 w-8 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Fácil Configuração</h3>
              <p className="text-sm text-muted-foreground">Painel administrativo intuitivo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
