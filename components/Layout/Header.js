import headerStyles from '../../styles/Layout/Header.module.css'

const Header = () => {
    return (
        <div >
            <h1 className = {headerStyles.title}>
                <span>Game of Life</span> Builder
            </h1>
            <p className = {headerStyles.description}>
                Run and build Game of Life configurations
            </p>
        </div>
    )
}

export default Header
