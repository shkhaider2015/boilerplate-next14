import GET from "./api/user/route";
import styles from "./page.module.css";
import { Button } from "antd";

export default async function Home() {
  const data = await GET()
  return (
    <main className={styles.main}>
      <Button type="primary" >Check</Button>
    </main>
  );
}
