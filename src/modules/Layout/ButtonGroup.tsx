import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row-reverse;

  & > * + * {
    margin-right: 10px;
  }
`;

export default ButtonGroup;
