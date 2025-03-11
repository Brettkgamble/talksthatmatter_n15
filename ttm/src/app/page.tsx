import styles from "./styles/Home.module.css"
import { Suspense } from "react";
import { AudioPlayer } from './components/AudioPlayer';


export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Suspense>
          <AudioPlayer />
        </Suspense>
      </main>
    </div>
  );
}
