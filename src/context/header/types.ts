export type MenuItem = {
    title: string;
    onClick?: () => void
}

export type CreateMenuItem = (onClick: () => void) => MenuItem

export const createMenuItem = (title: string): CreateMenuItem => (onClick: () => void): MenuItem => ({
    title,
    onClick
})