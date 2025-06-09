import { useState, useEffect } from "react";
import {
  IconButton,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { Stack } from "@mui/system";
import CancelIcon from "@mui/icons-material/Cancel";
import { FormHelperText, FormControl } from "@mui/material";
import youtubeParser from "../utils/youtubeParser";
import getYoutubeVideoInfo from "../services/youtubeApi";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "15px",
  width: {
    md: "350px",
    lg: "500px",
    xs: "310px",
  },
};

// function isValidUrl(string) {
//   try {
//     new URL(string);
//     return true;
//   } catch (err) {
//     return false;
//   }
// }

const isValidYoutubeUrl =
  /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;

export default function AddLinkModal({
  isOpen,
  value,
  handleClose,
  onAdd,
  onAddAnother,
}) {
  const [modalInput, setModalInput] = useState(value);
  const [isValidLink, setIsValidLink] = useState(true);

  useEffect(() => {
    setModalInput(value);
  }, [value]);

  const handleModelClose = () => {
    handleClose();
    setIsValidLink(true);
  };

  const checkYoutubeVideoId = async () => {
    return new Promise((resolve, reject) => {
      getYoutubeVideoInfo(modalInput).then((response) => {
        if (response.data.items.length > 0) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
  };

  const handleAddBtnClick = async () => {
    if (!isValidYoutubeUrl.test(modalInput) || !youtubeParser(modalInput)) {
      setIsValidLink(false);
      return;
    }
    await checkYoutubeVideoId()
      .then((res) => {
        setIsValidLink(true);
        onAdd(modalInput);
        setModalInput("");
      })
      .catch(() => {
        setIsValidLink(false);
        return;
      });
  };

  const handleAddAnotherBtnClick = async () => {
    if (!isValidYoutubeUrl.test(modalInput) || !youtubeParser(modalInput)) {
      setIsValidLink(false);
      return;
    }
    await checkYoutubeVideoId()
      .then((res) => {
        onAddAnother(modalInput);
        setModalInput("");
        setIsValidLink(true);
      })
      .catch(() => {
        setIsValidLink(false);
        return;
      });
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleModelClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: "10px",
            }}
          >
            <Typography
              align="center"
              sx={{
                fontWeight: "bold",
                fontSize: {
                  md: "22px",
                },
              }}
            >
              {value
                ? "Edit Youtube Video Link :"
                : "Insert Youtube Video Link :"}
            </Typography>
            <IconButton color="error" onClick={handleModelClose} edge="end">
              <CancelIcon
                sx={{
                  fontWeight: "bold",
                  fontSize: {
                    md: "30px",
                  },
                }}
              />
            </IconButton>
          </Box>
          <Box>
            <FormControl fullWidth>
              <TextField
                value={modalInput}
                error={!isValidLink}
                fullWidth
                onChange={(event) => setModalInput(event.target.value)}
                // helperText={!isValidLink ? "Please enter valid link" : ""}
                InputProps={{
                  style: {
                    borderRadius: "15px",
                  },
                }}
              />
              {!isValidLink && (
                <FormHelperText
                  error
                  sx={{
                    fontSize: {
                      md: "18px",
                      xs: "15px",
                      sm: "15px",
                    },
                  }}
                >
                  Please enter valid link
                </FormHelperText>
              )}
            </FormControl>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 2 }}
            margin="10px"
            justifyContent={{ md: "flex-end" }}
          >
            {!value && (
              <Button
                color="inherit"
                variant="contained"
                onClick={handleAddAnotherBtnClick}
                disableElevation
              >
                Add Another
              </Button>
            )}
            <Button
              variant="contained"
              color={value ? "warning" : "primary"}
              onClick={handleAddBtnClick}
              disableElevation
            >
              {value ? "Edit" : "Add"}
            </Button>
          </Stack>
          <Box
            sx={{ mt: "10px", display: "flex", justifyContent: "space-evenly" }}
          ></Box>
        </Box>
      </Modal>
    </div>
  );
}
