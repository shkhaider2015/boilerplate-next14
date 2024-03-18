import { getSession, login, logout } from "@/lib/lib";
import styles from "./page.module.css";
import { Button, Form, Input } from "antd";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  return (
    <main className={styles.main}>
      <form action={async (formData) => {
        'use server';
        console.log("Form data : ", formData)
        await login(formData)
        redirect('/')
      }} >
        {/* <Form.Item> */}
          <Input name="email" placeholder="Email" />
        {/* </Form.Item> */}
        {/* <Form.Item> */}
          <Button type="primary" htmlType="submit">Login</Button>
        {/* </Form.Item> */}
      </form>

      <form action={async () => {
        'use server';
        await logout();
        redirect('/')
      }} >
        {/* <Form.Item> */}
          <Button type="primary" htmlType="submit" >Logout</Button>
        {/* </Form.Item> */}
      </form>

      <pre>{JSON.stringify(session)}</pre>
    </main>
  );
}
