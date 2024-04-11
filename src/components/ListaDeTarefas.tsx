import { useEffect } from "react";
import { Button, Grid } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "../config/hook";
import { tarefasThunk } from "../config/modules/tarefas.slice";
import { api } from "../services/api.services";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "./Modal";

const DivBotao = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", alignItems: "center" }}>{children}</div>
);

const DivTarefa = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
    {children}
  </div>
);

export const Tarefas: React.FC = () => {
  const dispatch = useAppDispatch();
  const tarefas = useAppSelector((state) => state.tarefas);

  useEffect(() => {
    dispatch(tarefasThunk());
  }, [dispatch]);

  const deletarTarefa = async (id: string) => {
    try {
      const confirmacao = confirm("DESEJA MESMO EXCLUIR ESTA TAREFA?");
      if (confirmacao) {
        const response = await api.delete(`/${id}`);
        console.log(response);
        dispatch(tarefasThunk());
        return alert("PRONTO!  SUA TAREFA FOI DELETADA COM SUCESSO!");
      } else {
        return;
      }
    } catch (error) {
      console.error("ERRO: NÃO FOI POSSÍVEL DELETAR ESTA TAREFA", error);
    }
  };

  return (
    <>
      {tarefas.map((item, index) => (
        <Grid style={{ margin: "5px" }} key={index} item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <DivTarefa>
                <h2>{item.titulo}</h2>
                <DivBotao>
                  <Button onClick={() => deletarTarefa(item.id!)}>
                    <DeleteIcon color="error" />
                  </Button>
                  <BasicModal titulo={item.titulo} descricao={item.descricao} id={item.id!} />
                </DivBotao>
              </DivTarefa>
            </AccordionSummary>
            <AccordionDetails>{item.descricao}</AccordionDetails>
          </Accordion>
        </Grid>
      ))}
    </>
  );
};
