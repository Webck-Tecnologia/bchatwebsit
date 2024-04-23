import styled from 'styled-components';
import { Link } from 'gatsby';

export default styled(Link)`
  display: inline-block;
  max-width: 50px;
  svg {
    font-size: 3rem;
    path {
      stroke: white;
    }
  }
`;
