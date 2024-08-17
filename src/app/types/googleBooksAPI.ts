type gBooksAPI = string | undefined;

type gBookType = {
  totalItems: number;
  items: Array<gBookItem>;
};

type gBookItem = {
  id: string;
  etag: string;
  volumeInfo: volumeInfoList;
};

type volumeInfoList = {
  title: string;
  authors?: string[] | undefined;
  publishedDate?: gBooksAPI;
  description?: gBooksAPI;
  imageLinks?: {
    thumbnail: string;
  };
  seriesInfo: {
    volumeSeries?: [
      {
        seriesId: string;
        orderNumber: number;
      }
    ];
  };
};
