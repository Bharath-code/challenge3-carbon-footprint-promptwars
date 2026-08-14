import React, { useEffect, useState } from 'react';
import { X, Play, Clock, ArrowSquareOut } from '@phosphor-icons/react';
import { PLAYBOOK_CHAPTERS } from '../data/chapters';

interface VideoModalProps {
  isOpen: boolean;
  initialSeconds: number;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  initialSeconds,
  onClose
}) => {
  const [currentSeconds, setCurrentSeconds] = useState(initialSeconds);

  useEffect(() => {
    setCurrentSeconds(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#09090d] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-950 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <div>
              <span className="text-xs font-mono text-white font-bold">
                GARRY TAN MASTERCLASS // YOUTUBE THEATER
              </span>
              <span className="text-[11px] font-mono text-zinc-400 ml-2 hidden sm:inline">
                (fsTtKywmWlU)
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href={`https://www.youtube.com/watch?v=fsTtKywmWlU&t=${currentSeconds}s`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center space-x-1 text-xs font-mono text-amber-400 hover:text-amber-300 px-2.5 py-1 rounded bg-white/5 border border-white/10"
            >
              <span>Open on YouTube</span>
              <ArrowSquareOut size={13} />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close modal (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Player Container */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            key={currentSeconds}
            className="w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/fsTtKywmWlU?start=${currentSeconds}&autoplay=1&rel=0&modestbranding=1`}
            title="Garry Tan: Founder Psychology, The New Startup Playbook, and Agentic Companies"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom Chapter Bookmark Strip */}
        <div className="p-4 bg-zinc-950 border-t border-white/10 overflow-x-auto">
          <div className="text-[11px] font-mono text-zinc-400 uppercase mb-2 flex items-center space-x-1.5">
            <Clock size={14} className="text-amber-400" />
            <span>Direct Chapter Jump Anchors:</span>
          </div>

          <div className="flex items-center space-x-2 min-w-max">
            {PLAYBOOK_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setCurrentSeconds(ch.startSeconds)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  currentSeconds === ch.startSeconds
                    ? 'bg-amber-400 text-black font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                    : 'bg-zinc-900 text-zinc-300 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                <Play size={10} weight="fill" />
                <span className="font-bold">{ch.timestamp.split('–')[0].trim()}</span>
                <span className="text-zinc-400">•</span>
                <span className="truncate max-w-[140px]">{ch.title}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
