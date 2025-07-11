import React from "react";
import {
  
  FaInstagram,
 
  FaTwitter,
  FaYoutube,
  
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer id="footer" className="bg-black text-white px-6 md:px-20 py-12">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-4 gap-10">
        {/* Logo & Socials */}
        <div>
          <h1 className="text-2xl font-semibold mb-2">
            <img src="/img/suratlogo.png" alt="suratbet-logo" />
          </h1>
          <p className="text-sm text-gray-400 mb-4">
            Süratbet, spor bahisleri ve canlı casino alanında güvenilir hizmet
            sunmak üzere kurulmuş modern bir oyun platformudur. Betco altyapısı
            ile donatılmış sistemi ve Tobuque lisansı sayesinde kullanıcılarına
            yasal, hızlı ve kesintisiz bir bahis deneyimi sunar. Zengin oyun
            seçenekleri, avantajlı kampanyalar, kullanıcı dostu ara yüzü ve 7/24
            canlı destek ekibiyle fark yaratan bir deneyim sunar.
          </p>
          <div className="flex gap-4 mt-4 text-xl text-white">
            
            <a href="https://www.instagram.com/suratbetoffical/?igsh=aGR2MmR2dmM3MmVm#">
              <FaInstagram />
            </a>
            
           
            <a href="https://x.com/SuratBetOffical">
              <FaTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UCm5xuyHyZeHFrAjxRz5bYQA">
              <FaYoutube />
            </a>
            <a href="https://t.me/suratbet">
              <FaTelegram/>
            </a>
          </div>
        </div>

        {/* Links 1 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">İLETİŞİM</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="#">destek@suratbet.com</a>
            </li>
            <li>
              <a href="#">finans@suratbet.com</a>
            </li>
            <li>
              <a href="#">bonus@suratbet.com</a>
            </li>
          </ul>
        </div>

        {/* Links 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-3">HIZLI LİNK</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="story">Hakkımızda</a>
            </li>
            <li>
              <a href="features">S.S.S</a>
            </li>
            <li>
              <a href="footer">İletişim</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3"></h3>
          <p className="text-sm text-gray-300 mb-3">
            Ortaklık Programı
            <br />
            <a
              href="https://suratbetaffilate.com/"
              className="text-lime-400"
            >
              Süratbet iş ortaklığı programına katılarak gelir elde etmeye
              başlayın. Hemen başvurun, kazandıran sistemi siz yönetin.
            </a>
          </p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2025 Tüm hakları saklıdır. SüratBet</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="https://www.suratbet234.com/tr/">Genel Kurallar & Şartlar</a>
          <a href="https://www.suratbet234.com/tr/">Gizlilik Politikası</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
