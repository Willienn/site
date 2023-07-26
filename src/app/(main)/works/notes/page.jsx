"use client";
import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

export default function Memos() {
  var [page, setPage] = useState(true);
  const {
    control,
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();
  const [notes, setNotes] = useState([]);

  const {
    fields: notesFields,
    append: notesAppend,
    remove: notesRemove,
  } = useFieldArray({ control, name: "notes" });
  const onSubmit = (data) => {
    setNotes([...notes, data]);
  };

  return (
    <Box w="100wv" minH="100vh" bgColor="#2a2a2a">
      <Button
        onClick={() => setPage(!page)}
        bgColor="#2a2a2a"
        _hover={{ bgColor: "#282828" }}
        _active={{ bgColor: "#222" }}
      />

      {page && (
        <Flex w="full" direction="column" align="center">
          <Flex gap="10px">
            <Heading mb="20px" textAlign="center" zIndex={1}>
              Notes
            </Heading>
            <IconButton
              fontWeight="bolder"
              aria-label="addItem"
              bgColor="#0002"
              color="white"
              ml="-18px"
              mt="-5px"
              icon={<AiOutlinePlus />}
              _hover={{ transform: "scale(1.25)" }}
              _active={{ transform: "scale(.85)" }}
              onClick={() => {
                notesAppend({ noteTitle: "Title", noteText: "Text" });
              }}
            />
          </Flex>
          <SimpleGrid gap="10px 20px" columns={3}>
            {notesFields.length >= 1 &&
              notesFields.map((note, idx) => (
                <Flex
                  key={note.id}
                  border="1px solid white"
                  direction="column"
                  borderRadius="8px"
                  p="10px"
                  gap="5px"
                >
                  <Flex gap="5px">
                    <Input
                      textAlign="center"
                      {...register(`notes.${idx}.noteTitle`, {
                        shouldUnregister: true,
                      })}
                      borderColor="#ffffff10"
                    />
                    <IconButton
                      icon={<AiOutlineClose />}
                      onClick={() => notesRemove(idx)}
                      fontWeight="bolder"
                      aria-label="removeItem"
                      bgColor="transparent"
                      _hover={{ transform: "scale(1.1)" }}
                      _active={{ transform: "scale(.85)" }}
                    />
                  </Flex>
                  <Textarea
                    {...register(`notes.${idx}.noteText`, {
                      shouldUnregister: true,
                    })}
                    borderColor="#ffffff11"
                    resize="none"
                    h="150px"
                  />
                </Flex>
              ))}
          </SimpleGrid>
        </Flex>
      )}
      {!page && (
        <Grid gridTemplateColumns=".5fr 1fr">
          <Flex
            as="form"
            direction="column"
            w="200px"
            gap="15px"
            aling="center"
            m="0 auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Heading mb="25px" textAlign="center">
              Submit
            </Heading>
            <Input {...register("noteTitle", { required: "required" })} />
            <Input
              {...register("noteText", { required: "required" })}
              as="textarea"
              p="10px 15px"
              resize="none"
              h="100px"
              mb="10px"
            />
            <Input
              cursor="pointer"
              type="submit"
              value="Submit"
              w="50%"
              m="0 auto"
            />
          </Flex>
          <Box>
            <Heading mb="40px" textAlign="center">
              Notes
            </Heading>
            <SimpleGrid columns={3} spacing="20px">
              {notes.map((note, idx) => (
                <Flex
                  pos="relative"
                  key={idx}
                  direction="column"
                  border="1px solid white"
                  borderRadius="8px"
                  w="250px"
                  h="250px"
                  overflowX="hidden"
                >
                  <IconButton
                    pos="absolute"
                    right="0"
                    top="1"
                    fontWeight="bolder"
                    icon={<AiOutlineClose />}
                    aria-label="removeItem"
                    bgColor="transparent"
                    p="none"
                    mt="-5px"
                    mr="-5px"
                    _hover={{ transform: "scale(1.15)" }}
                    _active={{ transform: "scale(.85)" }}
                    onClick={() => {
                      const newNotes = [...notes];
                      newNotes.splice(idx, 1);
                      setNotes(newNotes);
                    }}
                  />
                  <Heading fontSize="1.5em" my="20px" textAlign="center">
                    {note.noteTitle}
                  </Heading>
                  <Text p="10px">{note.noteText}</Text>
                </Flex>
              ))}
            </SimpleGrid>
          </Box>
        </Grid>
      )}
    </Box>
  );
}
