import { List, ListItem, ListItemButton, Checkbox, Typography } from '@mui/material';

interface CategoryFilterProps {
    categories: string[];
    selectedCategories: string[];
    onCategoryToggle: (category: string) => void;
}

export default function CategoryFilter({
                                           categories,
                                           selectedCategories,
                                           onCategoryToggle,
                                       }: CategoryFilterProps) {
    return (
        <div>
            <Typography variant="h6" gutterBottom>
                Filter by Category
            </Typography>
            <List dense>
                {categories.map((category) => (
                    <ListItem key={category} disablePadding>
                        <ListItemButton onClick={() => onCategoryToggle(category)}>
                            <Checkbox
                                edge="start"
                                checked={selectedCategories.includes(category)}
                                tabIndex={-1}
                                disableRipple
                            />
                            {category}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}