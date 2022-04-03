import styled from '@emotion/styled';
import { Layout } from 'antd';
const { Header } = Layout;

export const CustomLayoutHeader = styled(Header)`
  background-color: var(--bg-color);
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 2px -2px rgba(0, 0, 0, 0.2);
`;
