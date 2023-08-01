export type Block = Extract<
  ListBlockChildrenResponse["results"][number],
  { type: string }
>;

export type BlockWithChildren = Block & {
  type: BlockType;
  childblocks: BlockWithChildren[];
};

export type BlockType = Block["type"];

type ExtractedBlockType<TType extends BlockType> = Extract<
  Block,
  { type: TType }
>;

export type ParagraphBlock = ExtractedBlockType<"paragraph">;

export type HeadingOneBlock = ExtractedBlockType<"heading_1">;
export type HeadingTwoBlock = ExtractedBlockType<"heading_2">;
export type HeadingThreeBlock = ExtractedBlockType<"heading_3">;

export type HeadingBlock =
  | HeadingOneBlock
  | HeadingTwoBlock
  | HeadingThreeBlock;

export type BulletedListItemBlock = ExtractedBlockType<"bulleted_list_item">;
export type NumberedListItemBlock = ExtractedBlockType<"numbered_list_item">;

export type QuoteBlock = ExtractedBlockType<"quote">;
export type EquationBlock = ExtractedBlockType<"equation">;
export type CodeBlock = ExtractedBlockType<"code">;
export type CalloutBlock = ExtractedBlockType<"callout">;
export type ToggleBlock = ExtractedBlockType<"toggle">;
export type EmbedBlock = ExtractedBlockType<"embed">;
export type WebBookmarkBlock = ExtractedBlockType<"bookmark">;
export type ImageBlock = ExtractedBlockType<"image">;
export type RichText = ParagraphBlock["paragraph"]["rich_text"][number];
export type File = ImageBlock["image"];
