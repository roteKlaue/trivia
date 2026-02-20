import { categories, type Category } from '../../types/Category';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { capitalize } from '@mui/material/utils';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import type { FC } from 'react';

type Props = {
    setCategory(cat: Category): void;
    category: Category;
    hardcoreMode: boolean;
};

const CategorySelector: FC<Props> = ({ setCategory, category, hardcoreMode }) => (<Tooltip title='Choose the topic of the questions' arrow>
    <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select label='Category'
            value={hardcoreMode ? 'all' : category}
            disabled={hardcoreMode}
            onChange={(e) => setCategory(e.target.value as Category)}>
            {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                    {capitalize(cat.replace(/_/g, ' '))}
                </MenuItem>
            ))}
        </Select>
    </FormControl>
</Tooltip>);

export default CategorySelector;
