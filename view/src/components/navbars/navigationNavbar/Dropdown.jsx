import { Link } from 'react-router-dom';


export const Dropdown = ({ submenus, dropdown }) => {
    return (
        <ul className={`dropdown ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu, index) => (
                <li key={index} className="menu-items">
                    <Link to={submenu.link}>{submenu.name}</Link>
                </li>
            ))}
        </ul>
    );
};