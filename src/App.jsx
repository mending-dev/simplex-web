import Hero from './components/Hero'
import ServerInfo from './components/ServerInfo'
import About from './components/About'
import Staff from './components/Staff'
import Vote from './components/Vote'
import DiscordCta from './components/DiscordCta'
import Footer from './components/Footer'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
    useSmoothScroll()

    return (
        <>
            <main>
                <Hero />
                <ServerInfo />
                <About />
                <Staff />
                <Vote />
                <DiscordCta />
            </main>
            <Footer />
        </>
    )
}