import { Box, Chip, Button } from '@mui/material';
import * as React from 'react';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from '../hooks/useTranslation';
import { ITEM_HEIGHT, ITEM_PADDING_TOP } from '../utils/constants';
import { useCategory } from '../hooks/useCategory';

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

type Props = {
	tags: string[];
	setTags: Dispatch<SetStateAction<string[]>>;
};

const TagFilter = ({ tags, setTags }: Props) => {
	const t = useTranslation();
	const [categories, ,] = useCategory();

	const handleFilterChange = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value }
		} = event;
		setTags(
			// On autofill we get a the stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	const handleFilterClear = () => {
		setTags([]);
	};

	return (
		<FormControl sx={{ mt: '20px', width: '33%' }}>
			<Button
				sx={{
					width: '20px',
					position: 'absolute',
					pr: '0px',
					right: '0',
					mt: '-15px',
					fontSize: '10px'
				}}
				onClick={handleFilterClear}
			>
				{t('drawer.tags.clear')}
			</Button>
			<InputLabel id="tags-checkbox-label" sx={{ fontSize: '14px' }}>
				{t('drawer.tags').toUpperCase()}
			</InputLabel>

			<Select
				labelId="tags-checkbox-label"
				id="tags-checkbox"
				multiple
				disableUnderline
				value={tags}
				onChange={handleFilterChange}
				input={<Input sx={{ p: '10px' }} />}
				renderValue={selected => (
					<Box
						sx={{
							paddingRight: '10px',
							paddingBottom: '0px',
							display: 'flex',
							flexWrap: 'wrap',
							gap: 0.5
						}}
					>
						{selected.map(value => (
							<Chip key={value} label={value} />
						))}
					</Box>
				)}
				MenuProps={MenuProps}
			>
				{categories.map(tag => (
					<MenuItem key={tag.name} value={tag.name}>
						<Checkbox checked={tags.indexOf(tag.name) > -1} />
						<ListItemText primary={tag.name} secondary={tag.title} />
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default TagFilter;
