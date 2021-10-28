import Head from 'next/head'
import Canvas from '../components/Canvas/Canvas'
import homeStyle from '../styles/Index.module.css'
import {useState} from 'react'
import Link from 'next/link'



export default function Home() {

  const [canvasDimensions, updateDimensions] = useState([80, 40])
  const [cellSize, updateCellSize] = useState(10);
  const [defaultCells, updateCells] = useState(Array(canvasDimensions[0] * canvasDimensions[1]).fill(true));

  return (
    <div className={homeStyle.main}>
      <Head>
        <title>Game of Life Builder</title>
        <meta name="keywords" content="john conway's game of life"></meta>
      </Head>
      <div className={homeStyle.description}>
        <h3>What is Game of Life?</h3>
        <p>The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor or any other Turing machine.</p>
        <h3>What can you do on this site?</h3>
        <p>On Game of Life Builder you can use our interactive canvas located on the <Link href="./builder">builder tab</Link> to easily build and deploy configurations, which you can then easily watch run, using the canvas to adjust the Game of Life settings such as update interval and cell colour. On top of this, the <Link href="./presets">presets tab</Link> allows you to view all previous configuration submissions via our database. These presets can either be viewed on the presets page, or imported into the builder to use as a basis for your own design, which can be submitted onto our database to be made accessible on the presets page.</p>
      </div>
      <h3>Featured Design</h3>
      <div className={homeStyle.canvasContainer}>
        <Canvas cells={defaultCells} canvasDimensions={canvasDimensions} cellSize={cellSize}/>
      </div>
    </div>
  )
}
