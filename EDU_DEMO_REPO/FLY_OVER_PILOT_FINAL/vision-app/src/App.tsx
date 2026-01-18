import { Deck } from './components/Deck';
import { Slide } from './components/Slide';
import { Users, ShieldCheck, Handshake, BarChart3, Construction, Lightbulb, TrendingUp } from 'lucide-react';

function App() {
  return (
    <Deck>
      {/* Slide 1: Introduction - Specific Title Change */}
      <Slide title="Van Rijles Naar Rijonderwijs" subtitle="Fly-Over & Educapture Pilot lancering & visieplan.">
        <div className="space-y-6">
          <p className="text-xl leading-relaxed">
            De rijschoolbranche staat aan de vooravond van een fundamentele transformatie.
            Als regiokoploper en technologiepartner bundelen <strong>Fly-Over</strong> en <strong>EduCapture</strong> hun krachten om deze verandering samen te leiden en de nieuwe standaard te zetten.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-brand-deep/50 rounded-lg border border-brand-primary/30">
              <h4 className="font-heading text-white text-lg mb-2 flex items-center gap-2">
                <Lightbulb size={20} className="text-brand-primary" /> De Ambitie
              </h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Operationele efficiëntie verhogen, leerresultaten verbeteren en een toekomstbestendig model neerzetten dat schaalbaar is.
              </p>
            </div>
            <div className="p-6 bg-brand-deep/50 rounded-lg border border-white/10">
              <h4 className="font-heading text-white text-lg mb-2 flex items-center gap-2">
                <Handshake size={20} className="text-brand-primary" /> De Rol van Fly-Over
              </h4>
              <p className="text-sm opacity-80 leading-relaxed">
                Een strategische pilotpartner en co-innovator die de standaard zet voor de rest van Nederland.
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 2: Vision for Future (1-3 Years) */}
      <Slide title="De Rijschool van de Toekomst" subtitle="Visieplan">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
          <div className="space-y-6">
            <p className="text-lg">
              Wij bouwen geen losse "tool", maar een compleet modulair platform dat meegroeit met uw rijschool.
              De toekomst is datagedreven, persoonlijk en geautomatiseerd.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="bg-brand-primary/20 p-2 rounded-full"><BarChart3 size={18} className="text-brand-primary" /></div>
                <div>
                  <strong className="text-white block">Datagedreven in plaats van Subjectieve feedback</strong>
                  <span className="text-sm opacity-80">Beslissingen op basis van harde feiten en analyses, niet op onderbuikgevoel.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-brand-primary/20 p-2 rounded-full"><Users size={18} className="text-brand-primary" /></div>
                <div>
                  <strong className="text-white block">Persoonlijk & Schaalbaar</strong>
                  <span className="text-sm opacity-80">Meer aandacht voor de leerling, zonder dat de overhead voor de rijschool evenredig meegroeit.</span>
                </div>
              </li>
            </ul>
          </div>
          <div className="glass-card p-8 bg-brand-navy/30 border-brand-primary/20 flex flex-col justify-center">
            <h4 className="text-xl font-bold text-white mb-4">Erkenning & Zekerheid</h4>
            <p className="text-sm opacity-80 mb-4">
              <strong>RVO-innovatiekrediet</strong> de Nederlandse staat erkent onze innovatie als fundamenteel en ondersteunt ons in de ontwikkeling.
            </p>
            <ul className="space-y-2 text-sm text-brand-dim">
              <li className="flex items-center gap-2">✓ Financiële ruimte voor meerjarige ontwikkeling</li>
              <li className="flex items-center gap-2">✓ Continuïteit voor pilotpartners</li>
              <li className="flex items-center gap-2">✓ Geen korte-termijn commerciële druk</li>
            </ul>
          </div>
        </div>
      </Slide>

      {/* Slide 3: Collaboration Model */}
      <Slide title="Samenwerkingsmodel" subtitle="De Rolverdeling">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* EduCapture Role */}
          <div className="glass-card p-6 flex flex-col border-brand-primary/20 bg-brand-navy/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-brand-primary/10 p-2 rounded-lg"><Construction size={24} className="text-brand-primary" /></div>
              <h3 className="text-xl font-bold text-white">Rol EduCapture</h3>
            </div>
            <p className="text-sm opacity-70 mb-4 h-12">
              Wij zorgen voor de techniek en de lange-termijn ontwikkeling.
            </p>
            <div className="space-y-3 mt-auto">
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <strong className="text-brand-primary text-sm block">Technische Infrastructuur</strong>
                <span className="text-xs opacity-70">Robuuste hardware en software bases.</span>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <strong className="text-brand-primary text-sm block">Data-analyse & Optimalisatie</strong>
                <span className="text-xs opacity-70">Continue verbetering van AI-modellen.</span>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <strong className="text-brand-primary text-sm block">Productvisie</strong>
                <span className="text-xs opacity-70">Strategische roadmap voor de toekomst.</span>
              </div>
            </div>
          </div>

          {/* Fly-Over Role */}
          <div className="glass-card p-6 flex flex-col border-brand-primary/20 bg-brand-primary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/10 p-2 rounded-lg"><Users size={24} className="text-brand-primary" /></div>
              <h3 className="text-xl font-bold text-white">Rol Fly-Over</h3>
            </div>
            <p className="text-sm opacity-70 mb-4 h-12">
              Als koploper in modern rijonderwijs zet Fly-Over de standaard voor de implementatie van AI in het lestraject.
            </p>
            <div className="space-y-3 mt-auto">
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <strong className="text-brand-primary text-sm block">Kwaliteitsborging</strong>
                <span className="text-xs opacity-70">Expertise in educatieve overdracht.</span>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <strong className="text-brand-primary text-sm block">Implementatieleider</strong>
                <span className="text-xs opacity-70">Directe inzet van technologie in de regio.</span>
              </div>
              <div className="p-3 bg-white/5 rounded border border-white/5">
                <strong className="text-brand-primary text-sm block">Branche-innovatie</strong>
                <span className="text-xs opacity-70">Aanjager van digitale transitie binnen de sector.</span>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* Slide 4: Strategic Implementation Roadmap */}
      <Slide title="Implementatie & Schaal" subtitle="Fasering & Resultaat">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="glass-card p-6 relative overflow-hidden group hover:border-brand-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl">1</div>
            <h4 className="text-lg font-bold text-white mb-2">White-Label Rollout</h4>
            <p className="text-sm size-sm opacity-70 mb-4">
              Directe lancering van de Fly-Over applicatie met volledige branding.
            </p>
            <ul className="text-xs space-y-2 opacity-80">
              <li>• Actieve implementatie</li>
              <li>• Instructeur enablement</li>
              <li>• Merkidentiteit borging</li>
            </ul>
          </div>
          <div className="glass-card p-6 relative overflow-hidden group hover:border-brand-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl">2</div>
            <h4 className="text-lg font-bold text-white mb-2">Operationele Impact</h4>
            <p className="text-sm size-sm opacity-70 mb-4">
              Maximaliseren van efficiëntie voor de gehele rijschool.
            </p>
            <ul className="text-xs space-y-2 opacity-80">
              <li>• Opschaling naar alle leerlingen</li>
              <li>• Geautomatiseerde rapportages</li>
              <li>• Rendementsverhoging</li>
            </ul>
          </div>
          <div className="glass-card p-6 relative overflow-hidden group hover:border-brand-primary transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl">3</div>
            <h4 className="text-lg font-bold text-white mb-2">Toekomstige Innovatie</h4>
            <p className="text-sm size-sm opacity-70 mb-4">
              Continue uitbreiding van AI-features binnen het platform.
            </p>
            <ul className="text-xs space-y-2 opacity-80">
              <li>• Strategische doorontwikkeling</li>
              <li>• Data-gedreven coaching</li>
              <li>• Marktuitbreiding</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 p-4 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-between">
          <div>
            <strong className="text-white">De Nieuwe Standaard:</strong>
            <span className="text-sm opacity-80 ml-2">Gezamenlijk de toon zetten voor de toekomst van modern en efficiënt rijonderwijs.</span>
          </div>
          <TrendingUp size={24} className="text-brand-primary" />
        </div>
      </Slide>

      {/* Slide 5: Marketing & Positioning */}
      <Slide title="Marktpositie" subtitle="Fly-Over als Voorloper">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg mb-6">
              Wij positioneren Rijschool Fly-Over niet als "gebruiker van software", maar als <strong>het innovatieve rijschoolmodel van Nederland</strong>.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 rounded-full bg-brand-primary"></div>
                <div>
                  <h5 className="font-bold text-white">Co-branded Case Study</h5>
                  <p className="text-sm opacity-70">Een gezamenlijk succesverhaal naar de buitenwereld.</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-1 rounded-full bg-brand-primary"></div>
                <div>
                  <h5 className="font-bold text-white">Thought Leadership</h5>
                  <p className="text-sm opacity-70">Zichtbaarheid via content, events en vakmedia.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 flex flex-col justify-center text-center">
            <ShieldCheck size={48} className="text-brand-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Intellectueel Eigendom</h3>
            <p className="text-sm opacity-80">
              Onze ingediende patenten borgen een langdurig concurrentievoordeel en exclusiviteit voor onze partners.
            </p>
          </div>
        </div>
      </Slide>

      {/* Slide 6: Demo Transition */}
      <Slide title="De Eerste Stap" subtitle="Pilot Dashboard">
        <div className="text-center space-y-8">
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            De theorie is helder. Nu de praktijk.
            Bekijk de <strong>Fly-Over Pilot Omgeving</strong>: uw eigen white-label dashboard.
          </p>

          <div className="glass-card inline-block p-12 hover:border-brand-primary transition-colors cursor-pointer group">
            <h2 className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
              Start Demo
            </h2>
            <p className="text-brand-primary text-sm uppercase tracking-widest">
              Naar de Applicatie
            </p>
          </div>
        </div>
      </Slide>
    </Deck>
  );
}

export default App;
