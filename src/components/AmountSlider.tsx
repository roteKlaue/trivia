import { Box, Slider, Tooltip, Typography } from "@mui/material";
import type { FC } from "react";

type Props = {
    hardcore: boolean;
    amount: number;
    setAmount: (amount: number) => void;
}

const AmountSlider: FC<Props> = ({ hardcore, amount, setAmount }) => (<Tooltip title='Number of questions in this quiz (5-30)' arrow>
    <Box>
        <Typography gutterBottom>
            Amount: {hardcore ? 50 : amount}
        </Typography>

        <Slider
            value={hardcore ? 50 : amount}
            min={5}
            max={30}
            step={1}
            disabled={hardcore}
            marks
            valueLabelDisplay='auto'
            onChange={(_, value) => {
                if (typeof value !== 'number') return;
                setAmount(value);
            }}
        />
    </Box>
</Tooltip>);

export default AmountSlider;
