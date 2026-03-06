import { useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';
import { UserPlus, Calendar, Phone, Users } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">Third Wave</h1>
            <p className="text-gray-600">Retiro - Alcance Victoria</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <UserPlus size={18} />
                Nombre y Apellido *
              </label>
              <input
                type="text"
                required
                value={formData.nombreApellido}
                onChange={(e) => setFormData({ ...formData, nombreApellido: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar size={18} />
                Fecha de Nacimiento *
              </label>
              <input
                type="date"
                required
                value={formData.fechaNacimiento}
                onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone size={18} />
                Teléfono (o del representante) *
              </label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(809) 555-1234"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Users size={18} />
                Tipo *
              </label>
              <select
                required
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Selecciona una opción</option>
                <option value="NewGen">NewGen</option>
                <option value="HighSchool">HighSchool</option>
                <option value="Gang">Gang</option>
                <option value="GangAdulto">Gang Adulto</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Registrando...' : 'Registrarme'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Eres administrador?{' '}
            <a href="/admin" className="text-blue-600 hover:underline">
              Ir al panel
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
