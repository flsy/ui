import styled from 'styled-components';
import { borderRadius } from '../../mainStyles';

export const overlayStyles = `
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: ${borderRadius};
`;

const Overlay = styled.div`
  ${overlayStyles}
`;

export default Overlay;
