import { Drawer } from "@mui/material";

export const MobileDrawer = ({ isOpen, setIsOpen, children }) => {
    return (
        <Drawer anchor={"left"} open={isOpen} onClose={() => setIsOpen(false)}>
            {children}
        </Drawer>
    )
}