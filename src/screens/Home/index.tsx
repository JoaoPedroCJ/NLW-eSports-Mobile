import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { styles } from "./styles";

import { Background } from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Heading } from "../../components/Heading";
import { GameCard, IGameCardProps } from "../../components/GameCard";
import { useNavigation } from '@react-navigation/native'

import { useEffect, useState } from "react";
import { api } from "../../utils/fetch";

export function Home() {
  const [games, setGames] = useState<IGameCardProps[]>([]);

  const { navigate } = useNavigation()

  function handleOpenGame({ id, title, bannerUrl }: IGameCardProps) {
    navigate('game', { id, title, bannerUrl })
  }

  useEffect(() => {
    api.get<IGameCardProps[]>("games").then(setGames).catch(console.error);
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <GameCard onPress={() => handleOpenGame(item)} data={item} />}
          contentContainerStyle={styles.contentList}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </SafeAreaView>
    </Background>
  );
}
