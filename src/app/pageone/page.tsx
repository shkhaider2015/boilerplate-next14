import { Button } from "antd";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import Error from "./error";
import GET from "../api/user/route";



export default async function Home() {
  const data = await GET()
// console.log(ksahjdas)  
return (<main>
      <h1 >Page One</h1>
    </main>
  );
}
