import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { Colours } from '../../mainStyles';
import Container, { STitle } from '../Container/Container';

const SDescriptions = styled.div`
  width: 100%;

  ${Container} {
    margin: 0;
    padding: 0;
  }

  ${STitle} {
    margin-top: 0;
  }
`;

const STable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const STrItem = styled.tr`
  & td,
  & th {
    font-weight: initial;
    color: ${Colours.font};
    border: 1px solid ${Colours.border};
    text-align: left;
    padding: 10px;
    background-color: #fff;
  }
`;

const STrTitle = styled(STrItem)`
  & th {
    font-weight: 600;
    background-color: ${Colours.smidgenGrey};
  }
`;

interface IDescriptionsItemProps {
  id?: string;
  label?: string;
  children?: ReactNode;
}

const DescriptionsItem = ({ id, label, children }: IDescriptionsItemProps) => (
  <STrItem data-test-id={id ? `descriptions-item-${id}` : undefined}>
    {label && <th>{label}</th>}
    <td colSpan={label ? 1 : 2}>{children}</td>
  </STrItem>
);

DescriptionsItem.defaultProps = {
  id: undefined,
  label: undefined,
  children: undefined,
};

interface IDescriptionsTitleProps {
  id?: string;
  label: string;
}

const DescriptionsTitle = ({ id, label }: IDescriptionsTitleProps) => (
  <STrTitle data-test-id={id ? `descriptions-title-${id}` : undefined}>
    <th colSpan={2}>{label}</th>
  </STrTitle>
);

DescriptionsTitle.defaultProps = {
  id: undefined,
};

interface IDescriptionsProps {
  id?: string;
  title?: string;
  children: ReactNode;
}

const Descriptions = ({ id, title, children }: IDescriptionsProps) => (
  <SDescriptions data-test-id={id ? `descriptions-${id}` : undefined}>
    <Container title={title}>
      <STable>
        <tbody>{children}</tbody>
      </STable>
    </Container>
  </SDescriptions>
);

Descriptions.defaultProps = {
  id: undefined,
  title: undefined,
};

Descriptions.Title = DescriptionsTitle;
Descriptions.Item = DescriptionsItem;

export default Descriptions;
