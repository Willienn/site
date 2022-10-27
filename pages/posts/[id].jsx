import {Fragment} from "react";
import Head from "next/head";
import {getDatabase, getPage, getBlocks} from "../../lib/notion";
import Link from "next/link";
import {databaseId} from "../index.js";
import styles from "./[id].module.css";
import {
  Box,
  Image,
  Heading,
  OrderedList,
  UnorderedList,
  Text as TextC,
  ListItem,
  Input,
  Code,
  AspectRatio,
} from "@chakra-ui/react";
import Nav from "../../components/nav";

export const Text = ({text}) => {
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
  return <TextC>{value.children.map((block) => renderBlock(block))}</TextC>;
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
        <Heading as="h1">
          <Text text={value.rich_text} />
        </Heading>
      );
    case "heading_2":
      return (
        <Heading as="h2">
          <Text text={value.rich_text} />
        </Heading>
      );
    case "heading_3":
      return (
        <Heading as="h3">
          <Text text={value.rich_text} />
        </Heading>
      );
    case "bulleted_list_item":
    case "numbered_list_item":
      return (
        <li>
          <Text text={value.rich_text} />
          {!!value.children && renderNestedList(block)}
        </li>
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
        <figure>
          <Image src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      );
    case "divider":
      return <hr key={id} />;
    case "quote":
      return (
        <TextC
          borderLeft="2px solid red"
          pl="15px"
          fontSize=".9em"
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
      <AspectRatio w="100vw" maxW="100vw" ratio={16 / 4}>
        <Image
          alt="Banner do Post"
          src={
            post.cover?.external?.url !== undefined
              ? post.cover.external.url
              : post.cover.file.url
          }
        />
      </AspectRatio>
      <Box as="article" className={styles.container}>
        <Heading className={styles.name}>
          <Text text={post.properties.Name.title} />
        </Heading>
        <Box as="section">
          {blocks.map((block) => (
            <Box key={block.id}>{renderBlock(block)}</Box>
          ))}
        </Box>
      </Box>
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
    revalidate: 10000,
  };
};
