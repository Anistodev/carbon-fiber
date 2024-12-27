import { createSignal, Show, type Component } from 'solid-js'
import {
  Button,
  Input,
  VideoPlayer,
} from 'src'
import { ThumbsDown, ThumbsUp, Share, Search } from 'lucide-solid'

const YtTest: Component = () => {
  return (
    <div class="min-h-screen bg-background">
      {/* Navbar */}
      <nav class="border-b border-zinc-800 bg-primary p-4">
        <div class="max-w-[1800px] mx-auto flex items-center gap-8">
          <div class="flex items-center gap-4">
            <p class="text-xl font-medium text-text">YouTube</p>
          </div>

          <div class="flex-1 flex justify-center">
            <div class="w-full max-w-[600px] flex gap-2">
              <Input 
                class="flex-1" 
                placeholder="Search" 
              />
              <Button variant="secondary" class="px-6">
                <Search />
              </Button>
            </div>
          </div>

          <div class="flex items-center gap-4">
            <Button variant="secondary">Sign in</Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main class="max-w-[1800px] mx-auto p-6">
        <div class="grid grid-cols-[1fr,400px] gap-6">
          {/* Video Section */}
          <div>
            <div class="rounded-lg overflow-hidden bg-primary">
              <VideoPlayer 
                src="/nice.mp4" 
                width="100%" 
                height="700px"
                class="border-b border-zinc-800"
              />
            </div>

            {/* Video Info */}
            <div class="mt-4">
              <h1 class="text-xl font-medium text-text">
                Building a YouTube Clone with SolidJS and Tailwind CSS
              </h1>

              <div class="mt-4 flex items-start justify-between">
                <div class="flex items-center gap-4">
                  <img 
                    src="https://github.com/emirsassan.png" 
                    alt="Channel avatar"
                    class="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p class="font-medium text-text">Emirsassan</p>
                    <p class="text-sm text-zinc-400">100K subscribers</p>
                  </div>
                  <Button variant="secondary" class="ml-4">Subscribe</Button>
                </div>

                <div class="flex items-center gap-2">
                  <Button variant="secondary" class="flex items-center gap-2">
                    <ThumbsUp />
                    <span>123K</span>
                  </Button>
                  <Button variant="secondary" class="flex items-center gap-2">
                    <ThumbsDown />
                    <span>Dislike</span>
                  </Button>
                  <Button variant="secondary" class="flex items-center gap-2">
                    <Share />
                    <span>Share</span>
                  </Button>
                </div>
              </div>

              {/* Video Description */}
              <div class="mt-4 p-4 rounded-lg bg-primary text-text">
                <p class="text-sm text-zinc-400">1.2M views • 2 months ago</p>
                <p class="mt-2">
                  In this video, we'll build a YouTube clone using SolidJS and Tailwind CSS.
                  We'll cover component design, state management, and responsive layouts.
                </p>
              </div>
            </div>
          </div>

          {/* Suggested Videos */}
          <div class="space-y-4">
            {Array(8).fill(0).map((_, i) => (
              <div class="flex gap-2">
                <div class="w-[168px] h-[94px] bg-primary rounded-lg overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${i}/336/188`}
                    alt="Thumbnail"
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="flex-1">
                  <p class="text-sm text-text font-medium line-clamp-2">
                    Suggested Video {i + 1} - Amazing Content Inside
                  </p>
                  <p class="text-xs text-zinc-400 mt-1">Channel Name</p>
                  <p class="text-xs text-zinc-400">123K views • 2 months ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default YtTest
