import { Link, NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <header className="app-header">
            <div className="header-container">
                <Link to="/">
                    <h2>ICON</h2>
                </Link>

                <nav>
                    <NavLink to="/toy">Toys</NavLink>
                </nav>

            </div>
        </header>
    )
}