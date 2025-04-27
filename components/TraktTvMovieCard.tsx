import { View, Text, TouchableOpacity, Image } from "react-native";
import { MovieTraktTv } from "@/types/MovieTypes";
import { Link } from "expo-router";

type MovieCardProps = {
  movieData: MovieTraktTv;
};

const TraktTvMovieCard = ({ movieData }: MovieCardProps) => {
  const { title, ids, year, images } = movieData;
  const { slug, tmdb, trakt, imdb } = ids;
  const { poster } = images;

  console.log(`https://${poster[0].replace(".jpg", "")}`);

  return (
    <Link href={`/movies/${imdb}`} asChild={true}>
      <TouchableOpacity className={"w-[30%] h-auto"}>
        <Image
          source={{
            uri: `https://${poster[0].replace(".webp", "")}`,
          }}
          className={"w-full h-52 rounded-lg"}
          resizeMode={"cover"}
        />

        <Text className={"text-sm text-custom-white-100 font-bold"}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TraktTvMovieCard;
