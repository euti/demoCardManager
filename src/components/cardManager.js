import React, { useState } from 'react';
import { connect } from 'react-redux';
import { v4 as uuid } from 'uuid';
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
import {
    addCard,
    setSort,
} from "../store/actions";

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const CardManager = ({cards, sort, setSort, addCard}) => {
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
                        id="addName"
                        autoFocus
                        label="Título"
                    />
                    <TextField
                        id="addDescription"
                        label="Descripción"
                        multiline
                        rows={4}
                    />
                    <TextField
                        id="addImg"
                        label="Imagen (Url)"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    id="addButtonAdd"
                    onClick={() => {
                        addCard({
                            id: uuid(),
                            title: document.getElementById('addName').value,
                            description: document.getElementById('addDescription').value,
                            img: document.getElementById('addImg').value,
                        });
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
        <>
            <Button
                onClick={()=>{
                    sort===0
                        ? setSort('1')
                        : sort>0
                            ? setSort('-1')
                            : setSort('0')
                }}
            >
                {sort===0 ? "Título ↑↓" : sort>0 ? "Título ↑" : "Título ↓"}
            </Button>
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
        </>
    )
}

const mapStateToProps = state => {
    const order = parseInt(state.sort);
    return {
        cards: order === 0
            ? state.cards.sort((a,b) => { return a.id>b.id ? 1 : -1 })
            : state.cards.sort((a,b) => { return a.title>b.title ? order : -order }),
        sort: order,
    }
};

const mapDispatchToProps = {
    addCard,
    setSort,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardManager);
