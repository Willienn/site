import { PostResult } from "@/types/database";

export interface IPost {
  id: string;
  url: string;
  tags: { [key: string]: key };
  modifiedDate: string;
  cover: { [key: string]: key };
  publishDate: string;
  title: string;
}

type PropertyValueMap = PostResult["properties"];
type PropertyValue = PropertyValueMap[string];

type PropertyValueType = PropertyValue["type"];

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  PropertyValue,
  { type: TType }
>;

export type PropertyValueTitle = ExtractedPropertyValue<"title">;
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">;
export type PropertyValueMultiSelect = ExtractedPropertyValue<"multi_select">;
export type PropertyValueUrl = ExtractedPropertyValue<"url">;
export type PropertyValueDate = ExtractedPropertyValue<"date">;
export type PropertyValueEditedTime =
  ExtractedPropertyValue<"last_edited_time">;
