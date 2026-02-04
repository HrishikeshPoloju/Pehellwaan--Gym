import { Dumbbell, Instagram, Twitter, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Member Portal', href: '#' },
      { name: 'Class Schedule', href: '#' },
      { name: 'Contact Us', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'Youtube' },
  ];

  return (
    <footer className="bg-sage-dark text-cream/80 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-cream/10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                <Dumbbell className="w-5 h-5 text-sage-dark" />
              </div>
              <span className="font-bold text-xl text-cream">Pehellwaan Gym</span>
            </a>
            <p className="text-cream/70 mb-6 max-w-sm leading-relaxed">
              Empowering you to reach your peak potential. Premium equipment, expert coaching, and a community that pushes you further.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a href="mailto:info@pehellwaangym.com" className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors">
                <Mail className="w-4 h-4" />
                <span className="text-sm">info@pehellwaangym.com</span>
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-3 text-cream/70 hover:text-cream transition-colors">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91-XXXXXXXXXX</span>
              </a>
              <div className="flex items-center gap-3 text-cream/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Pehellwaan Gym, [City, State]</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-cream mb-6">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-cream mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-cream mb-6">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-cream/60 text-center md:text-left">
            © {new Date().getFullYear()} Pehellwaan Gym. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-cream/70 hover:bg-cream hover:text-sage-dark transition-all duration-300"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
