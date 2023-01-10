import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header">
            <div className="header-container">
                <Link to="/">
                    <h2>Mister Toy</h2>
                </Link>

                <nav>
                    <NavLink to="/toy">Toys</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/statistic">Statistics</NavLink>
                </nav>

            </div>
        </header>
    )
}