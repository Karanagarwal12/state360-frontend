import content from "@/data/whats-hof.json";

const AboutSection = () => (

    <section className="w-full my-4 sm:my-10 flex relative">

        <h2 className="sr-only">Learn About HackoFiesta</h2>
        <h3 className="sr-only">
            HackoFiesta is an innovation-focused hackathon event offering exciting opportunities to win prizes and showcase talent.
        </h3>

        <div className="z-10 absolute top-0 left-0 bg-[#f7560067] w-full h-full"></div>

        <div className="mx-auto flex">
            <div className="max-w-7xl mx-auto m-8 md:m-12 z-20 px-6">
                <h1 className="text-4xl font-extrabold text-indigo-900 mb-8" id="about">
                    WHAT IS STATE360?
                </h1>
                <div className="space-y-4 flex max-w-7xl gap-2 sm:gap-4 justify-center items-center text-sm md:text-base text-gray-800 leading-relaxed">
                    <div className="flex flex-col gap-2">
                        {content.map((paragraph, index) => (
                            <div key={index}>{paragraph}</div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative z-0">
                <img src="/image/pexel2.jpg" className="h-96 image-trapez-clip object-cover" />
            </div>
        </div>
    </section>
);

export default AboutSection;
