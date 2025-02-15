import React from "react";
import { HackofestaMilestones } from "./milestone";

import ProblemStatements from "./problem-statement";
import FAQSection from "./faq-section";
import AboutSection from "./about-section";
import OpenIdeaSection from "./open-idea";

const Paddinghr = () => {
    return <hr className="bg-black m-4" />;
};

const MainBody = () => {


    return (
        <>
            <div className="flex flex-col">

                <AboutSection />

                <div id="problem-statements">
                    <ProblemStatements />
                </div>
                <OpenIdeaSection />

                <Paddinghr />

                <HackofestaMilestones />

                <div id="faqs">
                    <FAQSection />
                </div>
                <hr className="bg-black" />


                <Paddinghr />

            </div>
        </>
    );
};

export default MainBody;


