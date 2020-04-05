import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100px;
`;

const Img = styled.img`
  display: block;
  width: 100%;
  height: auto;
`;

const Logo = () => (
  <Wrapper>
    <Img src="/hopl-logo-square.png" alt="Hopl" />
  </Wrapper>
);

export default Logo;
