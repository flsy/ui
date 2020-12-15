import React from 'react';
import styled, { css } from 'styled-components';
import Loader from '../Loader/Loader';
import Tooltip from '../Tooltip/Tooltip';

type TagType = 'default' | 'info' | 'warning' | 'error' | 'success';

export interface ITagProps {
  label?: string;
  isLoading?: boolean;
  description?: string;
  type?: TagType;
  className?: string;
}

const tagStyles = css<ITagProps>`
  min-width: 50px;
  display: inline-block;
  padding: 4px 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
  white-space: nowrap;
  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ theme, type = 'default' }) => {
    if (type === 'default') {
      return `
        color: ${theme.colors.text};
        background-color: ${theme.background.default};
        border: 1px solid  ${theme.colors.border};
      `;
    }
    return `
      color: ${theme.colors[type].darker};
      background-color: ${theme.background[type]};
      border: 1px solid  ${theme.colors[type].primary};
    `;
  }};

  & + & {
    margin-left: 0.3em;
  }
`;

const Tag = ({ className, label, isLoading, description }: ITagProps) => {
  if (isLoading) {
    return (
      <span className={className}>
        <Loader size="xs" text="Načítání dat..." />
      </span>
    );
  }

  return <span className={className}>{description ? <Tooltip text={description}>{label}</Tooltip> : label}</span>;
};

Tag.defaultProps = {
  type: 'default',
  label: undefined,
  isLoading: false,
  description: undefined,
};

export default styled(Tag)`
  ${tagStyles}
`;
