import { Component, createSignal, onCleanup, onMount } from "solid-js";
import Button from "./Button";
import { Expand, Pause, Play, Shrink, Volume, Volume1, Volume2, VolumeX } from "lucide-solid";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  class?: string;
  aspectRatio?: "16:9" | "4:3" | "1:1";
  width?: string;
  height?: string;
}

const aspectRatioMap = {
  "16:9": "pt-[56.25%]",
  "4:3": "pt-[75%]",
  "1:1": "pt-[100%]"
};

const VideoPlayer: Component<VideoPlayerProps> = (props) => {
  let videoRef: HTMLVideoElement | undefined;
  let progressRef: HTMLDivElement | undefined;
  
  const [isPlaying, setIsPlaying] = createSignal(false);
  const [volume, setVolume] = createSignal(1);
  const [currentTime, setCurrentTime] = createSignal(0);
  const [duration, setDuration] = createSignal(0);
  const [isFullscreen, setIsFullscreen] = createSignal(false);

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (videoRef) {
      if (isPlaying()) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying());
    }
  };

  const handleVolumeChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVolume = parseFloat(input.value);
    setVolume(newVolume);
    if (videoRef) {
      videoRef.volume = newVolume;
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef) {
      setCurrentTime(videoRef.currentTime);
    }
  };

  const handleProgressClick = (e: MouseEvent) => {
    if (progressRef && videoRef) {
      const rect = progressRef.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.currentTime = pos * duration();
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef?.parentElement?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const getVolumeIcon = () => {
    if (volume() === 0) return <VolumeX />;
    if (volume() <= 0.33) return <Volume />;
    if (volume() <= 0.66) return <Volume1 />;
    return <Volume2 />;
  };

  onMount(() => {
    if (videoRef) {
      setDuration(videoRef.duration);
      
      // Update duration once metadata is loaded
      videoRef.addEventListener('loadedmetadata', () => {
        setDuration(videoRef.duration);
      });
    }

    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', () => {
      setIsFullscreen(!!document.fullscreenElement);
    });
  });

  onCleanup(() => {
    document.removeEventListener('fullscreenchange', () => {
      setIsFullscreen(!!document.fullscreenElement);
    });
  });

  return (
    <div 
      class={`relative ${props.class || ""}`} 
      style={{ 
        width: props.width || '100%',
        height: props.height || 'auto'
      }}
    >
      {/* If height is provided, use it directly. Otherwise, use aspect ratio */}
      <div 
        class={`relative w-full ${!props.height ? aspectRatioMap[props.aspectRatio || "16:9"] : 'h-full'}`}
      >
        {/* Video container */}
        <div class={`${props.height ? 'h-full' : 'absolute inset-0'} group overflow-hidden bg-background`}>
          <video
            ref={videoRef}
            src={props.src}
            poster={props.poster}
            onTimeUpdate={handleTimeUpdate}
            class="absolute inset-0 w-full h-full object-contain"
          />

          {/* Controls overlay - moved z-index and adjusted gradient */}
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Progress bar container with padding to prevent overflow */}
            <div class="px-4 pt-4">
              <div
                ref={progressRef}
                onClick={handleProgressClick}
                class="w-full h-1 bg-zinc-600/50 cursor-pointer hover:h-2 transition-all rounded-full overflow-hidden"
              >
                <div
                  class="h-full bg-white"
                  style={{ width: `${(currentTime() / duration()) * 100}%` }}
                />
              </div>
            </div>

            <div class="flex items-center gap-4 p-4">
              {/* Play/Pause button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={togglePlay}
                class="py-2"
              >
                {isPlaying() ? <Pause /> : <Play />}
              </Button>

              {/* Time display */}
              <div class="text-text text-sm">
                {formatTime(currentTime())} / {formatTime(duration())}
              </div>

              {/* Volume control */}
              <div class="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    const newVolume = volume() === 0 ? 1 : 0;
                    setVolume(newVolume);
                    if (videoRef) videoRef.volume = newVolume;
                  }}
                  class="py-2"
                >
                  {getVolumeIcon()}
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume()}
                  onInput={handleVolumeChange}
                  class="w-20 accent-text hover:border-none hover:focus:border-none"
                />
              </div>

              <div class="flex-1" />

              {/* Fullscreen button */}
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleFullscreen}
                class="py-2"
              >
                {isFullscreen() ? <Shrink /> : <Expand />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
