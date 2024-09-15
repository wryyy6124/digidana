type booksType = {
  user_id: string;
  volume_id: string;
  title: string;
  series_id: string;
  created_at: string;
  authors: Array<string>;
  thumbnail_url: string;
  publisher: string;
  publishedDate: string;
  is_buy: boolean;
  order_number: number;
  description: string;
  infoLink: string;
  id: string;
};

type seriesType = {
  id: string;
  user_id: string;
  series_id: string;
  series_title: string;
  created_at: string;
};

interface HomePageProps {
  books: booksType[];
  series: seriesType[];
}
