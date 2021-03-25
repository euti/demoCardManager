import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    makeStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    TextField,
    DialogActions,
    Button,
    CardActionArea,
    CardContent,
    Typography,
    CardActions,
    Grid,
    Card as MaterialCard,
} from "@material-ui/core";
import {
    editCard,
    deleteCard,
} from "../store/actions";
import { defaultImg } from "../utils/config";

const useStyles = makeStyles(() => ({
    container: {
        'width': '200px',
        'height': '200px',
    },
    img: {
        maxWidth: '100px',
        maxHeight: '100px',
    }
}));

const Card = ({card, editCard, deleteCard}) => {
    const [showEdit,setShowEdit] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [error,setError] = useState([false, false]);

    const {
        id,
        title,
        description,
        img,
    } = card;

    const classes = useStyles();

    const editDialog = (
        <Dialog
            id="editDialog"
            position="absolute"
            open={showEdit}
        >
            <DialogTitle>
                Editar tarjeta
            </DialogTitle>
            <DialogContent>
                <FormControl>
                    <TextField
                        id="editName"
                        autoFocus
                        error={error[0]}
                        label="Título"
                        defaultValue={title}
                        helperText={'Campo obligatorio'}
                        onChange={(e)=>{
                            console.log(e.target.value.length)
                            return e.target.value.length==0
                                ? setError([true,error[1]])
                                : setError([false,error[1]])
                        }}
                    />
                    <TextField
                        id="editDescription"
                        error={error[1]}
                        label="Descripción"
                        multiline
                        rows={4}
                        defaultValue={description}
                        helperText={'Campo obligatorio'}
                        onChange={(e)=>{
                            console.log(e.target.value.length)
                            return e.target.value.length==0
                                ? setError([error[0], true])
                                : setError([error[0], false])
                        }}
                    />
                    <TextField
                        id="editImg"
                        label="Imagen (Url)"
                        defaultValue={img}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    id="editButtonEdit"
                    onClick={() => {
                        editCard({
                            id,
                            title: document.getElementById('editName').value,
                            description: document.getElementById('editDescription').value,
                            img: document.getElementById('editImg').value,
                        });
                        setShowEdit(false)}
                    }
                    disabled={error[0] || error[1]}
                >
                    Actualizar
                </Button>
                <Button
                    id="editButtonCancel"
                    onClick={() => {
                        setShowEdit(false)}
                    }
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );

    const deleteDialog = (
        <Dialog
            id="deleteDialog"
            position="absolute"
            open={showDelete}
        >
            <DialogTitle>
                Eliminar tarjeta
            </DialogTitle>
            <DialogContent>
                ¿Seguro que quieres eliminar la tarjeta "{title}"?
            </DialogContent>
            <DialogActions>
                <Button
                    id="deleteButtonDelete"
                    onClick={() => {
                        deleteCard(id);
                        setShowDelete(false)}
                    }>
                    Eliminar
                </Button>
                <Button
                    id="deleteButtonCancel"
                    onClick={() => {
                        setShowDelete(false)}
                    }
                >
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );

    const buttons = (
        <CardActions>
            <Button
                color="primary"
                onClick={()=>setShowEdit(true)}
            >
                Editar
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={()=>setShowDelete(true)}
            >
                Eliminar
            </Button>
        </CardActions>
    );

    const content = (
        <CardActionArea>
            <img
                className={classes.img}
                src={img || defaultImg}
                alt="card img" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>
        </CardActionArea>
    );

    return (
        <Grid
            item
            key={card}
            className={classes.container}
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
        >
            {editDialog}
            {deleteDialog}
            <MaterialCard>
                {showButtons
                    ? buttons
                    : content
                }

            </MaterialCard>
        </Grid>
    )
}

const mapDispatchToProps = {
    editCard,
    deleteCard,
};

export default connect(null, mapDispatchToProps)(Card);
