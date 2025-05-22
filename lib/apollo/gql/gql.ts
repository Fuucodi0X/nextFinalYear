/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation registerCard($nfcId: Text!) {\n  insertNfcCards(objects: {nfcId: $nfcId}) {\n    data: returning {\n      id\n      nfcId\n    }\n  }\n}": typeof types.RegisterCardDocument,
    "query registerdCards {\n  nfcCards {\n    id\n    nfcId\n    count: assignedCardsAggregate{\n      num: _count\n    }\n    assignedCards{\n      user {\n        name\n\t\t\t\temail\n        avatar\n        role\n      }\n    }\n  }\n  nfcCardsCount: nfcCardsAggregate{\n    num: _count\n  }\n  assignedCardsCount: assignedCardsAggregate{\n    num: _count\n  }\n}": typeof types.RegisterdCardsDocument,
    "\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n": typeof types.UsersDocument,
};
const documents: Documents = {
    "mutation registerCard($nfcId: Text!) {\n  insertNfcCards(objects: {nfcId: $nfcId}) {\n    data: returning {\n      id\n      nfcId\n    }\n  }\n}": types.RegisterCardDocument,
    "query registerdCards {\n  nfcCards {\n    id\n    nfcId\n    count: assignedCardsAggregate{\n      num: _count\n    }\n    assignedCards{\n      user {\n        name\n\t\t\t\temail\n        avatar\n        role\n      }\n    }\n  }\n  nfcCardsCount: nfcCardsAggregate{\n    num: _count\n  }\n  assignedCardsCount: assignedCardsAggregate{\n    num: _count\n  }\n}": types.RegisterdCardsDocument,
    "\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n": types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation registerCard($nfcId: Text!) {\n  insertNfcCards(objects: {nfcId: $nfcId}) {\n    data: returning {\n      id\n      nfcId\n    }\n  }\n}"): (typeof documents)["mutation registerCard($nfcId: Text!) {\n  insertNfcCards(objects: {nfcId: $nfcId}) {\n    data: returning {\n      id\n      nfcId\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query registerdCards {\n  nfcCards {\n    id\n    nfcId\n    count: assignedCardsAggregate{\n      num: _count\n    }\n    assignedCards{\n      user {\n        name\n\t\t\t\temail\n        avatar\n        role\n      }\n    }\n  }\n  nfcCardsCount: nfcCardsAggregate{\n    num: _count\n  }\n  assignedCardsCount: assignedCardsAggregate{\n    num: _count\n  }\n}"): (typeof documents)["query registerdCards {\n  nfcCards {\n    id\n    nfcId\n    count: assignedCardsAggregate{\n      num: _count\n    }\n    assignedCards{\n      user {\n        name\n\t\t\t\temail\n        avatar\n        role\n      }\n    }\n  }\n  nfcCardsCount: nfcCardsAggregate{\n    num: _count\n  }\n  assignedCardsCount: assignedCardsAggregate{\n    num: _count\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query Users {\n    users {\n      id\n      name\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;