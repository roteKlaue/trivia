import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import type { FC } from 'react';

type Props = { label: string, value: number | string }

const Stat: FC<Props> = ({ label, value }) => (<Stack alignItems='center' spacing={0.5}>
    <Typography fontWeight={700}>{value}</Typography>
    <Typography variant='caption' color='text.secondary'>{label}</Typography>
</Stack>);

export default Stat;
