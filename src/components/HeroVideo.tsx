"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface HeroVideoProps {
  videoId: string;
  className?: string;
}

const YOUTUBE_THUMBNAIL = (id: string) =>
  `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
const YOUTUBE_THUMBNAIL_FALLBACK = (id: string) =>
  `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

interface YTPlayer {
  destroy: () => void;
  seekTo: (seconds: number) => void;
  playVideo: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: { onStateChange?: (event: { data: number }) => void };
        }
      ) => YTPlayer;
      PlayerState?: { ENDED: number };
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

export function HeroVideo({ videoId, className = "" }: HeroVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const thumbnailSrc = thumbnailError
    ? YOUTUBE_THUMBNAIL_FALLBACK(videoId)
    : YOUTUBE_THUMBNAIL(videoId);

  const handlePlay = () => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
      setIsPlaying(true);
    } else {
      setHasPlayedOnce(true);
      setIsPlaying(true);
    }
  };

  const onVideoEnd = useCallback(() => {
    setIsPlaying(false);
  }, []);

  useEffect(() => {
    if (!hasPlayedOnce || !containerRef.current) return;

    const initPlayer = () => {
      if (
        !document.getElementById("hero-video-player") ||
        !window.YT?.Player
      )
        return;

      playerRef.current = new window.YT.Player("hero-video-player", {
        videoId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onStateChange: (event) => {
            if (event.data === 0) onVideoEnd();
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        initPlayer();
      };
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
  }, [hasPlayedOnce, videoId, onVideoEnd]);

  return (
    <div className={`w-full ${className}`}>
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-lg overflow-hidden border border-border-subtle"
      >
        {/* Player layer */}
        {hasPlayedOnce && (
          <div
            id="hero-video-player"
            className={`absolute inset-0 w-full h-full [&>iframe]:rounded-lg transition-opacity duration-300 ${
              isPlaying ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Thumbnail facade */}
        <button
          type="button"
          onClick={handlePlay}
          className={`absolute inset-0 w-full h-full group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-text-primary focus-visible:ring-offset-2 rounded-lg transition-opacity duration-300 ${
            isPlaying ? "z-0 opacity-0 pointer-events-none" : "z-10 opacity-100"
          }`}
          aria-label="Play demo video"
        >
          <img
            src={thumbnailSrc}
            alt="Apriori Demo Video"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
            onError={() => setThumbnailError(true)}
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-shadow duration-300 group-hover:shadow-xl">
                <Play
                  className="w-7 h-7 md:w-8 md:h-8 text-[#111] ml-0.5"
                  fill="currentColor"
                />
              </div>
            </motion.div>
          </div>
        </button>
      </div>
    </div>
  );
}
