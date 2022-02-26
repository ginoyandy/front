import { AttachmentIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  grid,
  InputGroup,
  Text,
  useToast,
} from '@chakra-ui/react';
import React, { CSSProperties, useState } from 'react';
import { loadExcel } from '../services/orders.service';
import { useNavigate } from 'react-router-dom';

type FileState = {
  filename: string;
  file: File;
  formDataField: 'fileName';
};

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState({} as FileState);
  const [formValidation, setFormValidation] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormValidation(true);
    if (!event.target.files) return;

    console.log(event);
    console.log(event.target.files);

    setSelectedFile({
      filename: event.target.files[0].name,
      file: event.target.files[0],
      formDataField: 'fileName',
    });
    console.log(selectedFile);
  };

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setFormValidation(true);

    if (selectedFile.filename == undefined) {
      setFormValidation(false);
      return;
    }

    const ArrfileExtension = selectedFile.filename.split('.');
    const fileExtension = ArrfileExtension[ArrfileExtension.length - 1];
    console.log('Formato del archivo ingresado:', fileExtension);

    if (fileExtension !== 'xlsx') {
      setFormValidation(false);
      return;
    }

    const fData = new FormData();
    fData.append(
      selectedFile.formDataField,
      selectedFile.file,
      selectedFile.filename,
    );
    loadExcel(fData)
      .then((res) => {
        console.log(res);
        navigate('/orders/selection-table', {
          state: { stateOrders: res },
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: err instanceof Error ? err.name : 'Error',
          status: 'error',
          description:
            err instanceof Error
              ? err.message
              : 'Error al enviar documento de excel.',
          isClosable: true,
          duration: 5000,
        });
      });
  };

  const labelStyle: CSSProperties = {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 8,
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl isInvalid={!formValidation}>
        <FormLabel fontSize={18} htmlFor="writeUpFile">
          Ingresar archivo:{' '}
        </FormLabel>
        <InputGroup
          w="100%"
          display="flex"
          flexDirection={['column', 'column', 'row']}
          gap={2}
        >
          <Button p={0}>
            <label htmlFor="files" className="btn" style={labelStyle}>
              <AttachmentIcon ms={4} />
              <Text me={4}>Seleccione su archivo .xlsx (Excel)</Text>
            </label>
          </Button>
          <input
            id="files"
            type="file"
            accept={'.xlsx'}
            name={'name'}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          ></input>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            alignItems="center"
            px={4}
            py={2}
            flexGrow={2}
          >
            {' '}
            <Text>
              {' '}
              {selectedFile.filename || 'No ha seleccionado ningún archivo...'}
            </Text>
          </Box>
        </InputGroup>
        <FormErrorMessage>
          El archivo ingresado es invalido o no se ha ingresado ningún archivo
        </FormErrorMessage>
      </FormControl>
      <Flex justifyContent="end" mt={2}>
        <Button variant="outline" type="submit">
          {' '}
          Enviar
        </Button>
      </Flex>
    </form>
  );
};

export default FileUpload;
