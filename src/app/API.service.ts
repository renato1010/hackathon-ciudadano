/* tslint:disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from '@angular/core';
import API, { graphqlOperation } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api/lib/types';
import * as Observable from 'zen-observable';

export type CreateMediaInput = {
  id?: string | null;
  titulo: string;
  descripcion?: string | null;
  url: string;
  fecha: string;
  likes?: number | null;
  dontlikes?: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type UpdateMediaInput = {
  id: string;
  titulo?: string | null;
  descripcion?: string | null;
  url?: string | null;
  fecha?: string | null;
  likes?: number | null;
  dontlikes?: number | null;
  userId?: string | null;
  mediaType?: string | null;
  username?: string | null;
};

export type DeleteMediaInput = {
  id?: string | null;
};

export type ModelMediaFilterInput = {
  id?: ModelIDFilterInput | null;
  titulo?: ModelStringFilterInput | null;
  descripcion?: ModelStringFilterInput | null;
  url?: ModelStringFilterInput | null;
  fecha?: ModelStringFilterInput | null;
  likes?: ModelIntFilterInput | null;
  dontlikes?: ModelIntFilterInput | null;
  userId?: ModelStringFilterInput | null;
  mediaType?: ModelStringFilterInput | null;
  username?: ModelStringFilterInput | null;
  and?: Array<ModelMediaFilterInput | null> | null;
  or?: Array<ModelMediaFilterInput | null> | null;
  not?: ModelMediaFilterInput | null;
};

export type ModelIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
};

export type ModelIntFilterInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  contains?: number | null;
  notContains?: number | null;
  between?: Array<number | null> | null;
};

export type CreateMediaMutation = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type UpdateMediaMutation = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type DeleteMediaMutation = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type GetMediaQuery = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type ListMediasQuery = {
  __typename: 'ModelMediaConnection';
  items: Array<{
    __typename: 'Media';
    id: string;
    titulo: string;
    descripcion: string | null;
    url: string;
    fecha: string;
    likes: number | null;
    dontlikes: number | null;
    userId: string;
    mediaType: string;
    username: string;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateMediaSubscription = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type OnUpdateMediaSubscription = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

export type OnDeleteMediaSubscription = {
  __typename: 'Media';
  id: string;
  titulo: string;
  descripcion: string | null;
  url: string;
  fecha: string;
  likes: number | null;
  dontlikes: number | null;
  userId: string;
  mediaType: string;
  username: string;
};

@Injectable({
  providedIn: 'root'
})
export class APIService {
  async CreateMedia(input: CreateMediaInput): Promise<CreateMediaMutation> {
    const statement = `mutation CreateMedia($input: CreateMediaInput!) {
        createMedia(input: $input) {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateMediaMutation>response.data.createMedia;
  }
  async UpdateMedia(input: UpdateMediaInput): Promise<UpdateMediaMutation> {
    const statement = `mutation UpdateMedia($input: UpdateMediaInput!) {
        updateMedia(input: $input) {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateMediaMutation>response.data.updateMedia;
  }
  async DeleteMedia(input: DeleteMediaInput): Promise<DeleteMediaMutation> {
    const statement = `mutation DeleteMedia($input: DeleteMediaInput!) {
        deleteMedia(input: $input) {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteMediaMutation>response.data.deleteMedia;
  }
  async GetMedia(id: string): Promise<GetMediaQuery> {
    const statement = `query GetMedia($id: ID!) {
        getMedia(id: $id) {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetMediaQuery>response.data.getMedia;
  }
  async ListMedias(
    filter?: ModelMediaFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListMediasQuery> {
    const statement = `query ListMedias($filter: ModelMediaFilterInput, $limit: Int, $nextToken: String) {
        listMedias(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            titulo
            descripcion
            url
            fecha
            likes
            dontlikes
            userId
            mediaType
            username
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListMediasQuery>response.data.listMedias;
  }
  OnCreateMediaListener: Observable<OnCreateMediaSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnCreateMedia {
        onCreateMedia {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`
    )
  ) as Observable<OnCreateMediaSubscription>;

  OnUpdateMediaListener: Observable<OnUpdateMediaSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnUpdateMedia {
        onUpdateMedia {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`
    )
  ) as Observable<OnUpdateMediaSubscription>;

  OnDeleteMediaListener: Observable<OnDeleteMediaSubscription> = API.graphql(
    graphqlOperation(
      `subscription OnDeleteMedia {
        onDeleteMedia {
          __typename
          id
          titulo
          descripcion
          url
          fecha
          likes
          dontlikes
          userId
          mediaType
          username
        }
      }`
    )
  ) as Observable<OnDeleteMediaSubscription>;
}
