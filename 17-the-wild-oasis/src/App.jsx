import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

import Button from './ui/Button';
import Input from './ui/Input';
import Heading from './ui/Heading';

const StyledApp = styled.div`
  background-color: orangered;
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as='h1'>The Wild Oasis</Heading>

        <Heading as='h2'>Check in and out</Heading>
        <Button onClick={() => alert('check in')}>Check in</Button>
        <Button onClick={() => alert('check out')}>Check out</Button>
        <Input type='number' placeholder='Number of guests' />

        <Heading as='h3'>Form</Heading>
        <Button onClick={() => alert('check in')}>Check in</Button>
        <Button onClick={() => alert('check out')}>Check out</Button>
        <Input type='number' placeholder='Number of guests' />
      </StyledApp>
    </>
  );
}

export default App;
