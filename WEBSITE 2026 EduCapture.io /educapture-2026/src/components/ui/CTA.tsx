import Link from 'next/link';

export default function CTA() {
    return (
        <section className="bg-gray-light py-20">
            <div className="container mx-auto px-4">
                <div className="bg-primary-dark rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Klaar om uw rijschool te moderniseren?
                        </h2>
                        <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
                            Sluit u aan bij honderden rijscholen die al werken met de bewezen oplossing van EduCapture.
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block bg-accent hover:bg-opacity-90 text-white font-bold py-4 px-10 rounded-lg transition-transform hover:-translate-y-1 shadow-lg text-lg"
                        >
                            Vraag een demo aan
                        </Link>
                    </div>

                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full"></div>
                </div>
            </div>
        </section>
    );
}
