// material-ui
import { Grid, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import useConfig from 'hooks/useConfig';
import Avatar from 'ui-component/extended/Avatar';

// assets
import { IconCheck } from '@tabler/icons-react';

// color import
import theme1 from '../../scss/_theme1.module.scss';
import theme2 from '../../scss/_theme2.module.scss';
import theme3 from '../../scss/_theme3.module.scss';
import theme4 from '../../scss/_theme4.module.scss';
import theme5 from '../../scss/_theme5.module.scss';
import theme6 from '../../scss/_theme6.module.scss';
import colors from '../../scss/_themes-vars.module.scss';

// types
import { FormattedMessage } from 'react-intl';
import { StringColorProps } from 'types';

interface Props {
  color: StringColorProps;
  presetColor: string;
  setPresetColor: (s: string) => void;
}

// ==============================|| CUSTOMIZATION - COLOR ||============================== //

const PresetColorBox = ({ color, presetColor, setPresetColor }: Props) => (
  <Grid item>
    <Avatar
      color="inherit"
      size="md"
      sx={{
        width: 48,
        height: 48,
        background: `linear-gradient(135deg, ${color.primary} 50%, ${color.secondary} 50%)`,
        opacity: presetColor === color.id ? 0.6 : 1,
        cursor: 'pointer'
      }}
      onClick={() => setPresetColor(color?.id!)}
    >
      {presetColor === color.id && <IconCheck color="#fff" size={28} />}
    </Avatar>
  </Grid>
);

const PresetColor = () => {
  const theme = useTheme();
  const { presetColor, onChangePresetColor } = useConfig();

  const colorOptions = [
    {
      id: 'default',
      primary: theme.palette.mode === 'dark' ? colors.darkPrimaryMain : colors.primaryMain,
      secondary: theme.palette.mode === 'dark' ? colors.darkSecondaryMain : colors.secondaryMain
    },
    {
      id: 'theme1',
      primary: theme.palette.mode === 'dark' ? theme1.darkPrimaryMain : theme1.primaryMain,
      secondary: theme.palette.mode === 'dark' ? theme1.darkSecondaryMain : theme1.secondaryMain
    },
    {
      id: 'theme2',
      primary: theme.palette.mode === 'dark' ? theme2.darkPrimaryMain : theme2.primaryMain,
      secondary: theme.palette.mode === 'dark' ? theme2.darkSecondaryMain : theme2.secondaryMain
    },
    {
      id: 'theme3',
      primary: theme.palette.mode === 'dark' ? theme3.darkPrimaryMain : theme3.primaryMain,
      secondary: theme.palette.mode === 'dark' ? theme3.darkSecondaryMain : theme3.secondaryMain
    },
    {
      id: 'theme4',
      primary: theme.palette.mode === 'dark' ? theme4.darkPrimaryMain : theme4.primaryMain,
      secondary: theme.palette.mode === 'dark' ? theme4.darkSecondaryMain : theme4.secondaryMain
    },
    {
      id: 'theme5',
      primary: theme.palette.mode === 'dark' ? theme5.darkPrimaryMain : theme5.primaryMain,
      secondary: theme.palette.mode === 'dark' ? theme5.darkSecondaryMain : theme5.secondaryMain
    },
    {
      id: 'theme6',
      primary: theme.palette.mode === 'dark' ? theme6.darkPrimaryMain : theme6.primaryMain,
      secondary: theme.palette.mode === 'dark' ? theme6.darkSecondaryMain : theme6.secondaryMain
    }
  ];

  return (
    <Stack spacing={1} px={2} pb={2}>
      <Typography variant="h5" sx={{ textTransform: 'uppercase' }}>
        <FormattedMessage id="preset-color" />
      </Typography>
      <Grid container spacing={1.5} alignItems="center">
        {colorOptions.map((color, index) => (
          <PresetColorBox key={index} color={color} presetColor={presetColor} setPresetColor={onChangePresetColor} />
        ))}
      </Grid>
    </Stack>
  );
};

export default PresetColor;
