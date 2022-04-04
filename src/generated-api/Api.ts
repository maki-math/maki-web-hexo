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

export interface UserDetailsModel {
  pk?: number;

  /**
   * 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。
   * @pattern ^[\w.@+-]+\z
   */
  username: string;

  /** @format email */
  email?: string;
  first_name?: string;
  last_name?: string;
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

export interface CourseGalleryModel {
  categoryId: number;
  category: string;
  categoryAlias: string;
  courses: {
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
    created_at?: string;
  }[];
}

export interface PasswordResetModel {
  /** @format email */
  email: string;
}

export interface PasswordResetConfirmModel {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}

export interface LoginModel {
  username?: string;

  /** @format email */
  email?: string;
  password: string;
}

export interface PasswordChangeModel {
  new_password1: string;
  new_password2: string;
}

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
} from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  'body' | 'method' | 'query' | 'path'
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || '',
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig
  ): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  private createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
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
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === 'object'
    ) {
      requestParams.headers.common = { Accept: '*/*' };
      requestParams.headers.post = {};
      requestParams.headers.put = {};

      body = this.createFormData(body as Record<string, unknown>);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
        ...(requestParams.headers || {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
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
  auth = {
    /**
     * @description Calls Django logout method and delete the Token object assigned to the current User object. Accepts/Returns nothing.
     *
     * @tags auth
     * @name ListLogouts
     * @request GET:/auth/logout/
     */
    listLogouts: (params: RequestParams = {}) =>
      this.request<any[], any>({
        path: `/auth/logout/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django logout method and delete the Token object assigned to the current User object. Accepts/Returns nothing.
     *
     * @tags auth
     * @name CreateLogout
     * @request POST:/auth/logout/
     */
    createLogout: (data: any, params: RequestParams = {}) =>
      this.request<any, any>({
        path: `/auth/logout/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags auth
     * @name RetrieveUserDetails
     * @request GET:/auth/user/
     */
    retrieveUserDetails: (params: RequestParams = {}) =>
      this.request<UserDetailsModel, any>({
        path: `/auth/user/`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags auth
     * @name UpdateUserDetails
     * @request PUT:/auth/user/
     */
    updateUserDetails: (data: UserDetailsModel, params: RequestParams = {}) =>
      this.request<UserDetailsModel, any>({
        path: `/auth/user/`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags auth
     * @name PartialUpdateUserDetails
     * @request PATCH:/auth/user/
     */
    partialUpdateUserDetails: (
      data: UserDetailsModel,
      params: RequestParams = {}
    ) =>
      this.request<UserDetailsModel, any>({
        path: `/auth/user/`,
        method: 'PATCH',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth PasswordResetForm save method. Accepts the following POST parameters: email Returns the success/fail message.
     *
     * @tags auth
     * @name CreatePasswordReset
     * @request POST:/auth/password/reset/
     */
    createPasswordReset: (
      data: PasswordResetModel,
      params: RequestParams = {}
    ) =>
      this.request<PasswordResetModel, any>({
        path: `/auth/password/reset/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Password reset e-mail link is confirmed, therefore this resets the user's password. Accepts the following POST parameters: token, uid, new_password1, new_password2 Returns the success/fail message.
     *
     * @tags auth
     * @name CreatePasswordResetConfirm
     * @request POST:/auth/password/reset/confirm/
     */
    createPasswordResetConfirm: (
      data: PasswordResetConfirmModel,
      params: RequestParams = {}
    ) =>
      this.request<PasswordResetConfirmModel, any>({
        path: `/auth/password/reset/confirm/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Check the credentials and return the REST Token if the credentials are valid and authenticated. Calls Django Auth login method to register User ID in Django session framework Accept the following POST parameters: username, password Return the REST Framework Token Object's key.
     *
     * @tags auth
     * @name CreateLogin
     * @request POST:/auth/login/
     */
    createLogin: (data: LoginModel, params: RequestParams = {}) =>
      this.request<LoginModel, any>({
        path: `/auth/login/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth SetPasswordForm save method. Accepts the following POST parameters: new_password1, new_password2 Returns the success/fail message.
     *
     * @tags auth
     * @name CreatePasswordChange
     * @request POST:/auth/password/change/
     */
    createPasswordChange: (
      data: PasswordChangeModel,
      params: RequestParams = {}
    ) =>
      this.request<PasswordChangeModel, any>({
        path: `/auth/password/change/`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
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
  courseGallery = {
    /**
     * No description
     *
     * @tags course-gallery
     * @name ListCourseGallerys
     * @request GET:/course_gallery
     */
    listCourseGallerys: (params: RequestParams = {}) =>
      this.request<CourseGalleryModel[], any>({
        path: `/course_gallery`,
        method: 'GET',
        format: 'json',
        ...params,
      }),
  };
}
