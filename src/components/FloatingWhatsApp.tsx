import React from 'react';
import { CONFIG } from '../config';

export default function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${CONFIG.whatsappNumber}?text=Hi%20Tuck%20and%20Pin%2C%20I'd%20like%20to%20know%20more%20about%20your%20saree%20pleating%20services.`}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact WhatsApp Support"
      className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-3.5 rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition-all cursor-pointer flex items-center justify-center border border-emerald-500/20"
    >
      <svg className="w-6.5 h-6.5 fill-current" viewBox="0 0 24 24">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.1 1.45 4.8 1.45 5.5 0 10-4.5 10-10s-4.5-10-10-10C6.9 1 2.4 5.5 2.4 11c0 1.9.5 3.4 1.5 4.9l-.98 3.59 3.69-.966zm11.41-6.1c-.24-.12-1.41-.69-1.63-.77-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06-1.54-.77-2.54-1.36-3.55-3.1-.27-.46.27-.43.76-1.41.08-.16.04-.3-.02-.42s-.54-1.3-.74-1.78c-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32 1 2.5c.12.16 1.69 2.58 4.1 3.62.57.25 1 .4 1.34.5.58.18 1.1.16 1.51.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.11-.22-.17-.46-.29z" />
      </svg>
    </a>
  );
}
