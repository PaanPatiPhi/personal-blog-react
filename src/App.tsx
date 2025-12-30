import './App.css'
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import ArticleSearchSection from './components/article/ArticleSearchSection';
import ArticleSection from './components/article/ArticleSection';
import Footer from './components/Footer';

function App() {
  return (
    <>
    <NavBar />
    <HeroSection />
    <ArticleSearchSection />
    <ArticleSection />
    <Footer />
    </>
  );
}

export default App
