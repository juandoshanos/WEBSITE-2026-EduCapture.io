import Link from 'next/link';

export default function Hero() {
    return (
        <section className="relative bg-primary-dark text-white pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="inline-block bg-white/10 px-4 py-1 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm border border-white/10">
                        De Partner voor Professionele Rijscholen
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        De Bewezen Oplossing voor de <span className="text-primary">Moderne Rijschool</span>.
                    </h1>
                    <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Transformeer lesuren naar complete lestrajecten. Bied gestructureerde leerlingbegeleiding en werk efficiënter met moderne tools die u en uw instructeurs ondersteunen.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="bg-primary hover:bg-opacity-90 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:-translate-y-1 shadow-lg text-lg"
                        >
                            Plan een vrijblijvend gesprek
                        </Link>
                        <Link
                            href="#features"
                            className="bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg backdrop-blur-sm border border-white/10 transition-all text-lg"
                        >
                            Ontdek hoe EduCapture helpt
                        </Link>
                    </div>
                </div>
            </div>

            {/* Background Gradient Effect */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-primary-dark via-primary-dark to-black opacity-50"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 blur-[100px] rounded-full"></div>
            </div>
        </section>
    );
}
