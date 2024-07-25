import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

function AboutPage() {
    return (
        <div>
            <Header />
            <section className="bg-gray-100 py-20 px-4">
                <div className="container mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Sobre Nosotros</h1>
                    <p className="text-lg mb-8">
                        Somos una pastelería dedicada a crear los mejores pasteles con los ingredientes más frescos y mucho amor.
                        Nuestra misión es hacer tus celebraciones más dulces y especiales.
                    </p>
                    <p className="text-lg mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in venenatis enim. Nulla facilisi. Duis nec justo ut
                        magna aliquam tincidunt. Integer non ligula vitae turpis auctor consequat non non eros.
                    </p>
                    <p className="text-lg mb-4">
                        Suspendisse potenti. Vivamus volutpat feugiat magna, ac malesuada metus. Aenean vestibulum, purus eu sagittis viverra,
                        neque justo pulvinar dolor, a pharetra justo est et massa.
                    </p>
                    <p className="text-lg mb-4">
                        Sed euismod mauris ac nisi dictum, vel ultricies ligula ultricies. Donec vel lacus vitae nisi elementum hendrerit nec
                        euismod ex. Quisque maximus auctor neque, at lacinia eros. Cras ut lectus et sapien interdum auctor nec quis metus.
                    </p>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutPage;