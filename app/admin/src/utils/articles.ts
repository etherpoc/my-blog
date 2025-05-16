"use client"
import { ApiRequestConfig, ApiResponse, HttpMethod } from "@/types/api"
import { apiFetcher } from "./apiFetcher";
import { getBaseUrl } from "./general";

export const createArticle = async(
  requestBody: {
      title: string,
      img_url: string,
      tags: Array<string>,
      content: string,
  },
): Promise<ApiResponse|undefined> => {
  const baseUrl = getBaseUrl()
  
  const url = `${baseUrl}/api/articles/create`
  const config: ApiRequestConfig = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    }
  }
  console.log(requestBody)
  const res = await apiFetcher({
    url: url,
    method: HttpMethod.POST,
    config: config,
    data: requestBody
  });
  return res
}

export const updateArticle = async(
  id: number,
  requestBody: {
      title: string,
      img_url: string,
      tags: Array<string>,
      visibility: boolean,
  },
): Promise<ApiResponse|undefined> => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/articles/update/${id}`;
  const config: ApiRequestConfig = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    }
  }
  const res = await apiFetcher({
    url: url,
    method: HttpMethod.PATCH,
    config: config,
    data: requestBody
  });
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
): Promise<ApiResponse|undefined> => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/articles/update/${id}`;
  const config: ApiRequestConfig = {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    }
  }
  
  const res = await apiFetcher({
    url: url,
    method: HttpMethod.PATCH,
    config: config,
    data: requestBody
  });
  return res
}

export const deleteArticle = async(
  id: number,
  accessToken: string
): Promise<ApiResponse|undefined> => {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/api/articles/delete/${id}`;
  const config: ApiRequestConfig = {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      }
  }

  const res = await apiFetcher({
    url: url,
    method: HttpMethod.DELETE,
    config: config,
  });
  return res;
}