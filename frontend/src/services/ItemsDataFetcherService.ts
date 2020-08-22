import axios from 'axios';

export interface ItemData {
  name: string,
  description: string,
  parent: string
}

export default class ItemsDataFetcherService {
  itemsDataEndpoint: string
  constructor(itemsDatEndpoint: string) {
    this.itemsDataEndpoint = itemsDatEndpoint
  }

  fetch(): Promise<ItemData[]> {
    return axios.get(this.itemsDataEndpoint);
  }
}
