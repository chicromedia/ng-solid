import { LabelsKeys } from '../models/labels';

export interface NsEditorSetup
{
    labels?: Partial<Record<LabelsKeys, string>>;
}
