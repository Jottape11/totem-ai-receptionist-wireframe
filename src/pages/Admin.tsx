import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Upload, Palette, Settings, MessageSquare, Globe, Save, 
  Building2, FileText, Bot, HelpCircle, Plus, Trash2, 
  Edit3, Users, BarChart3, Image, Mic, User2, UserCheck 
} from "lucide-react";
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
  const [activeSection, setActiveSection] = useState("general");
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const sidebarItems = [
    { id: "general", label: "Configurações Gerais", icon: Settings },
    { id: "forms", label: "Gerenciar Formulários", icon: FileText },
    { id: "avatar", label: "Customização Avatar", icon: Bot },
    { id: "analytics", label: "Relatórios", icon: BarChart3 },
  ];

  const [formQuestions, setFormQuestions] = useState([
    { id: "1", question: "Qual o motivo da sua visita?", type: "multiple", options: ["Reunião", "Entrevista", "Suporte", "Outros"] },
    { id: "2", question: "Onde você reside?", type: "text", options: [] },
    { id: "3", question: "Qual sua faixa etária?", type: "multiple", options: ["18-25", "26-35", "36-45", "46-60", "60+"] },
    { id: "4", question: "Qual sua escolaridade?", type: "multiple", options: ["Ensino Médio", "Superior", "Pós-graduação", "Mestrado/Doutorado"] },
    { id: "5", question: "Estado civil", type: "multiple", options: ["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"] },
    { id: "6", question: "Faixa de renda", type: "multiple", options: ["Até 2 SM", "2-5 SM", "5-10 SM", "10+ SM"] },
    { id: "7", question: "Você usa redes sociais?", type: "multiple", options: ["Instagram", "LinkedIn", "Facebook", "TikTok", "Não uso"] },
  ]);

  const avatarOptions = [
    { id: "helena", name: "Helena", type: "Feminino", description: "Assistente virtual profissional" },
    { id: "carlos", name: "Carlos", type: "Masculino", description: "Consultor empresarial" },
    { id: "sofia", name: "Sofia", type: "Feminino", description: "Especialista em atendimento" },
  ];

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

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      question: "Nova pergunta",
      type: "text",
      options: []
    };
    setFormQuestions([...formQuestions, newQuestion]);
  };

  const removeQuestion = (id: string) => {
    setFormQuestions(formQuestions.filter(q => q.id !== id));
  };

  const AppSidebar = () => (
    <Sidebar className="w-64 border-r border-admin-border">
      <SidebarContent className="bg-admin-card">
        <div className="p-6 border-b border-admin-border">
          <h2 className="text-xl font-display font-bold text-admin-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-secondary" />
            Admin Panel
          </h2>
          <p className="text-sm text-muted-foreground">Recepção Digital</p>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sidebarItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild
                    className={`transition-smooth hover-lift ${
                      activeSection === item.id ? 'bg-secondary/10 text-secondary border-r-2 border-secondary' : ''
                    }`}
                  >
                    <button 
                      onClick={() => setActiveSection(item.id)}
                      className="w-full flex items-center gap-3 p-3 text-left"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-admin-bg">
        <AppSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <div className="bg-admin-card shadow-card border-b border-admin-border p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="lg:hidden" />
                <div>
                  <h1 className="text-3xl font-display font-bold text-admin-foreground">
                    Painel Administrativo Premium
                  </h1>
                  <p className="text-muted-foreground">Configure sua experiência de recepção digital</p>
                </div>
              </div>
              <Button onClick={goToChat} className="bg-secondary hover:bg-secondary/90 shadow-elegant transition-spring hover-lift">
                <MessageSquare className="mr-2 h-4 w-4" />
                Visualizar Totem
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeSection === "general" && (
              <div className="space-y-6 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Informações da Empresa */}
                  <Card className="shadow-card hover-lift transition-smooth">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-secondary" />
                        Informações da Empresa
                      </CardTitle>
                      <CardDescription>
                        Configure os dados básicos da sua empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border-2 border-dashed border-admin-border rounded-xl p-6 text-center hover:border-secondary/50 transition-smooth relative overflow-hidden">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        {logo ? (
                          <div className="space-y-2">
                            <p className="text-sm text-admin-foreground font-medium">
                              {logo.name}
                            </p>
                            <div className="w-24 h-24 mx-auto bg-admin-accent rounded-lg flex items-center justify-center">
                              <Image className="h-8 w-8 text-muted-foreground" />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Arraste e solte ou clique para selecionar
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
                      
                      <div>
                        <Label htmlFor="description" className="text-admin-foreground">Descrição da Empresa</Label>
                        <Textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="Descreva sua empresa para os visitantes..."
                          className="min-h-[120px] resize-none transition-smooth focus:shadow-glow"
                          maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          {description.length}/500 caracteres
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Personalização Visual */}
                  <Card className="shadow-card hover-lift transition-smooth">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5 text-secondary" />
                        Personalização Visual
                      </CardTitle>
                      <CardDescription>
                        Defina as cores que representam sua marca
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {[
                        { label: "Cor Primária", value: primaryColor, setter: setPrimaryColor },
                        { label: "Cor Secundária", value: secondaryColor, setter: setSecondaryColor },
                        { label: "Cor Terciária", value: tertiaryColor, setter: setTertiaryColor }
                      ].map((color, index) => (
                        <div key={index} className="space-y-2">
                          <Label className="text-admin-foreground">{color.label}</Label>
                          <div className="flex gap-3 items-center">
                            <div className="relative">
                              <input
                                type="color"
                                value={color.value}
                                onChange={(e) => color.setter(e.target.value)}
                                className="w-16 h-12 rounded-lg border border-admin-border cursor-pointer transition-smooth hover:scale-105"
                              />
                              <div 
                                className="absolute inset-1 rounded-md"
                                style={{ backgroundColor: color.value }}
                              />
                            </div>
                            <Input
                              value={color.value}
                              onChange={(e) => color.setter(e.target.value)}
                              className="flex-1 transition-smooth focus:shadow-glow"
                            />
                            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: color.value }} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Configurações Gerais */}
                  <Card className="shadow-card hover-lift transition-smooth">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Globe className="h-5 w-5 text-secondary" />
                        Configurações Gerais
                      </CardTitle>
                      <CardDescription>
                        Idioma e integrações externas
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="language">Idioma do Sistema</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger className="transition-smooth focus:shadow-glow">
                            <SelectValue placeholder="Selecione o idioma" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-BR">🇧🇷 Português (Brasil)</SelectItem>
                            <SelectItem value="en-US">🇺🇸 English (US)</SelectItem>
                            <SelectItem value="es-ES">🇪🇸 Español</SelectItem>
                            <SelectItem value="fr-FR">🇫🇷 Français</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="whatsapp">Link do WhatsApp Business</Label>
                        <Input
                          id="whatsapp"
                          type="url"
                          value={whatsappLink}
                          onChange={(e) => setWhatsappLink(e.target.value)}
                          placeholder="https://wa.me/5511999999999"
                          className="transition-smooth focus:shadow-glow"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" className="transition-spring hover-lift">
                    Visualizar Preview
                  </Button>
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 shadow-elegant transition-spring hover-lift px-8">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}

            {activeSection === "forms" && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-admin-foreground">Gerenciar Formulários</h2>
                    <p className="text-muted-foreground">Configure as perguntas que serão feitas aos visitantes</p>
                  </div>
                  <Button onClick={addQuestion} className="bg-secondary hover:bg-secondary/90 transition-spring hover-lift">
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Pergunta
                  </Button>
                </div>

                <div className="grid gap-4">
                  {formQuestions.map((question, index) => (
                    <Card key={question.id} className="shadow-card hover-lift transition-smooth">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-2">
                              <span className="bg-secondary/10 text-secondary px-2 py-1 rounded-md text-xs font-medium">
                                #{index + 1}
                              </span>
                              <Input
                                value={question.question}
                                onChange={(e) => {
                                  const updated = formQuestions.map(q => 
                                    q.id === question.id ? { ...q, question: e.target.value } : q
                                  );
                                  setFormQuestions(updated);
                                }}
                                className="flex-1 font-medium"
                              />
                            </div>
                            
                            <div className="flex gap-4">
                              <Select
                                value={question.type}
                                onValueChange={(value) => {
                                  const updated = formQuestions.map(q => 
                                    q.id === question.id ? { ...q, type: value } : q
                                  );
                                  setFormQuestions(updated);
                                }}
                              >
                                <SelectTrigger className="w-48">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="text">Texto Livre</SelectItem>
                                  <SelectItem value="multiple">Múltipla Escolha</SelectItem>
                                  <SelectItem value="rating">Avaliação (1-5)</SelectItem>
                                </SelectContent>
                              </Select>
                              
                              {question.type === "multiple" && (
                                <div className="flex-1">
                                  <p className="text-sm text-muted-foreground mb-2">Opções:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {question.options.map((option, optIndex) => (
                                      <span key={optIndex} className="bg-admin-accent text-admin-foreground px-3 py-1 rounded-full text-sm">
                                        {option}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" className="hover-lift">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              onClick={() => removeQuestion(question.id)}
                              className="text-destructive hover:bg-destructive/10 hover-lift"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "avatar" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-display font-bold text-admin-foreground">Customização do Avatar</h2>
                  <p className="text-muted-foreground">Configure a aparência e personalidade da sua assistente virtual</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="shadow-card hover-lift transition-smooth">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User2 className="h-5 w-5 text-secondary" />
                        Seleção de Avatar
                      </CardTitle>
                      <CardDescription>
                        Escolha o avatar que melhor representa sua empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {avatarOptions.map((avatar) => (
                        <div key={avatar.id} className="flex items-center gap-4 p-4 border border-admin-border rounded-lg hover:border-secondary/50 transition-smooth cursor-pointer">
                          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center">
                            {avatar.type === "Feminino" ? <User2 className="h-8 w-8 text-secondary" /> : <UserCheck className="h-8 w-8 text-secondary" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-admin-foreground">{avatar.name}</h4>
                            <p className="text-sm text-muted-foreground">{avatar.description}</p>
                            <span className="text-xs bg-admin-accent text-admin-foreground px-2 py-1 rounded-full">
                              {avatar.type}
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="shadow-card hover-lift transition-smooth">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mic className="h-5 w-5 text-secondary" />
                        Configurações de Voz
                      </CardTitle>
                      <CardDescription>
                        Personalize a voz da assistente virtual
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Tom de Voz</Label>
                        <Select defaultValue="professional">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Profissional</SelectItem>
                            <SelectItem value="friendly">Amigável</SelectItem>
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Velocidade da Fala</Label>
                        <Select defaultValue="normal">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="slow">Lenta</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="fast">Rápida</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Idioma da Voz</Label>
                        <Select defaultValue="pt-BR">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pt-BR">🇧🇷 Português Brasileiro</SelectItem>
                            <SelectItem value="en-US">🇺🇸 Inglês Americano</SelectItem>
                            <SelectItem value="es-ES">🇪🇸 Espanhol</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90 transition-spring hover-lift">
                        <Mic className="mr-2 h-4 w-4" />
                        Testar Voz
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "analytics" && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="text-2xl font-display font-bold text-admin-foreground">Relatórios e Analytics</h2>
                  <p className="text-muted-foreground">Acompanhe o desempenho da sua recepção digital</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Visitantes Hoje", value: "142", icon: Users, color: "text-green-600" },
                    { title: "Média Diária", value: "89", icon: BarChart3, color: "text-blue-600" },
                    { title: "Formulários Preenchidos", value: "128", icon: FileText, color: "text-purple-600" },
                    { title: "Taxa de Engajamento", value: "94%", icon: MessageSquare, color: "text-orange-600" },
                  ].map((stat, index) => (
                    <Card key={index} className="shadow-card hover-lift transition-smooth">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold text-admin-foreground">{stat.value}</p>
                          </div>
                          <stat.icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Feedback dos Visitantes</CardTitle>
                    <CardDescription>Últimas avaliações recebidas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: "Maria Silva", rating: 5, comment: "Atendimento excelente! A IA é muito intuitiva." },
                        { name: "João Santos", rating: 4, comment: "Processo rápido e eficiente. Parabéns!" },
                        { name: "Ana Costa", rating: 5, comment: "Adorei a experiência moderna. Muito inovador!" },
                      ].map((feedback, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-admin-accent rounded-lg">
                          <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-secondary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-admin-foreground">{feedback.name}</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} className={`text-xs ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground">{feedback.comment}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Admin;