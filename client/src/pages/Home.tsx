import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bike, Droplets, Heart, Clock, Calendar, CheckCircle2, Zap } from "lucide-react";

export default function Home() {
  const [trainingDay, setTrainingDay] = useState(0);
  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    // Simular dia de treino aleatório
    setTrainingDay(Math.floor(Math.random() * 5) + 1);
  }, []);

  const trainingStructure = [
    {
      title: "Aquecimento",
      duration: "5 min",
      description: "Pedale leve para preparar o corpo",
      icon: Zap,
    },
    {
      title: "Parte Principal",
      duration: "10 a 20 min",
      description: "Pedale em ritmo moderado, ajustando a resistência conforme o conforto",
      icon: Bike,
    },
    {
      title: "Desaceleração",
      duration: "5 min",
      description: "Diminua o ritmo até parar",
      icon: Clock,
    },
  ];

  const tips = [
    {
      icon: "🔧",
      title: "Ajuste o banco e o guidão antes de começar",
    },
    {
      icon: "💧",
      title: "Mantenha boa postura e hidratação",
    },
    {
      icon: "⏱️",
      title: "Controle o ritmo e aumente o tempo gradualmente",
    },
    {
      icon: "👕",
      title: "Use roupas leves e confortáveis",
    },
    {
      icon: "❤️",
      title: "Mantenha o foco no bem-estar, não na velocidade",
    },
  ];

  const weeklySchedule = [
    { day: "Segunda", duration: "10 min", intensity: "1-2", notes: "O foco é terminar. Se conseguir conversar, melhor ainda!" },
    { day: "Terça", duration: "12 min", intensity: "1-2", notes: "Beba água durante a sessão." },
    { day: "Quarta", duration: "10 min", intensity: "1-2", notes: "Pedale confortavelmente. Se cansar, diminua o ritmo." },
    { day: "Quinta", duration: "12 min", intensity: "1-2", notes: "Autoavaliação: foi fácil? (Deve ser 'sim')." },
    { day: "Sexta", duration: "15 min", intensity: "3", notes: "Sessão mais longa da semana. Parabéns!" },
    { day: "Sábado", duration: "10 min", intensity: "1-2", notes: "Treino de recuperação ativa." },
    { day: "Domingo", duration: "Descanso", intensity: "-", notes: "Recupere-se bem." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bike className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              BikeErgo
            </h1>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#estrutura" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Estrutura
            </a>
            <a href="#frequencia" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Frequência
            </a>
            <a href="#dicas" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Dicas
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-teal-400/10 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full">
              <span className="text-blue-700 font-semibold text-sm">Comece sua jornada hoje</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight">
              Plano de Início Rápido na Bicicleta Ergométrica
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              Guia prático e motivador para quem está começando
            </p>
            <Button
              onClick={() => setShowMotivation(!showMotivation)}
              className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Zap className="w-5 h-5 mr-2" />
              Iniciar Treino
            </Button>
          </div>
        </div>
      </section>

      {/* Apresentação */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                <CardTitle className="text-3xl text-gray-900">Bem-vindo ao BikeErgo</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Este é um plano simples para quem deseja começar na bicicleta ergométrica, melhorar o condicionamento físico e criar o hábito de pedalar. Desenvolvido com foco em **segurança**, **acessibilidade** e **motivação**.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Não importa seu nível de condicionamento físico atual—este plano foi criado para que você comece de forma confortável e progrida no seu próprio ritmo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Objetivo do Plano */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-teal-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-teal-50 to-blue-50">
                <CardTitle className="text-3xl text-gray-900">Objetivo do Plano</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  O foco é oferecer uma rotina inicial **segura**, **adaptável** e **eficaz** para iniciantes, com progresso gradual e metas realistas. Você aprenderá a:
                </p>
                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Desenvolver consistência e disciplina</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Melhorar seu condicionamento cardiovascular</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Fortalecer as pernas e core</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Criar um hábito saudável que dura</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Como Usar o Plano */}
      <section className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-blue-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50">
                <CardTitle className="text-3xl text-gray-900">Como Usar o Plano</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Siga por 2 a 3 semanas</h4>
                      <p className="text-gray-700">Mantenha a consistência antes de aumentar o tempo ou intensidade.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Respeite seus limites</h4>
                      <p className="text-gray-700">Ouça seu corpo. Se precisar de um dia extra de descanso, tire-o.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Progresso gradual</h4>
                      <p className="text-gray-700">Após 3 semanas, você pode aumentar a duração ou intensidade dos treinos.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Estrutura do Treino */}
      <section id="estrutura" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">Estrutura do Treino</h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Duração total: <span className="font-semibold text-blue-600">20 a 30 minutos</span>
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {trainingStructure.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={index}
                    className="border-blue-200 hover:border-teal-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                  >
                    <CardHeader className="bg-gradient-to-br from-blue-50 to-teal-50">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-8 h-8 text-blue-600" />
                        <CardTitle className="text-xl text-gray-900">{item.title}</CardTitle>
                      </div>
                      <CardDescription className="text-lg font-semibold text-blue-600">
                        {item.duration}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700 leading-relaxed">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Frequência Recomendada */}
      <section id="frequencia" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-teal-300 shadow-xl bg-gradient-to-br from-teal-50 to-blue-50">
              <CardHeader className="bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-t-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="w-8 h-8" />
                  <CardTitle className="text-3xl">Frequência Recomendada</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-8">
                <div className="text-center mb-8">
                  <p className="text-2xl font-bold text-gray-900 mb-2">
                    3 a 5 vezes por semana
                  </p>
                  <p className="text-lg text-gray-700">
                    Com pelo menos <span className="font-semibold text-teal-600">1 dia de descanso</span> entre os treinos
                  </p>
                </div>

                <div className="grid grid-cols-7 gap-2 mt-8">
                  {["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"].map((day, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg text-center font-semibold transition-all duration-300 ${
                        [0, 1, 3, 4, 5].includes(index)
                          ? "bg-gradient-to-br from-blue-500 to-teal-500 text-white shadow-lg"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {trainingDay > 0 && (
                  <div className="mt-8 p-4 bg-blue-100 border-l-4 border-blue-600 rounded">
                    <p className="text-blue-900 font-semibold text-lg">
                      🎯 Hoje é seu dia <span className="text-2xl text-blue-600">{trainingDay}</span> de 5 da semana!
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabela Detalhada de Treinos - Semana 1 */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Plano Detalhado - Semana 1</h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Dia</th>
                    <th className="px-6 py-4 text-left font-semibold">Duração Total</th>
                    <th className="px-6 py-4 text-left font-semibold">Treino</th>
                    <th className="px-6 py-4 text-left font-semibold">Intensidade</th>
                    <th className="px-6 py-4 text-left font-semibold">Observações</th>
                  </tr>
                </thead>
                <tbody>
                  {weeklySchedule.map((item, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-200 hover:bg-blue-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-semibold text-gray-900">{item.day}</td>
                      <td className="px-6 py-4 text-gray-700">{item.duration}</td>
                      <td className="px-6 py-4 text-gray-700">{item.duration} contínuos</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {item.intensity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700 text-sm">{item.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Dicas Importantes */}
      <section id="dicas" className="py-16 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Dicas Importantes</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {tips.map((tip, index) => (
                <Card
                  key={index}
                  className="border-blue-200 hover:border-teal-400 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                >
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <span className="text-4xl flex-shrink-0">{tip.icon}</span>
                      <p className="text-gray-700 font-semibold leading-relaxed">{tip.title}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivação Final */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-teal-500 to-blue-600 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%27 height=%2760%27 viewBox=%270 0 60 60%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%270.05%27%3E%3Cpath d=%27M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              O importante não é pedalar rápido,
              <br />
              <span className="text-yellow-300">é não parar.</span>
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Cada pedalada é um passo em direção a uma versão melhor de você. Sua consistência é sua força.
            </p>
            {showMotivation && (
              <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg p-6 animate-fade-in">
                <p className="text-white text-lg font-semibold">
                  ✨ Você está pronto! Comece hoje e celebre cada sessão. Você consegue! 💪
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg">Feito com dedicação para ajudar você a começar bem sua jornada.</p>
          <p className="text-sm mt-4 text-gray-500">
            BikeErgo © 2024 | Seu plano de treino na bicicleta ergométrica
          </p>
        </div>
      </footer>
    </div>
  );
}

