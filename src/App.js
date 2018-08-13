import React from "react";
import RequestForm from "./components/RequestForm";
import { Grid, Container } from "semantic-ui-react";
import Response from "./components/Response";
import History from "./components/History";

//import _ from 'lodash';

const styles = {
    container: {
        marginTop: "1rem"
    }
};

const App = () => {
    return (
        <Container style={styles.container}>
            <Grid>
                <Grid.Column width="4">
                    <History />
                </Grid.Column>
                <Grid.Column width="12">
                    <RequestForm />
                    <Response />
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default App;
