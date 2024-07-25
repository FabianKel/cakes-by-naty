import React from 'react'

function HeroSection() {
    return (
        <section className="bg-white-200 py-20 px-4 text-center">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-4">Bienvenido a Cakes by Naty</h1>
                <p className="text-lg mb-8">Disfruta de nuestros deliciosos pasteles hechos con amor y los mejores ingredientes.</p>
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
                <button className="bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">Botón</button>
            </div>
        </section>
    )
}

export default HeroSection