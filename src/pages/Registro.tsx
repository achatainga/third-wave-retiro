import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    fechaNacimiento: '',
    telefono: '',
    tipo: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'registros'), {
        ...formData,
        fechaRegistro: Timestamp.now()
      });

      toast.success('¡Registro exitoso! Nos vemos en el retiro 🎉');
      setFormData({
        nombreApellido: '',
        fechaNacimiento: '',
        telefono: '',
        tipo: ''
      });
    } catch (error) {
      console.error('Error al registrar:', error);
      toast.error('Error al registrar. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative">
      {/* Background Image - Horizontal for desktop, Vertical for mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: 'url(/retiro-horizontal.jpeg)' }}
      />
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: 'url(/retiro-vertical.jpeg)' }}
      />
      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-900/77 rounded-2xl shadow-2xl p-8 border border-slate-700/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-500 mb-2 bg-slate-950/70 py-2 px-4 rounded-lg inline-block">Third Wave</h1>
            <p className="text-slate-400 bg-slate-950/70 py-1 px-3 rounded-lg inline-block mt-2">Retiro - Alcance Victoria</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                required
                value={formData.nombreApellido}
                onChange={(e) => setFormData({ ...formData, nombreApellido: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-slate-400"
                placeholder="Nombre y Apellido *"
              />
            </div>

            <div className="relative">
              <label className="absolute -top-2 left-3 bg-slate-800 px-2 text-xs text-slate-400 z-10">Fecha de Nacimiento *</label>
              <input
                type="date"
                required
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
              />
            </div>

            <div>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white placeholder-slate-400"
                placeholder="Teléfono (o del representante) *"
              />
            </div>

            <div>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-white"
              >
                <option value="">Tipo *</option>
                <option value="NewGen">NewGen</option>
                <option value="HighSchool">HighSchool</option>
                <option value="Gang">Gang</option>
                <option value="GangAdulto">Gang Adulto</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrarme'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-6 bg-slate-950/70 py-2 px-4 rounded-lg inline-block w-full">
            ¿Eres administrador?{' '}
            <a href="/admin" className="text-amber-500 hover:underline">
              Ir al panel
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
