import React from 'react';
import Markdown from 'markdown-to-jsx';
import * as  mark from './PrivacyContent'
import { Container } from '@material-ui/core';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer'

function App() {

  return (
    <Container maxWidth = 'lg'>
      <Header/>
      <Markdown style = {{marginTop:'30px'}}>
        {mark.md}
      </Markdown>
      <Footer/>
    </Container>
  )
}
export default App;
