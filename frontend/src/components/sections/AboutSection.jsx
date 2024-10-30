import React from 'react';
import Image from '@/components/common/Image';

function AboutSection() {
    return (
        <div>
            <section className="bg-white py-20 px-4">
                <div className="container mx-auto">
                    {/* Título */}
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-customPink1">Nuestra Historia</h1>
                    <p className="text-center text-lg text-gray-700 mb-8 italic">
                        Un equipo diverso trabajando en estrecha colaboración para ofrecerte los mejores postres
                    </p>

                    {/* Imagen y texto de la historia */}
                    <div className="flex flex-col md:flex-row items-center mb-16 space-y-8 md:space-y-0 md:space-x-8">
                        <Image
                            src="aboutus/aboutus1.jpg"
                            alt="About Us"
                            className="w-full h-60 md:h-96 md:w-1/2 rounded-lg shadow-lg"
                        />
                        <div className="md:w-1/2 text-gray-700">
                            <p className="mb-4">
                                En Cakes by Naty, no solo nos especializamos en la creación de pasteles deliciosos y personalizados para
                                cualquier ocasión. Nuestro equipo de expertos pasteleros también crea una variedad de postres que
                                incluyen galletas, cupcakes, cakepops y mucho más. Utilizamos solo los mejores ingredientes para asegurar
                                que cada postre sea una obra de arte.
                            </p>
                            <p className="mb-4">
                                Entendemos que la presentación elegante es tan importante como el sabor, y nuestro equipo de talentosos
                                artesanos toma el tiempo para decorar cada postre a mano. Siempre horneamos con ingredientes frescos y de
                                alta calidad, como mantequilla, huevos frescos y sin mezclas comerciales.
                            </p>
                            <p>
                                Aspiramos a ser la pastelería preferida en la región, conocida por la calidad y creatividad de nuestros
                                productos. Ya sea que estés celebrando un cumpleaños, una boda, o simplemente quieras disfrutar de un
                                delicioso postre, estamos aquí para hacer tus momentos especiales aún más dulces.
                            </p>
                        </div>
                    </div>

                    {/* Misión y Visión */}
                    <div className="bg-customCream p-6 md:p-8 rounded-lg shadow-lg mb-16 text-center">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-4">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-subtitlesPink">Nuestra Misión</h2>
                                <p className="text-gray-700">
                                    Nuestra misión es hacer tus momentos especiales aún más dulces con nuestros pasteles personalizados y
                                    deliciosos. Nos comprometemos a utilizar solo los mejores ingredientes y a ofrecer un servicio
                                    excepcional a nuestros clientes.
                                </p>
                            </div>
                            <div className="p-4">
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-subtitlesPink">Nuestra Visión</h2>
                                <p className="text-gray-700">
                                    Aspiramos a ser la pastelería preferida en la región, conocida por la calidad y creatividad de nuestros
                                    productos. Queremos que cada cliente se sienta especial y que nuestros postres sean parte de sus
                                    momentos más memorables.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Galería de imágenes */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                        <Image src="aboutus/cake1.jpg" alt="Pasteles" className="w-full rounded-lg shadow-lg" />
                        <Image src="/cakepops1.webp" alt="Cakepops" className="w-full rounded-lg shadow-lg" />
                        <Image src="/chocolatecookies1.avif" alt="Galletas" className="w-full rounded-lg shadow-lg" />
                        <Image src="aboutus/espumillas1.png" alt="Espumillas" className="w-full rounded-lg shadow-lg" />
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutSection;
