"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import Header from "@/views/home/Header";
import React from "react";
import Image from "next/image";
import Footer from "@/views/home/Footer";
import Dashboard from "@/components/charts/Dashboard";
declare global {
  interface Window {
    google: any;
  }
}

// Declare types for Google Maps
type GoogleMap = google.maps.Map;
type HeatmapLayer = google.maps.visualization.HeatmapLayer;
type LatLng = google.maps.LatLng;

const page = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<GoogleMap | null>(null);
  const [heatmap, setHeatmap] = useState<HeatmapLayer | null>(null);

  // Generate some random data points across India
  const generateHeatMapData = (google: typeof window.google) => {
    const indiaBounds = {
      latMin: 8.4, // Southernmost point
      latMax: 37.6, // Northernmost point
      lngMin: 68.7, // Westernmost point
      lngMax: 97.25, // Easternmost point
    };
    const points = [];
    for (let i = 0; i < 100; i++) {
      points.push({
        location: new google.maps.LatLng(
          indiaBounds.latMin + Math.random() * (indiaBounds.latMax - indiaBounds.latMin),
          indiaBounds.lngMin + Math.random() * (indiaBounds.lngMax - indiaBounds.lngMin)
        ),
        weight: Math.random() * 10,
      });
    }
    return points;
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const loadMap = async () => {
      const { Map } = (await window.google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;
      const { HeatmapLayer } = (await window.google.maps.importLibrary(
        "visualization"
      )) as google.maps.VisualizationLibrary;

      if (mapRef.current) {
        const mapInstance = new Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 },
          zoom: 5,
          mapId: "heat-map-example",
          disableDefaultUI: true,
          styles: [
            {
              featureType: "all",
              elementType: "labels",
              stylers: [{ visibility: "off" }],
            },
          ],
        });

        const heatmapInstance = new HeatmapLayer({
          data: generateHeatMapData(window.google),
          map: mapInstance,
          radius: 30,
          opacity: 0.7,
          gradient: [
            "rgba(0, 255, 255, 0)",
            "rgba(0, 255, 255, 1)",
            "rgba(0, 191, 255, 1)",
            "rgba(0, 127, 255, 1)",
            "rgba(0, 63, 255, 1)",
            "rgba(0, 0, 255, 1)",
            "rgba(0, 0, 223, 1)",
            "rgba(0, 0, 191, 1)",
            "rgba(0, 0, 159, 1)",
            "rgba(0, 0, 127, 1)",
            "rgba(63, 0, 91, 1)",
            "rgba(127, 0, 63, 1)",
            "rgba(191, 0, 31, 1)",
            "rgba(255, 0, 0, 1)",
          ],
        });
        setMap(mapInstance);
        setHeatmap(heatmapInstance);
      }
    };

    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=visualization`;
    script.async = true;
    script.onload = () => loadMap();
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className=" mx-auto">
        <Header />
      </div>
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="bg-background p-4 md:p-8">
          <Card className="mx-auto max-w-5xl overflow-hidden rounded-lg">
            <div className="p-4">
              <h1 className="text-2xl font-bold">Heat Map Visualization</h1>
              <p className="text-muted-foreground">
                Showing dangerous activity density across India
              </p>
            </div>
            <div ref={mapRef} className="h-[600px] w-full" />
          </Card>
        </div>
      </div>
      <Dashboard/>
      <Footer />
    </>
  );
};

export default page;
