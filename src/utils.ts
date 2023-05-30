// @ts-nocheck
import {parse} from 'query-string'

export const log = console.log

export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start)
}

export const limit = 10

export const getPaginator = (search) => {
  const parsedSearch = parse(search)
  const currentPage = parsedSearch.page ? Number(parsedSearch.page) : 1
  const offset = currentPage * limit - limit
  return {currentPage, offset}
}
