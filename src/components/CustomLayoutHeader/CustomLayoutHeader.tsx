import styled from '@emotion/styled';
import { Layout } from 'antd';
const { Header } = Layout;

export const CustomLayoutHeader = styled(Header)`
  background-color: var(--bg-color);
  display: flex;
  justify-content: space-between;
`;
