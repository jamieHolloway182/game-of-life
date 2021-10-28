import aboutPageStyles from '../styles/About.module.css'

const about = () => {
    return (
        <div className ={aboutPageStyles.container}>
            <h1>About</h1>
            <div >
                Author: Jamie Holloway<br/>
                Shotout to my niche internet micro celeberity wife too<br/>
                <a href="https://github.com/jamieHolloway182">My Github</a><br/>
                Don't have much on there but....<br/>
                Run up the cipher website:<br/>
                <a href="https://cncm.netlify.app">Crooked Nazgul Code Men Official Website</a><br/>
                Website made with <a style = {{textDecoration: 'none'}}href = "https://nextjs.org/">Next.js</a><br/>
                Wasn't really necessary but we do a little coding...<br/>
                <img src="https://pbs.twimg.com/media/EnZyFCQW8AIxRCQ.jpg:large"></img>
            </div>
        </div>
    )
}

export default about
