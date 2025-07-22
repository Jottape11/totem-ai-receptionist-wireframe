import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [companyName, setCompanyName] = useState("");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName || !cpf) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    // Simular autenticação
    toast({
      title: "Login realizado",
      description: "Redirecionando para o painel administrativo...",
    });
    
    setTimeout(() => {
      navigate("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-login-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-login-card border-none shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
            <Building2 className="h-8 w-8 text-login-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold text-login-foreground">
            Recepção Digital
          </CardTitle>
          <CardDescription className="text-login-foreground/70">
            Acesse o painel administrativo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-login-foreground">
                Nome da Empresa
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-3 h-4 w-4 text-login-foreground/50" />
                <Input
                  id="company"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="pl-10 bg-login-bg/50 border-login-foreground/20 text-login-foreground placeholder:text-login-foreground/50"
                  placeholder="Digite o nome da empresa"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-login-foreground">
                CPF
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-login-foreground/50" />
                <Input
                  id="cpf"
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="pl-10 bg-login-bg/50 border-login-foreground/20 text-login-foreground placeholder:text-login-foreground/50"
                  placeholder="000.000.000-00"
                  maxLength={14}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;