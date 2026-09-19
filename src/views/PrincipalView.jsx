import { useEffect, useState } from "react";
import { Box, Button, CssBaseline, Stack, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import FormularioAprendiz from "../Componentes/FormularioAprendiz";
import TablaAprendices from "../Componentes/TablaAprendices";
import {
  listarAprendices,
  obtenerAprendiz,
  crearAprendiz,
  actualizarAprendiz,
  eliminarAprendiz,
} from "../service/aprendizService";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#22d3ee" },
    secondary: { main: "#a78bfa" },
    error: { main: "#ef4444" },
    background: { default: "#0b1220", paper: "#111827" },
    text: { primary: "#e5e7eb", secondary: "#94a3b8" },
  },
});

const FORM_VACIO = {
  nombre: "", apellido: "", email: "", telefono: "", direccion: "",
  genero: "", ficha: "", jornada: "", tipo_documento: "", numero_documento: "",
};

const PrincipalView = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState(FORM_VACIO);
  const [idFiltro, setIdFiltro] = useState("");
  const [loading, setLoading] = useState(false);

  const cargarTodos = async () => {
    try {
      setLoading(true);
      setData(await listarAprendices());
    } catch (e) {
      console.error("Error cargando aprendices:", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarTodos(); }, []);

  const buscarPorId = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      const aprendiz = await obtenerAprendiz(idFiltro);
      if (aprendiz) {
        setData([aprendiz]);
        setForm({ ...FORM_VACIO, ...aprendiz });
      } else {
        setData([]);
      }
    } catch (e) {
      console.error("No se encontró el aprendiz:", e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCrear = async () => {
    try {
      setLoading(true);
      await crearAprendiz(form);
      setForm(FORM_VACIO);
      await cargarTodos();
    } catch (e) {
      console.error("Error creando aprendiz:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleActualizar = async () => {
    if (!idFiltro) {
      alert("Busca un ID primero para poder actualizar.");
      return;
    }
    try {
      setLoading(true);
      await actualizarAprendiz(idFiltro, form);
      setForm(FORM_VACIO);
      setIdFiltro("");
      await cargarTodos();
    } catch (e) {
      console.error("Error actualizando aprendiz:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (!idFiltro) return;
    try {
      setLoading(true);
      await eliminarAprendiz(idFiltro);
      setIdFiltro("");
      await cargarTodos();
    } catch (e) {
      console.error("Error eliminando aprendiz:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ mt: 4, px: { xs: 2, md: 4 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" sx={{ flex: 1, fontWeight: 700, color: "text.primary" }}>
            Aprendices
          </Typography>

          <Button variant="contained" color="primary" onClick={cargarTodos} disabled={loading}>
            {loading ? "Cargando..." : "VER TODOS"}
          </Button>

          <TextField
            size="small"
            label="ID"
            value={idFiltro}
            onChange={(e) => setIdFiltro(e.target.value)}
            sx={{ width: 140 }}
          />

          <Button variant="contained" color="secondary" onClick={buscarPorId} disabled={loading || !idFiltro}>
            BUSCAR POR ID
          </Button>
          <Button variant="contained" color="error" onClick={handleEliminar} disabled={loading || !idFiltro}>
            ELIMINAR
          </Button>
          <Button variant="contained" color="primary" onClick={handleActualizar} disabled={loading || !idFiltro}>
            ACTUALIZAR
          </Button>
        </Stack>

        <FormularioAprendiz
          form={form}
          setForm={setForm}
          onCrear={handleCrear}
          loading={loading}
        />

        <TablaAprendices data={data} />
      </Box>
    </ThemeProvider>
  );
};

export default PrincipalView;