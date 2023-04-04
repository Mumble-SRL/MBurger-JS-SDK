type MimeType =
    | 'audio/aac'
    | 'application/x-abiword'
    | 'application/octet-stream'
    | 'video/x-msvideo'
    | 'application/vnd.amazon.ebook'
    | 'image/bmp'
    | 'application/x-bzip'
    | 'application/x-bzip2'
    | 'application/x-csh'
    | 'text/css'
    | 'text/csv'
    | 'application/msword'
    | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    | 'application/vnd.ms-fontobject'
    | 'application/epub+zip'
    | 'application/ecmascript'
    | 'image/gif'
    | 'text/html'
    | 'image/x-icon'
    | 'text/calendar'
    | 'application/java-archive'
    | 'image/jpeg'
    | 'application/javascript'
    | 'application/json'
    | 'audio/midi'
    | 'video/mpeg'
    | 'application/vnd.apple.installer+xml'
    | 'application/vnd.oasis.opendocument.presentation'
    | 'application/vnd.oasis.opendocument.spreadsheet'
    | 'application/vnd.oasis.opendocument.text'
    | 'audio/ogg'
    | 'video/ogg'
    | 'application/ogg'
    | 'font/otf'
    | 'image/png'
    | 'application/pdf'
    | 'application/vnd.ms-powerpoint'
    | 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    | 'application/x-rar-compressed'
    | 'application/rtf'
    | 'application/x-sh'
    | 'image/svg+xml'
    | 'application/x-shockwave-flash'
    | 'application/x-tar'
    | 'image/tiff'
    | 'application/typescript'
    | 'font/ttf'
    | 'text/plain'
    | 'application/vnd.visio'
    | 'audio/wav'
    | 'audio/webm'
    | 'video/webm'
    | 'image/webp'
    | 'font/woff'
    | 'font/woff2'
    | 'application/xhtml+xml'
    | 'application/vnd.ms-excel'
    | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    | 'application/xml'
    | 'application/vnd.mozilla.xul+xml'
    | 'application/zip'
    | 'video/3gpp'
    | 'video/3gpp2'
    | 'application/x-7z-compressed'

export type MBurgerType = 'image' | 'file' | 'text' | 'checkbox' | 'dropdown' | 'relation' | 'markdown'

export type MBurgerOption = {
    key: string
    value: string
}

export type MBurgerOptions<Type> = Type extends 'dropdown' ? MBurgerOption[] : undefined

export type MBurgerValueImage = {
    id: string
    uuid: string
    url: string
    size: number
    file_name: string
    mime_type: MimeType
}

export type MBurgerValueRelation = {
    block_id: number
    section_id: number
    text: string
    deleted: boolean
}

export type MBurgerValue<Type extends MBurgerType> =
    Type extends 'image' ? MBurgerValueImage[] :
        Type extends 'file' ? unknown :
            Type extends 'checkbox' ? boolean :
                Type extends 'relation' ? MBurgerValueRelation | MBurgerValueRelation[] :
                    string

export type MBurgerElement<Type extends MBurgerType, Size extends MBurgerSize = 'short'> =
    Size extends 'full' ? {
        id: string
        name: string
        type: Type
        order: number
        options: MBurgerOptions<Type>
        locale: string
        value: MBurgerValue<Type>
    } : MBurgerValue<Type>

export type MBurgerSize = 'short' | 'full'

export type MBurgerSection<
    Size extends MBurgerSize = 'full',
    Elements = { [key in string]: MBurgerElement<MBurgerType, Size> }
> =
    Size extends 'full' ? {
        available_at: number
        elements: Elements
        id: number
        in_evidence: boolean
        order: number
        updated_at: number
        visible: boolean
        all_locales: boolean
    } : ({ id: number; available_at: number; updated_at: number; visible: boolean } & Elements)

export interface MBurgerBlock<
    Size extends MBurgerSize = 'full',
    Elements = {
        [key in string]: MBurgerElement<MBurgerType, Size>
    }> {
    id: number
    order: number
    title: string
    subtitle?: string
    url_title: string
    is_single: boolean
    has_push: boolean
    has_beacons: boolean
    sections: MBurgerSection<Size, Elements>[]
}

export interface Params {
    locale?: string
    original_media?: boolean
    force_locale_fallback?: boolean
}

export interface GetProjectParams extends Pick<Params, 'locale'> {
    include?: string
}

export interface MBurgerGetSectionParams<Size extends MBurgerSize = 'short'> extends Params {
    section_id: number
    use_slug?: boolean
    size?: Size
}

export type MBurgerGetSectionResponse<
    Size extends MBurgerSize = 'short',
    Elements = { [key in string]: MBurgerElement<MBurgerType, Size> }
> =
    MBurgerSection<Size, Elements>

export interface MBurgerGetSectionsParams<Size extends MBurgerSize = 'short'> extends Params {
    block_id: number
    order_desc?: boolean
    filter?: Record<string, string>
    extra_params?: object
    size?: Size
}

export type MBurgerGetSectionsResponse<
    Size extends MBurgerSize = 'short',
    Elements = { [key in string]: MBurgerElement<MBurgerType, Size> }
> =
    Size extends 'full' ?
        {
            sections: MBurgerSection<'full', Elements>[];
            meta: { from: number; to: number; total: number }
        } :
        MBurgerSection<'short', Elements>[]

export interface MBurgerGetBlocksParams<Size extends MBurgerSize = 'short'> extends Params {
    block_ids: number[]
    filter?: Record<string, string>
    size?: Size
}

export type MBurgerGetBlocksResponse<
    Size extends MBurgerSize = 'short',
    Elements = { [key in string]: MBurgerElement<MBurgerType, Size> }
> =
    Size extends 'full' ?
        {
            blocks: MBurgerBlock<'full', Elements>[];
            meta: { from: number; to: number; total: number }
        } :
        MBurgerBlock<'short', Elements>[]

export interface CreateClientParams {
    api_key: string
}

export type Api = 'getSection' | 'getProject' | 'getSections' | 'getBlocks'

export interface QueryGetSection extends Omit<MBurgerGetSectionParams, 'section_id'> {
    include: 'elements'
}

export interface QueryGetSections extends Omit<MBurgerGetSectionsParams, 'block_id'> {
    include: 'elements'
    sort: string
}

export interface QueryGetBlocks extends Omit<MBurgerGetBlocksParams, 'block_ids'> {
    include: 'sections.elements'
    sort: string
}

export type ApiParams = {
    getProject: GetProjectParams
    getSection: QueryGetSection
    getSections: QueryGetSections
    getBlocks: QueryGetBlocks
}

export type Query<T extends Api> = ApiParams[T] | null