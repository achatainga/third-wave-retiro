import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';
import { Download, Lock, Users, Calendar } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Registro {
  id: string;
  nombreApellido: string;
  fechaNacimiento: string;
  telefono: string;
  tipo: string;
  fechaRegistro: any;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(false);

  const ADMIN_PASSWORD = 'ThirdWave2024'; // Cambiar por variable de entorno en producción

  useEffect(() => {
    if (authenticated) {
      cargarRegistros();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success('Acceso concedido');
    } else {
      toast.error('Contraseña incorrecta');
    }
  };

  const cargarRegistros = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'registros'), orderBy('fechaRegistro', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Registro[];
      setRegistros(data);
    } catch (error) {
      console.error('Error al cargar registros:', error);
      toast.error('Error al cargar registros');
    } finally {
      setLoading(false);
    }
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Third Wave - Retiro', 14, 20);
    doc.setFontSize(12);
    doc.text('Alcance Victoria', 14, 28);
    doc.setFontSize(10);
    doc.text(`Generado: ${new Date().toLocaleDateString('es-DO')}`, 14, 35);

    const tableData = registros.map((r, index) => [
      index + 1,
      r.nombreApellido,
      r.fechaNacimiento,
      r.telefono,
      r.tipo
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['#', 'Nombre y Apellido', 'Fecha Nac.', 'Teléfono', 'Tipo']],
      body: tableData,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [30, 64, 175] }
    });

    doc.save(`third-wave-registros-${new Date().toISOString().split('T')[0]}.pdf`);
    toast.success('PDF descargado exitosamente');
  };

  const estadisticas = {
    total: registros.length,
    newGen: registros.filter(r => r.tipo === 'NewGen').length,
    highSchool: registros.filter(r => r.tipo === 'HighSchool').length,
    gang: registros.filter(r => r.tipo === 'Gang').length,
    gangAdulto: registros.filter(r => r.tipo === 'GangAdulto').length
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Lock className="mx-auto mb-4 text-blue-600" size={48} />
            <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
            <p className="text-gray-600 mt-2">Ingresa la contraseña</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Ingresar
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            <a href="/" className="text-blue-600 hover:underline">
              Volver al registro
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
              <p className="text-gray-600 mt-1">Third Wave - Retiro</p>
            </div>
            <button
              onClick={exportarPDF}
              disabled={registros.length === 0}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              Exportar PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-blue-600 text-white rounded-xl p-6">
            <Users className="mb-2" size={24} />
            <p className="text-3xl font-bold">{estadisticas.total}</p>
            <p className="text-blue-100">Total</p>
          </div>
          <div className="bg-purple-600 text-white rounded-xl p-6">
            <Calendar className="mb-2" size={24} />
            <p className="text-3xl font-bold">{estadisticas.newGen}</p>
            <p className="text-purple-100">NewGen</p>
          </div>
          <div className="bg-pink-600 text-white rounded-xl p-6">
            <Calendar className="mb-2" size={24} />
            <p className="text-3xl font-bold">{estadisticas.highSchool}</p>
            <p className="text-pink-100">HighSchool</p>
          </div>
          <div className="bg-orange-600 text-white rounded-xl p-6">
            <Calendar className="mb-2" size={24} />
            <p className="text-3xl font-bold">{estadisticas.gang}</p>
            <p className="text-orange-100">Gang</p>
          </div>
          <div className="bg-red-600 text-white rounded-xl p-6">
            <Calendar className="mb-2" size={24} />
            <p className="text-3xl font-bold">{estadisticas.gangAdulto}</p>
            <p className="text-red-100">Gang Adulto</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Cargando registros...</p>
              </div>
            ) : registros.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No hay registros aún</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Nombre y Apellido</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fecha Nac.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Teléfono</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Registrado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {registros.map((registro, index) => (
                    <tr key={registro.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{registro.nombreApellido}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{registro.fechaNacimiento}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{registro.telefono}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          registro.tipo === 'NewGen' ? 'bg-purple-100 text-purple-800' :
                          registro.tipo === 'HighSchool' ? 'bg-pink-100 text-pink-800' :
                          registro.tipo === 'Gang' ? 'bg-orange-100 text-orange-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {registro.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {registro.fechaRegistro?.toDate().toLocaleDateString('es-DO')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
