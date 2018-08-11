import React from "react";
import RequestForm from "./components/RequestForm";
import { Grid, Container } from "semantic-ui-react";
import Response from "./components/Response";

//import _ from 'lodash';

const styles = {
    container: {
        marginTop: 50
    }
};

const App = () => {
    return (
        <Container style={styles.container}>
            <Grid centered>
                <Grid.Column width="10">
                    <RequestForm />
                </Grid.Column>
            </Grid>
            <Response />
        </Container>
    );
};

export default App;
