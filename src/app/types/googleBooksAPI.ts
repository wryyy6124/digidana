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
  id: string;
  title: string;
  authors?: string[] | undefined;
  publisher?: string;
  publishedDate?: gBooksAPI;
  description?: gBooksAPI;
  imageLinks?: {
    thumbnail: string;
  };
  infoLink: string;
  seriesInfo: {
    volumeSeries: [
      {
        seriesId: string;
        orderNumber: number;
      }
    ];
  };
};
