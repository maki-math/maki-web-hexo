/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface UserModel {
  url?: string;

  /**
   * 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。
   * @pattern ^[\w.@+-]+\z
   */
  username: string;

  /** @format email */
  email?: string;

  /** 该用户归属的组。一个用户将得到其归属的组的所有权限。 */
  groups?: string[];
}

export interface GroupModel {
  url?: string;
  name: string;
}

export interface ArticleModel {
  id?: number;
  title?: string;
  author?: string;
  content?: string;
  course: number;
}

export interface QuestionModel {
  id?: number;

  /** 习题名称 */
  title: string;
  tags: string;
  author: string;
  description?: string;
  solution?: string;
  analysis?: string;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  updated_at?: string;
}

export interface QuestionSetNodeModel {
  children?: string;
  label: string;
  question?: number | null;
  id?: number;
}

export interface CourseModel {
  id?: number;
  category?: { id?: number; alias: string; name: string }[];
  contents?: { children?: string; label: string; article: number };
  title?: string;
  cover?: string;
  courseCode?: string;
  shortDescription?: string;
  description?: string;
  keywords?: string;
  teacher?: string;
  contact?: string;

  /** @format date-time */
  created_at?: string;
}

export interface CourseCategoryModel {
  id?: number;
  alias: string;
  name: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(
      typeof value === 'number' ? value : `${value}`
    )}`;
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => 'undefined' !== typeof query[key]
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key)
      )
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string')
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  private mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createAbortSignal = (
    cancelToken: CancelToken
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ''}${path}${
        queryString ? `?${queryString}` : ''
      }`,
      {
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData
            ? { 'Content-Type': type }
            : {}),
          ...(requestParams.headers || {}),
        },
        signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
        body:
          typeof body === 'undefined' || body === null
            ? null
            : payloadFormatter(body),
      }
    ).then(async (response) => {
      const r = response as HttpResponse<T, E>;
      r.data = (null as unknown) as T;
      r.error = (null as unknown) as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Your Project
 * @version 1.0.0
 *
 * API for all things …
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name ListUsers
     * @request GET:/users/
     */
    listUsers: (params: RequestParams = {}) =>
      this.request<UserModel[], any>({
        path: `/users/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name CreateUser
     * @request POST:/users/
     */
    createUser: (data: UserModel, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/users/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name RetrieveUser
     * @request GET:/users/{id}/
     */
    retrieveUser: (id: string, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/users/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UpdateUser
     * @request PUT:/users/{id}/
     */
    updateUser: (id: string, data: UserModel, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/users/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name PartialUpdateUser
     * @request PATCH:/users/{id}/
     */
    partialUpdateUser: (
      id: string,
      data: UserModel,
      params: RequestParams = {}
    ) =>
      this.request<UserModel, any>({
        path: `/users/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name DestroyUser
     * @request DELETE:/users/{id}/
     */
    destroyUser: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
  groups = {
    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name ListGroups
     * @request GET:/groups/
     */
    listGroups: (params: RequestParams = {}) =>
      this.request<GroupModel[], any>({
        path: `/groups/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name CreateGroup
     * @request POST:/groups/
     */
    createGroup: (data: GroupModel, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/groups/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name RetrieveGroup
     * @request GET:/groups/{id}/
     */
    retrieveGroup: (id: string, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/groups/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name UpdateGroup
     * @request PUT:/groups/{id}/
     */
    updateGroup: (id: string, data: GroupModel, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/groups/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name PartialUpdateGroup
     * @request PATCH:/groups/{id}/
     */
    partialUpdateGroup: (
      id: string,
      data: GroupModel,
      params: RequestParams = {}
    ) =>
      this.request<GroupModel, any>({
        path: `/groups/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name DestroyGroup
     * @request DELETE:/groups/{id}/
     */
    destroyGroup: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/groups/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
  article = {
    /**
     * No description
     *
     * @tags article
     * @name ListArticles
     * @request GET:/article/
     */
    listArticles: (params: RequestParams = {}) =>
      this.request<ArticleModel[], any>({
        path: `/article/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name CreateArticle
     * @request POST:/article/
     */
    createArticle: (data: ArticleModel, params: RequestParams = {}) =>
      this.request<ArticleModel, any>({
        path: `/article/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name RetrieveArticle
     * @request GET:/article/{id}/
     */
    retrieveArticle: (id: string, params: RequestParams = {}) =>
      this.request<ArticleModel, any>({
        path: `/article/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name UpdateArticle
     * @request PUT:/article/{id}/
     */
    updateArticle: (
      id: string,
      data: ArticleModel,
      params: RequestParams = {}
    ) =>
      this.request<ArticleModel, any>({
        path: `/article/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name PartialUpdateArticle
     * @request PATCH:/article/{id}/
     */
    partialUpdateArticle: (
      id: string,
      data: ArticleModel,
      params: RequestParams = {}
    ) =>
      this.request<ArticleModel, any>({
        path: `/article/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name DestroyArticle
     * @request DELETE:/article/{id}/
     */
    destroyArticle: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/article/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
  question = {
    /**
     * No description
     *
     * @tags question
     * @name ListQuestions
     * @request GET:/question/
     */
    listQuestions: (params: RequestParams = {}) =>
      this.request<QuestionModel[], any>({
        path: `/question/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name CreateQuestion
     * @request POST:/question/
     */
    createQuestion: (data: QuestionModel, params: RequestParams = {}) =>
      this.request<QuestionModel, any>({
        path: `/question/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name RetrieveQuestion
     * @request GET:/question/{id}/
     */
    retrieveQuestion: (id: string, params: RequestParams = {}) =>
      this.request<QuestionModel, any>({
        path: `/question/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name UpdateQuestion
     * @request PUT:/question/{id}/
     */
    updateQuestion: (
      id: string,
      data: QuestionModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionModel, any>({
        path: `/question/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name PartialUpdateQuestion
     * @request PATCH:/question/{id}/
     */
    partialUpdateQuestion: (
      id: string,
      data: QuestionModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionModel, any>({
        path: `/question/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name DestroyQuestion
     * @request DELETE:/question/{id}/
     */
    destroyQuestion: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/question/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
  questionSet = {
    /**
     * No description
     *
     * @tags question-set
     * @name ListQuestionSetNodes
     * @request GET:/question_set/
     */
    listQuestionSetNodes: (params: RequestParams = {}) =>
      this.request<QuestionSetNodeModel[], any>({
        path: `/question_set/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-set
     * @name CreateQuestionSetNode
     * @request POST:/question_set/
     */
    createQuestionSetNode: (
      data: QuestionSetNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-set
     * @name RetrieveQuestionSetNode
     * @request GET:/question_set/{id}/
     */
    retrieveQuestionSetNode: (id: string, params: RequestParams = {}) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-set
     * @name UpdateQuestionSetNode
     * @request PUT:/question_set/{id}/
     */
    updateQuestionSetNode: (
      id: string,
      data: QuestionSetNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-set
     * @name PartialUpdateQuestionSetNode
     * @request PATCH:/question_set/{id}/
     */
    partialUpdateQuestionSetNode: (
      id: string,
      data: QuestionSetNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question-set
     * @name DestroyQuestionSetNode
     * @request DELETE:/question_set/{id}/
     */
    destroyQuestionSetNode: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/question_set/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
  courses = {
    /**
     * No description
     *
     * @tags courses
     * @name ListCourses
     * @request GET:/courses/
     */
    listCourses: (params: RequestParams = {}) =>
      this.request<CourseModel[], any>({
        path: `/courses/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CreateCourse
     * @request POST:/courses/
     */
    createCourse: (data: CourseModel, params: RequestParams = {}) =>
      this.request<CourseModel, any>({
        path: `/courses/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name RetrieveCourse
     * @request GET:/courses/{id}/
     */
    retrieveCourse: (id: string, params: RequestParams = {}) =>
      this.request<CourseModel, any>({
        path: `/courses/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name UpdateCourse
     * @request PUT:/courses/{id}/
     */
    updateCourse: (id: string, data: CourseModel, params: RequestParams = {}) =>
      this.request<CourseModel, any>({
        path: `/courses/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name PartialUpdateCourse
     * @request PATCH:/courses/{id}/
     */
    partialUpdateCourse: (
      id: string,
      data: CourseModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseModel, any>({
        path: `/courses/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name DestroyCourse
     * @request DELETE:/courses/{id}/
     */
    destroyCourse: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
  courseCategories = {
    /**
     * No description
     *
     * @tags course-categories
     * @name ListCourseCategorys
     * @request GET:/course_categories/
     */
    listCourseCategorys: (params: RequestParams = {}) =>
      this.request<CourseCategoryModel[], any>({
        path: `/course_categories/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course-categories
     * @name CreateCourseCategory
     * @request POST:/course_categories/
     */
    createCourseCategory: (
      data: CourseCategoryModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course-categories
     * @name RetrieveCourseCategory
     * @request GET:/course_categories/{id}/
     */
    retrieveCourseCategory: (id: string, params: RequestParams = {}) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/${id}/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course-categories
     * @name UpdateCourseCategory
     * @request PUT:/course_categories/{id}/
     */
    updateCourseCategory: (
      id: string,
      data: CourseCategoryModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/${id}/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course-categories
     * @name PartialUpdateCourseCategory
     * @request PATCH:/course_categories/{id}/
     */
    partialUpdateCourseCategory: (
      id: string,
      data: CourseCategoryModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/${id}/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course-categories
     * @name DestroyCourseCategory
     * @request DELETE:/course_categories/{id}/
     */
    destroyCourseCategory: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/course_categories/${id}/`,
        method: 'DELETE',
        ...params,
      }),
  };
}
