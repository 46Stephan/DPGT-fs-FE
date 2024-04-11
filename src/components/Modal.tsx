import { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Grid, TextField } from "@mui/material";
import { api } from "../services/api.services";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { useAppDispatch } from "../config/hook";
import { tarefasThunk } from "../config/modules/tarefas.slice";

const style = {style: {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  color: "black",
  border: "5px solid #0000009e",
  boxShadow: 15,
  p: 2,
}};

const DivButton = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  button {
    border: solid 1px #711b7e;
    &:hover {
      background-color: #ebf1d3;
    }
  }
`;

interface BasicModalProps {
  id: string;
  titulo: string;
  descricao: string | undefined;
}

export default function BasicModal(props: BasicModalProps) {
  const [open, setOpen] = useState(false);
  const [titulo, setTitulo] = useState(props.titulo);
  const [descricao, setDescricao] = useState(props.descricao);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const atualizarTarefa = async (event: any) => {
    event.preventDefault();
    try {
      const body = {
        titulo,
        descricao,
      };
      if (titulo.length < 3) {
        return alert("ERRO: DIGITE UM TITULO MAIOR QUE 3 CARACTERES");
      }
      const response = await api.put(`/${props.id}`, body);
      console.log(response, "É NECESSÁRIO ATUALIZAR AQUI!");
      handleClose();
      dispatch(tarefasThunk());
    } catch (error) {
      console.error("ERRO: NÃO FOI POSSÍVEL ATUALIZAR ESTA TAREFA", error);
    }
  };

  return (
    <Grid item xs={12}>
      <Button onClick={handleOpen}>
        <EditIcon color="primary" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={2} sx={style}>
          <form onSubmit={atualizarTarefa} style={{ width: "100%" }}>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                id="TÍTULO"
                label="TAREFA"
                value={titulo}
                onChange={(event) => setTitulo(event.target.value)}
                placeholder="TAREFA"
                multiline
                variant="outlined"
                color="success"
                focused
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                }}
                id="DESCRIÇÃO"
                label="DESCRIÇÃO"
                value={descricao}
                onChange={(event) => setDescricao(event.target.value)}
                placeholder="DESCREVA AQUI A SUA TAREFA:"
                multiline
                variant="outlined"
                color="success"
                focused
                inputProps={{ wrap: "soft" }}
              />
            </Grid>
            <DivButton>
              <Button color="success" type="submit">
                ATUALIZAR
              </Button>
            </DivButton>
          </form>
        </Grid>
      </Modal>
    </Grid>
  );
}
