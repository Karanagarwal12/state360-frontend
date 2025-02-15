import data from "@/data/footer-data.json";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const icons = {
    INSTAGRAM: <FaInstagram className="text-xl" aria-hidden="true" />,
    LINKEDIN: <FaLinkedin className="text-xl" aria-hidden="true" />,
    X: <FaTwitter className="text-xl" aria-hidden="true" />,
    FACEBOOK: <FaFacebook className="text-xl" aria-hidden="true" />,
  };

  return (
    <footer className="bg-black text-white py-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        {/* Follow Us Section */}
        <nav
          aria-label="Social Media Links"
          className="flex flex-col items-start text-center md:text-left"
        >
          <h2 className="text-xl font-bold mb-4 md:mb-0">FOLLOW US</h2>
          <div className="grid grid-cols-2 my-4 gap-4">
            {data.socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-blue-200 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Follow us on ${link.name}`}
              >
                {(icons as any)[link.name]}
                <span className="sr-only">{link.name}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Contact Us Section */}
        <address className="not-italic text-left">
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <div className="space-y-2">
            <p>
              <a
                href={`tel:${data.contactInfo.phones[0]}`}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Call us at ${data.contactInfo.phones[0]}`}
              >
                {data.contactInfo.phones[0]}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${data.contactInfo.emails[0]}`}
                className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Email us at ${data.contactInfo.emails[0]}`}
              >
                {data.contactInfo.emails[0]}
              </a>
            </p>
          </div>
        </address>
      </div>

      <hr className="border-gray-700 my-6" />

      <div className="text-center text-sm text-gray-400">
        ©2025 STATE360
      </div>
    </footer>
  );
};

export default Footer;
