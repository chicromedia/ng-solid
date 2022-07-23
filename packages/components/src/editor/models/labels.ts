export const LABELS_DEFAULT: Record<string, string> = {
    bold: 'Bold',
    italic: 'Italic',
    code: 'Code',
    underline: 'Underline',
    strike: 'Strike',
    blockquote: 'Blockquote',
    bullet_list: 'Bullet List',
    ordered_list: 'Ordered List',
    paragraph: 'Paragraph',
    h1: 'Header 1',
    h2: 'Header 2',
    h3: 'Header 3',
    h4: 'Header 4',
    h5: 'Header 5',
    h6: 'Header 6',
    align_left: 'Left Align',
    align_center: 'Center Align',
    align_right: 'Right Align',
    align_justify: 'Justify',
    text_color: 'Text Color',
    background_color: 'Background Color',
    insert_link: 'Insert Link',
    link: 'Paste your link',
    text: 'Text to display',
    tooltip_link: 'Tooltip',
    open_new_window: 'Open link in new window',
    submit_link: 'Insert',
    remove_color: 'Remove'
};

export type LabelsKeys = keyof typeof LABELS_DEFAULT;

export class Labels
{
    private readonly storage = LABELS_DEFAULT;

    constructor( newLabels: Partial<Record<LabelsKeys, string>> = {} )
    {
        this.storage = { ...LABELS_DEFAULT, ...newLabels };
    }

    get = ( key: string ): string =>
    {
        return this.storage[ key ] ?? '';
    };
}
