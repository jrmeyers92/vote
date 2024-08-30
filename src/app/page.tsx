import Hero from "@/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero
        title="Learn about issues"
        subtitle="Vote for change"
        image="/images/homebanner.jpg"
        imageAlt="A banner with the words 'Vote for change' on it"
      />
    </main>
  );
}
