import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import { useBackdropContext } from "../hooks/BackdropContext";
import ReactDom from "react-dom";

const AppBackdropComponent = (): JSX.Element => {
  const { backdropOpen, setBackdropOpen, backdropMessage } =
    useBackdropContext();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={backdropOpen}
      onClick={() => setBackdropOpen(false)}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{backdropMessage}</Typography>
        <CircularProgress
          color="inherit"
          sx={{ marginTop: 3 }}
          size={40}
          thickness={4}
        />
      </Box>
    </Backdrop>
  );
};

const AppBackdrop = (): JSX.Element => {
  return (
    <>
      {ReactDom.createPortal(
        <AppBackdropComponent />,
        document.getElementById("backdrop-root")!
      )}
    </>
  );
};

export default AppBackdrop;
