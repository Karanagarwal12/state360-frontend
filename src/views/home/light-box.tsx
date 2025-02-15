"use client";
import React, { useEffect, useState } from "react";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image, { StaticImageData } from "next/image";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import AwesomeSlider from "react-awesome-slider"
// @ts-ignore
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

const AutoPlaySlider = withAutoplay(AwesomeSlider);

interface Slide {
    src: string;
    width: number;
    height: number;
    srcSet: { src: string; width: number; height: number }[];
}

interface ArtworksProps {
    auto?: boolean;
    isMobile?: boolean;
    paths: string[];
}

const createSlides = (imageUrls: StaticImageData[], auto: boolean): Slide[] => {
    return imageUrls.map((url) => {
        const { width, height } = url;

        return {
            src: url.src,
            width,
            height,
            srcSet: [{ src: url.src, width, height }],
        };
    });
};
const PatronCard: React.FC<PatronMember> = ({ name, title }) => (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <h3 className="text-indigo-900 font-semibold text-lg mb-1">{name}</h3>
        <p className="text-gray-600 text-sm text-center italic">{title}</p>
    </div>
);
interface PatronMember {
    name: string;
    title: string;
}

const Artworks: React.FC<ArtworksProps> = ({
    auto = false,
    paths,
    //   isMobile = false,
}) => {

    return (
        <div className="flex gap-4 mx-auto rounded-md mb-16 sm:mb-0 mt-10 md:mt-0">
        
          
            <AutoPlaySlider play={false} interval={3000} className="max-w-7xl max-h-[44rem]">
                {paths.map((path, idx) => {
                    return (
                        <div className="p-6" key={idx} data-src={path}>
                        </div>
                    )
                })}
            </AutoPlaySlider>
        </div>
    );
};

export default Artworks;