import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, TouchableOpacity, Image, FlatList, Text } from "react-native";
import { Entypo } from "@expo/vector-icons";

import { api } from "../../utils/fetch";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { IGameParams } from "../../@types/navigation";
import { Heading } from "../../components/Heading";
import { DuoCard, IDuoCardProps } from "../../components/DuoCard";
import { DuoMatch } from "../../components/DuoMatch";

import { THEME } from "../../theme";
import { styles } from "./styles";

export function Game() {
  const [duos, setDuos] = useState<IDuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('JoaoPedroCJ#9363')

  const { goBack } = useNavigation();
  const route = useRoute();
  const game = route.params as IGameParams;

  useEffect(() => {
    api
      .get<IDuoCardProps[]>(`games/${game.id}/ads`)
      .then(setDuos)
      .catch(console.error);
  }, []);

  async function getDiscordUser (adsId: string) {
    api
      .get<string>(`ads/${adsId}/discord`)
      .then(setDiscordDuoSelected)
      .catch(console.error);
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={goBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <DuoCard onConnect={() => getDiscordUser(item.id)} data={item} />
          )}
          style={styles.containerList}
          contentContainerStyle={[
            !!duos.length ? styles.contentList : styles.emptyListContent,
          ]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
          horizontal
        />
        <DuoMatch
          visible={!!discordDuoSelected}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
