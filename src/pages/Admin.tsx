import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Palette, Settings, MessageSquare, Globe, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [logo, setLogo] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#3B82F6");
  const [secondaryColor, setSecondaryColor] = useState("#8B5CF6");
  const [tertiaryColor, setTertiaryColor] = useState("#10B981");
  const [language, setLanguage] = useState("pt-BR");
  const [whatsappLink, setWhatsappLink] = useState("");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      toast({
        title: "Logo carregada",
        description: "Arquivo selecionado com sucesso.",
      });
    }
  };

  const handleSave = () => {
    toast({
      title: "Configurações salvas",
      description: "Todas as alterações foram aplicadas com sucesso.",
    });
  };

  const goToChat = () => {
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-admin-bg p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-admin-foreground">Painel Administrativo</h1>
            <p className="text-muted-foreground">Configure sua recepção digital</p>
          </div>
          <Button onClick={goToChat} className="bg-secondary hover:bg-secondary/90">
            <MessageSquare className="mr-2 h-4 w-4" />
            Visualizar Totem
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Logo Upload */}
          <Card className="bg-admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Logo da Empresa
              </CardTitle>
              <CardDescription>
                Faça upload do logo que será exibido no totem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                {logo ? (
                  <p className="text-sm text-admin-foreground">
                    Arquivo selecionado: {logo.name}
                  </p>
                ) : (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Clique para selecionar ou arraste o arquivo aqui
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG ou SVG até 5MB
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </CardContent>
          </Card>

          {/* Descrição da Empresa */}
          <Card className="bg-admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Descrição da Empresa
              </CardTitle>
              <CardDescription>
                Adicione uma descrição que será mostrada aos visitantes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Digite uma breve descrição da sua empresa..."
                className="min-h-[120px] resize-none"
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {description.length}/500 caracteres
              </p>
            </CardContent>
          </Card>

          {/* Configurações de Cores */}
          <Card className="bg-admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Configuração de Cores
              </CardTitle>
              <CardDescription>
                Personalize as cores da interface do totem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label htmlFor="primary-color">Cor Primária</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      id="primary-color"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="secondary-color">Cor Secundária</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      id="secondary-color"
                      type="color"
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={secondaryColor}
                      onChange={(e) => setSecondaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="tertiary-color">Cor Terciária</Label>
                  <div className="flex gap-2 items-center">
                    <input
                      id="tertiary-color"
                      type="color"
                      value={tertiaryColor}
                      onChange={(e) => setTertiaryColor(e.target.value)}
                      className="w-12 h-10 rounded border border-border cursor-pointer"
                    />
                    <Input
                      value={tertiaryColor}
                      onChange={(e) => setTertiaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurações Gerais */}
          <Card className="bg-admin-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Configurações Gerais
              </CardTitle>
              <CardDescription>
                Idioma e integrações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Idioma</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="es-ES">Español</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="whatsapp">Link do WhatsApp</Label>
                <Input
                  id="whatsapp"
                  type="url"
                  value={whatsappLink}
                  onChange={(e) => setWhatsappLink(e.target.value)}
                  placeholder="https://wa.me/5511999999999"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 px-8">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;