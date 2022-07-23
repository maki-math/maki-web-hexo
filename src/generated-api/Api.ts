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

export interface ArticleModel {
  id: number;
  title?: string;
  author?: string;
  content?: string;
  course: NestedModel;
}

export interface ContentNodeModel {
  children: ContentNodeModel[];
  label: string;
  article: ArticleModel;
  id: number;
}

export interface CourseModel {
  id: number;
  category: CourseCategoryModel[];
  contents: ContentNodeModel;
  title?: string;
  cover?: string;
  courseCode?: string;
  shortDescription?: string;
  description?: string;
  keywords?: string;
  teacher?: string;
  contact?: string;

  /** @format date-time */
  created_at: string;
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
  courses: CourseModel[];
}

export interface GroupModel {
  /** @format uri */
  url: string;

  /** 名称 */
  name: string;
  permissions: PermissionModel[];
}

export interface LoginModel {
  username?: string;

  /** @format email */
  email?: string;
  password: string;
}

export interface NestedModel {
  id: number;
  title?: string;
  cover?: string;
  courseCode?: string;
  shortDescription?: string;
  description?: string;
  keywords?: string;
  teacher?: string;
  contact?: string;

  /** @format date-time */
  created_at: string;
  contents?: number | null;
  category: number[];
}

export interface OSSObjectModel {
  objectName: string;
  contentType: string;
}

export interface PasswordChangeModel {
  new_password1: string;
  new_password2: string;
}

/**
 * Serializer for requesting a password reset e-mail.
 */
export interface PasswordResetModel {
  /** @format email */
  email: string;
}

/**
 * Serializer for confirming a password reset attempt.
 */
export interface PasswordResetConfirmModel {
  new_password1: string;
  new_password2: string;
  uid: string;
  token: string;
}

export interface PatchedArticleModel {
  id?: number;
  title?: string;
  author?: string;
  content?: string;
  course?: NestedModel;
}

export interface PatchedContentNodeModel {
  children?: ContentNodeModel[];
  label?: string;
  article?: ArticleModel;
  id?: number;
}

export interface PatchedCourseModel {
  id?: number;
  category?: CourseCategoryModel[];
  contents?: ContentNodeModel;
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

export interface PatchedCourseCategoryModel {
  id?: number;
  alias?: string;
  name?: string;
}

export interface PatchedGroupModel {
  /** @format uri */
  url?: string;

  /** 名称 */
  name?: string;
  permissions?: PermissionModel[];
}

export interface PatchedQuestionModel {
  id?: number;

  /**
   * 名称
   * 习题名称
   */
  title?: string;

  /** 标签 */
  tags?: string;
  author?: string;
  description?: string;
  solution?: string;
  analysis?: string;

  /** @format date-time */
  created_at?: string;

  /** @format date-time */
  updated_at?: string;
}

export interface PatchedQuestionSetNodeModel {
  children?: string;
  label?: string;
  question?: number | null;
  id?: number;
}

export interface PatchedUserModel {
  /** @format uri */
  url?: string;

  /**
   * 用户名
   * 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。
   * @pattern ^[\w.@+-]+$
   */
  username?: string;

  /**
   * 电子邮件地址
   * @format email
   */
  email?: string;
  groups?: GroupModel[];
}

/**
 * User model w/o password
 */
export interface PatchedUserDetailsModel {
  /** ID */
  pk?: number;

  /**
   * 用户名
   * 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。
   * @pattern ^[\w.@+-]+$
   */
  username?: string;

  /**
   * 电子邮件地址
   * @format email
   */
  email?: string;

  /** 名字 */
  first_name?: string;

  /** 姓氏 */
  last_name?: string;
}

export interface PermissionModel {
  id: number;

  /** 名称 */
  name: string;

  /** 代码名称 */
  codename: string;

  /** 内容类型 */
  content_type: number;
}

export interface QuestionModel {
  id: number;

  /**
   * 名称
   * 习题名称
   */
  title: string;

  /** 标签 */
  tags: string;
  author: string;
  description?: string;
  solution?: string;
  analysis?: string;

  /** @format date-time */
  created_at: string;

  /** @format date-time */
  updated_at: string;
}

export interface QuestionSetNodeModel {
  children: string;
  label: string;
  question?: number | null;
  id: number;
}

export interface RegisterModel {
  username: string;

  /** @format email */
  email?: string;
  password1: string;
  password2: string;
}

export interface ResendEmailVerificationModel {
  /** @format email */
  email?: string;
}

export interface RestAuthDetailModel {
  detail: string;
}

export interface SignedObjectUrlModel {
  signedUrl: string;
  rawUrl: string;
}

/**
 * Serializer for Token model.
 */
export interface TokenModel {
  /** 键 */
  key: string;
}

export interface UserModel {
  /** @format uri */
  url: string;

  /**
   * 用户名
   * 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。
   * @pattern ^[\w.@+-]+$
   */
  username: string;

  /**
   * 电子邮件地址
   * @format email
   */
  email?: string;
  groups: GroupModel[];
}

/**
 * User model w/o password
 */
export interface UserDetailsModel {
  /** ID */
  pk: number;

  /**
   * 用户名
   * 必填；长度为150个字符或以下；只能包含字母、数字、特殊字符“@”、“.”、“-”和“_”。
   * @pattern ^[\w.@+-]+$
   */
  username: string;

  /**
   * 电子邮件地址
   * @format email
   */
  email: string;

  /** 名字 */
  first_name?: string;

  /** 姓氏 */
  last_name?: string;
}

export interface VerifyEmailModel {
  key: string;
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
 * @title Your Project API
 * @version 1.0.0
 *
 * Your project description
 */
export class Api<
  SecurityDataType extends unknown
> extends HttpClient<SecurityDataType> {
  article = {
    /**
     * No description
     *
     * @tags article
     * @name ArticleList
     * @request GET:/article/
     * @secure
     */
    articleList: (params: RequestParams = {}) =>
      this.request<ArticleModel[], any>({
        path: `/article/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name ArticleCreate
     * @request POST:/article/
     * @secure
     */
    articleCreate: (data: ArticleModel, params: RequestParams = {}) =>
      this.request<ArticleModel, any>({
        path: `/article/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name ArticleRetrieve
     * @request GET:/article/{id}/
     * @secure
     */
    articleRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<ArticleModel, any>({
        path: `/article/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name ArticleUpdate
     * @request PUT:/article/{id}/
     * @secure
     */
    articleUpdate: (
      id: number,
      data: ArticleModel,
      params: RequestParams = {}
    ) =>
      this.request<ArticleModel, any>({
        path: `/article/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name ArticlePartialUpdate
     * @request PATCH:/article/{id}/
     * @secure
     */
    articlePartialUpdate: (
      id: number,
      data: PatchedArticleModel,
      params: RequestParams = {}
    ) =>
      this.request<ArticleModel, any>({
        path: `/article/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article
     * @name ArticleDestroy
     * @request DELETE:/article/{id}/
     * @secure
     */
    articleDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/article/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  articleNode = {
    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodeList
     * @request GET:/article_node/
     * @secure
     */
    articleNodeList: (params: RequestParams = {}) =>
      this.request<ContentNodeModel[], any>({
        path: `/article_node/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodeCreate
     * @request POST:/article_node/
     * @secure
     */
    articleNodeCreate: (data: ContentNodeModel, params: RequestParams = {}) =>
      this.request<ContentNodeModel, any>({
        path: `/article_node/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodeRetrieve
     * @request GET:/article_node/{id}/
     * @secure
     */
    articleNodeRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<ContentNodeModel, any>({
        path: `/article_node/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodeUpdate
     * @request PUT:/article_node/{id}/
     * @secure
     */
    articleNodeUpdate: (
      id: number,
      data: ContentNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<ContentNodeModel, any>({
        path: `/article_node/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodePartialUpdate
     * @request PATCH:/article_node/{id}/
     * @secure
     */
    articleNodePartialUpdate: (
      id: number,
      data: PatchedContentNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<ContentNodeModel, any>({
        path: `/article_node/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodeDestroy
     * @request DELETE:/article_node/{id}/
     * @secure
     */
    articleNodeDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/article_node/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags article_node
     * @name ArticleNodeRootRetrieve
     * @request GET:/article_node/root/{id}/
     * @secure
     */
    articleNodeRootRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<ContentNodeModel, any>({
        path: `/article_node/root/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  auth = {
    /**
     * @description Check the credentials and return the REST Token if the credentials are valid and authenticated. Calls Django Auth login method to register User ID in Django session framework Accept the following POST parameters: username, password Return the REST Framework Token Object's key.
     *
     * @tags auth
     * @name AuthLoginCreate
     * @request POST:/auth/login/
     * @secure
     */
    authLoginCreate: (data: LoginModel, params: RequestParams = {}) =>
      this.request<TokenModel, any>({
        path: `/auth/login/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django logout method and delete the Token object assigned to the current User object. Accepts/Returns nothing.
     *
     * @tags auth
     * @name AuthLogoutCreate
     * @request POST:/auth/logout/
     * @secure
     */
    authLogoutCreate: (params: RequestParams = {}) =>
      this.request<RestAuthDetailModel, any>({
        path: `/auth/logout/`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth SetPasswordForm save method. Accepts the following POST parameters: new_password1, new_password2 Returns the success/fail message.
     *
     * @tags auth
     * @name AuthPasswordChangeCreate
     * @request POST:/auth/password/change/
     * @secure
     */
    authPasswordChangeCreate: (
      data: PasswordChangeModel,
      params: RequestParams = {}
    ) =>
      this.request<RestAuthDetailModel, any>({
        path: `/auth/password/change/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Calls Django Auth PasswordResetForm save method. Accepts the following POST parameters: email Returns the success/fail message.
     *
     * @tags auth
     * @name AuthPasswordResetCreate
     * @request POST:/auth/password/reset/
     * @secure
     */
    authPasswordResetCreate: (
      data: PasswordResetModel,
      params: RequestParams = {}
    ) =>
      this.request<RestAuthDetailModel, any>({
        path: `/auth/password/reset/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Password reset e-mail link is confirmed, therefore this resets the user's password. Accepts the following POST parameters: token, uid, new_password1, new_password2 Returns the success/fail message.
     *
     * @tags auth
     * @name AuthPasswordResetConfirmCreate
     * @request POST:/auth/password/reset/confirm/
     * @secure
     */
    authPasswordResetConfirmCreate: (
      data: PasswordResetConfirmModel,
      params: RequestParams = {}
    ) =>
      this.request<RestAuthDetailModel, any>({
        path: `/auth/password/reset/confirm/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthRegistrationCreate
     * @request POST:/auth/registration/
     * @secure
     */
    authRegistrationCreate: (data: RegisterModel, params: RequestParams = {}) =>
      this.request<TokenModel, any>({
        path: `/auth/registration/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthRegistrationResendEmailCreate
     * @request POST:/auth/registration/resend-email/
     * @secure
     */
    authRegistrationResendEmailCreate: (
      data: ResendEmailVerificationModel,
      params: RequestParams = {}
    ) =>
      this.request<RestAuthDetailModel, any>({
        path: `/auth/registration/resend-email/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags auth
     * @name AuthRegistrationVerifyEmailCreate
     * @request POST:/auth/registration/verify-email/
     * @secure
     */
    authRegistrationVerifyEmailCreate: (
      data: VerifyEmailModel,
      params: RequestParams = {}
    ) =>
      this.request<RestAuthDetailModel, any>({
        path: `/auth/registration/verify-email/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags auth
     * @name AuthUserRetrieve
     * @request GET:/auth/user/
     * @secure
     */
    authUserRetrieve: (params: RequestParams = {}) =>
      this.request<UserDetailsModel, any>({
        path: `/auth/user/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags auth
     * @name AuthUserUpdate
     * @request PUT:/auth/user/
     * @secure
     */
    authUserUpdate: (data: UserDetailsModel, params: RequestParams = {}) =>
      this.request<UserDetailsModel, any>({
        path: `/auth/user/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Reads and updates UserModel fields Accepts GET, PUT, PATCH methods. Default accepted fields: username, first_name, last_name Default display fields: pk, username, email, first_name, last_name Read-only fields: pk, email Returns UserModel fields.
     *
     * @tags auth
     * @name AuthUserPartialUpdate
     * @request PATCH:/auth/user/
     * @secure
     */
    authUserPartialUpdate: (
      data: PatchedUserDetailsModel,
      params: RequestParams = {}
    ) =>
      this.request<UserDetailsModel, any>({
        path: `/auth/user/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  courseCategories = {
    /**
     * No description
     *
     * @tags course_categories
     * @name CourseCategoriesList
     * @request GET:/course_categories/
     * @secure
     */
    courseCategoriesList: (params: RequestParams = {}) =>
      this.request<CourseCategoryModel[], any>({
        path: `/course_categories/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course_categories
     * @name CourseCategoriesCreate
     * @request POST:/course_categories/
     * @secure
     */
    courseCategoriesCreate: (
      data: CourseCategoryModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course_categories
     * @name CourseCategoriesRetrieve
     * @request GET:/course_categories/{id}/
     * @secure
     */
    courseCategoriesRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course_categories
     * @name CourseCategoriesUpdate
     * @request PUT:/course_categories/{id}/
     * @secure
     */
    courseCategoriesUpdate: (
      id: number,
      data: CourseCategoryModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course_categories
     * @name CourseCategoriesPartialUpdate
     * @request PATCH:/course_categories/{id}/
     * @secure
     */
    courseCategoriesPartialUpdate: (
      id: number,
      data: PatchedCourseCategoryModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseCategoryModel, any>({
        path: `/course_categories/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags course_categories
     * @name CourseCategoriesDestroy
     * @request DELETE:/course_categories/{id}/
     * @secure
     */
    courseCategoriesDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/course_categories/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  courseGallery = {
    /**
     * No description
     *
     * @tags course_gallery
     * @name CourseGalleryList
     * @request GET:/course_gallery
     * @secure
     */
    courseGalleryList: (params: RequestParams = {}) =>
      this.request<CourseGalleryModel[], any>({
        path: `/course_gallery`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  courses = {
    /**
     * No description
     *
     * @tags courses
     * @name CoursesList
     * @request GET:/courses/
     * @secure
     */
    coursesList: (params: RequestParams = {}) =>
      this.request<CourseModel[], any>({
        path: `/courses/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesCreate
     * @request POST:/courses/
     * @secure
     */
    coursesCreate: (data: CourseModel, params: RequestParams = {}) =>
      this.request<CourseModel, any>({
        path: `/courses/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesRetrieve
     * @request GET:/courses/{id}/
     * @secure
     */
    coursesRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<CourseModel, any>({
        path: `/courses/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesUpdate
     * @request PUT:/courses/{id}/
     * @secure
     */
    coursesUpdate: (
      id: number,
      data: CourseModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseModel, any>({
        path: `/courses/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesPartialUpdate
     * @request PATCH:/courses/{id}/
     * @secure
     */
    coursesPartialUpdate: (
      id: number,
      data: PatchedCourseModel,
      params: RequestParams = {}
    ) =>
      this.request<CourseModel, any>({
        path: `/courses/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags courses
     * @name CoursesDestroy
     * @request DELETE:/courses/{id}/
     * @secure
     */
    coursesDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/courses/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  groups = {
    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name GroupsList
     * @request GET:/groups/
     * @secure
     */
    groupsList: (params: RequestParams = {}) =>
      this.request<GroupModel[], any>({
        path: `/groups/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name GroupsCreate
     * @request POST:/groups/
     * @secure
     */
    groupsCreate: (data: GroupModel, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/groups/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name GroupsRetrieve
     * @request GET:/groups/{id}/
     * @secure
     */
    groupsRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/groups/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name GroupsUpdate
     * @request PUT:/groups/{id}/
     * @secure
     */
    groupsUpdate: (id: number, data: GroupModel, params: RequestParams = {}) =>
      this.request<GroupModel, any>({
        path: `/groups/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name GroupsPartialUpdate
     * @request PATCH:/groups/{id}/
     * @secure
     */
    groupsPartialUpdate: (
      id: number,
      data: PatchedGroupModel,
      params: RequestParams = {}
    ) =>
      this.request<GroupModel, any>({
        path: `/groups/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows groups to be viewed or edited.
     *
     * @tags groups
     * @name GroupsDestroy
     * @request DELETE:/groups/{id}/
     * @secure
     */
    groupsDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/groups/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  oss = {
    /**
     * No description
     *
     * @tags oss
     * @name OssSignObjectCreate
     * @request POST:/oss/sign_object
     * @secure
     */
    ossSignObjectCreate: (data: OSSObjectModel, params: RequestParams = {}) =>
      this.request<SignedObjectUrlModel, any>({
        path: `/oss/sign_object`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
  question = {
    /**
     * No description
     *
     * @tags question
     * @name QuestionList
     * @request GET:/question/
     * @secure
     */
    questionList: (params: RequestParams = {}) =>
      this.request<QuestionModel[], any>({
        path: `/question/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name QuestionCreate
     * @request POST:/question/
     * @secure
     */
    questionCreate: (data: QuestionModel, params: RequestParams = {}) =>
      this.request<QuestionModel, any>({
        path: `/question/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name QuestionRetrieve
     * @request GET:/question/{id}/
     * @secure
     */
    questionRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<QuestionModel, any>({
        path: `/question/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name QuestionUpdate
     * @request PUT:/question/{id}/
     * @secure
     */
    questionUpdate: (
      id: number,
      data: QuestionModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionModel, any>({
        path: `/question/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name QuestionPartialUpdate
     * @request PATCH:/question/{id}/
     * @secure
     */
    questionPartialUpdate: (
      id: number,
      data: PatchedQuestionModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionModel, any>({
        path: `/question/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question
     * @name QuestionDestroy
     * @request DELETE:/question/{id}/
     * @secure
     */
    questionDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/question/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  questionSet = {
    /**
     * No description
     *
     * @tags question_set
     * @name QuestionSetList
     * @request GET:/question_set/
     * @secure
     */
    questionSetList: (params: RequestParams = {}) =>
      this.request<QuestionSetNodeModel[], any>({
        path: `/question_set/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question_set
     * @name QuestionSetCreate
     * @request POST:/question_set/
     * @secure
     */
    questionSetCreate: (
      data: QuestionSetNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question_set
     * @name QuestionSetRetrieve
     * @request GET:/question_set/{id}/
     * @secure
     */
    questionSetRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question_set
     * @name QuestionSetUpdate
     * @request PUT:/question_set/{id}/
     * @secure
     */
    questionSetUpdate: (
      id: number,
      data: QuestionSetNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question_set
     * @name QuestionSetPartialUpdate
     * @request PATCH:/question_set/{id}/
     * @secure
     */
    questionSetPartialUpdate: (
      id: number,
      data: PatchedQuestionSetNodeModel,
      params: RequestParams = {}
    ) =>
      this.request<QuestionSetNodeModel, any>({
        path: `/question_set/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags question_set
     * @name QuestionSetDestroy
     * @request DELETE:/question_set/{id}/
     * @secure
     */
    questionSetDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/question_set/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
  userPermissions = {
    /**
     * No description
     *
     * @tags user-permissions
     * @name UserPermissionsList
     * @request GET:/user-permissions/
     * @secure
     */
    userPermissionsList: (params: RequestParams = {}) =>
      this.request<UserModel[], any>({
        path: `/user-permissions/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  };
  users = {
    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UsersList
     * @request GET:/users/
     * @secure
     */
    usersList: (params: RequestParams = {}) =>
      this.request<UserModel[], any>({
        path: `/users/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UsersCreate
     * @request POST:/users/
     * @secure
     */
    usersCreate: (data: UserModel, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/users/`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UsersRetrieve
     * @request GET:/users/{id}/
     * @secure
     */
    usersRetrieve: (id: number, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/users/${id}/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UsersUpdate
     * @request PUT:/users/{id}/
     * @secure
     */
    usersUpdate: (id: number, data: UserModel, params: RequestParams = {}) =>
      this.request<UserModel, any>({
        path: `/users/${id}/`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UsersPartialUpdate
     * @request PATCH:/users/{id}/
     * @secure
     */
    usersPartialUpdate: (
      id: number,
      data: PatchedUserModel,
      params: RequestParams = {}
    ) =>
      this.request<UserModel, any>({
        path: `/users/${id}/`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description API endpoint that allows users to be viewed or edited.
     *
     * @tags users
     * @name UsersDestroy
     * @request DELETE:/users/{id}/
     * @secure
     */
    usersDestroy: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/users/${id}/`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  };
}
