import { Fragment, ReactNode } from "react";
import { getPost } from "@/lib/notion";
import Link from "next/link";
import styles from "./page.module.css";
import {
  AspectRatio,
  Box,
  Center,
  Code,
  Flex,
  Heading,
  Image,
  Input,
  Link as ChakraLink,
  OrderedList,
  Text,
} from "@CS-chakra";
import { Block, RichText } from "@/types/blocks";
import { notFound } from "next/navigation";

export function RenderText({
  text,
  title,
}: {
  text: Array<RichText>;
  title?: boolean;
}): ReactNode {
  if (!text) {
    return <></>;
  }
  return text.map(({ annotations, plain_text, href }, idx: number) => {
    const { bold, code, color, italic, strikethrough, underline } = annotations;
    return (
      <Box
        key={idx}
        as="span"
        fontSize={title ? [".7em", "1em"] : ""}
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        color={color !== "default" ? color : "white"}
      >
        {href ? (
          <ChakraLink className="default-link not-prose" href={href}>
            {plain_text}
          </ChakraLink>
        ) : (
          plain_text
        )}
      </Box>
    );
  });
}

function renderNestedList(block: Block) {
  const { type } = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return (
      <OrderedList>
        {value.children.map((block: Block, idx: number) =>
          renderBlock(block, idx),
        )}
      </OrderedList>
    );
  }

  return (
    <Text mt="10px">
      {value.children.map((block: Block, idx: number) =>
        renderBlock(block, idx),
      )}
    </Text>
  );
}

function renderBlock(block: Block, idx: number) {
  const { type, id } = block;
  const value = block[type];

  switch (type) {
    case "paragraph": {
      return (
        <Text>
          <RenderText text={value.rich_text} key={idx} />
        </Text>
      );
    }
    case "heading_1": {
      return (
        <Heading as="h1" my="30px">
          <RenderText text={value.rich_text} />
        </Heading>
      );
    }
    case "heading_2": {
      return (
        <Heading as="h2" my="20px" fontSize={["1.2em", "1.4em", "1.8em"]}>
          <RenderText text={value.rich_text} />
        </Heading>
      );
    }
    case "heading_3": {
      return (
        <Heading as="h3" my="10px" fontSize={["1.2em", "1.4em", "1.6em"]}>
          <RenderText text={value.rich_text} />
        </Heading>
      );
    }
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <>
          <RenderText text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </>
      );
    case "to_do": {
      return (
        <Box>
          <label htmlFor={id}>
            <Input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <RenderText text={value.rich_text} />
          </label>
        </Box>
      );
    }
    case "toggle": {
      return (
        <details>
          <summary>
            <RenderText text={value.rich_text} />
          </summary>
          {value.children?.map((block: Block, idx: number) => (
            <Fragment key={block.id}>{renderBlock(block, idx)}</Fragment>
          ))}
        </details>
      );
    }
    case "child_page": {
      return <p>{value.title}</p>;
    }
    case "image": {
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption
        ? value.caption[0]?.plain_text
        : "Imagem Ilustrativa";
      return (
        <figure style={{ margin: "10px 0px" }}>
          <Image src={src} alt={caption} w="auto" h="auto" />
        </figure>
      );
    }
    case "divider": {
      return <hr key={id} />;
    }
    case "quote": {
      return (
        <Text
          mb="10px"
          bgColor="#0d0d0d"
          borderLeft="2px solid red"
          pl="15px"
          fontSize={[".8em", ".8em", ".9em"]}
          key={id}
        >
          {value.rich_text[0].plain_text}
        </Text>
      );
    }
    case "code": {
      return (
        <pre className={styles.pre}>
          <Code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </Code>
        </pre>
      );
    }
    case "file": {
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <Box className={styles.file}>
            📎
            <ChakraLink href={src_file}>
              {lastElementInArray.split("?")[0]}
            </ChakraLink>
          </Box>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    }
    case "bookmark": {
      const href = value.url;
      return (
        <Link href={href} target="_brank" className={styles.bookmark}>
          {href}
        </Link>
      );
    }
    default: {
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
    }
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const { post } = await getPost(slug);

  return {
    title: post?.title,
    openGraph: {
      images: post?.cover?.external?.url || post?.cover?.file?.url,
    },
  };
}

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const { blocks, post, pageError } = await getPost(slug);

  if (!blocks && pageError !== undefined) {
    return notFound();
  }

  return (
    <Flex direction="column">
      <AspectRatio
        mt="25px"
        w="100vw"
        ratio={[2, 4]}
        borderY={["25px solid #00001255", "50px solid #00001255"]}
        borderX={["30px solid #111120", "60px solid #111120"]}
      >
        <Image
          alt="Banner do Post"
          src={post?.cover?.external?.url || post?.cover?.file?.url}
        />
      </AspectRatio>
      <Flex
        direction="column"
        mb="80px"
        w="fit-content"
        as="article"
        className={styles.container}
      >
        <Heading as="h1" className={styles.name} mx="auto">
          <RenderText title={true} text={post?.properties?.Name?.title} />
        </Heading>
        <Box as="section">
          {blocks?.map((block: Block, idx) => (
            <Center key={block.id}>
              <Box w={["80vw", "70vw", "50vw"]}>{renderBlock(block, idx)}</Box>
            </Center>
          ))}
        </Box>
      </Flex>
    </Flex>
  );
}
