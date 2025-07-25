/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createServerRootRoute } from '@tanstack/react-start/server'

import { Route as rootRouteImport } from './routes/__root'
import { Route as IndexRouteImport } from './routes/index'
import { Route as TreninkyIndexRouteImport } from './routes/treninky/index'
import { Route as StatistikyIndexRouteImport } from './routes/statistiky/index'
import { Route as RutinyIndexRouteImport } from './routes/rutiny/index'
import { Route as RegisterIndexRouteImport } from './routes/register/index'
import { Route as ProfilIndexRouteImport } from './routes/profil/index'
import { Route as MenuIndexRouteImport } from './routes/menu/index'
import { Route as LoginIndexRouteImport } from './routes/login/index'
import { Route as CvikyIndexRouteImport } from './routes/cviky/index'
import { ServerRoute as ApiAuthSplatServerRouteImport } from './routes/api/auth/$'

const rootServerRouteImport = createServerRootRoute()

const IndexRoute = IndexRouteImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRouteImport,
} as any)
const TreninkyIndexRoute = TreninkyIndexRouteImport.update({
  id: '/treninky/',
  path: '/treninky/',
  getParentRoute: () => rootRouteImport,
} as any)
const StatistikyIndexRoute = StatistikyIndexRouteImport.update({
  id: '/statistiky/',
  path: '/statistiky/',
  getParentRoute: () => rootRouteImport,
} as any)
const RutinyIndexRoute = RutinyIndexRouteImport.update({
  id: '/rutiny/',
  path: '/rutiny/',
  getParentRoute: () => rootRouteImport,
} as any)
const RegisterIndexRoute = RegisterIndexRouteImport.update({
  id: '/register/',
  path: '/register/',
  getParentRoute: () => rootRouteImport,
} as any)
const ProfilIndexRoute = ProfilIndexRouteImport.update({
  id: '/profil/',
  path: '/profil/',
  getParentRoute: () => rootRouteImport,
} as any)
const MenuIndexRoute = MenuIndexRouteImport.update({
  id: '/menu/',
  path: '/menu/',
  getParentRoute: () => rootRouteImport,
} as any)
const LoginIndexRoute = LoginIndexRouteImport.update({
  id: '/login/',
  path: '/login/',
  getParentRoute: () => rootRouteImport,
} as any)
const CvikyIndexRoute = CvikyIndexRouteImport.update({
  id: '/cviky/',
  path: '/cviky/',
  getParentRoute: () => rootRouteImport,
} as any)
const ApiAuthSplatServerRoute = ApiAuthSplatServerRouteImport.update({
  id: '/api/auth/$',
  path: '/api/auth/$',
  getParentRoute: () => rootServerRouteImport,
} as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/cviky': typeof CvikyIndexRoute
  '/login': typeof LoginIndexRoute
  '/menu': typeof MenuIndexRoute
  '/profil': typeof ProfilIndexRoute
  '/register': typeof RegisterIndexRoute
  '/rutiny': typeof RutinyIndexRoute
  '/statistiky': typeof StatistikyIndexRoute
  '/treninky': typeof TreninkyIndexRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/cviky': typeof CvikyIndexRoute
  '/login': typeof LoginIndexRoute
  '/menu': typeof MenuIndexRoute
  '/profil': typeof ProfilIndexRoute
  '/register': typeof RegisterIndexRoute
  '/rutiny': typeof RutinyIndexRoute
  '/statistiky': typeof StatistikyIndexRoute
  '/treninky': typeof TreninkyIndexRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/cviky/': typeof CvikyIndexRoute
  '/login/': typeof LoginIndexRoute
  '/menu/': typeof MenuIndexRoute
  '/profil/': typeof ProfilIndexRoute
  '/register/': typeof RegisterIndexRoute
  '/rutiny/': typeof RutinyIndexRoute
  '/statistiky/': typeof StatistikyIndexRoute
  '/treninky/': typeof TreninkyIndexRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/cviky'
    | '/login'
    | '/menu'
    | '/profil'
    | '/register'
    | '/rutiny'
    | '/statistiky'
    | '/treninky'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/cviky'
    | '/login'
    | '/menu'
    | '/profil'
    | '/register'
    | '/rutiny'
    | '/statistiky'
    | '/treninky'
  id:
    | '__root__'
    | '/'
    | '/cviky/'
    | '/login/'
    | '/menu/'
    | '/profil/'
    | '/register/'
    | '/rutiny/'
    | '/statistiky/'
    | '/treninky/'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  CvikyIndexRoute: typeof CvikyIndexRoute
  LoginIndexRoute: typeof LoginIndexRoute
  MenuIndexRoute: typeof MenuIndexRoute
  ProfilIndexRoute: typeof ProfilIndexRoute
  RegisterIndexRoute: typeof RegisterIndexRoute
  RutinyIndexRoute: typeof RutinyIndexRoute
  StatistikyIndexRoute: typeof StatistikyIndexRoute
  TreninkyIndexRoute: typeof TreninkyIndexRoute
}
export interface FileServerRoutesByFullPath {
  '/api/auth/$': typeof ApiAuthSplatServerRoute
}
export interface FileServerRoutesByTo {
  '/api/auth/$': typeof ApiAuthSplatServerRoute
}
export interface FileServerRoutesById {
  __root__: typeof rootServerRouteImport
  '/api/auth/$': typeof ApiAuthSplatServerRoute
}
export interface FileServerRouteTypes {
  fileServerRoutesByFullPath: FileServerRoutesByFullPath
  fullPaths: '/api/auth/$'
  fileServerRoutesByTo: FileServerRoutesByTo
  to: '/api/auth/$'
  id: '__root__' | '/api/auth/$'
  fileServerRoutesById: FileServerRoutesById
}
export interface RootServerRouteChildren {
  ApiAuthSplatServerRoute: typeof ApiAuthSplatServerRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/treninky/': {
      id: '/treninky/'
      path: '/treninky'
      fullPath: '/treninky'
      preLoaderRoute: typeof TreninkyIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/statistiky/': {
      id: '/statistiky/'
      path: '/statistiky'
      fullPath: '/statistiky'
      preLoaderRoute: typeof StatistikyIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/rutiny/': {
      id: '/rutiny/'
      path: '/rutiny'
      fullPath: '/rutiny'
      preLoaderRoute: typeof RutinyIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/register/': {
      id: '/register/'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/profil/': {
      id: '/profil/'
      path: '/profil'
      fullPath: '/profil'
      preLoaderRoute: typeof ProfilIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/menu/': {
      id: '/menu/'
      path: '/menu'
      fullPath: '/menu'
      preLoaderRoute: typeof MenuIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/login/': {
      id: '/login/'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
    '/cviky/': {
      id: '/cviky/'
      path: '/cviky'
      fullPath: '/cviky'
      preLoaderRoute: typeof CvikyIndexRouteImport
      parentRoute: typeof rootRouteImport
    }
  }
}
declare module '@tanstack/react-start/server' {
  interface ServerFileRoutesByPath {
    '/api/auth/$': {
      id: '/api/auth/$'
      path: '/api/auth/$'
      fullPath: '/api/auth/$'
      preLoaderRoute: typeof ApiAuthSplatServerRouteImport
      parentRoute: typeof rootServerRouteImport
    }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  CvikyIndexRoute: CvikyIndexRoute,
  LoginIndexRoute: LoginIndexRoute,
  MenuIndexRoute: MenuIndexRoute,
  ProfilIndexRoute: ProfilIndexRoute,
  RegisterIndexRoute: RegisterIndexRoute,
  RutinyIndexRoute: RutinyIndexRoute,
  StatistikyIndexRoute: StatistikyIndexRoute,
  TreninkyIndexRoute: TreninkyIndexRoute,
}
export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
const rootServerRouteChildren: RootServerRouteChildren = {
  ApiAuthSplatServerRoute: ApiAuthSplatServerRoute,
}
export const serverRouteTree = rootServerRouteImport
  ._addFileChildren(rootServerRouteChildren)
  ._addFileTypes<FileServerRouteTypes>()
