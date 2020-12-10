import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { borderRadius, Colours } from '../../mainStyles';
import { ButtonIconWrapper } from '../Button/ButtonIcon';
import Flex from '../Layout/Flex';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';

const STag = styled.span`
  min-width: 50px;
  display: inline-block;
  padding: 4px 6px;
  color: ${Colours.font};
  background-color: ${Colours.background};
  border: 1px solid ${Colours.border};
  border-radius: ${borderRadius};

  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;

  ${ButtonIconWrapper} {
    margin-left: 6px;
  }
`;

const STags = styled(Flex)`
  align-items: center;

  ${STag} {
    margin-right: 4px;
    margin-top: 2px;
    margin-bottom: 2px;
  }
`;

interface ITagProps {
  label?: string;
  isLoading?: boolean;
  description?: string;
}

const Tag = ({ label, isLoading, description }: ITagProps) => {
  if (isLoading) {
    return (
      <STag>
        <Loader size="xs" text="Načítání dat..." />
      </STag>
    );
  }

  return <STag>{description ? <Tooltip text={description}>{label}</Tooltip> : label}</STag>;
};

Tag.defaultProps = {
  label: undefined,
  isLoading: false,
  description: undefined,
};

interface ITagsProps {
  children: ReactNode;
}

const Tags = ({ children }: ITagsProps) => <STags horizontal={true}>{children}</STags>;

Tags.Tag = Tag;

export default Tags;
