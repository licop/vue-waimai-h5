export interface ISearchRecomment {
  value: number,
  label: string
}

export interface ISearchResultList {
  list: ISearchResult[]
}

export interface ISearchResult {
  type: number,
  label: string,
  resultCount: number
}

export interface IHomeInfo {
  banner: Ibanner,
  searchRecomments: ISearchRecomment[],
  transformer: ITransformer[],
  countdown: ICountdown,
  activities: string[]
}

export interface Ibanner {
  imgUrl: string
}

export interface ITransformer {
  imgUrl: string,
  label: string
}

export interface ICountdown {
  time: number,
  goods: IGood
}