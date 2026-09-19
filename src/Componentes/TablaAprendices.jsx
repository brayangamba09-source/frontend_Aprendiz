import {
  Paper, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow,
} from "@mui/material";

const COLUMNAS = ["ID", "Nombre", "Apellido", "Email", "Teléfono", "Dirección", "genero", "ficha", "jornada", "tipo_documento", "numero_documento"];

const TablaAprendices = ({ data }) => {
  return (
    <TableContainer component={Paper} elevation={3} sx={{ border: "1px solid #334155", bgcolor: "background.paper" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ background: "#22d3ee" }}>
            {COLUMNAS.map((h) => (
              <TableCell key={h} sx={{ color: "#0b1220", fontWeight: 700 }}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow
              key={row.id ?? i}
              sx={{
                backgroundColor: i % 2 === 0 ? "#0f172a" : "#111827",
                "&:hover": { backgroundColor: "#1f2937" }
              }}
            >
              <TableCell sx={{ color: "text.primary" }}>{row.id}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.nombre}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.apellido}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.email}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.telefono}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.direccion}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.genero}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.ficha}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.jornada}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.tipo_documento}</TableCell>
              <TableCell sx={{ color: "text.primary" }}>{row.numero_documento}</TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={COLUMNAS.length} align="center" sx={{ color: "text.secondary" }}>
                Sin registros
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaAprendices;