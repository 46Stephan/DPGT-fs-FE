import { Button, Grid, TextField } from "@mui/material";
import { api } from "../services/api.services";
import { useDispatch } from "react-redux";
import { adicionarTarefa } from "../config/modules/tarefas.slice";
import styled from "styled-components";

const TextFieldStyled = styled(TextField)`
  width: 90%;
  textarea {
    color: #8a0cea;
  }
  label {
    color: #8a0cea;
  }
`;

const DivBotaoStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: 30px;

  Button {
    border: solid 1px #ed4933;
    &:hover {
      background-color: #ebf1d3;
    }
  }
`;

export const NovaTarefa = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const body = {
      titulo: event.target.titulo.value,
      descricao: event.target.descricao.value,
    };

    api
      .post("/tarefas", body)
      .then((result: { data: { data: any; }; }) => {
        dispatch(adicionarTarefa(result.data.data));
        event.target.titulo.value = "";
        event.target.descricao.value = "";
        alert("SUA TAREFA FOI CRIADA COM SUCESSO!");
      })
      .catch((error: any) => {
        alert(error.response.data.message);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
        <Grid container containerSpacing={3}>
          <Grid item xs={12}>
            <TextFieldStyled
              style={{ marginBottom: "50px", marginTop: "30px" }}
              id="TÍTULO"
              label="TAREFA"
              placeholder="TAREFA"
              multiline
              variant="outlined"
              color="warning"
              fullWidth
              focused
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldStyled
              style={{ marginTop: "30px" }}
              id="DESCRIÇÃO"
              label="DESCRIÇÃO"
              placeholder="DESCREVA AQUI A SUA TAREFA"
              multiline
              variant="outlined"
              color="warning"
              fullWidth
              focused
            />
          </Grid>
        </Grid>
        <DivBotaoStyled>
          <Button style={{ marginRight: "0px" }} color="warning" type="submit">
            CRIAR
          </Button>
        </DivBotaoStyled>
      </form>
  );
  
}