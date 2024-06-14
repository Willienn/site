"use client";
import { Fragment, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const myProjects = [
  {
    name: "Aquarium",
    link: "/works/aquarium",
    image: "/aquarium.jpg",
    text: "Aquarium with a fish :D",
  },
  {
    name: "OLD WIN",
    link: "/boot",
    image: "/oldwin.jpg",
    text: "Making old windows on web",
  },
  {
    name: "Notes",
    link: "/works/notes",
    image: "",
    text: "Just some notes",
  },
];

export default function Works() {
  const { refresh } = useRouter();

  const [clicked, setClicked] = useState<number>();
  return (
    <Flex
      pt="40px"
      className={clicked !== undefined ? styles.clickedBox : styles.box}
    >
      {myProjects.map((project, idx) => (
        <Fragment key={idx}>
          <Image
            cursor="pointer"
            src={project.image ? project.image : "/noImage.webp"}
            borderRadius="8px"
            zIndex={2}
            className={
              (clicked === idx
                ? styles.opened
                : clicked !== undefined
                  ? styles.closed
                  : styles.default) +
              (project.image ? "" : ` ${styles.noImage}`)
            }
            onClick={() => setClicked(idx)}
          />

          <Box
            display={clicked === idx ? "block" : "none"}
            minW="25svw"
            minH="100%"
            transform="scale(1.5)"
          />
          <VStack
            justifyContent="space-between"
            className={
              clicked === idx
                ? styles.openedText
                : clicked !== undefined
                  ? styles.closedText
                  : styles.defaultText
            }
          >
            <VStack gap="20px">
              <Heading>{project.name}</Heading>
              <Text maxW="55svw">{project.text}</Text>
            </VStack>
            <VStack gap="10px">
              <Button fontSize="1.1rem" as={Link} href={project.link}>
                Let me see it
              </Button>
              <Button onClick={() => location.reload()} fontSize="0.9rem">
                Go Back
              </Button>
            </VStack>
          </VStack>
        </Fragment>
      ))}
    </Flex>
  );
}
