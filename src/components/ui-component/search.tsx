// material-ui
import { Box, InputAdornment, OutlinedInput } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// third-party

// project imports

// assets
import { shouldForwardProp } from '@mui/system';
import { IconSearch } from '@tabler/icons-react';
import { Dispatch, SetStateAction, useState } from 'react';

const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: theme.palette.mode === 'dark' ? theme.palette.dark[800] : '#fff'
  }
}));

interface Props {
  onSet: SetStateAction<Dispatch<string>>;
}

export const RSection = ({ onSet }: Props) => {
  const theme = useTheme();
  const [value, setValue] = useState('');

  return (
    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
      <OutlineInputStyle
        id="input-search-header"
        value={value}
        onChange={(event: any) => {
          setValue(event.target.value);
          onSet(event?.target.value);
        }}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <IconSearch stroke={1.5} size="16px" color={theme.palette.grey[500]} />
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
    </Box>
  );
};
