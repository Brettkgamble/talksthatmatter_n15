import styles from "./styles/Home.module.css"
import { AudioPlayer } from './components/AudioPlayer';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <AudioPlayer />
      </main>
    </div>
  );
}
