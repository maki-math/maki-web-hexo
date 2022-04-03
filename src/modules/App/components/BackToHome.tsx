import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  color: black;
`;

export function BackToHome() {
  return <StyledLink to="/">Maki-Math</StyledLink>;
}
