import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"

export type PostResult = Extract<
  QueryDatabaseResponse["results"][number],
  {
    properties: Record<string, unknown>
  }
>

type DatabaseItem = {
  object: "page"
  id: string
  created_time: string // ISO 8601 date format
  last_edited_time: string // ISO 8601 date format
  created_by: {
    object: "user"
    id: string
  }
  last_edited_by: {
    object: "user"
    id: string
  }
  cover:
    | {
        type: "external"
        external: {
          url: string
        }
      }
    | {
        type: "file"
        file: {
          url: string
        }
      }
  icon: null
  parent: {
    type: "database_id"
    database_id: string
  }
  archived: boolean
  properties: {
    [key: string]: {
      [key: string]: {
        id: string
        type: string
        [key: string]: any
      }
    }
  }
  url: string
  public_url: null | string
}

type PropertyValueMap = PostResult["properties"]
type PropertyValue = PropertyValueMap[string]

type PropertyValueType = PropertyValue["type"]

type ExtractedPropertyValue<TType extends PropertyValueType> = Extract<
  PropertyValue,
  { type: TType }
>

export type PropertyValueTitle = ExtractedPropertyValue<"title">
export type PropertyValueRichText = ExtractedPropertyValue<"rich_text">
export type PropertyValueMultiSelect = ExtractedPropertyValue<"multi_select">
export type PropertyValueUrl = ExtractedPropertyValue<"url">
export type PropertyValueDate = ExtractedPropertyValue<"date">
export type PropertyValueCover = ExtractedPropertyValue<"cover">
export type PropertyValueEditedTime = ExtractedPropertyValue<"last_edited_time">
