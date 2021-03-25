import React, { useState } from 'react';
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
import { defaultImg } from "../utils/config";

const useStyles = makeStyles(() => ({
    container: {
        'width': '200px',
        'height': '200px',
    },
}));

const Card = ({card}) => {
    const [showEdit,setShowEdit] = useState(false);
    const [showDelete,setShowDelete] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [title,setTitle] = useState(card.title);
    const [description,setDescription] = useState(card.description);
    const [img,setImg] = useState(card.img);

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
                        id="addCardName"
                        autoFocus
                        label="Título"
                        value={title}
                        onClick={e=>setTitle(e.target.value)}
                    />
                    <TextField
                        id="addCardDescription"
                        label="Descripción"
                        multiline
                        rows={4}
                        value={description}
                        onClick={e=>setDescription(e.target.value)}
                    />
                    <TextField
                        id="addCardImg"
                        label="Imagen (Url)"
                        value={img}
                        onClick={e=>setImg(e.target.value)}
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button
                    id="editButtonEdit"
                    onClick={() => {
                        //addCategory();
                        setShowEdit(false)}
                    }>
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
                        //deleteCategory();
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
            <img src={img || defaultImg} alt="card img" />
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

export default Card;