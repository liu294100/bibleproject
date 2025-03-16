'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);

      // Update progress bar
      if (progressRef.current) {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progressRef.current.style.width = `${percentage}%`;
      }
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setDuration(audio.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;

    if (audio) {
      audio.currentTime = percentage * audio.duration;
    }
  };

  // Effect to pause audio when component unmounts
  useEffect(() => {
    const audioElement = audioRef.current;

    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  return (
    <div className="textAudio ym-noprint">
      <div className="sm2-bar-ui compact full-width flat bg-gray-800 rounded-md overflow-hidden">
        <div className="bd sm2-main-controls p-2 flex items-center">
          <div className="sm2-inline-element sm2-button-element mr-2">
            <div className="sm2-button-bd">
              <button
                onClick={togglePlayPause}
                className="sm2-inline-button play-pause w-8 h-8 rounded-full bg-red-600 flex items-center justify-center"
              >
                {isPlaying ? (
                  <span className="text-white text-lg">❙❙</span>
                ) : (
                  <span className="text-white text-lg">▶</span>
                )}
              </button>
            </div>
          </div>

          <div className="sm2-inline-element sm2-inline-status flex-1">
            <div className="sm2-playlist text-white mb-1">
              <div className="sm2-playlist-target">
                <ul className="sm2-playlist-bd">
                  <li>{title}</li>
                </ul>
              </div>
            </div>

            <div className="sm2-progress">
              <div className="sm2-row flex items-center">
                <div className="sm2-inline-time text-white text-xs mr-2">
                  {formatTime(currentTime)}
                </div>

                <div
                  className="sm2-progress-bd flex-1 bg-gray-600 h-2 rounded cursor-pointer relative"
                  onClick={handleProgressClick}
                >
                  <div
                    ref={progressRef}
                    className="sm2-progress-track bg-red-600 h-full rounded"
                    style={{ width: '0%' }}
                  >
                    <div className="sm2-progress-ball absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>

                <div className="sm2-inline-duration text-white text-xs ml-2">
                  {duration > 0 ? formatTime(duration) : '0:00'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default AudioPlayer;
