import { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/material';
import './NavigationNavbar.css';
import { Dropdown } from './Dropdown';

export const MenuItems = ({ items }) => {
    const [dropdown, setDropdown] = useState(false);

    let ref = useRef();

    useEffect(() => {
        const handler = (event) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        setDropdown(true);
    };

    const onMouseLeave = () => {
        setDropdown(false);
    };

    const closeDropdown = () => {
        dropdown && setDropdown(false);
    };

    return (
        <Box
            className="menu-items"
            ref={ref}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={closeDropdown}
        >
            {items.submenu ? (
                <>
                    <Link to={items.link} className="nav-link">
                        <Button
                            aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown((prev) => !prev)}
                        >
                            {items.name}{' '}
                        </Button>
                    </Link>
                    <Dropdown
                        submenus={items.submenu}
                        dropdown={dropdown}
                    />
                </>
            ) : (
                <Link to={items.link} className="nav-link">
                    <Button
                        variant="outlined"
                        sx={{
                            backgroundColor: "primary.main",
                            '&:hover': { backgroundColor: "primary.light" }
                        }}
                    >
                        {items.name}
                    </Button>
                </Link>
            )}
        </Box>
    );
};