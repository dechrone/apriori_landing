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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`w-full max-w-4xl ${className}`}
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border-subtle shadow-[0_0_48px_rgba(0,0,0,0.4),0_0_24px_rgba(245,158,11,0.08)]"
      >
        {/* Player layer - kept in DOM when video ends to avoid removeChild errors */}
        {hasPlayedOnce && (
          <div
            id="hero-video-player"
            className={`absolute inset-0 w-full h-full [&>iframe]:rounded-2xl transition-opacity duration-300 ${
              isPlaying ? "z-10 opacity-100" : "z-0 opacity-0 pointer-events-none"
            }`}
          />
        )}

        {/* Thumbnail facade - shown when not playing */}
        <button
          type="button"
          onClick={handlePlay}
          className={`absolute inset-0 w-full h-full group block cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2 focus-visible:ring-offset-deep rounded-2xl transition-opacity duration-300 ${
            isPlaying ? "z-0 opacity-0 pointer-events-none" : "z-10 opacity-100"
          }`}
          aria-label="Play demo video"
        >
          {/* Thumbnail */}
          <img
            src={thumbnailSrc}
            alt="Apriori Demo Video"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            onError={() => setThumbnailError(true)}
          />

          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Play button - glass-morphism with orange accent */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.96 }}
            >
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_48px_rgba(245,158,11,0.4)]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245,158,11,0.95) 0%, rgba(245,158,11,0.85) 100%)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 24px rgba(245,158,11,0.2)",
                }}
              >
                <Play
                  className="w-10 h-10 md:w-12 md:h-12 text-deep ml-1"
                  fill="currentColor"
                />
              </div>
            </motion.div>
          </div>
        </button>
      </div>
    </motion.div>
  );
}
