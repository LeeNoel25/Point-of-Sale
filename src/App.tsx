import { BrowserRouter as Router } from 'react-router-dom';
import { Grid, GridItem } from '@chakra-ui/react'

import NavBar from './components/NavBar'

function App() {

  return (
<Router>
    <Grid>
<GridItem><NavBar/></GridItem>
<GridItem>Tet</GridItem>
<GridItem>Tes</GridItem>
</Grid>
</Router>
  )
}

export default App
