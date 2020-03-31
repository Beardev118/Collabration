import React from 'react'
import Header from '../Components/Header/Header'
import { Container, Typography, Box } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import MetaTags from 'react-meta-tags';




export default function Privacy() {
    return (
        <div>
          <MetaTags>
            <title>Privacy Policy | ModaCompris Comparison Shopping Site </title>
            <meta name="description" content="Description: This is the privacy policy for ModaCompris which is a comparison shopping site (CSS) run by London based online performance agency We are Polymer." />
            <meta property="og:title" content="Privacy Policy | ModaCompris Comparison Shopping Site " />
            <meta property="og:image" content="%PUBLIC_URL%/MetaLogo.png" />
          </MetaTags>
            <Header/>
            <Container maxWidth = "lg">
                <Box mt = {10}>
                <Typography variant = "subtitle1">Privacy Policy</Typography>
                    <hr/>
                    <p>Bottega Veneta SA ("Bottega Veneta"), company number CHE-116.302.252, with registered office in via Industria 19, Cadempino (CH – 6814) and Kering SA, a French corporation (“société anonyme”), company number 552 075 020, with registered office at 40 rue de Sèvres, 75007 Paris, France (together "we", "us", "our"), take your data protection rights and our legal obligations seriously. This Privacy Policy ("Policy") describes how we use your personal data collected via www.bottegaveneta.com ("Website") or transmitted to us by Yoox Net-A-Porter Group S.p.A., company with sole shareholder subject to direction and coordination of Compagnie Financière Richemont S.A. with company number 02050461207 and registered office at via Morimondo 17, 20143 Milan, Italy ("YNAP"), and by other means (e.g., via social media, cookies, etc.). YNAP operates and maintains the Website on our behalf, sells the Bottega Veneta products and provides us with related services, such as technological, logistics and commercial services. Please read this Policy carefully.</p>
                        </Box>
            
                        <Box mt={5}>
                            <Copyright />
                     </Box>
            </Container>

            
            
        </div>
    )
}


function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="#">
          We are Polymer
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }