import Link from "next/link";
import misc from "@/data/miscellaneous.json";

const OpenIdeaSection = () => (
  <div className="relative bg-indigo-900 text-white py-8 sm:my-2 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex items-center justify-center w-full">
    <div className="relative max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-12 text-start">
        Revolutionize Surveillance with Your AI-Powered Idea!
      </h1>
      <p className="mb-8">
        Do you have an innovative vision for enhancing security, crime prevention, or crowd management?
        <br />
        <br />
        State360 invites you to bring groundbreaking AI-powered surveillance solutions to life.
        <br />
        <br />
        Leveraging AI and ML to redefine public safety, automate real-time monitoring, and push the boundaries of intelligent surveillance.
        <br />
        <br />
      </p>
      <div className="flex justify-center">
        <Link
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded mt-2"
          href={"/mapdata"}
        >
          EXPLORE NOW
        </Link>
      </div>
      <div
        className="absolute -right-[30rem] -bottom-[8rem] z-10 w-3/4 scale-150 h-full"
        style={{
          backgroundImage: "url('/image/ai_surveillance.png')",
          backgroundSize: "contain",
          opacity: 0.1,
        }}
      ></div>
    </div>
  </div>
);

export default OpenIdeaSection;
