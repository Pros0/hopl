import React from 'react';
import styled from 'styled-components';

const Img = styled.img`
  max-width: 100px;
  height: auto;
`;

const Logo = () => <Img src="/hopl-logo-square.png" alt="Hopl" />;

export default Logo;
