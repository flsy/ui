import { storiesOf } from '@storybook/react';
import React from 'react';
import { P, Span } from './Typography';

const TypographyStory = () => (
  <>
    <h1>H1 nadpis</h1>
    <P subtitle={true} colour="#ccc">
      subtitle props passed down
    </P>
    <h2>H2 nadpis</h2>
    <p> Lorem ipsum dolor sit amet</p>
    <h3>H3 nadpis</h3>
    <p> Lorem ipsum dolor sit amet</p>
    <h4>H4 nadpis</h4>
    <p> Lorem ipsum dolor sit amet</p>
    <h5>H5 nadpis</h5>
    <p> Lorem ipsum dolor sit amet</p>
    <h6>H6 nadpis</h6>
    <p> Lorem ipsum dolor sit amet</p>

    <p>Paragraph [P] </p>
    <P>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce suscipit libero eget elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </P>
    <p>Enchanced paragraph [P] </p>
    <P colour="#ccc" size="lg">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce suscipit libero eget elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </P>
    <P />

    <p>Span</p>
    <Span>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce suscipit libero eget elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </Span>
    <P colour="#FF7A3D" size="xl">
      <Span colour="#00AA74">Enchanted</Span> Span
    </P>
    <Span colour="#FF7A3D" size="xl">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce suscipit libero eget elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
      mollit anim id est laborum.
    </Span>
  </>
);

storiesOf('Typography', module).add('basic usage', () => <TypographyStory />);
