import React, { useState } from 'react';
import { Sparkles, Scale, Heart, Mail, MapPin } from 'lucide-react';
import { TermsModal, PrivacyModal } from '../legal/LegalModals';

export const Footer: React.FC = () => {
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  return (
    <>
      <footer className="bg-gradient-to-b from-calido-100 to-calido-200 border-t border-vino-100 pt-16 pb-12 text-calido-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-calido-300">
            {/* Columna 1: Identidad */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-vino-800 flex items-center justify-center text-white font-outfit font-black text-xl shadow-soft-vino">
                  K
                </div>
                <span className="font-outfit font-black text-2xl text-vino-950">
                  Profe Kami
                </span>
              </div>
              <p className="text-xs text-calido-700 leading-relaxed max-w-md">
                Academia especializada en pedagogía lúdico-matemática en Pasto, Nariño. Transformamos la relación de niños y jóvenes con las matemáticas a través de desafíos gamificados, pensamiento crítico y acompañamiento afectivo.
              </p>
              <div className="flex items-center gap-4 text-xs text-vino-900 font-semibold pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-vino-600" />
                  Pasto, Nariño - Colombia
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-vino-600" />
                  profekami06@gmail.com
                </span>
              </div>
            </div>

            {/* Columna 2: Enlaces Rápidos */}
            <div className="space-y-3">
              <h4 className="font-outfit font-bold text-sm text-vino-950 uppercase tracking-wider">
                Academia
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="/#metodologia" className="hover:text-vino-700 transition-colors">Metodología "Matemática es un Juego"</a></li>
                <li><a href="/#inscripcion" className="hover:text-vino-700 transition-colors">Admisiones de Estudiantes</a></li>
                <li><a href="/#horarios" className="hover:text-vino-700 transition-colors">Horarios y Modalidades</a></li>
                <li><a href="/login" className="hover:text-vino-700 transition-colors font-semibold text-vino-800">Acceso Docente / Admin</a></li>
              </ul>
            </div>

            {/* Columna 3: Cumplimiento Normativo Colombia */}
            <div className="space-y-3">
              <h4 className="font-outfit font-bold text-sm text-vino-950 uppercase tracking-wider flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-vino-600" />
                Marco Legal SIC
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setOpenTerms(true)} className="text-left hover:text-vino-700 transition-colors underline underline-offset-2">
                    Términos y Condiciones (v1.0-COT)
                  </button>
                </li>
                <li>
                  <button onClick={() => setOpenPrivacy(true)} className="text-left hover:text-vino-700 transition-colors underline underline-offset-2">
                    Política de Tratamiento de Datos (Ley 1581)
                  </button>
                </li>
                <li>
                  <button onClick={() => setOpenTerms(true)} className="text-left text-vino-800 font-semibold hover:text-vino-950 transition-colors">
                    Derecho de Retracto (Art. 47 Ley 1480)
                  </button>
                </li>
                <li className="text-[11px] text-calido-600 pt-1">
                  Vigilado por la Superintendencia de Industria y Comercio (SIC).
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright y firma */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-calido-600 gap-4">
            <p>© {new Date().getFullYear()} Profe Kami. Todos los derechos reservados. San Juan de Pasto, Colombia.</p>
            <p className="flex items-center gap-1 text-vino-900 font-medium">
              <span>Hecho con</span>
              <Heart className="w-3.5 h-3.5 text-rosa-500 fill-rosa-500" />
              <span>para los futuros matemáticos</span>
              <Sparkles className="w-3.5 h-3.5 text-dorado-500" />
            </p>
          </div>
        </div>
      </footer>

      {/* Modales legales integrados */}
      <TermsModal isOpen={openTerms} onClose={() => setOpenTerms(false)} />
      <PrivacyModal isOpen={openPrivacy} onClose={() => setOpenPrivacy(false)} />
    </>
  );
};
