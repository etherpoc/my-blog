import { ApiFetcherConfig, ApiResponse } from "@/types/data"
import { apiFetcher } from "./api";

export const getAllArticles = async(accessToken: string): Promise<ApiResponse|undefined> => {
  const rootUrl = "/admin/articles";
  const config: ApiFetcherConfig = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
  }
  const res = apiFetcher(rootUrl, config);
  return res;
}

export const getArticle = async(
  id: number,
  accessToken: string
): Promise<ApiResponse|undefined> => {
  const rootUrl = `/admin/articles/${id}`;
  const config: ApiFetcherConfig = {
      method: "GET",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
  }
  const res = apiFetcher(rootUrl, config);
  return res;
}

export const createArticle = async(
  requestBody: {
      title: string,
      img_url: string,
      tags: Array<string>,
      content: string,
  },
  accessToken: string
): Promise<ApiResponse|undefined> => {
  const rootUrl = "/admin/articles";
  const config: ApiFetcherConfig = {
      method: "POST",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
  }
  const res = apiFetcher(rootUrl, config, requestBody);
  return res;
}

export const updateArticle = async(
  id: number,
  requestBody: {
      title: string,
      img_url: string,
      tags: Array<string>,
      visibility: boolean,
  },
  accessToken: string
): Promise<ApiResponse|undefined> => {
  const rootUrl = `/admin/articles/${id}`;
  const config: ApiFetcherConfig = {
      method: "PATCH",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
  }
  console.log(config)
  const res = apiFetcher(rootUrl, config, requestBody);
  return res;
}

export const updateArticleDetail = async(
  id: number,
  requestBody: {
      title: string,
      img_url: string,
      tags: Array<string>,
      content: string,
      visibility: boolean,
  },
  accessToken: string
): Promise<ApiResponse|undefined> => {
  const rootUrl = `/admin/articles/${id}`;
  const config: ApiFetcherConfig = {
      method: "PATCH",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
  }
  console.log(config)
  const res = apiFetcher(rootUrl, config, requestBody);
  return res;
}

export const deleteArticle = async(
  id: number,
  accessToken: string
): Promise<ApiResponse|undefined> => {
  const rootUrl = `/admin/articles/${id}`;
  const config: ApiFetcherConfig = {
      method: "DELETE",
      cache: "no-store",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      }
  }
  const res = apiFetcher(rootUrl, config);
  return res;
}