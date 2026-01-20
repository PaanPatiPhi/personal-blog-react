import './App.css'
import NavBar from "./shared/layout/NavBar";
import HeroSection from "./shared/layout/HeroSection";
import ArticlePage from './features/article/components/ArticlePage';
import Footer from './shared/layout/Footer';

function App() {
  return (
    <>
    <NavBar />
    <HeroSection />
    <ArticlePage />
    <Footer />
    </>
  );
}

export default App
