import {Fragment} from "react";
import Head from "next/head";
import {getDatabase, getPage, getBlocks} from "../../lib/notion";
import Link from "next/link";
import {databaseId} from "../index.jsx";
import styles from "./[id].module.css";
import {
  Box,
  Image,
  Heading,
  OrderedList,
  UnorderedList,
  Text as TextC,
  chakra,
  Input,
  Code,
  AspectRatio,
  Center,
  Container,
} from "@chakra-ui/react";
import Nav from "../../components/nav";
import LazyLoad from "react-lazy-load";
import Footer from "../../components/footer";
import useIsMobile from "../../hooks/isMobile";

export const Text = ({text, title}) => {
  if (!text) {
    return null;
  }
  return text.map((value, idx) => {
    const {
      annotations: {bold, code, color, italic, strikethrough, underline},
      text,
    } = value;
    return (
      <Box
        key={idx}
        as="span"
        fontSize={title ? [".7em", "1em"] : null}
        className={[
          bold ? styles.bold : "",
          code ? styles.code : "",
          italic ? styles.italic : "",
          strikethrough ? styles.strikethrough : "",
          underline ? styles.underline : "",
        ].join(" ")}
        color={color !== "default" ? color : "white"}
      >
        {text.link ? (
          <Link href={text.link.url} target="_blank">
            {text.content}
          </Link>
        ) : (
          text.content
        )}
      </Box>
    );
  });
};

const renderNestedList = (block) => {
  const {type} = block;
  const value = block[type];
  if (!value) return null;

  const isNumberedList = value.children[0].type === "numbered_list_item";

  if (isNumberedList) {
    return (
      <OrderedList>
        {value.children.map((block) => renderBlock(block))}
      </OrderedList>
    );
  }
  return (
    <TextC mt="10px">{value.children.map((block) => renderBlock(block))}</TextC>
  );
};

const renderBlock = (block) => {
  const {type, id} = block;
  const value = block[type];

  switch (type) {
    case "paragraph":
      return (
        <TextC>
          <Text text={value.rich_text} />
        </TextC>
      );
    case "heading_1":
      return (
        <Heading as="h1" my="30px">
          <Text text={value.rich_text} />
        </Heading>
      );
    case "heading_2":
      return (
        <Heading as="h2" my="20px" fontSize={["1.2em", "1.4em", "1.8em"]}>
          <Text text={value.rich_text} />
        </Heading>
      );
    case "heading_3":
      return (
        <Heading as="h3" my="10px" fontSize={["1.2em", "1.4em", "1.6em"]}>
          <Text text={value.rich_text} />
        </Heading>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <chakra.li my="5px">
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </chakra.li>
      );
    case "to_do":
      return (
        <Box>
          <label htmlFor={id}>
            <Input type="checkbox" id={id} defaultChecked={value.checked} />{" "}
            <Text text={value.rich_text} />
          </label>
        </Box>
      );
    case "toggle":
      return (
        <details>
          <summary>
            <Text text={value.rich_text} />
          </summary>
          {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </details>
      );
    case "child_page":
      return <p>{value.title}</p>;
    case "image":
      const src =
        value.type === "external" ? value.external.url : value.file.url;
      const caption = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <chakra.figure my="10px">
          <Image src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </chakra.figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <TextC
          mb="10px"
          bgColor="#0d0d0d"
          borderLeft="2px solid red"
          pl="15px"
          fontSize={[".8em", ".8em", ".9em"]}
          fontStyle
          key={id}
        >
          {value.rich_text[0].plain_text}
        </TextC>
      );
    case "code":
      return (
        <pre className={styles.pre}>
          <Code className={styles.code_block} key={id}>
            {value.rich_text[0].plain_text}
          </Code>
        </pre>
      );
    case "file":
      const src_file =
        value.type === "external" ? value.external.url : value.file.url;
      const splitSourceArray = src_file.split("/");
      const lastElementInArray = splitSourceArray[splitSourceArray.length - 1];
      const caption_file = value.caption ? value.caption[0]?.plain_text : "";
      return (
        <figure>
          <Box className={styles.file}>
            📎{" "}
            <Link href={src_file} passHref>
              {lastElementInArray.split("?")[0]}
            </Link>
          </Box>
          {caption_file && <figcaption>{caption_file}</figcaption>}
        </figure>
      );
    case "bookmark":
      const href = value.url;
      return (
        <Link href={href} target="_brank" className={styles.bookmark}>
          {href}
        </Link>
      );
    default:
      return `❌ Unsupported block (${
        type === "unsupported" ? "unsupported by Notion API" : type
      })`;
  }
};

export default function Post({post, blocks}) {
  const isMobile = useIsMobile();

  if (!post || !blocks) {
    return <Box />;
  }
  return (
    <Fragment>
      <Head>
        <title>{post.properties.Name.title[0].plain_text}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />
      <AspectRatio
        mt="25px"
        w="100vw"
<<<<<<< HEAD
        ratio={[2 / 1, 4/ 1]}
        borderY={["25px solid #00001255", "50px solid #00001255"]}
        borderX={["30px solid #111120", "60px solid #111120"]}
=======
        ratio={[10 / 4, 16 / 4]}
        borderY={["25px solid #0c0c12", "50px solid #0c0c12"]}
        borderX={["30px solid #15151c", "60px solid #15151c"]}
>>>>>>> c9669b907c2f21c1a3353c42bf017c8b89869104
      >
        <LazyLoad>
          <Image
            alt="Banner do Post"
            src={
              post.cover?.external?.url !== undefined
                ? post.cover.external.url
                : post.cover.file.url
            }
          />
        </LazyLoad>
      </AspectRatio>
      <Box w="fit-content" as="article" className={styles.container}>
        {!isMobile ? (
          <Center>
            <Heading my="30px" as="h1" className={styles.name}>
              <Text title={true} text={post.properties.Name.title} />
            </Heading>
          </Center>
        ) : (
          <Heading as="h1" className={styles.name}>
            <Text title={true} text={post.properties.Name.title} />
          </Heading>
        )}
        <Box as="section">
          {blocks.map((block) => (
            <Center>
              <Box w={["80vw", "70vw", "50vw"]} key={block.id}>
                {renderBlock(block)}
              </Box>
            </Center>
          ))}
        </Box>
      </Box>
      <Footer />
    </Fragment>
  );
}

export const getStaticPaths = async () => {
  const database = await getDatabase(databaseId);
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const {id} = context.params;
  const post = await getPage(id);
  const blocks = await getBlocks(id);

  const childBlocks = await Promise.all(
    blocks
      .filter((block) => block.has_children)
      .map(async (block) => {
        return {
          id: block.id,
          children: await getBlocks(block.id),
        };
      })
  );
  const blocksWithChildren = blocks.map((block) => {
    // Add child blocks if the block should contain children but none exists
    if (block.has_children && !block[block.type].children) {
      block[block.type]["children"] = childBlocks.find(
        (x) => x.id === block.id
      )?.children;
    }
    return block;
  });

  return {
    props: {
      post,
      blocks: blocksWithChildren,
    },
    revalidate: 1000,
  };
};
