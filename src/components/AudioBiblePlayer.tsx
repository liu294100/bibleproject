'use client';

import React, { useState, useRef, useEffect } from 'react';
import { bibleBooks, BibleBook } from '@/lib/bible-data';

interface AudioBiblePlayerProps {
  initialLanguage?: string;
  initialBook?: string;
  initialChapter?: number;
}

const AudioBiblePlayer: React.FC<AudioBiblePlayerProps> = ({
  initialLanguage = 'chinese',
  initialBook = '43',
  initialChapter = 1
}) => {
  // State for language, book, and chapter selection
  const [language, setLanguage] = useState(initialLanguage);
  const [book, setBook] = useState(initialBook);
  const [chapter, setChapter] = useState(initialChapter);
  const [maxChapters, setMaxChapters] = useState(21); // Default to John's Gospel

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [playbackRate, setPlaybackRate] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Construct audio URL based on language, book, and chapter
  const getAudioUrl = () => {
    const languageCode = languageCodes[language] || '4';
    return `http://audio2.abiblica.org/bibles/app/audio/${languageCode}/${book}/${chapter}.mp3`;
  };

  // Update max chapters when book changes
  useEffect(() => {
    const selectedBook = bibleBooks.find(b => b.number === book);
    if (selectedBook) {
      setMaxChapters(selectedBook.chapters);
      // Reset chapter to 1 when book changes
      setChapter(1);
    }
  }, [book]);

  // Generate chapter options for the current book
  const getChapterOptions = () => {
    const chapters = [];
    for (let i = 1; i <= maxChapters; i++) {
      chapters.push(i);
    }
    return chapters;
  };

  // Audio control functions
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play().catch(error => {
          console.error("Error playing audio:", error);
          // Handle playback error (e.g., show message to user)
        });
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

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle audio loading or errors
  const handleAudioError = () => {
    console.error("Error loading audio file");
    setIsPlaying(false);
    // Show error message to user
  };

  // Effect to pause audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">语言</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {Object.keys(languageCodes).map((lang) => (
              <option key={lang} value={lang}>
                {languageLabels[lang]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">圣经书卷</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={book}
            onChange={(e) => setBook(e.target.value)}
          >
            {bibleBooks.map((book) => (
              <option key={book.number} value={book.number}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">章节</label>
          <select
            className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
            value={chapter}
            onChange={(e) => setChapter(parseInt(e.target.value))}
          >
            {getChapterOptions().map((chapterNum) => (
              <option key={chapterNum} value={chapterNum}>
                {chapterNum}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="textAudio ym-noprint">
        <div className="sm2-bar-ui compact full-width flat bg-gray-800 rounded-md overflow-hidden">
          <div className="bd sm2-main-controls p-2 flex items-center">
            <div className="sm2-inline-element sm2-button-element mr-2">
              <div className="sm2-button-bd">
                <button
                  onClick={togglePlayPause}
                  className="sm2-inline-button play-pause w-12 h-12 rounded-full bg-red-600 flex items-center justify-center"
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
                  <div className="text-lg font-medium">
                    {getBookName(book)} {chapter}
                  </div>
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
                    ></div>
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
          src={getAudioUrl()}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
          onError={handleAudioError}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">音量</label>
          <div className="flex items-center">
            <span className="mr-2">🔈</span>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => handleVolumeChange([parseFloat(e.target.value)])}
                className="w-full"
              />
            </div>
            <span className="ml-2">🔊</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">播放速度</label>
          <div className="flex justify-between">
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
              <button
                key={rate}
                onClick={() => handlePlaybackRateChange(rate)}
                className={`px-2 py-1 text-sm rounded ${
                  playbackRate === rate
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Language codes for audio URLs
const languageCodes: Record<string, string> = {
  chinese: '4',
  english: '2',
  french: '6',
  spanish: '5',
  german: '7',
  arabic: '25',
  russian: '8',
  italian: '13',
  portuguese: '9',
  japanese: '120',
  korean: '45'
};

// Language labels for display
const languageLabels: Record<string, string> = {
  chinese: '中文',
  english: 'English',
  french: 'Français',
  spanish: 'Español',
  german: 'Deutsch',
  arabic: 'العربية',
  russian: 'Русский',
  italian: 'Italiano',
  portuguese: 'Português',
  japanese: '日本語',
  korean: '한국어'
};

// Helper function to get book name from book number
function getBookName(bookNumber: string): string {
  const book = bibleBooks.find(b => b.number === bookNumber);
  return book ? book.name : '未知书卷';
}

export default AudioBiblePlayer;
