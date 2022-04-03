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

export interface Course {
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

export interface CourseCategory {
  id?: number;
  alias: string;
  name: string;
}

export interface Article {
  id?: number;
  title?: string;
  author?: string;
  content?: string;
  course: number;
}

export interface Question {
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

export interface QuestionSetNode {
  children?: string;
  label: string;
  question?: number | null;
}
