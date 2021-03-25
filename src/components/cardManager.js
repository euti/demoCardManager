import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    TextField,
    Button,
    DialogActions,
    Grid,
    Fab,
} from "@material-ui/core";
import Card from './card'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CardManager = ({cards}) => {
    const [showNew,setShowNew] = useState(false);

    const classes = useStyles();

    const addDialog = (
        <Dialog
            id="addDialog"
            position="absolute"
            open={showNew}
        >
            <DialogTitle>
                Nueva tarjeta
            </DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField
                        id="addCardName"
                        autoFocus
                        label="Título"
                    />
                    <TextField
                        id="addCardDescription"
                        label="Descripción"
                        multiline
                        rows={4}
                    />
                    <TextField
                        id="addCardImg"
                        label="Imagen (Url)"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    id="addButtonAdd"
                    onClick={() => {
                        //TODO addCategory();
                        setShowNew(false)}
                    }>
                    Añadir
                </Button>
                <Button
                    id="addButtonCancel"
                    onClick={() => {
                        setShowNew(false)}
                    }
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );

    return (
        <Grid container spacing={3}>
            {addDialog}
            {cards.map((card, index) => <Card key={`card-${index}`} card={card} />)}
            <Fab
                className={classes.fab}
                color="primary"
                onClick={()=>setShowNew(true)}
            >
                +
            </Fab>
        </Grid>
    )
}

const mapStateToProps = state => {
    return {
        cards: state.cards,
    }
};

export default connect(mapStateToProps, null)(CardManager);