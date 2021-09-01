import { Typography } from "@material-ui/core";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #d8810e;
  border-style: dashed;
  background-color: rgba(20, 20, 20, 0.4);
  color: #d8810e;
  outline: none;
  transition: border 0.24s ease-in-out;
  hover: cursor;
`;

type DropzoneProps = {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
};

const Dropzone = ({ file, setFile }: DropzoneProps) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  return (
    <Container {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography variant="body1">Drop the file here ...</Typography>
      ) : file ? (
        <Typography variant="body1">{file.name}</Typography>
      ) : (
        <Typography variant="body1">
          Drag 'n' drop a file here, or click to select file
        </Typography>
      )}
    </Container>
  );
};

export default Dropzone;
