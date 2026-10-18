import React, { useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { LegalConsentBox } from '../components/legal/LegalConsentBox';
import { TermsModal, PrivacyModal } from '../components/legal/LegalModals';
import { recordConsentAudit } from '../services/legalAuditService';
import { 
  Sparkles, 
  BrainCircuit, 
  Gamepad2, 
  Trophy, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  Send,
  Loader2
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Estado del formulario de admisión
  const [acudienteNombre, setAcudienteNombre] = useState('');
  const [acudienteEmail, setAcudienteEmail] = useState('');
  const [acudienteTelefono, setAcudienteTelefono] = useState('');
  const [estudianteNombre, setEstudianteNombre] = useState('');
  const [gradoEscolar, setGradoEscolar] = useState('Primaria (Básica)');

  // Estado de consentimiento legal SIC independiente
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [consentError, setConsentError] = useState<string | null>(null);

  // Estados de envío y feedback
  const [submitting, setSubmitting] = useState(false);
  const [successReceipt, setSuccessReceipt] = useState<any | null>(null);

  // Estados de modales legales
  const [openTerms, setOpenTerms] = useState(false);
  const [openPrivacy, setOpenPrivacy] = useState(false);

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setConsentError(null);

    // Validación legal colombiana obligatoria (SIC)
    if (!acceptedTerms || !acceptedPrivacy) {
      setConsentError('Conforme a la normativa colombiana de la SIC, debes aceptar individualmente ambas casillas: Términos y Condiciones, y la Política de Tratamiento de Datos.');
      return;
    }

    setSubmitting(true);
    try {
      // Registro trazable legal
      const auditProof = await recordConsentAudit({
        userName: `${acudienteNombre} (Acudiente de ${estudianteNombre})`,
        userEmail: acudienteEmail,
        userPhone: acudienteTelefono,
        acceptedTerms,
        acceptedPrivacy,
        acknowledgedRetracto: true,
      });

      setSuccessReceipt(auditProof);
      // Limpiar formulario tras éxito
      setAcudienteNombre('');
      setAcudienteEmail('');
      setAcudienteTelefono('');
      setEstudianteNombre('');
      setAcceptedTerms(false);
      setAcceptedPrivacy(false);
    } catch (err: any) {
      setConsentError(err.message || 'Error al procesar el registro.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-calido-50 text-calido-900 selection:bg-vino-100 selection:text-vino-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Decoraciones de fondo matemáticas abstractas */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-rosa-200/40 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-vino-100/60 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Texto Hero */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rosa-100/90 border border-rosa-200 text-vino-800 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-dorado-500" />
                <span>Academia de Matemáticas en Pasto, Nariño</span>
                <span className="w-1.5 h-1.5 rounded-full bg-vino-600" />
                <span className="text-calido-600">Presencial & Virtual</span>
              </div>

              <h1 className="font-outfit font-black text-4xl sm:text-5xl lg:text-6xl text-vino-950 tracking-tight leading-[1.15]">
                Donde la matemática{' '}
                <span className="text-gradient-vino">se convierte en un juego</span>
              </h1>

              <p className="text-base sm:text-lg text-calido-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                En <strong>Profe Kami</strong> transformamos el miedo a los números en curiosidad y confianza. Mediante desafíos gamificados, pensamiento lógico y calidez pedagógica, acompañamos a estudiantes de colegio a descubrir el placer de aprender jugando.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a
                  href="#inscripcion"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-vino-800 to-vino-600 hover:from-vino-900 hover:to-vino-700 shadow-lg hover:shadow-glow-vino transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Matricular a mi hijo(a)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#metodologia"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl font-bold text-sm text-vino-900 bg-white hover:bg-rosa-50/50 border border-vino-200 transition-all flex items-center justify-center gap-2"
                >
                  <Gamepad2 className="w-4 h-4 text-vino-600" />
                  <span>Conocer Metodología</span>
                </a>
              </div>

              {/* Indicadores de confianza */}
              <div className="pt-6 border-t border-calido-200 grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-outfit font-black text-2xl text-vino-900">100%</p>
                  <p className="text-xs text-calido-600">Lúdico & Práctico</p>
                </div>
                <div>
                  <p className="font-outfit font-black text-2xl text-vino-900">Pasto</p>
                  <p className="text-xs text-calido-600">Sede Nariño</p>
                </div>
                <div>
                  <p className="font-outfit font-black text-2xl text-vino-900">SIC</p>
                  <p className="text-xs text-calido-600">Garantía y Retracto</p>
                </div>
              </div>
            </div>

            {/* Ilustración interactiva Hero */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-vino-100">
                <div className="absolute -top-4 -right-4 bg-dorado-500 text-white text-xs font-black px-3.5 py-1.5 rounded-2xl shadow-md rotate-3 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  ¡Nivel Superado!
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-rosa-100 text-vino-700 flex items-center justify-center font-bold text-lg">
                      <Gamepad2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-outfit font-bold text-sm text-vino-950">Misión Matemática: Números Mágicos</h4>
                      <p className="text-xs text-calido-500">Pasto, Nariño • Nivel Primaria & Secundaria</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-gradient-to-br from-vino-50 to-rosa-50/50 border border-vino-100 space-y-3">
                    <div className="flex justify-between text-xs font-semibold text-vino-900">
                      <span>Confianza Lógica</span>
                      <span>96%</span>
                    </div>
                    <div className="w-full bg-rosa-200/70 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-vino-700 h-full rounded-full w-[96%]" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                      <div className="bg-white p-2 rounded-xl border border-vino-100 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Sin frustración</span>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-vino-100 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Aprender jugando</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-calido-100/60 p-3 rounded-xl text-center text-xs text-calido-700 font-medium italic">
                    "Cuando el niño entiende que el error es solo el siguiente paso del juego, la matemática deja de ser un obstáculo."
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metodología Section */}
      <section id="metodologia" className="py-20 bg-white border-y border-vino-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-vino-700 bg-rosa-100 px-3 py-1 rounded-full border border-rosa-200">
              Nuestra Filosofía Pedagógica
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl text-vino-950">
              Aprender jugando, comprender para siempre
            </h2>
            <p className="text-sm text-calido-600">
              Diseñamos cada sesión como una aventura donde el estudiante es el protagonista del descubrimiento matemático.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-calido-50 rounded-3xl p-8 border border-calido-200 hover:border-vino-300 transition-all hover:shadow-soft-vino group">
              <div className="w-12 h-12 rounded-2xl bg-vino-100 text-vino-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-vino-950 mb-2">
                Pensamiento Lógico Real
              </h3>
              <p className="text-xs text-calido-700 leading-relaxed">
                Superamos la memorización mecánica de fórmulas. Desarrollamos la capacidad de deducir, analizar patrones y resolver problemas cotidianos con agilidad.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-calido-50 rounded-3xl p-8 border border-calido-200 hover:border-vino-300 transition-all hover:shadow-soft-vino group">
              <div className="w-12 h-12 rounded-2xl bg-rosa-100 text-rosa-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-vino-950 mb-2">
                Gamificación Adaptativa
              </h3>
              <p className="text-xs text-calido-700 leading-relaxed">
                Tableros, dinámicas de acertijos y retos por niveles. El estudiante avanza motivado por la emoción de conquistar nuevos logros numéricos.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-calido-50 rounded-3xl p-8 border border-calido-200 hover:border-vino-300 transition-all hover:shadow-soft-vino group">
              <div className="w-12 h-12 rounded-2xl bg-vino-100 text-vino-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-outfit font-bold text-lg text-vino-950 mb-2">
                Acompañamiento Afectivo
              </h3>
              <p className="text-xs text-calido-700 leading-relaxed">
                Creemos un espacio seguro donde preguntar no da pena y equivocarse es valorado como oportunidad de crecimiento intelectual y emocional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Admisión con Cumplimiento Legal SIC */}
      <section id="inscripcion" className="py-20 bg-gradient-to-b from-calido-50 to-rosa-50/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-vino-700 bg-rosa-100 px-3 py-1 rounded-full border border-rosa-200">
              Admisiones & Diagnóstico
            </span>
            <h2 className="font-outfit font-black text-3xl sm:text-4xl text-vino-950">
              Solicita el diagnóstico lúdico de tu hijo(a)
            </h2>
            <p className="text-xs sm:text-sm text-calido-600 max-w-xl mx-auto">
              Diligencia los datos del acudiente y del estudiante. Este formulario incluye el protocolo legal exigido en Colombia (SIC) para protección del consumidor y Habeas Data.
            </p>
          </div>

          {/* Recibo de Éxito de Consentimiento Trazable */}
          {successReceipt && (
            <div className="mb-8 p-6 bg-emerald-50 border-2 border-emerald-300 rounded-3xl shadow-lg space-y-4 animate-in fade-in">
              <div className="flex items-center gap-3 text-emerald-900 font-bold text-base font-outfit">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <span>¡Solicitud y Consentimiento Registrados con Éxito!</span>
              </div>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Nos comunicaremos al número de WhatsApp suministrado para coordinar la sesión diagnóstica. Se ha generado un registro trazable oficial conforme a la SIC:
              </p>
              <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 text-[11px] text-emerald-950 font-mono space-y-1">
                <p><strong>ID Auditoría:</strong> {successReceipt.id}</p>
                <p><strong>Titular Registrado:</strong> {successReceipt.userName}</p>
                <p><strong>Fecha y Hora (Colombia):</strong> {successReceipt.timestampBogota}</p>
                <p><strong>IP Trazable:</strong> {successReceipt.clientIp}</p>
                <p><strong>Versión Términos:</strong> {successReceipt.termsVersion}</p>
                <p><strong>Versión Habeas Data:</strong> {successReceipt.privacyVersion}</p>
                <p><strong>Garantía Retracto (Art. 47 Ley 1480):</strong> 5 días hábiles formalizados.</p>
              </div>
            </div>
          )}

          {/* Formulario */}
          <form
            onSubmit={handleSubmitRegistration}
            className="bg-white rounded-3xl shadow-xl border border-vino-100 p-8 sm:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Nombre Acudiente */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-vino-950 uppercase tracking-wider">
                  Nombre Completo del Acudiente *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Camila Guerra"
                  value={acudienteNombre}
                  onChange={(e) => setAcudienteNombre(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-calido-300 focus:border-vino-600 focus:ring-2 focus:ring-rosa-200 text-xs text-calido-900 transition-all outline-none"
                />
              </div>

              {/* Teléfono / WhatsApp */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-vino-950 uppercase tracking-wider">
                  WhatsApp / Celular de Contacto *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej: 315 123 4567"
                  value={acudienteTelefono}
                  onChange={(e) => setAcudienteTelefono(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-calido-300 focus:border-vino-600 focus:ring-2 focus:ring-rosa-200 text-xs text-calido-900 transition-all outline-none"
                />
              </div>

              {/* Correo Acudiente */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-vino-950 uppercase tracking-wider">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  placeholder="acudiente@ejemplo.com"
                  value={acudienteEmail}
                  onChange={(e) => setAcudienteEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-calido-300 focus:border-vino-600 focus:ring-2 focus:ring-rosa-200 text-xs text-calido-900 transition-all outline-none"
                />
              </div>

              {/* Nombre Estudiante */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-vino-950 uppercase tracking-wider">
                  Nombre del Estudiante *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Sofía Benavides"
                  value={estudianteNombre}
                  onChange={(e) => setEstudianteNombre(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-calido-300 focus:border-vino-600 focus:ring-2 focus:ring-rosa-200 text-xs text-calido-900 transition-all outline-none"
                />
              </div>

              {/* Grado Escolar */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-bold text-vino-950 uppercase tracking-wider">
                  Nivel o Grado Escolar a Fortalecer *
                </label>
                <select
                  value={gradoEscolar}
                  onChange={(e) => setGradoEscolar(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-calido-300 focus:border-vino-600 focus:ring-2 focus:ring-rosa-200 text-xs text-calido-900 transition-all outline-none bg-white"
                >
                  <option value="Primaria (Básica)">Primaria (Básica 1° a 5°)</option>
                  <option value="Secundaria Inicial">Secundaria Inicial (6° a 8°)</option>
                  <option value="Secundaria Avanzada">Secundaria Avanzada (9° a 11° - Preparación Saber 11)</option>
                  <option value="Universidad / Pre-Cálculo">Universidad / Pre-Cálculo</option>
                </select>
              </div>
            </div>

            {/* Componente Legal Obligatorio SIC */}
            <div className="pt-2">
              <LegalConsentBox
                acceptedTerms={acceptedTerms}
                acceptedPrivacy={acceptedPrivacy}
                onTermsChange={setAcceptedTerms}
                onPrivacyChange={setAcceptedPrivacy}
                onOpenTermsModal={() => setOpenTerms(true)}
                onOpenPrivacyModal={() => setOpenPrivacy(true)}
                error={consentError}
              />
            </div>

            {/* Botón de Envío */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-vino-800 to-vino-600 hover:from-vino-900 hover:to-vino-700 shadow-md hover:shadow-glow-vino transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                  <span>Auditando y registrando solicitud...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitud de Admisión</span>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modales Legales */}
      <TermsModal isOpen={openTerms} onClose={() => setOpenTerms(false)} />
      <PrivacyModal isOpen={openPrivacy} onClose={() => setOpenPrivacy(false)} />
    </div>
  );
};
