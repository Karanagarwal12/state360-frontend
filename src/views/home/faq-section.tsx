"use client";
import { useState } from "react";
import faqs from "../../data/faqs.json";
import misc from "@/data/miscellaneous.json";

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            className="max-w-7xl mx-auto p-6 my-10"
            aria-labelledby="faq-section-title"
        >
            {/* Hidden Heading for SEO */}
            <h2 id="faq-section-title" className="sr-only">
                Frequently Asked Questions about HackoFiesta
            </h2>

            <h1 className="text-4xl font-bold text-orange-500 mb-8 text-center">
                FAQs - Frequently Asked Questions
            </h1>

            <div
                className="space-y-4 bg-cover bg-no-repeat bg-center relative rounded-xl overflow-hidden sm:p-8 sm:mx-20"
            >
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-faq-background"
                    aria-hidden="true"
                    style={{
                        backgroundImage: "url('/image/india.jpeg')",
                        opacity: 0.1,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                ></div>

                <div className="relative z-10 space-y-6">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border rounded-lg overflow-hidden shadow-sm transition-transform duration-300 transform hover:scale-105"
                        >
                            <button
                                className={`w-full text-left p-4 flex justify-between items-center transition duration-300 ${openIndex === index ? "bg-red-100" : "bg-white/25"
                                    }`}
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                <span className="font-semibold text-lg text-black">
                                    {faq.question}
                                </span>
                                <span
                                    className="text-2xl font-bold text-gray-600"
                                    aria-hidden="true"
                                >
                                    {openIndex === index ? "−" : "+"}
                                </span>
                            </button>

                            {openIndex === index && (
                                <div
                                    id={`faq-answer-${index}`}
                                    className="p-4 bg-white transition-opacity duration-300"
                                    role="region"
                                    aria-labelledby={`faq-question-${index}`}
                                >
                                    <p
                                        id={`faq-question-${index}`}
                                        className="text-gray-700"
                                    >
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
