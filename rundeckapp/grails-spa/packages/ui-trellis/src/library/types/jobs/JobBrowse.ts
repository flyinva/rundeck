export interface JobBrowseItem {
    job: boolean;
    jobName?: string;
    groupPath: string;
    id?: string;
    description?: string;
    meta?: JobBrowseMeta[];
}

export type JobBrowserMetaData = { [key: string]: any }
export interface JobBrowseMeta {
    name: string;
    data: JobBrowserMetaData;
}
export interface JobBrowseList {
  path: string
  items: JobBrowseItem[]
}
