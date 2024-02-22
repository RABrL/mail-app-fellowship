import FoldersSection from "./components/FoldersSection";
import {InboxContainer} from "./components/InboxContainer";
export default function Home() {
  return (
    <main className="flex min-h-screen   ">
      <FoldersSection/>
      <InboxContainer/>
    </main>
  );
}
