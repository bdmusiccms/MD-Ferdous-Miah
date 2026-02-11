
import React, { useState } from 'react';
// Fix: Import GENRES from constants instead of types
import { User, ReleaseStatus } from '../types';
import { GENRES } from '../constants';
import { Check, Upload, Music, Image as ImageIcon, CheckCircle2, ChevronRight, ChevronLeft, Plus, Trash2 } from 'lucide-react';

interface DistributionFormProps {
  user: User | null;
}

const DistributionForm: React.FC<DistributionFormProps> = ({ user }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Form State
  const [metadata, setMetadata] = useState({
    title: '',
    genre: GENRES[0],
    releaseDate: '',
    upc: '',
  });

  const [coverArt, setCoverArt] = useState<string | null>(null);
  const [tracks, setTracks] = useState<any[]>([
    { id: Date.now(), song_title: '', isrc: '', audio_url: '', credits: '' }
  ]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const addTrack = () => {
    setTracks([...tracks, { id: Date.now(), song_title: '', isrc: '', audio_url: '', credits: '' }]);
  };

  const removeTrack = (id: number) => {
    if (tracks.length > 1) {
      setTracks(tracks.filter(t => t.id !== id));
    }
  };

  const updateTrack = (id: number, field: string, value: string) => {
    setTracks(tracks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFinished(true);
    }, 2000);
  };

  if (isFinished) {
    return (
      <div className="max-w-2xl mx-auto h-[70vh] flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center text-indigo-500 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white">Release Submitted!</h2>
          <p className="text-zinc-400 mt-2 max-w-md">
            Your release "{metadata.title}" has been sent to our distribution team. 
            We'll notify you via email once it's approved and distributed to stores.
          </p>
        </div>
        <button 
          onClick={() => window.location.hash = '/'}
          className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const steps = [
    { id: 1, label: 'Metadata', icon: Music },
    { id: 2, label: 'Cover Art', icon: ImageIcon },
    { id: 3, label: 'Tracks', icon: Upload },
    { id: 4, label: 'Review', icon: Check },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white">Distribute New Music</h2>
        <p className="text-zinc-400 mt-1">Submit your release to 150+ digital stores globally.</p>
      </header>

      {/* Progress Stepper */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0" />
        {steps.map((s) => {
          const Icon = s.icon;
          const isActive = step >= s.id;
          const isCurrent = step === s.id;
          return (
            <div key={s.id} className="relative z-10 flex flex-col items-center group">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                isActive 
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.4)]' 
                  : 'bg-zinc-900 border-zinc-700 text-zinc-500'
              }`}>
                {step > s.id ? <Check size={20} /> : <Icon size={20} />}
              </div>
              <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${isActive ? 'text-indigo-400' : 'text-zinc-500'}`}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-sm">
        {/* Step 1: Metadata */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Release Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Release Title</label>
                <input 
                  type="text" 
                  value={metadata.title}
                  onChange={(e) => setMetadata({...metadata, title: e.target.value})}
                  placeholder="e.g. Midnight Echoes"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Primary Genre</label>
                <select 
                  value={metadata.genre}
                  onChange={(e) => setMetadata({...metadata, genre: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Release Date</label>
                <input 
                  type="date" 
                  value={metadata.releaseDate}
                  onChange={(e) => setMetadata({...metadata, releaseDate: e.target.value})}
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-zinc-400">UPC (Optional)</label>
                <input 
                  type="text" 
                  value={metadata.upc}
                  onChange={(e) => setMetadata({...metadata, upc: e.target.value})}
                  placeholder="Leave blank to generate new"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Cover Art */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Upload Artwork</h3>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-3xl p-12 hover:border-indigo-500/50 transition-colors group cursor-pointer" onClick={() => {
              // Simulate file picker
              setCoverArt('https://picsum.photos/seed/newrelease/800/800');
            }}>
              {coverArt ? (
                <div className="relative group">
                  <img src={coverArt} alt="Cover Preview" className="w-64 h-64 object-cover rounded-xl shadow-2xl" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-xl">
                    <p className="text-white text-sm font-medium">Click to Change</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-zinc-800 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="text-zinc-500" size={40} />
                  </div>
                  <p className="text-white font-medium">Click to upload cover art</p>
                  <p className="text-zinc-500 text-xs mt-2 text-center">
                    Recommended: 3000x3000px, JPEG/PNG<br/>
                    (Must not contain URLs, social handles, or store logos)
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Audio Tracks */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Track Listing</h3>
              <button 
                onClick={addTrack}
                className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-medium"
              >
                <Plus size={16} /> Add Track
              </button>
            </div>

            <div className="space-y-4">
              {tracks.map((track, idx) => (
                <div key={track.id} className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Track #{idx + 1}</span>
                    {tracks.length > 1 && (
                      <button onClick={() => removeTrack(track.id)} className="text-zinc-500 hover:text-red-400">
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Song Title"
                      value={track.song_title}
                      onChange={(e) => updateTrack(track.id, 'song_title', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white"
                    />
                    <input 
                      type="text" 
                      placeholder="ISRC (Optional)"
                      value={track.isrc}
                      onChange={(e) => updateTrack(track.id, 'isrc', e.target.value)}
                      className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white"
                    />
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-zinc-700">
                    <Upload className="text-zinc-500 h-5 w-5" />
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400">Audio File (.wav or .mp3, min 320kbps)</p>
                      <input type="file" className="hidden" id={`file-${track.id}`} />
                      <label htmlFor={`file-${track.id}`} className="text-sm font-medium text-indigo-400 cursor-pointer hover:underline">
                        {track.audio_url || 'Select audio file...'}
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 4 && (
          <div className="space-y-8">
            <h3 className="text-xl font-semibold">Review & Submit</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <img src={coverArt || ''} className="w-full aspect-square rounded-2xl object-cover shadow-xl" alt="Cover" />
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h4 className="text-2xl font-bold">{metadata.title}</h4>
                  <p className="text-zinc-400">{user?.stage_name} • {metadata.genre}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-zinc-800/50 rounded-xl">
                    <p className="text-zinc-500">Release Date</p>
                    <p className="font-medium">{metadata.releaseDate || 'Not set'}</p>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-xl">
                    <p className="text-zinc-500">Total Tracks</p>
                    <p className="font-medium">{tracks.length}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Tracks</p>
                  {tracks.map((t, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2 border-b border-zinc-800 text-sm">
                      <span className="text-zinc-300">{idx + 1}. {t.song_title || 'Untitled'}</span>
                      <span className="text-zinc-500 text-xs">Audio Uploaded</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Controls */}
        <div className="flex justify-between mt-12 pt-8 border-t border-zinc-800">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-medium transition-all ${
              step === 1 ? 'opacity-0' : 'text-zinc-400 hover:bg-zinc-800'
            }`}
          >
            <ChevronLeft size={18} /> Back
          </button>
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20"
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg shadow-indigo-600/20 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit for Distribution'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DistributionForm;
