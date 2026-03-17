import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Chat from '@/components/Chat'
import Footer from '@/components/Footer'
import SideNav from '@/components/SideNav'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <SideNav />
      <Hero />
      <Skills />
      <Projects />
      <Chat />
      <Footer />
    </main>
  )
}
