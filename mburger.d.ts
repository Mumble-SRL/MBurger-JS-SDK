/**
 *
 * MBurger Types Declaration
 *
 */

// Commons
export interface ListMetaInterface {
  from: number;
  to: number;
  total: number;
}

export interface ErrorInterface {
  message: string;
  errors?: [];
}

export interface AddressValueInterface {
  address: string;
  distance?: number;
  latitude: number;
  longitude: number;
}

export interface FileInterface {
  file_name: string;
  id: number;
  mime_type: string;
  size: number;
  url: string;
}

export interface DocumentValueInterface extends FileInterface {}
export interface ImageValueInterface extends FileInterface {}

// Elements
export interface BaseElementInterface<Value> {
  id: number;
  locale: string;
  name: string;
  options: [];
  order: number;
  type: string;
  value: Value;
}

export interface AddressElementInterface extends BaseElementInterface<AddressValueInterface> {}
export interface TextElementInterface extends BaseElementInterface<string> {}
export interface CheckboxElementInterface extends BaseElementInterface<boolean> {}
export interface DocumentElementInterface extends BaseElementInterface<[DocumentValueInterface]> {}
export interface ImageElementInterface extends BaseElementInterface<[ImageValueInterface]> {}
export interface TextAreaElementInterface extends BaseElementInterface<string> {}
export interface SlugElementInterface extends BaseElementInterface<string> {}

// Sections
export interface SectionInterface<Elements> {
  all_locales: boolean;
  available_at: number;
  elements: Elements;
  id: number;
  in_evidence: boolean;
  order: number;
  updated_at: number;
  visible: number;
}

// Responses
export interface ListResponseInterface<Item> {
  items: [Item];
  meta: ListMetaInterface;
}
