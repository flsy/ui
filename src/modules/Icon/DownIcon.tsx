import DownOutlined from '@ant-design/icons/DownOutlined';
import styled from 'styled-components';
import { ActiveStyle, IActiveProps } from './styles';

const DownIcon = styled(DownOutlined)<IActiveProps>`
  ${ActiveStyle}
`;

export default DownIcon;
