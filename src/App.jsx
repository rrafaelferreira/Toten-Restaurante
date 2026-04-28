import './App.css'
import { motion } from 'framer-motion';
import CarouselStructure from "./components/carousel/CarouselStructure";


function App() {
  return (
    <div className='App'>
      <motion.h1 animate={{ x: 200, y: 100 }}>
        Toten de Restaurante
      </motion.h1>
    
      <CarouselStructure/>
    </div>
  );
}

export default App
