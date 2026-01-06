import Hero from "@/components/ui/Hero";
import FeatureCard from "@/components/ui/FeatureCard";
import CTA from "@/components/ui/CTA";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4">
              Alles wat u nodig heeft voor een <span className="text-primary">Professionele Rijschool</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Onze tools zijn ontworpen om uw dagelijkse operatie te ondersteunen, niet om deze over te nemen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Consistente Leskwaliteit"
              description="Verhoog de leskwaliteit binnen uw hele team met consistente, data-ondersteunde begeleiding en analyses."
              icon={<span>📊</span>}
            />
            <FeatureCard
              title="Modern Leerlingtraject"
              description="Bied uw leerlingen een modern, gestructureerd leertraject dat hen betrokken houdt van de eerste les tot het examen."
              icon={<span>📱</span>}
            />
            <FeatureCard
              title="Privacy First"
              description="Volledig AVG-compliant en ontworpen met privacy als fundament. Uw bedrijfsdata blijft van u."
              icon={<span>🔒</span>}
            />
            <FeatureCard
              title="Efficiënte Bedrijfsvoering"
              description="Automatiseer administratieve taken en krijg inzicht in de prestaties van uw wagenpark en instructeurs."
              icon={<span>⚙️</span>}
            />
            <FeatureCard
              title="Toekomstbestendig"
              description="Voorbereid op komende wet- en regelgeving in de rijschoolbranche. Blijf de concurrentie voor."
              icon={<span>🚀</span>}
            />
            <FeatureCard
              title="Partner Netwerk"
              description="Word onderdeel van een netwerk van professionele rijscholen en deel kennis en ervaringen."
              icon={<span>🤝</span>}
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section (Placeholder) */}
      <section className="py-20 bg-gray-light border-y border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-400 mb-10 uppercase tracking-widest">
            Vertrouwd door toonaangevende rijscholen
          </h3>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
            {/* Logo placeholders */}
            <div className="h-10 text-xl font-bold text-gray-400 flex items-center">Rijschool A</div>
            <div className="h-10 text-xl font-bold text-gray-400 flex items-center">DriveMaster</div>
            <div className="h-10 text-xl font-bold text-gray-400 flex items-center">Verkeersschool X</div>
            <div className="h-10 text-xl font-bold text-gray-400 flex items-center">TopDrive</div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
