import { FormControl, InputLabel, MenuItem, Select, Tooltip } from "@mui/material";
import { categories, type Category } from "../../types/Category";
import type { FC } from "react";

type Props = {
    setCategory(cat: Category): void;
    category: Category;
    hardcoreMode: boolean;
};


const CategorySelector: FC<Props> = ({ setCategory, category, hardcoreMode }) => (<Tooltip title='Choose the topic of the questions' arrow>
    <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
            value={hardcoreMode ? 'all' : category}
            disabled={hardcoreMode}
            label='Category'
            onChange={(e) => setCategory(e.target.value as Category)}
        >
            {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                    {cat.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
</Tooltip>);

export default CategorySelector;
