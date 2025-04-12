import { View, Text, TouchableOpacity, Image } from "react-native";
import { Movie } from "@/types/MovieTypes";
import { Link } from "expo-router";

type MovieCardProps = {
  movieData: Movie;
};

const MovieCard = ({ movieData }: MovieCardProps) => {
  const { title, ids, year, images } = movieData;
  const { slug, tmdb, trakt, imdb } = ids;
  const { poster } = images;

  console.log(`https://${poster[0].replace(".jpg", "")}`);

  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <Link href={""} asChild={true}>
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

export default MovieCard;
