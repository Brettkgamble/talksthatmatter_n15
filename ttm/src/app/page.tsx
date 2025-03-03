import { AudioPlayer } from './components/AudioPlayer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen pt-0 px-6 justify-center items-center">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <AudioPlayer />
      </main>
    </div>
  );
}
