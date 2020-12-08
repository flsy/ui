import { color, select, withKnobs } from '@storybook/addon-knobs';
import React from 'react';
import { useTheme } from 'styled-components';
import createTheme, { ColorPalette, ThemeConfig } from './createTheme';

const ColorPalettePreview = ({ colorPalette, label }: { colorPalette: ColorPalette; label: string }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '100px auto', alignItems: 'center', marginBottom: '20px' }}>
    <div style={{ fontWeight: 800 }}>{label}</div>
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30px', height: '30px', backgroundColor: colorPalette.darker }} />
      <div style={{ width: '30px', height: '30px', backgroundColor: colorPalette.dark }} />
      <div style={{ width: '30px', height: '30px', backgroundColor: colorPalette.primary }} />
      <div style={{ width: '30px', height: '30px', backgroundColor: colorPalette.light }} />
      <div style={{ width: '30px', height: '30px', backgroundColor: colorPalette.lighter }} />
    </div>
  </div>
);

export const CreateTheme = () => {
  const t = useTheme();

  const config: ThemeConfig = {
    theme: select('theme', ['light', 'dark'], 'light'),
    main: color('main color', t.colors.main.primary),
  };

  const theme = createTheme(config);

  return (
    <>
      <ColorPalettePreview colorPalette={theme.colors.main} label="Main" />

      <div style={{ display: 'grid', gridTemplateColumns: '100px auto', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontWeight: 800 }}>Border</div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: theme.colors.border }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '100px auto', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ fontWeight: 800 }}>Text</div>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '30px', height: '30px', backgroundColor: theme.colors.text }} />
        </div>
      </div>
    </>
  );
};

export default {
  title: 'Theme/Theme',
  decorators: [withKnobs],
};
