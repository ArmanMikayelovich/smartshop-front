import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function SearchBar({
                                      searchTerm,
                                      onSearchChange,
                                  }: {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}) {
    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment: searchTerm && (
                    <IconButton onClick={() => onSearchChange('')}>
                        <ClearIcon />
                    </IconButton>
                ),
            }}
            sx={{ mb: 3 }}
        />
    );
}