import React, { SFC } from 'react';
import styled from 'styled-components';
import { omit } from 'lodash-es';
import { colors } from '../../styles/variables';

interface ImageProps {
  border: boolean;
  src: string;
  align: 'center' | 'left' | 'right';
  width?: string;
  screenshot: boolean;
}

const getBorder = (props: ImageProps) => {
  return props.border || props.screenshot ? `solid 1px ${colors.gray}` : 'none';
};

const StyledImage = styled.div`
  padding: ${(props: ImageProps) => (props.border ? '20px' : '0')};
  border-radius: 4px;
  border: ${getBorder};
  text-align: ${(props: ImageProps) => props.align};
  img {
    width: ${(props: ImageProps) => props.width || 'auto'};
    max-width: 100%;
  }
`;

const MdxImage: SFC<ImageProps> = props => {
  // if (props.screenshot) {
  //   props.border = true;
  //   props.align = 'center';
  // }

  return (
    <StyledImage {...omit(props, 'src')}>
      <img src={props.src} />
    </StyledImage>
  );
};

MdxImage.defaultProps = {
  border: false,
  align: 'center'
};

export default MdxImage;
