import { useState, useEffect } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { toast } from 'react-toastify';
import { Volume2, VolumeX, Play, Download, Square } from 'lucide-react';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombreApellido: '',
    fechaNacimiento: '',
    telefono: '',
    tipo: ''
  });
  const [loading, setLoading] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoMutedDesktop, setVideoMutedDesktop] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [showVideoDesktop, setShowVideoDesktop] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  const [videoPausedDesktop, setVideoPausedDesktop] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallButton(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && showVideoDesktop) {
        stopVideoDesktop();
      } else if (!isMobile && showVideo) {
        stopVideo();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [showVideo, showVideoDesktop]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  const toggleMute = () => {
    const video = document.getElementById('bgVideo') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setVideoMuted(video.muted);
    }
  };

  const playVideo = () => {
    setShowVideo(true);
    setVideoPaused(false);
    setTimeout(() => {
      const video = document.getElementById('bgVideo') as HTMLVideoElement;
      if (video) {
        video.muted = false;
        video.play();
      }
    }, 100);
  };

  const pauseVideo = () => {
    const video = document.getElementById('bgVideo') as HTMLVideoElement;
    if (video) {
      video.paused ? video.play() : video.pause();
      setVideoPaused(video.paused);
    }
  };

  const stopVideo = () => {
    const video = document.getElementById('bgVideo') as HTMLVideoElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setShowVideo(false);
    setVideoPaused(false);
  };

  const handleVideoEnd = () => {
    setShowVideo(false);
    setVideoPaused(false);
  };

  const toggleMuteDesktop = () => {
    const video = document.getElementById('bgVideoDesktop') as HTMLVideoElement;
    if (video) {
      video.muted = !video.muted;
      setVideoMutedDesktop(video.muted);
    }
  };

  const playVideoDesktop = () => {
    setShowVideoDesktop(true);
    setVideoPausedDesktop(false);
    setTimeout(() => {
      const video = document.getElementById('bgVideoDesktop') as HTMLVideoElement;
      if (video) {
        video.muted = false;
        video.play();
      }
    }, 100);
  };

  const pauseVideoDesktop = () => {
    const video = document.getElementById('bgVideoDesktop') as HTMLVideoElement;
    if (video) {
      video.paused ? video.play() : video.pause();
      setVideoPausedDesktop(video.paused);
    }
  };

  const stopVideoDesktop = () => {
    const video = document.getElementById('bgVideoDesktop') as HTMLVideoElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setShowVideoDesktop(false);
    setVideoPausedDesktop(false);
  };

  const handleVideoEndDesktop = () => {
    setShowVideoDesktop(false);
    setVideoPausedDesktop(false);
  };

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
      {/* Background Image - Vertical (mobile) */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: 'url(/retiro-vertical.jpeg)' }}
      />

      {/* Background Image - Horizontal (desktop) */}
      <div 
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: 'url(/retiro-horizontal.jpeg)' }}
      />

      {/* Background Video - Vertical for mobile */}
      {showVideo && (
        <video 
          id="bgVideo"
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="absolute inset-0 w-full h-full object-cover md:hidden z-10"
        >
          <source src="/VideoRetiroVertical.mp4" type="video/mp4" />
        </video>
      )}

      {/* Background Video - Horizontal for desktop */}
      {showVideoDesktop && (
        <video 
          id="bgVideoDesktop"
          muted
          playsInline
          onEnded={handleVideoEndDesktop}
          className="absolute inset-0 w-full h-full object-cover hidden md:block z-10"
        >
          <source src="/VideoRetiroHorizontal.mp4" type="video/mp4" />
        </video>
      )}

      {/* Botón de audio (corneta) - Mobile */}
      {showVideo && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 z-20 bg-slate-900/70 hover:bg-slate-800/70 text-white p-3 rounded-full md:hidden"
        >
          {videoMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {/* Botón de audio (corneta) - Desktop */}
      {showVideoDesktop && (
        <button
          onClick={toggleMuteDesktop}
          className="absolute top-4 right-4 z-20 bg-slate-900/70 hover:bg-slate-800/70 text-white p-3 rounded-full hidden md:block"
        >
          {videoMutedDesktop ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      {/* Botones superiores */}
      <div className="absolute top-4 left-4 z-20 flex gap-2">
        {showInstallButton && (
          <button
            onClick={handleInstallClick}
            className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold py-2 px-4 rounded-full flex items-center gap-2 text-sm"
          >
            <Download size={18} />
            Instalar App
          </button>
        )}
        {!showVideo && !showVideoDesktop && (
          <button
            onClick={() => {
              if (window.innerWidth >= 768) playVideoDesktop();
              else playVideo();
            }}
            className="bg-slate-900/70 hover:bg-slate-800/70 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 text-sm"
          >
            <Play size={18} />
            Video Promocional
          </button>
        )}
        {(showVideo || showVideoDesktop) && (
          <>
            <button
              onClick={() => showVideo ? pauseVideo() : pauseVideoDesktop()}
              className="bg-slate-900/70 hover:bg-slate-800/70 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 text-sm"
            >
              <Play size={18} />
              {(showVideo && videoPaused) || (showVideoDesktop && videoPausedDesktop) ? 'Reanudar' : 'Pausar'}
            </button>
            <button
              onClick={() => showVideo ? stopVideo() : stopVideoDesktop()}
              className="bg-slate-900/70 hover:bg-slate-800/70 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 text-sm"
            >
              <Square size={18} />
              Detener
            </button>
          </>
        )}
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-900/77 rounded-2xl shadow-2xl p-8 border border-slate-700/30">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-amber-500 mb-2 bg-slate-950/70 py-2 px-4 rounded-lg inline-block">Third Wave</h1>
            <p className="text-slate-400 bg-slate-950/70 py-1 px-3 rounded-lg inline-block mt-2">Retiro - Alcance Victoria</p>
            <p className="text-amber-400 text-lg font-semibold bg-slate-950/70 py-1 px-3 rounded-lg inline-block mt-2">Reedificando el Altar</p>
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
