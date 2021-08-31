import {
  Box,
  Button,
  makeStyles,
  Slider,
  TextField,
  Typography,
} from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import { useState } from "react";
import Dropzone from "./components/Dropzone";
import { compressAccurately } from "image-conversion";
import fileDownload from "js-file-download";
import "./App.css";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setEditing] = useState(false);
  const [newSizePercent, setNewSizePercent] = useState(100);

  const onUpload = () => {
    if (!file) return;
    setNewSizePercent(100);
    setEditing(true);
  };

  const onCancel = () => {
    setEditing(false);
    setFile(null);
  };

  const onDownload = () => {
    if (!file) return;
    const newSize = (file.size * newSizePercent) / 100000;
    compressAccurately(file, newSize).then((res) => {
      fileDownload(res, file.name);
    });
  };

  return (
    <div className="App">
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh" }}
      >
        <Grid item style={{ position: "absolute", top: "20px" }}>
          <Typography align="center" variant="h3">
            Image Compression
          </Typography>
        </Grid>
        {isEditing ? (
          <Grid item>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item>
                <Typography
                  align="center"
                  variant="body1"
                  gutterBottom
                  color="secondary"
                >
                  {file?.name} ({file && file.size / 1000}) KB
                </Typography>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                <Grid
                  container
                  alignItems="center"
                  style={{ width: "100%" }}
                  spacing={2}
                >
                  <Grid item style={{ flex: 9, width: "70%" }}>
                    <Slider
                      defaultValue={100}
                      step={0.00000001}
                      min={0}
                      max={100}
                      onChange={(_, value) =>
                        setNewSizePercent(
                          Array.isArray(value) ? value[0] : value
                        )
                      }
                    />
                  </Grid>
                  <Grid item style={{ width: "30%" }}>
                    <Typography>
                      New Size:{" "}
                      {(
                        (file && (file.size * newSizePercent) / 100000) ||
                        0
                      ).toFixed(2)}
                      KB
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  disabled={!file}
                  onClick={onDownload}
                  color="primary"
                >
                  Download
                </Button>
              </Grid>
              <Grid item>
                <Button color="primary" onClick={onCancel}>
                  Compress Another File
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <Dropzone file={file} setFile={setFile} />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!file}
                  onClick={onUpload}
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default App;
