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
  const [busqueda, setBusqueda] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('todos');

  const ADMIN_PASSWORD = 'ThirdWave2024';

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

  const registrosFiltrados = registros.filter(r => {
    const matchBusqueda = r.nombreApellido.toLowerCase().includes(busqueda.toLowerCase()) ||
                          r.telefono.includes(busqueda);
    const matchTipo = filtroTipo === 'todos' || r.tipo === filtroTipo;
    return matchBusqueda && matchTipo;
  });

  const estadisticas = {
    total: registros.length,
    newGen: registros.filter(r => r.tipo === 'NewGen').length,
    highSchool: registros.filter(r => r.tipo === 'HighSchool').length,
    gang: registros.filter(r => r.tipo === 'Gang').length,
    gangAdulto: registros.filter(r => r.tipo === 'GangAdulto').length
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <Lock className="mx-auto mb-4 text-amber-500" size={48} />
            <h1 className="text-2xl font-bold text-white">Panel de Administración</h1>
            <p className="text-slate-400 mt-2">Ingresa la contraseña</p>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent mb-4"
            />
            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Ingresar
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            <a href="/" className="text-amber-500 hover:underline">
              Volver al registro
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Panel de Administración</h1>
              <p className="text-slate-400 mt-1">Third Wave - Retiro</p>
            </div>
            <div className="flex gap-3">
              <a
                href="/"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-slate-700"
              >
                Volver al Registro
              </a>
              <button
                onClick={exportarPDF}
                disabled={registros.length === 0}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download size={20} />
                Exportar PDF
              </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Buscar por nombre o teléfono..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className="px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="todos">Todos los tipos</option>
              <option value="NewGen">NewGen</option>
              <option value="HighSchool">HighSchool</option>
              <option value="Gang">Gang</option>
              <option value="GangAdulto">Gang Adulto</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <Users className="mb-2 text-amber-500" size={24} />
            <p className="text-3xl font-bold text-white">{estadisticas.total}</p>
            <p className="text-slate-400">Total</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <Calendar className="mb-2 text-purple-400" size={24} />
            <p className="text-3xl font-bold text-white">{estadisticas.newGen}</p>
            <p className="text-slate-400">NewGen</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <Calendar className="mb-2 text-pink-400" size={24} />
            <p className="text-3xl font-bold text-white">{estadisticas.highSchool}</p>
            <p className="text-slate-400">HighSchool</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <Calendar className="mb-2 text-orange-400" size={24} />
            <p className="text-3xl font-bold text-white">{estadisticas.gang}</p>
            <p className="text-slate-400">Gang</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <Calendar className="mb-2 text-red-400" size={24} />
            <p className="text-3xl font-bold text-white">{estadisticas.gangAdulto}</p>
            <p className="text-slate-400">Gang Adulto</p>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-slate-400">Cargando registros...</p>
              </div>
            ) : registrosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400">No se encontraron registros</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Nombre y Apellido</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Fecha Nac.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Teléfono</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Tipo</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Registrado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {registrosFiltrados.map((registro, index) => (
                    <tr key={registro.id} className="hover:bg-slate-800/30">
                      <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>
                      <td className="px-6 py-4 text-sm font-medium text-white">{registro.nombreApellido}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{registro.fechaNacimiento}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{registro.telefono}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${
                          registro.tipo === 'NewGen' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                          registro.tipo === 'HighSchool' ? 'bg-pink-500/20 text-pink-300 border-pink-500/30' :
                          registro.tipo === 'Gang' ? 'bg-orange-500/20 text-orange-300 border-orange-500/30' :
                          'bg-red-500/20 text-red-300 border-red-500/30'
                        }`}>
                          {registro.tipo}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
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
