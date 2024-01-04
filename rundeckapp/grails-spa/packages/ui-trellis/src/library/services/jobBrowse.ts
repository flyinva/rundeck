import {api} from './api'
import {JobBrowseList, JobBrowseMeta} from '../types/jobs/JobBrowse'

export async function getProjectMeta(project: string, meta: string='*'): Promise<JobBrowseMeta[]> {
    const resp = await api.get(`project/${project}/meta?meta=${meta}`)
    if (resp.status !== 200) {
        throw {message: resp.data.message, response: resp}
    } else {
        console.log(resp.data)
        console.log("------------------------------------------------")
        return resp.data
    }
}

export async function browsePath(project: string, path: string,meta: string='*', breakpoint:number=100): Promise<JobBrowseList> {
  const resp = await api.get(`project/${project}/jobs/browse/?path=${path}&meta=${meta}&breakpoint=${breakpoint}`)
  if (resp.status !== 200) {
    throw {message: resp.data.message, response: resp}
  } else {
    return resp.data
  }
}
export async function queryPath(project: string, path: string,meta: string='*', breakpoint:number=100, query:{[key:string]:any}): Promise<JobBrowseList> {
  let qstring=`path=${path}&meta=${meta}&breakpoint=${breakpoint}`
  for(const key in query){
    qstring+="&"+key+"="+query[key]
  }
  const resp = await api.get(`project/${project}/jobs/browse/?${qstring}`)
  if (resp.status !== 200) {
    throw {message: resp.data.message, response: resp}
  } else {
    return resp.data
  }
}
export async function getJobMeta(project: string, id: string, meta: string='*'): Promise<JobBrowseMeta[]> {
  const resp = await api.get(`job/${id}/meta?meta=${meta}`)
  if (resp.status !== 200) {
    throw {message: resp.data.message, response: resp}
  } else {
    return resp.data
  }
}
export async function scmProjectToggle(project: string, enabled:boolean): Promise<ToggleResult> {
  const resp = await api.post(`project/${project}/scm/toggle`,{
      enabled
  })
  if (resp.status !== 200) {
    throw {message: resp.data.message, response: resp}
  } else {
    return resp.data
  }
}

export interface ToggleResult {
    modified:boolean
}
export interface ResultItem {
    id: string;
    message?: string;
    errorCode?: string;
}

export interface BulkDeleteResponse {
    failed: ResultItem[];
    failedCount: number;
    successCount: number;
    requestCount: number;
    allsuccessful: boolean;
}

export interface BulkToggleResponse {
    failed: ResultItem[];
    succeeded: ResultItem[];
    enabled: boolean;
    requestCount: number;
    allsuccessful: boolean;
}

export async function bulkDeleteJobs(
    project: string,
    ids: string[]
): Promise<BulkDeleteResponse> {
    const resp = await api.post(`jobs/delete`, { ids });
    if (resp.status !== 200) {
        throw { message: resp.data.message, response: resp };
    } else {
        return resp.data;
    }
}
export async function bulkScheduleEnableDisable(
    project: string,
    ids: string[],
    enabled:boolean
): Promise<BulkToggleResponse> {
    const resp = await api.post(`jobs/schedule/${enabled?'enable':'disable'}`, { ids });
    if (resp.status !== 200) {
        throw { message: resp.data.message, response: resp };
    } else {
        return resp.data;
    }
}
export async function bulkExecutionEnableDisable(
    project: string,
    ids: string[],
    enabled:boolean
): Promise<BulkToggleResponse> {
    const resp = await api.post(`jobs/execution/${enabled?'enable':'disable'}`, { ids });
    if (resp.status !== 200) {
        throw { message: resp.data.message, response: resp };
    } else {
        return resp.data;
    }
}