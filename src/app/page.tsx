import NavigationBar from "@/components/navigation-bar";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex p-12 flex-col h-screen">
      <NavigationBar />
      <section className="py-24 flex flex-col gap-8">
        <h1 className="text-foreground">Title</h1>
        <p className="text-foreground">Sample</p>
        <div className="">daw</div>
        <Button>Sample Bttn</Button>
      </section>
    </main>
  );
}
