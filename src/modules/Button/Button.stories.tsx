import RocketOutlined from '@ant-design/icons/RocketOutlined';
import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Button } from '../../index';
import DownIcon from '../Icon/DownIcon';
import ButtonIcon from './ButtonIcon';
import LinkButton from './LinkButton';

const sizes = ['xs', 'sm', 'md', 'lg'];

const ButtonPreview = () => (
  <Button
    text="Button"
    onClick={action('onClick')}
    primary={boolean('Primary', false, 'Type')}
    error={boolean('Error', false, 'Type')}
    isLoading={boolean('Loading', false, 'Type')}
    disabled={boolean('Disabled', false, 'Type')}
    link={boolean('Link', false, 'Type')}
    size={select<any>('Size', sizes, 'md', 'Sizes')}
    iconLeft={boolean('Icon left', false, 'Extra') ? <DownIcon /> : undefined}
    iconRight={boolean('Icon right', false, 'Extra') ? <DownIcon /> : undefined}
  />
);

const ButtonIconPreview = () => (
  <ButtonIcon size={select<any>('Size', sizes, 'md', 'Sizes')} primary={boolean('primary', false)} onClick={action('onClick')} icon={<RocketOutlined />} />
);

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('default', () => <ButtonPreview />)
  .add('icon', () => <ButtonIconPreview />)
  .add('link', () => (
    <MemoryRouter>
      <LinkButton
        text="hey ho"
        to="/a"
        primary={boolean('Primary', false, 'Type')}
        error={boolean('Error', false, 'Type')}
        disabled={boolean('Disabled', false, 'Type')}
        size={select<any>('Size', sizes, 'md', 'Sizes')}
        iconLeft={boolean('Icon left', false, 'Extra') ? <DownIcon /> : undefined}
        iconRight={boolean('Icon right', false, 'Extra') ? <DownIcon /> : undefined}
      />
    </MemoryRouter>
  ));
