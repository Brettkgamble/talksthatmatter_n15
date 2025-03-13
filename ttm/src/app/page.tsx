import styles from "./styles/Home.module.css"
import { Suspense } from "react";
import { AudioPlayer } from './components/AudioPlayer';


export default function Home() {
    // pass in as a prop.  Params are seconds
    const chapters = [
      {
        start: 0,
        end: 15
      },
      {
        start: 60,
        end: 75,
      },
  ]

  const track = "https://cdn.simplecast.com/audio/cae8b0eb-d9a9-480d-a652-0defcbe047f4/episodes/602fd246-0a4f-49eb-83e5-41dc1f15ed50/audio/9fc78e12-f322-41d9-8a1b-05cfb40b3c69/default_tc.mp3?nocache"

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Suspense>
          <AudioPlayer chapters={chapters} track={track} />
        </Suspense>
      </main>
    </div>
  );
}
