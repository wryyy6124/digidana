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
  authors?: string[];
  publishedDate?: string;
  description?: string;
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
